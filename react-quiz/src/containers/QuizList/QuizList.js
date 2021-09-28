import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import classes from './QuizList.module.css';
import axios from 'axios';

class QuizList extends Component {
    state = {
        quizes: [],
    };
    renderQuizes() {
        return this.state.quizes.map(quiz => {
            return (
                <li key={quiz.id}>
                    <NavLink to={'/quiz/' + quiz.id}>Тест {quiz.name}</NavLink>
                </li>
            );
        });
    }

    async componentDidMount() {
        try {
            const response = await axios.get('https://react-quiz-3e077-default-rtdb.firebaseio.com/quizes.json');

            console.log(response);

            const quizes = [];
            Object.keys(response.data).forEach((key, index) => {
                quizes.push({
                    id: key,
                    name: `Тест №${index + 1}`,
                });
            });

            this.setState({
                quizes,
            });
        } catch (error) {
            console.log(error);
        }
    }

    render() {
        return (
            <div className={classes.QuizList}>
                <div>
                    <h1>Список тестов</h1>

                    <ul>{this.renderQuizes()}</ul>
                </div>
            </div>
        );
    }
}

export default QuizList;
