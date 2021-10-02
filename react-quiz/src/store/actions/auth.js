import axios from 'axios';
import { AUTH_LOGOUT, AUTH_SUCCESS } from './actionsTypes';

export const authSuccess = token => {
    return {
        type: AUTH_SUCCESS,
        token,
    };
};

export const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.removeItem('expirationDate');
    return {
        type: AUTH_LOGOUT,
    };
};

export const autoLogout = time => {
    return dispatch => {
        setTimeout(() => {
            dispatch(logout());
        }, time * 1000);
    };
};

export const autoLogin = () => {
    return dispatch => {
        const token = localStorage.getItem('token');
        if (!token) {
            dispatch(logout());
        } else {
            const expirationDate = new Date(localStorage.getItem('expirationDate'));
            if (expirationDate <= new Date()) {
                dispatch(logout());
            } else {
                dispatch(authSuccess(token));
                dispatch(autoLogout((expirationDate.getTime() - new Date().getTime()) / 1000));
            }
        }
    };
};

export const auth = (email, password, isLogin) => {
    return async dispatch => {
        const authData = {
            email,
            password,
            returnSecureToken: true,
        };

        let url =
            'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBN--bHeSDOqWcn3KMGtg0lSOjPLW7k_x4';

        if (isLogin) {
            url =
                'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBN--bHeSDOqWcn3KMGtg0lSOjPLW7k_x4';
        }
        try {
            const response = await axios.post(url, authData, { 'Content-Type': 'application/json' });

            const { idToken, localId, expiresIn } = response.data;

            const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);

            localStorage.setItem('token', idToken);
            localStorage.setItem('userId', localId);
            localStorage.setItem('expirationDate', expirationDate);

            dispatch(authSuccess(idToken));
            dispatch(autoLogout(expiresIn));
        } catch (error) {}
    };
};
