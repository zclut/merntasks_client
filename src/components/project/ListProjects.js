import React, { useContext, useEffect } from 'react';
import Project from './Project';
import projectContext from '../../context/projects/projectContext';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

const ListProjects = () => {

    // Get the context
    const projectsContext = useContext(projectContext);
    const { projects, getProjects } = projectsContext;

    // Get all projects before render
    useEffect(() => {
        getProjects();
        // eslint-disable-next-line
    }, []);

    // Check if projects have content
    if (projects.length === 0) return <p>No hay proyectos, comienza creando uno</p>;

    return (
        <ul className="listado-proyectos">
            <TransitionGroup>
                {projects.map(project => (
                    <CSSTransition
                        key={project.id}
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