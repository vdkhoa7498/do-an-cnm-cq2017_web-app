import React, { Suspense } from 'react';
import { Switch, Route, BrowserRouter as Router, Redirect } from 'react-router-dom';

import NotFound from './pages/notFound/NotFound';
import Register from './pages/auth/Register';
import Login from './pages/auth/Login';
import LayoutComponent from './components/layoutComponent/LayoutComponent';
import Project from './pages/project/Project';
import Transaction from './pages/transaction/Transaction';

import ProjectItem from './pages/project/ProjectItem';
import CreateProject from './pages/project/CreateProject';

function RouterOutlet(props) {
  return (
    <Suspense fallback={null}>
      <Router>
        <Switch>
          <Route exact path="/">
            <Redirect to = "/projects"/>
          </Route>
          <Route
            exact
            path={["/projects", "/projects/:id", "/create-new-project","/transactions"]}
          >
            <LayoutComponent>
              <Switch>
                <Route path="/create-new-project">
                  <CreateProject/>
                </Route>
                <Route path="/projects/:id">
                  <ProjectItem/>
                </Route>
                <Route path="/projects">
                  <Project/>
                </Route>
                <Route path="/transactions">
                  <Transaction/>
                </Route>
              </Switch>
            </LayoutComponent>
          </Route>
          <Route path="/register">
              <Register/>
          </Route>
          <Route path="/login">
              <Login/>
          </Route>
          <Route path="*">
            <NotFound/>
          </Route>
        </Switch>
      </Router>
    </Suspense>
  )
}

export default RouterOutlet
