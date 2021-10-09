import React, { useState, useEffect, useRef } from 'react';
import './App.css';

let renderCount = 1;

function App() {
    // const [renderCount, setRenderCount] = useState(1);

    // useEffect(() => {
    //     setRenderCount(prev => prev + 1);
    // });

    const inputRef = useRef(null);

    const [value, setValue] = useState('initial');
    const renderCountRef = useRef(1);
    const prevValue = useRef('');

    useEffect(() => {
        renderCount++;
        renderCountRef.current++;
        console.log(inputRef.current);
    });
    useEffect(() => {
        prevValue.current = value;
    }, [value]);

    const focus = () => inputRef.current.focus();

    return (
        <div className="App">
            <h1>Количество рендеров c помощью 'useState useEffect': {renderCount}</h1>
            <h2>Количество рендеров c помощью 'useRef': {renderCountRef.current}</h2>
            <h3>Прошлое состояние: {prevValue.current}</h3>
            <input type="text" ref={inputRef} onChange={e => setValue(e.target.value)} value={value} />
            <button className="btn btn-success" onClick={focus}>
                Фокус
            </button>
        </div>
    );
}

export default App;
