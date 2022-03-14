import React from "react";
import { Switch, useRouteMatch} from "react-router-dom";
import { useAuth } from "../hooks/auth";
import App from "./app.routes";
import Auth from "./auth.routes";
import Public from "./public.routes";

const ValidateRouter: React.FC = () => {
  
  const matchPublicRoutes = useRouteMatch([
    "/assessments-iframe/:productId",
    "/random-stars",
  ]);

  const { logged } = useAuth();
  
  return (
    <Switch>
      {
        matchPublicRoutes ?
          <Public />
          :
          logged ? <App /> : <Auth />
      }
    </Switch>
  );
};

export default ValidateRouter;
