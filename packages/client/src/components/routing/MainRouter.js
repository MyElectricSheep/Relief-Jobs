import React from "react";

// Routing imports
import { Switch, Route, useHistory } from "react-router-dom";
import JobsRouter from "./JobsRouter";

// Custom components imports
import NotFound from "../notFound/NotFound";

// Google Analytics import
import ReactGA from "react-ga";
ReactGA.initialize(process.env.REACT_APP_GOOGLE_ANALYTICS_TAG);

const getServerUrl = () => {
  if (process.env.REACT_APP_NODE_ENV === "production") {
    return `${process.env.REACT_APP_PRODUCTION_URL}`;
  } else {
    return `http://${process.env.REACT_APP_DEV_HOST}:${process.env.REACT_APP_DEV_PORT}`;
  }
};

const serverUrl = getServerUrl();

const MainRouter = () => {
  const history = useHistory();
  history.listen(location => {
    ReactGA.set({ page: location.pathname }); // Update the user's current page
    ReactGA.pageview(location.pathname); // Record a pageview for the given page
  });
  return (
    <>
      <Switch>
        {/* GOES TO THE JOBS ROUTER PAGE */}

        <Route path="/search" render={props => <JobsRouter {...props} serverUrl={serverUrl} />} />

        {/* CATCH ALL ROOT ROUTE >> GOES TO JOBS SEARCH MAIN PAGE */}

        <Route exact path="/" render={props => <JobsRouter {...props} serverUrl={serverUrl} />} />

        {/* 404 NOT FOUND ROUTE */}

        <Route component={NotFound} />
      </Switch>
    </>
  );
};

export default MainRouter;
