import * as React from 'react';

import { Admin } from './Admin';
import { Game } from './Game';
import { Login } from './Login';

interface IAppState {
    hasLoggedIn: boolean;
    isAdmin: boolean;
    username: string;
}

class App extends React.Component<any, IAppState> {
    constructor(props) {
        super(props);

        this.state = {
            hasLoggedIn: false,
            isAdmin: false,
            username: '',
        };
    }

    public login(username: string) {
        let isAdmin = false;
        // todo implement actual check
        if (username === 'admin') {
            isAdmin = true;
        }

        this.setState({
            hasLoggedIn: true,
            isAdmin,
            username,
        });
    }

    public render() {
        if (this.state.hasLoggedIn) {
            if (this.state.isAdmin) {
                return <Admin />;
            }

            return <Game />;
        } else {
            return <Login onLogin={(username) => this.login(username)}/>;
        }
    }
}

export default App;
