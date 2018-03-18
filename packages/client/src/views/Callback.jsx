//@flow
import { Component } from 'react';
import { setIdToken, setAccessToken } from '../services/auth';

class Callback extends Component<{}, {}> {
    componentDidMount() {
        setAccessToken();
        setIdToken();
        window.location.href = '/';
    }

    render() {
        return null;
    }
}

export default Callback;
