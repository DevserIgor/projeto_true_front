import React from "react";
import { Route, Redirect } from "react-router-dom";

import SignIn from "../pages/SignIn";
import AssessmenIframe from "../pages/AssessmentIframe";
import StarIframe from "pages/StarIframe";

const AuthRoutes: React.FC = () => (
  <>
    <Route path="/login" component={SignIn} exact />
    <Route path="/assessments-iframe/:productId" component={AssessmenIframe} />
    <Route path="/random-stars" component={StarIframe} />
    <Redirect to={"/login"} />
  </>
);

export default AuthRoutes;
