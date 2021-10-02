import React, { Component } from 'react';
import ActiveQuiz from '../../components/ActiveQuiz/ActiveQuiz';
import FinishedQuiz from '../../components/FinishedQuiz/FinishedQuiz';
import classes from './Quiz.module.css';
import Loader from '../../components/UI/Loader/Loader';
import { connect } from 'react-redux';
import { fetchQuizById, quizAnswerClick, retryQuiz } from '../../store/actions/quiz';

class Quiz extends Component {
    componentDidMount() {
        console.log('Quiz ID = ', this.props.match.params.id);
        this.props.fetchQuizById(this.props.match.params.id);
    }

    componentWillUnmount() {
        this.props.retryQuiz();
    }

    render() {
        console.log('quiz props: ', this.props);
        return (
            <div className={classes.Quiz}>
                <div className={classes.QuizWrapper}>
                    <h1>Ответьте на все вопросы</h1>
                    {this.props.loading || !this.props.quiz ? (
                        <Loader />
                    ) : this.props.isFinished ? (
                        <FinishedQuiz
                            results={this.props.results}
                            quiz={this.props.quiz}
                            onRetry={this.props.retryQuiz}
                        />
                    ) : (
                        <ActiveQuiz
                            question={this.props.quiz[this.props.activeQuestion].question}
                            answers={this.props.quiz[this.props.activeQuestion].answers}
                            onAnswerClick={this.props.quizAnswerClick}
                            quizLength={this.props.quiz.length}
                            answerNumber={this.props.activeQuestion + 1}
                            state={this.props.answerState}
                        />
                    )}
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        results: state.quiz.results, // { [id]: 'success' 'error'}
        isFinished: state.quiz.isFinished,
        activeQuestion: state.quiz.activeQuestion,
        answerState: state.quiz.answerState, // { [id]: 'success' 'error'}
        quiz: state.quiz.quiz,
        loading: state.quiz.loading,
    };
};

const mapStateDispatchToProps = dispatch => {
    return {
        fetchQuizById: id => dispatch(fetchQuizById(id)),
        quizAnswerClick: answerId => dispatch(quizAnswerClick(answerId)),
        retryQuiz: () => dispatch(retryQuiz()),
    };
};

export default connect(mapStateToProps, mapStateDispatchToProps)(Quiz);
