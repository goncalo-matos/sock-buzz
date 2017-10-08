import * as React from 'react';
import { getWebSocket } from '../helpers/WebSocketPromise';

const ADMIN_WEBSOCKET_PATH = 'ws://0.0.0.0:9292';

interface IAdminState {
    hasStarted: boolean;
    isSocketConnected: boolean;
}

class Admin extends React.Component<any, IAdminState> {
    constructor(props) {
        super(props);
        this.state = {
            hasStarted: false,
            isSocketConnected: false,
        };
    }

    public render() {
        const socketStatus = <span>{this.state.isSocketConnected ? 'true' : 'false'}</span>;
        const connectButton =
            <button onClick={(e) => { this.connect(); }} disabled={this.state.isSocketConnected}>CONNECT</button>;

        return <div>
            <span>{this.state.isSocketConnected ? 'true' : 'false'}</span>
            <button onClick={(e) => { this.connect(); }} disabled={this.state.isSocketConnected}>CONNECT</button>
            {this.state.isSocketConnected &&
                <span>
                    <button onClick={(e) => { this.start(); }} disabled={this.state.hasStarted}>START</button>
                    <button onClick={(e) => { this.stop(); }} disabled={!this.state.hasStarted}>STOP</button>
                </span>
            }
        </div>;
    }

    public connect() {
        getWebSocket(ADMIN_WEBSOCKET_PATH).then(() => {
            this.setState({
                isSocketConnected: true,
            });
        });
    }

    public start() {
        this.setState({
            hasStarted: true,
        });
    }

    public stop() {
        this.setState({
            hasStarted: false,
        });
    }

}

export {
    Admin,
};
