import React, { useState, useEffect } from 'react';
import './App.css';

const useLogger = value => {
    useEffect(() => {
        console.log('value changed ', value);
    }, [value]);
};

const useInput = initialValue => {
    const [value, setValue] = useState(initialValue);

    const onChange = event => {
        setValue(event.target.value);
    };

    const clear = () => setValue('');

    return {
        bind: { value, onChange },
        value,
        clear,
    };
};

function App() {
    const input = useInput('');
    const lastName = useInput('');

    useLogger(input.value);
    return (
        <div className={'container pt-3'}>
            <h1>
                {input.value} {lastName.value}
            </h1>
            <input type="text" {...input.bind} />
            <input type="text" {...lastName.bind} />
            <button className="btn btn-warning" onClick={input.clear}>
                Очистить
            </button>
        </div>
    );
}

export default App;
