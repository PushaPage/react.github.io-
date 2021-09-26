import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css';
import Auth from './containers/Auth.js/Auth';
import Quiz from './containers/Quiz/Quiz';
import QuizCreator from './containers/QuizCreator/QuizCreator';
import QuizList from './containers/QuizList/QuizList';
import Layout from './hoc/Layout/Layout';

function App() {
    return (
        <Router>
            <div className="App">
                <Layout>
                    <Switch>
                        <Route path="/auth" component={Auth} />
                        <Route path="/quiz-creator" component={QuizCreator} />
                        <Route path="/quiz/:id" component={Quiz} />
                        <Route path="/" component={QuizList} />
                    </Switch>
                </Layout>
            </div>
        </Router>
    );
}

export default App;
