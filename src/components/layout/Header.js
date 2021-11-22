import React, {useContext, useEffect} from 'react';
import AuthContext from '../../context/auth/authContext';

const Header = () => {

    // Get the context
    const authContext = React.useContext(AuthContext);
    const { user, getAuthUser, logout } = authContext;

    useEffect(() => {
        getAuthUser();
    }, []);

    return (
        <header className="app-header">
            {user ? <p className="nombre-usuario"> Hola, <span>{user.name}</span> </p> : null}
            
            <nav className="nav-principal">
                <button
                    className="btn btn-blank cerrar-sesion"
                    onClick={() => logout()}
                >Cerrar Sesión</button>
            </nav>
        </header>
    );
}

export default Header;