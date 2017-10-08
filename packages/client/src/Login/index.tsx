import * as React from 'react';

interface ILoginProps {
    onLogin(username);
}

interface ILoginState {
    username: string;
}

class Login extends React.Component<ILoginProps, ILoginState> {
    public updateUsername(e: React.ChangeEvent<HTMLInputElement>) {
        this.setState({
            username: e.target.value,
        });
    }

    public render() {
        return <div>
            <input type='text' value={this.state.username} onChange={(e) => this.updateUsername(e)}/>
            <button onClick={() => this.props.onLogin(this.state.username)}>CONNECT</button>
        </div>;
    }
}

export {
    Login,
};
