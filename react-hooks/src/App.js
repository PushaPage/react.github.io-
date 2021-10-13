import Alert from './components/Alert';
import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import About from './pages/About';
import Home from './pages/Home';
import Profile from './pages/Profile';
import AlertState from './context/alert/AlertState';
import GithubState from './context/github/GithubState';

function App() {
    return (
        <GithubState>
            <AlertState>
                <Router>
                    <Navbar />
                    <div className="container pt-4">
                        <Alert alert={{ text: 'test alert' }} />
                        <Switch>
                            <Route path="/" exact component={Home} />
                            <Route path="/about" component={About} />
                            <Route path="/profile/:name" exact component={Profile} />
                        </Switch>
                    </div>
                </Router>
            </AlertState>
        </GithubState>
    );
}

export default App;
