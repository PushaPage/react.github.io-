import React, { useState, useEffect } from 'react';

function ItemsList({ getItems }) {
    const [items, setItems] = useState([]);

    useEffect(() => {
        console.log('render');
        const newItems = getItems();
        setItems(newItems);
        console.log('render');
    }, [getItems]);

    return (
        <ul>
            {items.map(i => (
                <li key={i}>{i}</li>
            ))}
        </ul>
    );
}

export default ItemsList;
