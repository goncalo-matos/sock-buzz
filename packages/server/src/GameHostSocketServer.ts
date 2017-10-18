import { IncomingMessage } from 'http';
import * as WebSocket from 'ws';

import { IPlayer } from './IPlayer';

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

    public startServer(server, port: number) {
        if (this._socketServer) {
            return;
        }

        this._socketServer = new WebSocket.Server({ server, port });
        this._socketServer.on('connection', (ws, req) => this._onConnect(ws));
    }

    public sendPlayerBuzz(playerResult: IPlayerResult) {
        this._clientSocket.send(JSON.stringify({type: 'BUZZ', playerResult}));
    }

    private _onConnect(ws: WebSocket) {
        this._clientSocket = ws;
        ws.on('message', (data) => this._onMessage(data));
    }

    private _onMessage(data) {
        const parsedData = JSON.parse(data);

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
