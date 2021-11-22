import React, { useReducer } from 'react';

import projectContext from './projectContext';
import projectReducer from './projectReducer';
import { FORM_PROJECT, GET_PROJECTS, ADD_PROJECT, VALIDATE_FORM, ACTIVE_PROJECT, DELETE_PROJECT, ERROR_PROJECT } from '../../types';

import client from '../../config/axios';

const ProjectState = props => {

    const initialState = {
        projects: [],
        project: null,
        form: false,
        errorForm: false,
        msg: null
    };

    // Dispatch to execute actions
    const [state, dispatch] = useReducer(projectReducer, initialState);

    // Actions to be executed (CRUD)
    const showForm = () => {
        dispatch({
            type: FORM_PROJECT,
            payload: true,
        });
    }

    // Show error form
    const showError = () => {
        dispatch({
            type: VALIDATE_FORM,
            payload: true,
        });
    };

    // Get the projects
    const getProjects = async () => {
        try {
            const response = await client.get('/api/projects');
            dispatch({
                type: GET_PROJECTS,
                payload: response.data,
            });
        } catch (error) {
            const alerta = {
                msg: 'Hubo un error',
                category: 'alerta-error'
            };

            dispatch({
                type: ERROR_PROJECT,
                payload: alerta,
            });
        }
    };

    // Add new project
    const addProject = async (project) => {
        try {
            const response = await client.post('/api/projects', project);

            // Insert project in state
            dispatch({
                type: ADD_PROJECT,
                payload: response.data,
            });
        } catch (error) {
            const alerta = {
                msg: 'Hubo un error',
                category: 'alerta-error'
            };

            dispatch({
                type: ERROR_PROJECT,
                payload: alerta,
            });
        }
    };

    // Get active project
    const getActiveProject = (projectId) => {
        dispatch({
            type: ACTIVE_PROJECT,
            payload: projectId,
        });
    };

    // Delete project
    const deleteProject = async (projectId) => {
        try {
            await client.delete(`/api/projects/${projectId}`);

            dispatch({
                type: DELETE_PROJECT,
                payload: projectId,
            });
        } catch (error) {
            const alerta = {
                msg: 'Hubo un error',
                category: 'alerta-error'
            };

            dispatch({
                type: ERROR_PROJECT,
                payload: alerta,
            });
        }
    };

    return (
        <projectContext.Provider
            value={{
                projects: state.projects,
                project: state.project,
                form: state.form,
                errorForm: state.errorForm,
                msg: state.msg,
                showForm,
                showError,
                getProjects,
                addProject,
                getActiveProject,
                deleteProject
            }}
        >
            {props.children}
        </projectContext.Provider>
    );
}

export default ProjectState;