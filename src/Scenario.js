import React, {useEffect, Component, useGlobal} from 'reactn';
import {NextButton} from './PageComponents';
import ScenarioBackgroundPage from './ScenarioBackground';
import ScenarioEvaluationPage from './ScenarioEvaluation';
import ScenarioJudgingPage from './ScenarioJudging';
import ScenarioCommentsPage from './ScenarioComments';
import ScenarioFinalPage from './ScenarioFinalPage.js';
import {useRouteMatch, useHistory, Route, Link, Switch } from "react-router-dom";

function Scenario(props){

  let { path, url } = useRouteMatch();
  const history = useHistory()
  useEffect(()=>{
      history.push(`${path}/backgroundpage`)
  }, [])
  return(
    <div>
      <Switch>
        <Route path={`${path}/final_page`}>
          <ScenarioFinalPage scenario_count = {props.scenario_count} parent_path={path} />
        </Route>
        <Route path={`${path}/commentspage`}>
          <ScenarioCommentsPage scenario_count = {props.scenario_count} parent_path={path} />
        </Route>
        <Route path={`${path}/judgingpage`}>
          <ScenarioJudgingPage scenario_count = {props.scenario_count} parent_path={path} />
        </Route>
        <Route path={`${path}/evaluationpage`}>
          <ScenarioEvaluationPage scenario_count = {props.scenario_count} parent_path={path} />
        </Route>
        <Route path={`${path}/backgroundpage`}>
          <ScenarioBackgroundPage scenario_count = {props.scenario_count} parent_path={path} />
        </Route>
      </Switch>
    </div>
  )
}







export default Scenario;
