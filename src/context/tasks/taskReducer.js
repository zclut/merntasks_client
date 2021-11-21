import { GET_TASKS_PROJECT, ADD_TASK, VALIDATE_TASK, DELETE_TASK, STATUS_TASK, ACTIVE_TASK, UPDATE_TASK, CLEAR_ACTIVE_TASK} from '../../types';

export default (state, action) => {
    switch (action.type) {
        case GET_TASKS_PROJECT:
            return {
                ...state,
                tasksProject: state.tasks.filter(task => task.projectId === action.payload) 
            };

        case ADD_TASK:
            return {
                ...state,
                tasks: [...state.tasks, action.payload],
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
                tasks: state.tasks.filter(task => task.id !== action.payload)
            };

        case UPDATE_TASK:
        case STATUS_TASK:
            return {
                ...state,
                tasks: state.tasks.map(task => task.id === action.payload.id ? action.payload : task)
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