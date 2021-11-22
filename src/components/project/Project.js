import React, {useContext} from 'react';
import projectContext from '../../context/projects/projectContext';
import TaskContext from '../../context/tasks/taskContext';

const Project = ({project}) => {

    // Get the context
    const projectsContext = useContext(projectContext);
    const { getActiveProject } = projectsContext;

    const tasksContext = useContext(TaskContext);
    const { getTasksProject } = tasksContext;

    const { _id, name } = project;

    return (
        <li>
            <button
                type="button"
                className="btn btn-blank"
                onClick={() => {
                    getActiveProject(_id);
                    getTasksProject(_id);
                }}
            >
                {name}
            </button>
        </li>
    );
}

export default Project;