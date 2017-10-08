import * as React from 'react';
import {
    BrowserRouter as Router,
    Link,
    Route,
    Switch,
} from 'react-router-dom';

import { Admin } from './Admin';
import { Game } from './Game';

const app = () => (
    <Router>
        <Switch>
            <Route exact path='/' component={Game} />
            <Route path='/admin' component={Admin} />
        </Switch>
    </Router>
);

export default app;
