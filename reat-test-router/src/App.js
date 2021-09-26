import React, { Component } from 'react';
import './App.scss';
import About from './About/About';
import Cars from './Cars/Cars';
import { BrowserRouter as Router, Route, Switch, Redirect, NavLink } from 'react-router-dom';
import CarDetail from './CarDetail/CarDetail';

class App extends Component {
    state = {
        isLoggedIn: false,
    };
    render() {
        return (
            <div>
                <Router>
                    <nav className="nav">
                        <ul>
                            <li>
                                <NavLink exact to="/" activeClassName={'wfm-active'}>
                                    Home
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    to="/about"
                                    activeStyle={{
                                        color: 'blue',
                                    }}
                                >
                                    About
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    to={{
                                        pathname: '/cars',
                                        search: '?a=1&b=2',
                                        hash: 'wfm-hash',
                                    }}
                                >
                                    Cars
                                </NavLink>
                            </li>
                        </ul>
                    </nav>

                    <hr />
                    <div style={{ textAlign: 'center' }}>
                        <h3>is logged in {this.state.isLoggedIn ? 'TRUE' : 'FALSE'}</h3>
                        <button onClick={() => this.setState({ isLoggedIn: true })}>loggin</button>
                    </div>

                    <Switch>
                        <Route path="/" exact render={() => <h1>Home Page</h1>} />
                        {this.state.isLoggedIn ? <Route path="/about" component={About} /> : null}
                        <Route path="/cars/:name" component={CarDetail} />
                        <Route path="/cars" component={Cars} />
                        {/* <Redirect from={'/about'} to={'/cars'}/> */}
                        <Redirect to={'/'} />

                        {/* example 404 last component necessarily */}
                        {/* <Route render={() => <h1 style={{ color: 'red', textAlign: 'center' }}>404 not found</h1>} /> */}
                    </Switch>
                </Router>
            </div>
        );
    }
}

export default App;
