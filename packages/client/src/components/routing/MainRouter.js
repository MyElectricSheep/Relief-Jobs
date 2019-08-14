import React from "react";

// Routing imports
import { Switch, Route } from "react-router-dom";
import JobsRouter from "./JobsRouter";

// Custom components imports
import NotFound from "../notFound/NotFound";

const MainRouter = () => (
  <>
    <Switch>
      {/* GOES TO THE JOBS ROUTER PAGE */}

      <Route path="/search" render={props => <JobsRouter {...props} />} />

      {/* CATCH ALL ROOT ROUTE >> GOES TO JOBS SEARCH MAIN PAGE */}

      <Route exact path="/" component={JobsRouter} />

      {/* 404 NOT FOUND ROUTE */}

      <Route component={NotFound} />
    </Switch>
  </>
);

export default MainRouter;
