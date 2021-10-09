import React from 'react';
import Alert from './alert(useReducer)/Alert';
import { AlertProvider } from './alert(useReducer)/AlertContext';
import './App.css';
import Main from './Main';

function App() {
    return (
        <AlertProvider>
            <div className={'container pt-3'}>
                <Alert />
                <Main toggle={() => {}} />
            </div>
        </AlertProvider>
    );
}

export default App;
