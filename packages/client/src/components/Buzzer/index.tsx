import * as React from 'react';

const buttonStyle = require('./button.scss');

interface IBuzzerProps {
    active: boolean;
    onBuzz();
}

class Buzzer extends React.Component<IBuzzerProps, any> {
    public render() {
        return <button
            className={ buttonStyle.btn }
            disabled={ !this.props.active }
            onClick={ this.props.onBuzz }>
            Buzz!
        </button>;
    }
}

export { Buzzer };
