import React, { Suspense } from 'react';
import { Switch, Route, BrowserRouter as Router } from 'react-router-dom';

// import Home from '../pages/home/Home';
// import NotFound from '../pages/notFound/NotFound';
import Register from './pages/register/Register';
import Admin from './pages/admin/Admin';

function RouterOutlet(props) {
  return (
    <Suspense fallback={null}>
      <Router>
        <Switch>
          <Route path="/register">
              <Register/>
          </Route>
          <Route path="/admin">
            <Admin/>
          </Route>
          {/* <Route path="*">
            <NotFound/>
          </Route> */}
        </Switch>
      </Router>
    </Suspense>
  )
}

export default RouterOutlet
