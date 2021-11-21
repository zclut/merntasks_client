import React, { Fragment, useContext } from 'react';
import projectContext from '../../context/projects/projectContext';
import Task from './Task';

const ListTasks = () => {

    // Get the context
    const projectsContext = useContext(projectContext);
    const { project, deleteProject } = projectsContext;

    // Check if project is active
    if (!project) return <h2>Selecciona un proyecto</h2>;

    // Array destructuring
    const [activeProject] = project;
    const { id, name } = activeProject;

    const tasks = [
        {name: 'Elegir Plataforma', status: true},
        {name: 'Elegir Colores', status: false},
        {name: 'Elegir Plataformas de pago', status: false},
        {name: 'Elegir Hosting', status: true},
    ];

    return (
        <Fragment>
            <h2>Proyecto: {name}</h2>

            <ul className="listado-tareas">
                    {tasks.lenght === 0 
                        ? ( <li className="tarea"><p>No hay tareas</p></li> )
                        : tasks.map(task => (
                            <Task 
                                task={task}
                            />
                        ))
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