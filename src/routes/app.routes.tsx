import React from "react";
import { Switch, Route } from "react-router-dom";

import Layout from "components/Layout";
import Dashboard from "pages/Dashboard";
import Store from "pages/Store";
import EditStore from "pages/Store/EditStore";
import CreateStore from "pages/Store/CreateStore";
import Assessment from "pages/Assessment";
import EditAssessment from "pages/Assessment/EditAssessment";
import CreateAssessment from "pages/Assessment/CreateAssessment";

const AppRoutes: React.FC = () => (
  <Layout>
    <Switch>
      <Route path="/" exact component={Dashboard} />
      <Route path="/store" exact component={Store} />
      <Route path="/store/create" exact component={CreateStore} />
      <Route path="/store/:id" exact component={EditStore} />
      <Route path="/assessment" exact component={Assessment} />
      <Route path="/assessment/create" exact component={CreateAssessment} />
      <Route path="/assessment/:id" exact component={EditAssessment} />
    </Switch>
  </Layout>
);

export default AppRoutes;
