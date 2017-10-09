import { BSON } from 'bson';
import { IncomingMessage } from 'http';
import * as WebSocket from 'ws';

import { IPlayer } from 'src/IPlayer';

const bson = new BSON();

interface IPlayerSocket {
    name?: string;
    socket: WebSocket;
}

interface ICallbacks {
    onBuzz(player: IPlayer);
}

class PlayerSocketServer {
    private _clientMap: Map<string, IPlayerSocket>;
    private _isActive: boolean;
    private _socketServer: WebSocket.Server;

    constructor(private _callbacks: ICallbacks) {
        this._clientMap = new Map();
        this._isActive = false;
    }

    public startServer(port: number) {
        if (this._socketServer) {
            return;
        }

        this._socketServer = new WebSocket.Server({ port });
        this._socketServer.on('connection', (ws, req) => this._onConnect(ws, req));
    }

    public startQuestion() {
        this._broadcast('START');
        this._isActive = true;
    }

    public stopQuestion() {
        this._broadcast('STOP');
        this._isActive = false;
    }

    private _onConnect(ws: WebSocket, req: IncomingMessage) {
        const ip = req.connection.remoteAddress; // if NGINX req.headers['x-forwarded-for'];

        this._clientMap.set(ip, { socket: ws });

        ws.on('close', () => this._clientMap.delete(ip));

        ws.on('message', (data: Buffer) => this._onMessage(data, ip));
    }

    private _onMessage(data: Buffer, id: string) {
        const parsedData = bson.deserialize(data);

        if (parsedData.type === 'BUZZ') {
            const client = this._clientMap.get(id);
            // TODO: instead of id should be name, still need a message to name the clients
            this._callbacks.onBuzz({ name: id });
        }
    }

    private _broadcast(message: WebSocket.Data) {
        for (const client of this._clientMap.values()) {
            client.socket.send(message);
        }
    }
}

export {
    PlayerSocketServer,
};
