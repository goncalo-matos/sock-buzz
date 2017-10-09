import { BSON } from 'bson';
import * as React from 'react';

import { getWebSocket } from '../helpers/WebSocketPromise';
import { IPlayerResult, PlayerResultList } from './PlayerResultList';

const ADMIN_WEBSOCKET_PATH = `ws://${location.hostname}:9292`;

const bson = new BSON();

interface IAdminState {
    hasStarted: boolean;
    isSocketConnected: boolean;
    playerResultList: IPlayerResult[];
}

class Admin extends React.Component<any, IAdminState> {
    private _socketConnection: WebSocket;

    constructor(props) {
        super(props);
        this.state = {
            hasStarted: false,
            isSocketConnected: false,
            playerResultList: [],
        };
    }

    public connect() {
        getWebSocket(ADMIN_WEBSOCKET_PATH).then((ws) => {
            this._socketConnection = ws;
            this.setState({
                isSocketConnected: true,
            });

            ws.addEventListener('message', (message) => {
                const parsedData = bson.deserialize(Buffer.from(message.data));

                if (parsedData.type === 'BUZZ') {
                    this.setState((prevState: IAdminState) => ({
                        playerResultList: [...prevState.playerResultList, parsedData.player],
                    }));
                }
            });
        });
    }

    public start() {
        this._socketConnection.send(bson.serialize({ type: 'start' }));
        this.setState({
            hasStarted: true,
        });
    }

    public stop() {
        this._socketConnection.send(bson.serialize({ type: 'stop' }));
        this.setState({
            hasStarted: false,
        });
    }

    public componentWillUnmount() {
        this._socketConnection.close();
    }

    public render() {
        const socketStatus = <span>{this.state.isSocketConnected ? 'true' : 'false'}</span>;
        const connectButton =
            <button onClick={(e) => { this.connect(); }} disabled={this.state.isSocketConnected}>CONNECT</button>;

        let gameStateButtons;
        let playerResultList;

        if (this.state.isSocketConnected) {
            gameStateButtons = <span>
                <button onClick={(e) => { this.start(); }} disabled={this.state.hasStarted}>START</button>
                <button onClick={(e) => { this.stop(); }} disabled={!this.state.hasStarted}>STOP</button>
            </span>;
            playerResultList = <PlayerResultList players={this.state.playerResultList}/>;
        }

        return <div>
            <span>{this.state.isSocketConnected ? 'true' : 'false'}</span>
            <button onClick={(e) => { this.connect(); }} disabled={this.state.isSocketConnected}>CONNECT</button>
            {gameStateButtons}
            {playerResultList}
        </div>;
    }
}

export {
    Admin,
};
