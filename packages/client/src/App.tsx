import * as React from 'react';
import {
    BrowserRouter as Router,
    Link,
    Route,
} from 'react-router-dom';

import { Admin } from './Admin';
import { Game } from './Game';

const app = () => (
    <Router>
        <div>
            <Route exact path='/' component={Game} />
            <Route path='/admin' component={Admin} />
        </div>
    </Router>
);

export default app;
