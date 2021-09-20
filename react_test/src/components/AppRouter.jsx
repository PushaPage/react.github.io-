import React, { useContext } from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';
import { AuthContext } from '../context';
import { publicRoutes, privateRoutes } from '../router';
import Loader from './UI/loader/Loader';

const AppRouter = () => {
    const { isAuth, isLoading } = useContext(AuthContext);
    if (isLoading) {
        return <Loader />;
    }
    return isAuth ? (
        <Switch>
            {privateRoutes.map(route => (
                <Route key={route.path} component={route.component} path={route.path} exact={route.exact} />
            ))}
            <Redirect to="/posts" />
        </Switch>
    ) : (
        <Switch>
            {publicRoutes.map(route => (
                <Route key={route.path} component={route.component} path={route.path} exact={route.exact} />
            ))}
            <Redirect to="/Login" />
        </Switch>
    );
};

export default AppRouter;
