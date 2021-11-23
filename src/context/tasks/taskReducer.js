import { GET_TASKS_PROJECT, ADD_TASK, VALIDATE_TASK, DELETE_TASK, ACTIVE_TASK, UPDATE_TASK, CLEAR_ACTIVE_TASK} from '../../types';

export default (state, action) => {
    switch (action.type) {
        case GET_TASKS_PROJECT:
            return {
                ...state,
                tasksProject: action.payload
            };

        case ADD_TASK:
            return {
                ...state,
                tasksProject: [ action.payload, ...state.tasksProject],
                errorTask: false
            };

        case VALIDATE_TASK:
            return {
                ...state,
                errorTask: true
            };

        case DELETE_TASK:
            return {
                ...state,
                tasksProject: state.tasksProject.filter(task => task._id !== action.payload)
            };

        case UPDATE_TASK:
            return {
                ...state,
                tasksProject: state.tasksProject.map(task => task._id === action.payload.id ? action.payload._id : task)
                //taskSelected: null
            };

        case ACTIVE_TASK:
            return {
                ...state,
                taskSelected: action.payload
            };

        case CLEAR_ACTIVE_TASK:
            return {
                ...state,
                taskSelected: null
            };

        default:
            return state;
    }
}