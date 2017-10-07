import { IncomingMessage } from 'http';
import * as WebSocket from 'ws';
import { IPlayer } from './IPlayer';

interface IPlayerResult {
    player: IPlayer,
    time: Date
}

class GameHostSocketServer {
    private _socketServer: WebSocket.Server;
    private _clientSocket: WebSocket;

    public startServer(port: number) {
        if (this._socketServer) {
            return;
        }

        this._socketServer = new WebSocket.Server({ port });
        this._socketServer.on('connection', (ws, req) => this._onConnect(ws));
    }

    public sendPlayerPushOrder(players: IPlayerResult[]) {
        this._clientSocket.send(JSON.stringify(players));
    }

    private _onConnect(ws: WebSocket) {
        this._clientSocket = ws;
        ws.on('message', (data) => this._onMessage(data));
    }

    private _onMessage(data: WebSocket.Data) {}
}

export {
    GameHostSocketServer,
};
