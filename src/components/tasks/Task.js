import React, { useContext } from 'react';
import projectContext from '../../context/projects/projectContext';
import TaskContext from '../../context/tasks/taskContext';

const Task = ({ task }) => {

    // Get the context
    const projectsContext = useContext(projectContext);
    const { project } = projectsContext;
    const tasksContext = useContext(TaskContext);
    const { deleteTask, getTasksProject, updateTask, activeTask } = tasksContext;

    // Array destructuring
    const [activeProject] = project;

    const { _id, name, status } = task;

    const changeStatus = task => {
        task.status = (task.status) ? false : true;
        updateTask(task);
    };

    return (
        <li className="tarea sombra">
            <p>{name}</p>

            <div className="estado">
                {status
                    ?
                    <button
                        type="button"
                        className="completo"
                        onClick={() => changeStatus(task)}
                    >Completo</button>
                    :
                    <button
                        type="button"
                        className="incompleto"
                        onClick={() => changeStatus(task)}
                    >Incompleto</button>
                }
            </div>

            <div className="acciones">
                <button
                    type="button"
                    className="btn btn-primario"
                    onClick={() => activeTask(task)}
                >Editar</button>

                <button
                    type="button"
                    className="btn btn-secundario"
                    onClick={() => {
                        deleteTask(_id, activeProject._id);
                        getTasksProject(activeProject._id)
                    }}
                >Eliminar</button>
            </div>
        </li>
    );
}

export default Task;