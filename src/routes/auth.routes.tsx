import React from "react";
import { Switch, Route } from "react-router-dom";

import SignIn from "../pages/SignIn";
import AssessmenIframe from "../pages/AssessmentIframe";

const AuthRoutes: React.FC = () => (
  <Switch>
    <Route path="/login" component={SignIn} />
    <Route path="/assessments-iframe/:productId" component={AssessmenIframe} />
  </Switch>
);

export default AuthRoutes;
