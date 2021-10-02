import axios from '../../axios/axios-quiz';
import {
    FETCH_QUIZES_ERROR,
    FETCH_QUIZES_START,
    FETCH_QUIZES_SUCCESS,
    FETCH_QUIZ_SUCCESS,
    FINISH_QUIZ,
    QUIZ_NEXT_QUESTION,
    QUIZ_RETRY,
    QUIZ_SET_STATE,
} from './actionsTypes';

export const fetchQuizes = () => {
    return async dispatch => {
        dispatch(fetchQuizesStart());
        try {
            const response = await axios.get('/quizes.json');

            console.log(response);

            const quizes = [];
            Object.keys(response.data).forEach((key, index) => {
                quizes.push({
                    id: key,
                    name: `Тест №${index + 1}`,
                });
            });

            dispatch(fetchQuizesSuccess(quizes));
        } catch (error) {
            dispatch(fetchQuizesError(error));
        }
    };
};

export const fetchQuizById = quizId => {
    return async dispatch => {
        dispatch(fetchQuizesStart());
        try {
            const response = await axios.get(`/quizes/${quizId}.json`);
            const quiz = response.data;
            dispatch(fetchQuizSuccess(quiz));
        } catch (error) {
            dispatch(fetchQuizesError(error));
        }
    };
};

export const fetchQuizesStart = () => {
    return {
        type: FETCH_QUIZES_START,
    };
};

export const fetchQuizSuccess = quiz => {
    return {
        type: FETCH_QUIZ_SUCCESS,
        quiz,
    };
};

export const fetchQuizesSuccess = quizes => {
    return {
        type: FETCH_QUIZES_SUCCESS,
        quizes,
    };
};

export const fetchQuizesError = error => {
    return {
        type: FETCH_QUIZES_ERROR,
        error,
    };
};

export const quizSetState = (answerState, results) => {
    return {
        type: QUIZ_SET_STATE,
        answerState,
        results,
    };
};

export const finishedQuiz = () => {
    return {
        type: FINISH_QUIZ,
    };
};

export const quizNextQuestion = number => {
    return {
        type: QUIZ_NEXT_QUESTION,
        number,
    };
};

const isQuizFinished = state => {
    return state.activeQuestion + 1 === state.quiz.length;
};

export const retryQuiz = () => {
    return {
        type: QUIZ_RETRY,
    };
};

export const quizAnswerClick = answerId => {
    return (dispatch, getState) => {
        const state = getState().quiz;
        if (state.answerState) {
            const key = Object.keys(state.answerState)[0];
            if (state.answerState[key] === 'success') {
                return;
            }
        }
        const question = state.quiz[state.activeQuestion];
        const results = state.results;
        if (question.rightAnswerId === answerId) {
            if (!results[question.id]) {
                results[question.id] = 'success';
            }
            dispatch(quizSetState({ [answerId]: 'success' }, results));

            const timeout = window.setTimeout(() => {
                if (isQuizFinished(state)) {
                    dispatch(finishedQuiz());
                } else {
                    dispatch(quizNextQuestion(state.activeQuestion + 1));
                }
                window.clearTimeout(timeout);
            }, 1000);
        } else {
            results[question.id] = 'error';
            dispatch(quizSetState({ [answerId]: 'error' }, results));
        }
        console.log('Answer id', answerId);
    };
};
