import React from "react";
import ReactDOM from "react-dom";
import "./index.scss";
import AdminThemeRoutes from "./admin-theme/admin-theme-routes";
import Cookies from 'js-cookie'
import { getSession } from './pages/auth/session';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
  useHistory,
  useLocation
} from "react-router-dom";
import ShipmentRoutes from "./pages/shipment/routes";


function Root() {

  return (
    <Router>
      <Switch>

        <Route exact path="/">
          <Redirect to={"/shipments"} />
        </Route>

        <Route path="/shipments">
          <ShipmentRoutes></ShipmentRoutes>
        </Route>
        <Route path="/theme">
          <AdminThemeRoutes />
        </Route>

      </Switch>
    </Router>
  );
}



ReactDOM.render(<Root />, document.getElementById("root"));
