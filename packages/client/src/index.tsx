import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';

import App from './App';

const render = (component) => {
    ReactDOM.render(
        <AppContainer>
            {component}
        </AppContainer>,
        document.getElementById('root'),
    );
};

render(<App />);

// Webpack Hot Module Replacement API
if (module.hot) {
    module.hot.accept('./App', () => { render(<App />); });
}
