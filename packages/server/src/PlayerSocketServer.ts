import {IncomingMessage} from 'http';
import * as WebSocket from 'ws';

interface IPlayerSocket {
    name?: string;
    socket: WebSocket;
}

class PlayerSocketServer {
    private _clientMap: Map<string, IPlayerSocket>;
    private _isActive: boolean;
    private _socketServer: WebSocket.Server;

    constructor() {
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

        this._clientMap.set(ip, {socket: ws});

        ws.on('close', () => this._clientMap.delete(ip));

        ws.on('message', (data) => this._onMessage(data));
    }

    private _onMessage(data: WebSocket.Data) {
        // TODO: use appropriate strategy later
        console.log(data);
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
