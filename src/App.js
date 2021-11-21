import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Projects from './components/project/Projects';

import ProjectState from './context/projects/projectState';
import TaskState from './context/tasks/taskState';

function App() {
  return (
    <ProjectState>
      <TaskState>


        <Router>

          <Switch>
            <Route exact path="/" component={Login} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/projects" component={Projects} />
          </Switch>

        </Router>

      </TaskState>
    </ProjectState>
  );
}

export default App;
