import { BSON } from 'bson';
import { IncomingMessage } from 'http';
import * as WebSocket from 'ws';

import { IPlayer } from './IPlayer';

const bson = new BSON();

interface IPlayerResult {
    player: IPlayer;
    time: Date;
}

interface ICallbacks {
    start();
    stop();
}

class GameHostSocketServer {
    private _socketServer: WebSocket.Server;
    private _clientSocket: WebSocket;

    constructor(private _callbacks: ICallbacks) { }

    public startServer(port: number) {
        if (this._socketServer) {
            return;
        }

        this._socketServer = new WebSocket.Server({ port });
        this._socketServer.on('connection', (ws, req) => this._onConnect(ws));
    }

    public sendPlayerBuzz(player: IPlayerResult) {
        this._clientSocket.send(JSON.stringify(player));
    }

    private _onConnect(ws: WebSocket) {
        this._clientSocket = ws;
        ws.on('message', (data: Buffer) => this._onMessage(data));
    }

    private _onMessage(data: Buffer) {
        const parsedData = bson.deserialize(data);

        switch (parsedData.type) {
            case 'start':
            case 'stop':
                this._callbacks[parsedData.type]();
                break;
        }
    }
}

export {
    GameHostSocketServer,
};
