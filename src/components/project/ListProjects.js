import React, { useContext, useEffect } from 'react';
import Project from './Project';
import projectContext from '../../context/projects/projectContext';
import AlertContext from '../../context/alerts/alertContext';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

const ListProjects = () => {

    // Get the context
    const projectsContext = useContext(projectContext);
    const { msg, projects, getProjects } = projectsContext;

    const alertContext = useContext(AlertContext);
    const { alert, showAlert } = alertContext;

    // Get all projects before render
    useEffect(() => {

        // If have error
        if (msg) showAlert(msg.msg, msg.category);

        getProjects();
        // eslint-disable-next-line
    }, [msg]);

    // Check if projects have content
    if (projects.length === 0) return <p>No hay proyectos, comienza creando uno</p>;

    return (
        <ul className="listado-proyectos">

            {alert ? <div className={`alerta ${alert.category}`}>{alert.msg}</div> : null}
            <TransitionGroup>
                {projects.map(project => (
                    <CSSTransition
                        key={project._id}
                        timeout={200}
                        classNames="proyecto"
                    >
                        <Project project={project} />
                    </CSSTransition>
                ))}
            </TransitionGroup>
        </ul>
    );
}

export default ListProjects;