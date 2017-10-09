import { BSON } from 'bson';
import * as React from 'react';

import { getWebSocket } from '../helpers/WebSocketPromise';

const PLAYER_WEBSOCKET_PATH = `ws://${location.hostname}:9191`;

const bson = new BSON();

interface IGameProps {
    username: string;
}

interface IGameState {
    isBuzzActive: boolean;
}

class Game extends React.Component<IGameProps, IGameState> {
    private _socketConnection: WebSocket;

    constructor(props) {
        super(props);

        this.state = {
            isBuzzActive: false,
        };
    }

    public start() {
        this.setState({
            isBuzzActive: true,
        });
    }

    public stop() {
        this.setState({
            isBuzzActive: false,
        });
    }

    public buzz() {
        this._socketConnection.send(bson.serialize({ type: 'BUZZ' }));
    }

    public componentDidMount() {
        return getWebSocket(PLAYER_WEBSOCKET_PATH)
            .then((ws) => {
                this._socketConnection = ws;
                ws.send(bson.serialize({ name: this.props.username, type: 'NAME' }));

                ws.addEventListener('message', (message) => this._onMessage(message));
            });
    }

    public componentWillUnmount() {
        this._socketConnection.close();
    }

    public render() {
        return <button disabled={!this.state.isBuzzActive} onClick={() => { this.buzz(); }}>BUZZ</button>;
    }

    private _onMessage(message: MessageEvent) {
        const parsedData = bson.deserialize(Buffer.from(message.data));

        switch (parsedData.type) {
            case 'start':
                this.start();
                break;
            case 'stop':
                this.stop();
                break;
        }
    }
}

export {
    Game,
};
