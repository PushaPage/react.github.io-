import { ADD, ADD2, ADD_NUMBER, SUB } from './actionsTypes';

export const add = () => {
    return {
        type: ADD,
    };
};

export const sub = () => {
    return {
        type: SUB,
    };
};

export const addNumber = number => {
    return {
        type: ADD_NUMBER,
        payload: number,
    };
};

export const asyncAdd = number => {
    return dispatch => {
        setTimeout(() => {
            dispatch(addNumber(number));
        }, 3000);
    };
};

export const add2 = number => {
    return {
        type: ADD2,
        payload: number,
    };
};
