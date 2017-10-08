import * as React from 'react';
import {getWebSocket} from '../helpers/WebSocketPromise';

interface IAdminState {
    isSocketConnected: boolean;
}

class Admin extends React.Component<any, IAdminState> {
    constructor(props) {
        super(props);
        this.state = {
            isSocketConnected: false,
        };
    }

    public render() {
        return <div>
            <span>{this.state.isSocketConnected ? 'true' : 'false'}</span>
            <button onClick={(e) => { this.connect(); }}>CONNECT</button>
        </div>;
    }

    private connect() {
        this.setState({isSocketConnected: true});
    }

}

export {
    Admin,
};
