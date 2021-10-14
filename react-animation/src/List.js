import React from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

const List = ({ items, onRemove }) => (
    <TransitionGroup style={{ padding: 0, margin: '20px 0 0 0' }} component={'ul'}>
        {items.map(item => (
            <CSSTransition classNames={'os'} timeout={750} key={item.id}>
                <li
                    onClick={() => onRemove(item.id)}
                    style={{ border: '1px solid', padding: 5, marginBottom: 5, listStyle: 'none' }}
                >
                    {item.title}
                </li>
            </CSSTransition>
        ))}
    </TransitionGroup>
);

export default List;
