import React, { useEffect } from "react";

// Routing imports
import { Switch, Route, BrowserRouter } from "react-router-dom";
import JobsRouter from "./JobsRouter";

// Custom components imports
import NotFound from "../notFound/NotFound";

// Google Analytics
import GA from "../utils/GoogleAnalytics";

const getServerUrl = () => {
  if (process.env.REACT_APP_NODE_ENV === "production") {
    return `${process.env.REACT_APP_PRODUCTION_URL}`;
  } else {
    return `http://${process.env.REACT_APP_DEV_HOST}:${process.env.REACT_APP_DEV_PORT}`;
  }
};

const serverUrl = getServerUrl();

const MainRouter = () => {
  return (
    <BrowserRouter>
      {GA.init() && <GA.RouteTracker />}
      <Switch>
        {/* GOES TO THE JOBS ROUTER PAGE */}

        <Route path="/search" render={props => <JobsRouter {...props} serverUrl={serverUrl} />} />

        {/* CATCH ALL ROOT ROUTE >> GOES TO JOBS SEARCH MAIN PAGE */}

        <Route exact path="/" render={props => <JobsRouter {...props} serverUrl={serverUrl} />} />

        {/* 404 NOT FOUND ROUTE */}

        <Route component={NotFound} />
      </Switch>
    </BrowserRouter>
  );
};

export default MainRouter;
