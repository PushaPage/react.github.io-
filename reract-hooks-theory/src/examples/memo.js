import React, { useState, useMemo, useEffect } from 'react';
import './App.css';

const complexCompute = num => {
    console.log('complexCompute');
    let i = 0;
    while (i < 1e9) i++;
    return num * 2;
};

function App() {
    const [number, setNumber] = useState(42);
    const [colored, setColored] = useState(false);

    const styles = useMemo(
        () => ({
            color: colored ? 'darkred' : 'black',
        }),
        [colored]
    );

    useEffect(() => {
        console.log('Styles changed');
    }, [styles]);

    const computed = useMemo(() => {
        return complexCompute(number);
    }, [number]);

    return (
        <>
            <h1 style={styles}>Вычисляемое свойсто: {computed}</h1>
            <button className="btn btn-success" onClick={() => setNumber(prev => prev + 1)}>
                Добавить
            </button>
            <button className="btn btn-danger" onClick={() => setNumber(prev => prev - 1)}>
                Убрать
            </button>
            <button className="btn btn-warning" onClick={() => setColored(prev => !prev)}>
                Изменить
            </button>
        </>
    );
}

export default App;
