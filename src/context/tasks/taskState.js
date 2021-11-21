import React, { useReducer } from 'react';
import TaskContext from './taskContext';
import TaskReducer from './taskReducer';

import uuid from 'uuid/dist/v4';

import { GET_TASKS_PROJECT, ADD_TASK, VALIDATE_TASK, DELETE_TASK, STATUS_TASK, ACTIVE_TASK, UPDATE_TASK, CLEAR_ACTIVE_TASK } from '../../types';

const TaskState = props => {
    const tasks = [
        {id: 1, name: 'Elegir Plataforma', status: true, projectId : 1},
        {id: 2, name: 'Elegir Colores', status: false, projectId : 2},
        {id: 3, name: 'Elegir Plataformas de pago', status: false, projectId : 3},
    ];

    const initialState = {
        tasks: tasks,
        tasksProject: null,
        errorTask: false,
        taskSelected: null
    };

    // Dispatch to execute actions
    const [state, dispatch] = useReducer(TaskReducer, initialState);

    // Actions to be executed (CRUD)
    const getTasksProject = (projectId) => {
        dispatch({
            type: GET_TASKS_PROJECT,
            payload: projectId,
        });
    };

    // Add task
    const addTask = task => {
        task.id = uuid();
        dispatch({
            type: ADD_TASK,
            payload: task
        });
    };

    // Validate task
    const validateTask = () => {
        dispatch({
            type: VALIDATE_TASK,
        });
    };

    // Delete task
    const deleteTask = taskId => {
        dispatch({
            type: DELETE_TASK,
            payload: taskId
        });
    };

    // Change status task
    const changeStatusTask = task => {
        dispatch({
            type: STATUS_TASK,
            payload: task
        });
    };

    // Active task
    const activeTask = task => {
        dispatch({
            type: ACTIVE_TASK,
            payload: task
        });
    };

    // Update task
    const updateTask = task => {
        dispatch({
            type: UPDATE_TASK,
            payload: task
        });
    };

    // Clear active task
    const clearActiveTask = () => {
        dispatch({
            type: CLEAR_ACTIVE_TASK,
        });
    };

    return (
        <TaskContext.Provider
            value={{
                tasks: state.tasks,
                tasksProject: state.tasksProject,
                errorTask: state.errorTask,
                taskSelected: state.taskSelected,
                getTasksProject,
                addTask,
                validateTask,
                deleteTask,
                changeStatusTask,
                activeTask,
                updateTask,
                clearActiveTask
            }}
        >
            {props.children}
        </TaskContext.Provider>
    );
};

export default TaskState;