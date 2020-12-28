/** @format */
import React from "react";
import "./App.css";
import "normalize.css";
import "antd/dist/antd.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { ErrorBoundary } from "react-error-boundary";
import { useRecoilState } from "recoil";

import Layout from "./components/Layout/Layout";
import MapDashboardPage from "./pages/MapDashboardPage";
import MapFormPage from "./pages/MapFormPage";
import NotFound from "./components/NotFound/NotFound";
import { ErrorState } from "./store/atons";
import ErrorHandler from "./components/ErrorHandler/ErrorHandler";

function App() {
  const [error, setError] = useRecoilState(ErrorState);

  return (
    <div className="App">
      <Router>
        <ErrorBoundary
          onReset={() => setError(false)}
          FallbackComponent={ErrorHandler(error)}
        >
          <Layout>
            <Switch>
              <Route exact path="/" component={MapDashboardPage} />
              <Route exact path="/add" component={MapFormPage} />

              <Route component={NotFound} />
            </Switch>
          </Layout>
        </ErrorBoundary>
      </Router>
    </div>
  );
}

export default App;
