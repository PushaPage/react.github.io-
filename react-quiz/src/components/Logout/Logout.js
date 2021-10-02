import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { logout } from '../../store/actions/auth';

class Logout extends Component {
    componentDidMount() {
        this.props.logout();
    }
    render() {
        return <Redirect exact to={'/'} />;
    }
}

const mapStateDispatchToProps = dispatch => {
    return {
        logout: () => dispatch(logout()),
    };
};

export default connect(null, mapStateDispatchToProps)(Logout);
