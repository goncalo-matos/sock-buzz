//@flow
import React, { Component } from 'react';
import { Router, Route, Link } from 'react-router-dom';
import { Navbar, Nav, NavItem } from 'react-bootstrap';

import { isLoggedIn, login, logout } from './services/auth';
import history from './services/history';

import Home from './views/Home';
import Login from './views/Login';
import Callback from './views/Callback';

class App extends Component<{}, {}> {
    render() {
        return (
            <Router history={history}>
                <div>
                    <Navbar inverse staticTop>
                        <Navbar.Header>
                            <Navbar.Brand>
                                <Link to="/">React App</Link>
                            </Navbar.Brand>
                            <Navbar.Toggle />
                        </Navbar.Header>
                        <Navbar.Collapse>
                            <Nav pullRight>
                                <NavItem>
                                    {isLoggedIn() ? (
                                        <button
                                            className="btn btn-danger log"
                                            onClick={() => logout()}
                                        >
                                            Log out{' '}
                                        </button>
                                    ) : (
                                        <button
                                            className="btn btn-info log"
                                            onClick={() => login()}
                                        >
                                            Log In
                                        </button>
                                    )}
                                </NavItem>
                            </Nav>
                        </Navbar.Collapse>
                    </Navbar>

                    <Route exact path="/" component={Home} />
                    <Route path="/login" component={Login} />
                    <Route path="/callback" component={Callback} />
                </div>
            </Router>
        );
    }
}

export default App;
