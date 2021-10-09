import React from 'react';
import { useAlert } from './alert(useReducer)/AlertContext';

const Main = () => {
    // const { toggle } = useAlert();
    const { show } = useAlert();

    return (
        <div>
            <h1>Привет в примере с Context</h1>
            <button onClick={() => show('Этот текст из Main.js')} className="btn btn-success">
                Показать alert
            </button>
        </div>
    );
};

export default Main;
