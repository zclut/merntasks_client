import React, { Fragment, useContext } from 'react';
import projectContext from '../../context/projects/projectContext';
import TaskContext from '../../context/tasks/taskContext';
import Task from './Task';

import { CSSTransition, TransitionGroup } from 'react-transition-group';

const ListTasks = () => {

    // Get the context
    const projectsContext = useContext(projectContext);
    const tasksContext = useContext(TaskContext);
    const { project, deleteProject } = projectsContext;
    const { tasksProject } = tasksContext;

    // Check if project is active
    if (!project) return <h2>Selecciona un proyecto</h2>;

    // Array destructuring
    const [activeProject] = project;
    const { id, name } = activeProject;

    return (
        <Fragment>
            <h2>Proyecto: {name}</h2>

            <ul className="listado-tareas">
                {tasksProject.lenght === 0
                    ? (<li className="tarea"><p>No hay tareas</p></li>)
                    :
                    <TransitionGroup>
                        {tasksProject.map(task => (
                            <CSSTransition
                                key={task.id}
                                timeout={200}
                                classNames="tarea"
                            >
                                <Task task={task}/>
                            </CSSTransition>
                        ))}
                    </TransitionGroup>

                }
            </ul>

            <button
                type="button"
                className="btn btn-eliminar"
                onClick={() => deleteProject(id)}
            >Eliminar Proyecto &times;</button>
        </Fragment>
    );
}

export default ListTasks;