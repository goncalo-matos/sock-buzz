import * as React from 'react';
import {
    BrowserRouter as Router,
    Link,
    Route,
} from 'react-router-dom';

import { Admin } from './Admin';
import { Home } from './Home';

const app = () => (
    <Router>
        <div>
            <Route exact path='/' component={Home} />
            <Route path='/admin' component={Admin} />
        </div>
    </Router>
);

export default app;
