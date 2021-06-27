import React, { Suspense } from "react";
import {
  Switch,
  Route,
  BrowserRouter as Router,
  Redirect,
} from "react-router-dom";

import NotFound from "./pages/notFound/NotFound";
import Register from "./pages/auth/Register";
import Login from "./pages/auth/Login";
import LayoutComponent from "./components/layoutComponent/LayoutComponent";
import Donate from "./pages/transaction/Donate";
import ConfirmProjectList from "./pages/project/ConfirmProjectList"
import UnconfirmProjectList from "./pages/project/UnconfirmProjectList"
import MyProject from "./pages/myProject/MyProject";
import ProjectItem from "./pages/project/ProjectItem";
import CreateProject from "./pages/project/CreateProject";
import Resend from "./pages/transaction/Resend";
import DonateProject from './pages/project/components/DonateProject'
import SendBackProject from './pages/project/components/SendBackProject'

function RouterOutlet(props) {
  const isAuthenticated = localStorage.getItem("isAuthenticated")
  return (
    <Suspense fallback={null}>
      <Router>
        <Switch>
          <Route exact path="/">
            <Redirect to="/confirmed-projects" />
          </Route>
          <Route
            exact
            path={[
              "/projects/:id",
              "/create-new-project",
              "/donate-transactions",
              "/resend-transactions",
              "/confirmed-projects",
              "/unconfirmed-projects",
              "/my-projects",
              "/donate-project/:id",
              "/sendback-project/:id",
            ]}
          >
            <LayoutComponent>
              <Switch>
                <Route path="/create-new-project">
                  <CreateProject />
                </Route>
                <Route path="/projects/:id">
                  <ProjectItem />
                </Route>
                <Route path="/my-projects">
                  {
                    (isAuthenticated)
                    ? 
                    <MyProject />
                    : <Redirect to="/confirmed-projects"/>
                  }
                </Route>
                <Route path= "/donate-project/:id">
                  <DonateProject/>
                </Route>
                <Route path= "/sendback-project/:id">
                  <SendBackProject/>
                </Route>
                <Route path="/confirmed-projects">
                  <ConfirmProjectList />
                </Route>
                <Route path="/unconfirmed-projects">
                  <UnconfirmProjectList />
                </Route>
                <Route path="/donate-transactions">
                  <Donate />
                </Route>
                <Route path="/resend-transactions">
                  <Resend />
                </Route>
              </Switch>
            </LayoutComponent>
          </Route>
          <Route path="/register">
            <Register />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="*">
            <NotFound />
          </Route>
        </Switch>
      </Router>
    </Suspense>
  );
}

export default RouterOutlet;
