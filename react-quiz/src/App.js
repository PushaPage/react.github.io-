import './App.css';
import Quiz from './containers/Quiz/Quiz';
import Layout from './hoc/Layout/Layout';

function App() {
    return (
        <div className="App">
            <div>Hello react</div>
            <Layout>
                <Quiz />
            </Layout>
        </div>
    );
}

export default App;
