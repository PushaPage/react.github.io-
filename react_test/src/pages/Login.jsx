import React, { useContext } from 'react';
import MyInput from '../components/UI/input/MyInput';
import MyButton from '../components/UI/button/MyButton';
import { AuthContext } from '../context';

const Login = () => {
    const { setIsAuth } = useContext(AuthContext);
    const login = event => {
        event.preventDefault();
        setIsAuth(true);
        localStorage.setItem('auth', 'true');
    };
    return (
        <div style={{ marginTop: '50px' }}>
            <h1>Страница для логина</h1>
            <form onSubmit={login}>
                <MyInput text="text" placeholder="Введите логин" />
                <MyInput text="text" placeholder="Введите пароль" />
                <MyButton>Войти</MyButton>
            </form>
        </div>
    );
};

export default Login;
