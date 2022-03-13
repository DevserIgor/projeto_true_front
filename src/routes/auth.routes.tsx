import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";

import SignIn from "../pages/SignIn";
import AssessmenIframe from "../pages/AssessmentIframe";
import StarIframe from "pages/StarIframe";

const AuthRoutes: React.FC = () => (
  <Switch>
    <Route path="/login" component={SignIn} exact />
    <Route path="/assessments-iframe/:productId" component={AssessmenIframe} />
    <Route path="/random-stars" component={StarIframe} />
    <Redirect to={"/login"} />
  </Switch>
);

export default AuthRoutes;
