import React, { useContext, useState, useEffect } from 'react';
import projectContext from '../../context/projects/projectContext';
import TaskContext from '../../context/tasks/taskContext';

const FormTask = () => {

    // Get the context
    const projectsContext = useContext(projectContext);
    const { project } = projectsContext;
    const tasksContext = useContext(TaskContext);
    const { taskSelected, errorTask, getTasksProject, addTask, validateTask, updateTask, clearActiveTask} = tasksContext;

    const [task, setTask] = useState({
        name: '',
    });

    useEffect(() => {
        if (taskSelected !== null) {
            setTask(taskSelected);
        } else {
            setTask({
                name: '',
            });
        }
    }, [taskSelected]);

    const { name } = task;

    // Check if project is active
    if (!project) return null;

    // Array destructuring
    const [activeProject] = project;

    const handleChange = e => {
        setTask({
            ...task,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = e => {
        e.preventDefault();

        // Validate form
        if (name.trim() === '') {
            validateTask();
            return;
        }

        // Check if is edit or add
        if (taskSelected === null) {
            // Add task
            task.projectId = activeProject._id;
            task.status = false;
            addTask(task);
        } else {
            // Edit task
            updateTask(task);

            // Clear selected task
            clearActiveTask();
        }

        // Get and filter task of active project
        getTasksProject(activeProject._id);

        // Reset form
        setTask({
            name: '',
        });
    }

    return (
        <div className="formulario">
            <form
                onSubmit={handleSubmit}
            >
                <div className="contenedor-input">
                    <input
                        type="text"
                        className="input-text"
                        placeholder="Nombre Tarea..."
                        name="name"
                        value={name}
                        onChange={handleChange}
                    />
                </div>

                <div className="contenedor-input">
                    <input
                        type="submit"
                        className="btn btn-primario btn-submit btn-block"
                        value={taskSelected ? 'Editar Tarea' : 'Agregar Tarea'}
                    />
                </div>
            </form>

            {errorTask ? <p className="mensaje error">El nombre de la tarea es obligatorio</p> : null}
        </div>
    );
}

export default FormTask;