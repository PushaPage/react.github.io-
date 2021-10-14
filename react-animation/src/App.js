import { useState } from 'react';
import { Transition, CSSTransition } from 'react-transition-group';
import './App.css';
import List from './List';

function App() {
    const [toggle, setToggle] = useState(true);
    const [toggle2, setToggle2] = useState(true);
    const [items, setItems] = useState([
        {
            id: 1,
            title: 'item 1',
        },
        {
            id: 2,
            title: 'item 2',
        },
        {
            id: 3,
            title: 'item 3',
        },
        {
            id: 4,
            title: 'item 4',
        },
    ]);

    const removeItem = id => setItems(items.filter(el => el.id !== id));
    const addItem = () => {
        const title = prompt('Enter item title');
        const id = Date.now();

        setItems(items.concat([{ title, id }]));
    };

    return (
        <div className="container">
            <button
                onClick={() => {
                    setToggle(!toggle);
                }}
            >
                Toggle
            </button>
            <button
                onClick={() => {
                    setToggle2(!toggle2);
                }}
            >
                Toggle2
            </button>
            <button onClick={addItem}>add Item</button>
            <hr />
            <div className="blocks">
                <Transition
                    in={toggle}
                    timeout={{
                        enter: 1000,
                        exit: 400,
                    }}
                    mountOnEnter
                    unmountOnExit
                    onEnter={() => console.log('onEnter')}
                    onEntering={() => console.log('onEntering')}
                    onEntered={() => console.log('onEntered')}
                    onExit={() => console.log('onExit')}
                    onExiting={() => console.log('onExiting')}
                    onExited={() => console.log('onExited')}
                >
                    {state => <div className={`square blue ${state}`}>{state}</div>}
                </Transition>
                <CSSTransition in={toggle2} timeout={1000} mountOnEnter unmountOnExit classNames="os">
                    <div className="square orange">{toggle2.toString()}</div>
                </CSSTransition>
            </div>
            <List items={items} onRemove={removeItem} />
        </div>
    );
}

export default App;
