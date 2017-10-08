import * as React from 'react';

import { getWebSocket } from '../helpers/WebSocketPromise';

const PLAYER_WEBSOCKET_PATH = 'ws://0.0.0.0:9191';

class Game extends React.Component {
    private _socketConnection: WebSocket;

    public buzz() {
        this._socketConnection.send('BUZZ');
    }

    public componentDidMount() {
        getWebSocket(PLAYER_WEBSOCKET_PATH).then((ws) => this._socketConnection = ws);
    }

    public render() {
        return <button onClick={() => { this.buzz(); }}>BUZZ</button>;
    }
}

export {
    Game,
};
