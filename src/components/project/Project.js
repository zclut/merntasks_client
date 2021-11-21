import React, {useContext} from 'react';
import projectContext from '../../context/projects/projectContext';

const Project = ({project}) => {

    // Get the context
    const projectsContext = useContext(projectContext);
    const { getActiveProject } = projectsContext;

    const { name } = project;

    return (
        <li>
            <button
                type="button"
                className="btn btn-blank"
                onClick={() => getActiveProject(project.id)}
            >
                {name}
            </button>
        </li>
    );
}

export default Project;