import * as React from 'react';

import { getWebSocket } from '../helpers/WebSocketPromise';

const PLAYER_WEBSOCKET_PATH = 'ws://0.0.0.0:9191';

interface IGameProps {
    username: string;
}

class Game extends React.Component<IGameProps, any> {
    private _socketConnection: WebSocket;

    public buzz() {
        this._socketConnection.send('BUZZ');
    }

    public componentDidMount() {
        return getWebSocket(PLAYER_WEBSOCKET_PATH)
            .then((ws) => {
                this._socketConnection = ws;
                // ws.send(JSON.stringify({name: this.props.username, type: 'NAME'}));
            });
    }

    public componentWillUnmount() {
        this._socketConnection.close();
    }

    public render() {
        return <button onClick={() => { this.buzz(); }}>BUZZ</button>;
    }
}

export {
    Game,
};
