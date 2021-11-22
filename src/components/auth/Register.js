import React, { useState, useContext, useEffect} from 'react';
import { Link } from 'react-router-dom';
import AlertContext from '../../context/alerts/alertContext';
import AuthContext from '../../context/auth/authContext';

const Register = (props) => {

    // Get the context
    const alertContext = useContext(AlertContext);
    const { alert, showAlert } = alertContext;

    const authContext = useContext(AuthContext);
    const { msg, isAuthenticated, register } = authContext;

    // Check if the user is already logged in or registered or is register
    useEffect(() => {
        if (isAuthenticated) props.history.push('/projects');

        if (msg) showAlert(msg.msg, msg.category);

    }, [msg, isAuthenticated, props.history]);

    // Create a state variable to store the user
    const [user, setUser] = useState({
        name: '',
        email: '',
        password: '',
        confirm: ''
    });
    const { name, email, password, confirm } = user;

    const handleChange = e => {
        setUser({
            ...user,
            [e.target.name]: e.target.value
        });
    }

    // When user submits the form
    const handleSubmit = e => {
        e.preventDefault();

        // Check if inputs are not empty
        if (name === '' || email === '' || password === '' || confirm === '') {
            showAlert('Todos los campos son obligatorios', 'error');
            return;
        }

        // Check if the password length is greather than 6
        if (password.length < 6) {
            showAlert('La contraseña debe tener al menos 6 caracteres', 'error');
            return;
        }

        // Check if the password and confirm match
        if (password !== confirm) {
            showAlert('Las contraseñas no coinciden', 'error');
            return;
        }

        // Send the data to the server
        register({
            name,
            email,
            password
        });
    }

    return (
        <div className="form-usuario">
            {alert ? (<div className={`alerta ${alert.category}`}>{alert.msg}</div>) : null}
            <div className="contenedor-form sombra-dark">
                <h1>Registrate</h1>

                <form
                    onSubmit={handleSubmit}
                >

                    <div className="campo-form">
                        <label htmlFor="name">Nombre</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            placeholder="Tu Nombre"
                            value={name}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="campo-form">
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            placeholder="Tu Email"
                            value={email}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="campo-form">
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            placeholder="Tu Password"
                            value={password}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="campo-form">
                        <label htmlFor="confirm">Confirmar Password</label>
                        <input
                            type="password"
                            id="confirm"
                            name="confirm"
                            placeholder="Repite tu password"
                            value={confirm}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="campo-form">
                        <input
                            type="submit"
                            className="btn btn-primario btn-block"
                            value="Registrar"
                        />
                    </div>

                </form>

                <Link to={'/'} className="enlace-cuenta">
                    Volver a Iniciar Sesión
                </Link>
            </div>
        </div>
    );
}

export default Register;