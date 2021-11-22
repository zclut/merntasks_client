import { FORM_PROJECT, GET_PROJECTS, ADD_PROJECT, VALIDATE_FORM, ACTIVE_PROJECT, DELETE_PROJECT, ERROR_PROJECT } from '../../types';

export default (state, action) => {
    switch (action.type) {

        case FORM_PROJECT:
            return {
                ...state,
                form: action.payload,
            };
        
        case VALIDATE_FORM:
            return {
                ...state,
                errorForm: action.payload,
            };

        case GET_PROJECTS:
            return {
                ...state,
                projects: action.payload
            };

        case ADD_PROJECT:
            return {
                ...state,
                projects: [...state.projects, action.payload],
                form: false,
                errorForm: false
            };

        case ACTIVE_PROJECT:
            return {
                ...state,
                project: state.projects.filter(project => project._id === action.payload)
            }

        case DELETE_PROJECT:
            return {
                ...state,
                projects: state.projects.filter(project => project._id !== action.payload),
                project: null
            };

        case ERROR_PROJECT:
            return {
                ...state,
                msg: action.payload
            };

        default:
            return state;
    }
}