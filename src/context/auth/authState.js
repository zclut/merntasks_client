import React, { useReducer } from 'react';

import AuthContext from '../auth/authContext';
import AuthReducer from '../auth/authReducer';

import client from '../../config/axios';
import tokenAuth from '../../config/token';

import { REGISTER_SUCCESS, REGISTER_FAIL, GET_USER, LOGIN_SUCCESS, LOGIN_FAIL, LOGOUT } from "../../types";

const AuthState = props => {

    const initialState = {
        token: localStorage.getItem('token'),
        isAuthenticated: null,
        user: null,
        msg: null,
        loading: true
    }

    const [state, dispatch] = useReducer(AuthReducer, initialState);

    // Register user
    const register = async data => {
        try {
            const response = await client.post('/api/users', data);

            dispatch({
                type: REGISTER_SUCCESS,
                payload: response.data
            });
            // Get authenticated user
            getAuthUser();
        } catch (error) {
            const alert = {
                msg: error.response.data.msg,
                category: 'alerta-error'
            }
            dispatch({
                type: REGISTER_FAIL,
                payload: alert
            });
        }
    }

    // Login user
    const login = async data => {
        try {
            const response = await client.post('/api/auth', data);
            console.log(response.data);

            dispatch({
                type: LOGIN_SUCCESS,
                payload: response.data
            });
            // Get authenticated user
            getAuthUser();
        } catch (error) {
            console.log(error.response.data);
            const alert = {
                msg: error.response.data.msg,
                category: 'alerta-error'
            }
            dispatch({
                type: LOGIN_FAIL,
                payload: alert
            });
        }
    };


    // Return user logged
    const getAuthUser = async () => {
        const token = localStorage.getItem('token');
        if (token) tokenAuth(token);

        try {
            const response = await client.get('/api/auth');
            console.log(response.data);
            dispatch({
                type: GET_USER,
                payload: response.data.user
            });
        } catch (error) {
            console.log(error);

            dispatch({
                type: LOGIN_FAIL,
            });
        }
    };

    // Logout
    const logout = () => {
        dispatch({
            type: LOGOUT
        });
    };


    return (
        <AuthContext.Provider
            value={{
                token: state.token,
                isAuthenticated: state.isAuthenticated,
                user: state.user,
                msg: state.msg,
                loading: state.loading,
                register,
                login,
                getAuthUser,
                logout
            }}
        >
            {props.children}
        </AuthContext.Provider>
    );
};

export default AuthState;