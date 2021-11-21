import React, {useReducer} from 'react';

import uuid from 'uuid/dist/v4';

import projectContext from './projectContext';
import projectReducer from './projectReducer';
import { FORM_PROJECT, GET_PROJECTS, ADD_PROJECT, VALIDATE_FORM, ACTIVE_PROJECT, DELETE_PROJECT } from '../../types';

const ProjectState = props => {
    const projects = [
        {id: 1, name: 'Tarea de MERN'},
        {id: 2, name: 'Intranet'},
        {id: 3, name: 'Diseño Web'},
    ]

    const initialState = {
        projects: [],
        project: null,
        form: false,
        errorForm: false
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
    const getProjects = () => {
        dispatch({
            type: GET_PROJECTS,
            payload: projects,
        });
    };

    // Add new project
    const addProject = (project) => {
        project.id = uuid();
        dispatch({
            type: ADD_PROJECT,
            payload: project,
        });
    };

    // Get active project
    const getActiveProject = (projectId) => {
        dispatch({
            type: ACTIVE_PROJECT,
            payload: projectId,
        });
    };

    // Delete project
    const deleteProject = (projectId) => {
        dispatch({
            type: DELETE_PROJECT,
            payload: projectId,
        });
    };

    return (
        <projectContext.Provider
            value={{
                projects: state.projects,
                project: state.project,
                form: state.form,
                errorForm: state.errorForm,
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