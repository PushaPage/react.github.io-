import React from 'react';
import classes from './FinishedQuiz.module.css';

const FinishedQuiz = props => {
    return (
        <div className={classes.FinishedQuiz}>
            <ul>
                {props.quiz.map((quizItem, index) => {
                    const cls = [
                        'fa',
                        props.results[quizItem.id] === 'error' ? 'fa-times' : 'fa-check',
                        classes[props.results[quizItem.id]],
                    ];
                    return (
                        <li key={index}>
                            <strong>{index + 1} </strong>.{quizItem.question}
                            <i className={cls.join(' ')} />
                        </li>
                    );
                })}
                <li>
                    <strong>1. How r u</strong>
                    <i className={'fa fa-times ' + classes.error}></i>
                </li>
                <li>
                    <strong>1. How r u</strong>
                    <i className={'fa fa-check ' + classes.success}></i>
                </li>
            </ul>
            <p>Правильно 4 из 10</p>
            <div>
                <button>Повторить</button>
            </div>
        </div>
    );
};

export default FinishedQuiz;
