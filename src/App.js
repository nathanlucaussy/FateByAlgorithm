import track, { useTracking } from 'react-tracking';
import './App.css';
import LandingPage from './LandingPage.js';
import ConsentPage from './Consent.js';
import InstructionsPage from './InstructionsPage.js';
import Scenario from './Scenario.js';
import Install from './DialogStuff/guides/Install';
import React, { useGlobal, useEffect } from 'reactn';
import { BrowserRouter, Route, Link, Switch } from "react-router-dom";
import ResultsPage from './Results.js'
function App(){

    return(
      <BrowserRouter basename={process.env.PUBLIC_URL} >
        <div>
          <Switch>
            <Route path='/results_page'>
              <ResultsPage/>
            </Route>
            <Route path="/scenario8">
              <Scenario scenario_count="8"/>
            </Route>
            <Route path="/scenario7">
              <Scenario scenario_count="7"/>
            </Route>
            <Route path="/scenario6">
              <Scenario scenario_count="6"/>
            </Route>
            <Route path="/scenario5">
              <Scenario scenario_count="5"/>
            </Route>
            <Route path="/scenario4">
              <Scenario scenario_count="4"/>
            </Route>
            <Route path="/scenario3">
              <Scenario scenario_count="3"/>
            </Route>
            <Route path="/scenario2">
              <Scenario scenario_count="2"/>
            </Route>
            <Route path="/scenario1">
              <Scenario scenario_count="1"/>
            </Route>

            <Route path="/consent">
              <ConsentPage />
            </Route>
            <Route path="/instructions">
              <InstructionsPage />
            </Route>
            <Route path="/">
               <LandingPage />
            </Route>
          </Switch>
        </div>
      </BrowserRouter>
    )
}
// functional component usage
const TrackedApp = track(
  // app-level tracking data
  { app: "my-app" },

  // top-level options
  {
    // custom dispatch to console.log in addition to pushing to dataLayer[]
    dispatch: data => {
      console.log(data);
      (window.dataLayer = window.dataLayer || []).push(data);
    }
  }
)(App);
export default TrackedApp;
