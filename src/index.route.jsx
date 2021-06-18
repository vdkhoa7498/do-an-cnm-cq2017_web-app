import React, { Suspense } from 'react';
import { Switch, Route, BrowserRouter as Router, Redirect } from 'react-router-dom';

import NotFound from './pages/notFound/NotFound';
import Register from './pages/auth/Register';
import Login from './pages/auth/Login';
import LayoutComponent from './components/layoutComponent/LayoutComponent';
import Project from './pages/project/Project';
import Transaction from './pages/transaction/Transaction';

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
            path={["/projects", "/transactions"]}
          >
            <LayoutComponent>
              <Switch>
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
