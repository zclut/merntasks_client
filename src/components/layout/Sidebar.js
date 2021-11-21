import React from 'react'
import NewProject from '../project/NewProject'
import ListProjects from '../project/ListProjects'

const Siderbar = () => {
    return (  
        <aside>
            <h1>MERN <span>Tasks</span> </h1>

            <NewProject />

            <div className="proyectos">
                <h2>Tus Proyectos</h2>

                <ListProjects />
            </div>
        </aside>
    );
}
 
export default Siderbar;