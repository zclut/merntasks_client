import React, { useState, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import AlertContext from '../../context/alerts/alertContext';
import AuthContext from '../../context/auth/authContext';

const Login = (props) => {

    // Get the context
    const alertContext = useContext(AlertContext);
    const { alert, showAlert } = alertContext;
    
    const authContext = useContext(AuthContext);
    const { msg, isAuthenticated, login } = authContext;

    // Check if the password or user does not exist
    useEffect(() => {
        if (isAuthenticated) props.history.push('/projects');

        if (msg) showAlert(msg.msg, msg.category);

    }, [msg, isAuthenticated, props.history]);

    // Create a state variable to store the user
    const [user, setUser] = useState({
        email: '',
        password: ''
    });
    const { email, password } = user;

    const handleChange = e => {
        setUser({
            ...user,
            [e.target.name]: e.target.value
        });
    }

    // When user submits the form
    const handleSubmit = e => {
        e.preventDefault();

        // Check if the inputs are empty
        if (email.trim() === '' || password.trim() === '') {
            showAlert('Todos los campos son obligatorios', 'alerta-error');
            return;
        }

        // Send the data to the server
        login({
            email,
            password
        });
    }

    return (
        <div className="form-usuario">
            {alert ? (<div className={`alerta ${alert.category}`}>{alert.msg}</div>) : null}

            <div className="contenedor-form sombra-dark">
                <h1>Iniciar Sesión</h1>

                <form
                    onSubmit={handleSubmit}
                >

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
                        <input
                            type="submit"
                            className="btn btn-primario btn-block"
                            value="Iniciar Sesión"
                        />
                    </div>

                </form>

                <Link to={'/register'} className="enlace-cuenta">
                    Registrarse
                </Link>
            </div>
        </div>
    );
}

export default Login;