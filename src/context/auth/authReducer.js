import { REGISTER_SUCCESS, REGISTER_FAIL, GET_USER, LOGIN_SUCCESS, LOGIN_FAIL, LOGOUT } from "../../types";

export default (state, action) => {
    switch (action.type) {

        case LOGIN_SUCCESS:
        case REGISTER_SUCCESS:
            localStorage.setItem('token', action.payload.token);
            return {
                ...state,
                token: action.payload.token,
                isAuthenticated: true,
                msg: null,
                loading: false
            };
        
        case LOGOUT:
        case LOGIN_FAIL:
        case REGISTER_FAIL:
            localStorage.removeItem('token');
            return {
                ...state,
                token: null,
                user: null,
                isAuthenticated: null,
                msg: action.payload,
                loading: false
            }; 

        case GET_USER:
            return {
                ...state,
                user: action.payload,
                isAuthenticated: true,
                loading: false
            };

        default:
            return state;
    }
};