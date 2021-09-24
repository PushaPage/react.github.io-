import React from 'react';
import AnswerItem from './AnswerItem/AnswerItem';
import classes from './AnswersList.module.css';

const AnswersList = props => (
    <ul className={classes.AnswersList}>
        {props.answers.map((answer, index) => {
            return (
                <AnswerItem
                    key={index}
                    answer={answer}
                    state={props.state ? props.state[answer.id] : null}
                    onAnswerClick={props.onAnswerClick}
                />
            );
        })}
    </ul>
);

export default AnswersList;
