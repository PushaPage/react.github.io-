import React, { useState, useMemo, useCallback } from 'react';
import './App.css';
import ItemsList from './ItemsList';

function App() {
    const [colored, setColored] = useState(false);
    const [count, setCount] = useState(1);

    const styles = useMemo(
        () => ({
            color: colored ? 'darkred' : 'black',
        }),
        [colored]
    );

    const generateItemsFromAPI = useCallback(() => {
        return new Array(count).fill('').map((_, i) => `Элемент ${i + 1}`);
    }, [count]);
    return (
        <>
            <h1 style={styles}>Количество элементов: {count}</h1>
            <button className="btn btn-success" onClick={() => setCount(prev => prev + 1)}>
                Добавить
            </button>
            <button className="btn btn-warning" onClick={() => setColored(prev => !prev)}>
                Изменить
            </button>
            <ItemsList getItems={generateItemsFromAPI} />
        </>
    );
}

export default App;
