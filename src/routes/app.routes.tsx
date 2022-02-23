import React from "react";
import { Switch, Route } from "react-router-dom";

import Layout from "../components/Layout";
import Dashboard from "../pages/Dashboard";
import List from "../pages/List";
import EditStore from "../pages/List/EditStore";
import CreateStore from "../pages/List/CreateStore";

const AppRoutes: React.FC = () => (
  <Layout>
    <Switch>
      <Route path="/" exact component={Dashboard} />
      <Route path="/list" exact component={List} />
      <Route path="/list/create" exact component={CreateStore} />
      <Route path="/list/:id" exact component={EditStore} />
    </Switch>
  </Layout>
);

export default AppRoutes;
