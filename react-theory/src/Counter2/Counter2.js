import React from 'react';
import { ClickedContext } from '../App';

// eslint-disable-next-line import/no-anonymous-default-export
export default props => {
    return (
        <div
            style={{
                border: '1px solid #ccc',
                width: '200px',
                margin: '0 auto',
            }}
        >
            <h3>Counter2</h3>
            <ClickedContext.Consumer>{clicked => (clicked ? <p>Clicked</p> : null)}</ClickedContext.Consumer>
        </div>
    );
};
