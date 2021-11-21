import React, { Fragment, useState, useContext } from 'react';
import projectContext from '../../context/projects/projectContext';

const NewProject = () => {

    // Get the context
    const projectsContext = useContext(projectContext);
    const { form, errorForm, showForm, addProject, showError } = projectsContext;

    // State to store the project
    const [project, setProject] = useState({
        name: '',
    });

    const { name } = project;

    const handleChange = e => {
        setProject({
            ...project,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = e => {
        e.preventDefault();

        // Validate project
        if (name.trim() === '') {
            showError();
            return;
        }

        // Add project
        addProject(project);

        // Reset form
        setProject({
            name: '',
        });
    };

    return (
        <Fragment>
            <button
                type="button"
                className="btn btn-block btn-primario"
                onClick={() => showForm()}
            >
                Nuevo Proyecto
            </button>

            {
                form ?
                    (
                        <form
                            className="formulario-nuevo-proyecto"
                            onSubmit={handleSubmit}
                        >
                            <input
                                type="text"
                                className="input-text"
                                placeholder="Nuevo Proyecto"
                                name="name"
                                value={name}
                                onChange={handleChange}
                            />

                            <input
                                type="submit"
                                className="btn btn-primario btn-block"
                                value="Agregar Proyecto"
                            />
                        </form>
                    ) : null}

            {errorForm ? <p className="mensaje error">El nombre del Proyecto es obligatorio</p> : null}
        </Fragment>
    );
}

export default NewProject;