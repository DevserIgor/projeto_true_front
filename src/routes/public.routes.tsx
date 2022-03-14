import React from "react";
import { Route } from "react-router-dom";

import AssessmenIframe from "../pages/AssessmentIframe";
import StarIframe from "pages/StarIframe";

const PublicRoutes: React.FC = () => (
  <>
    <Route
      path="/assessments-iframe/:productId"
      exact
      component={AssessmenIframe}
    />
    <Route path="/random-stars" component={StarIframe} />
  </>
);

export default PublicRoutes;
