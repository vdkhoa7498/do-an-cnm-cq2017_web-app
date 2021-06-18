import React, { Suspense } from 'react';
import { Switch, Route, BrowserRouter as Router } from 'react-router-dom';
import { Layout } from 'antd';

import HeaderBar from "./components/headerBar/HeaderBar";

import NotFound from './pages/notFound/NotFound';
import Register from './pages/auth/Register';
import Login from './pages/auth/Login';
import Home from './pages/home/Home';

const { Header, Content, Footer } = Layout;

function RouteLayout(props) {
  const { children } = props;

  return (
    <Layout style={{ padding: 10}}>
      <Header className="header">
        <HeaderBar />
      </Header>
      <Content style={{ marginTop: 15, minHeight: 380 }}>
        {children}
      </Content>
      <Footer style={{ textAlign: "center" }}>Website Charity @2021</Footer>
    </Layout>
  );
}

function RouterOutlet(props) {
  return (
    <Suspense fallback={null}>
      <Router>
        <Switch>
          <Route
            exact
            path={["/"]}
          >
            <RouteLayout>
              <Switch>
              <Route path="/">
                <Home/>
              </Route>
              </Switch>
            </RouteLayout>
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
