import * as React from 'react';

import { getWebSocket } from '../helpers/WebSocketPromise';
import { IPlayerResult, IPlayerResultListProps, PlayerResultList } from './PlayerResultList';

const stateButtonsStyle = require('./state-buttons.scss');

const ADMIN_WEBSOCKET_PATH = `ws://${location.hostname}:9292`;

interface IAdminState {
    hasStarted: boolean;
    isSocketConnected: boolean;
    playerResultList: IPlayerResultListProps['players'];
}

class Admin extends React.Component<any, IAdminState> {
    private _socketConnection: WebSocket;

    constructor(props) {
        super(props);
        this.state = {
            hasStarted: false,
            isSocketConnected: false,
            playerResultList: new Map(),
        };
    }

    public connect() {
        return getWebSocket(ADMIN_WEBSOCKET_PATH).then((ws) => {
            this._socketConnection = ws;
            this.setState({
                isSocketConnected: true,
            });

            ws.addEventListener('message', (message) => {
                const parsedData = JSON.parse(message.data, (key, value) => {
                    if (key === 'time') {
                        return new Date(value);
                    }

                    return value;
                });

                if (parsedData.type === 'BUZZ') {
                    this.getBuzz(parsedData.playerResult);
                }
            });
        });
    }

    public getBuzz(playerResult: IPlayerResult) {
        this.setState((prevState: IAdminState) => ({
            playerResultList: prevState.playerResultList.has(playerResult.player.name) ? prevState.playerResultList :
                prevState.playerResultList.set(playerResult.player.name, playerResult),
        }));
    }

    public start() {
        this._socketConnection.send(JSON.stringify({ type: 'start' }));
        this.setState({
            hasStarted: true,
            playerResultList: new Map(),
        });
    }

    public stop() {
        this._socketConnection.send(JSON.stringify({ type: 'stop' }));
        this.setState({
            hasStarted: false,
        });
    }

    public componentDidMount() {
        return this.connect();
    }

    public componentWillUnmount() {
        this._socketConnection.close();
    }

    public render() {
        let gameStateButtons;
        let playerResultList;

        if (this.state.isSocketConnected) {
            gameStateButtons = <span>
                <button className={ stateButtonsStyle.green }
                    onClick={(e) => { this.start(); }}
                    disabled={this.state.hasStarted}
                >START</button>
                <button className={ stateButtonsStyle.red }
                    onClick={(e) => { this.stop(); }}
                    disabled={!this.state.hasStarted}
                >STOP</button>
            </span>;
            playerResultList = <PlayerResultList players={this.state.playerResultList} />;
        }

        return <div>
            {gameStateButtons}
            {playerResultList}
        </div>;
    }
}

export {
    Admin,
};
