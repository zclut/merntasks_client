import React, { useReducer } from 'react';
import TaskContext from './taskContext';
import TaskReducer from './taskReducer';

import { GET_TASKS_PROJECT, ADD_TASK, VALIDATE_TASK, DELETE_TASK, ACTIVE_TASK, UPDATE_TASK, CLEAR_ACTIVE_TASK } from '../../types';

import client from '../../config/axios';

const TaskState = props => {

    const initialState = {
        tasksProject: [],
        errorTask: false,
        taskSelected: null
    };

    // Dispatch to execute actions
    const [state, dispatch] = useReducer(TaskReducer, initialState);

    // Actions to be executed (CRUD)
    const getTasksProject = async (project) => {

        try {
            const response = await client.get('/api/tasks', { params: { project } });
            console.log(response.data);
            dispatch({
                type: GET_TASKS_PROJECT,
                payload: response.data.tasks
            });
            
        } catch (error) {
            console.log(error);
        }
    };

    // Add task
    const addTask = async task => {
        try {
            const response = await client.post('/api/tasks', task);
            dispatch({
                type: ADD_TASK,
                payload: response.data
            });
        } catch (error) {
            console.log(error);
        }

    };

    // Validate task
    const validateTask = () => {
        dispatch({
            type: VALIDATE_TASK,
        });
    };

    // Delete task
    const deleteTask = async (id, project) => {
        try {
            await client.delete(`/api/tasks/${id}`, { params: { project } });

            dispatch({
                type: DELETE_TASK,
                payload: id
            });
        } catch (error) {
            console.log(error);
        }
    };

    // Update task
    const updateTask = async task => {
        try {
            const response = await client.put(`/api/tasks/${task._id}`, task);
            console.log(response.data);
            dispatch({
                type: UPDATE_TASK,
                payload: response.data.task
            });
        } catch (error) {
            console.log(error);
        }
    };

    // Active task
    const activeTask = task => {
        dispatch({
            type: ACTIVE_TASK,
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
                tasksProject: state.tasksProject,
                errorTask: state.errorTask,
                taskSelected: state.taskSelected,
                getTasksProject,
                addTask,
                validateTask,
                deleteTask,
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