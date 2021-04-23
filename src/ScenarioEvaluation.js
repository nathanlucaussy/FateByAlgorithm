import React, {useEffect, Component, useGlobal, useState} from 'reactn';
import { useTracking } from 'react-tracking';
import {Button, NextButton, PageHeader} from './PageComponents';
import {useRouteMatch, useHistory, Route, Link, Switch } from "react-router-dom";
import {ExplainedTableDataPoints, AdditionalInformation, Input} from './ScenarioComments.js';
import {Fade} from "react-reveal";
import {Triad, TriadExpanded, TableCollection} from './DatapointBackground.js';
import DialogComponent from './DialogComponent.js';
import ProgressBarTriad from './ProgressBarTriad.js';
import {useFixedPositionWindup} from './DialogComponent.js';
import './ScenarioJudging.css';
import {WindupChildren} from 'windups';
import styled from 'styled-components';
// Using an ES6 transpiler like Babel
import Slider from '@appigram/react-rangeslider';
// To include the default styles
import '@appigram/react-rangeslider/lib/index.css';



function ScenarioEvaluationPage(props){

  const [user_path, set_user_path] = useGlobal("user_path");
  const [scenario_store, set_scenario_store] = useGlobal("scenario_store");
  const current_scenario_index = user_path[parseInt(parseInt(props.scenario_count) -1 )].scenario_index;
  const user_path_selection = user_path[parseInt(parseInt(props.scenario_count) -1 )];
  const is_narrative = user_path[parseInt(parseInt(props.scenario_count) -1 )].is_narrative;
  const current_scenario_data = scenario_store[current_scenario_index];

  const [most_recent_fairness, set_most_recent_fairness] = useGlobal("most_recent_fairness");

  const [show_page_0, set_show_page_0] = useState(false);
  const [show_page_1, set_show_page_1] = useState(false);
  const [show_next_page_button, set_show_next_page_button] = useState(false);
  const [show_rest, set_show_rest] = useState(false);

  const [item_indices, set_item_indices] = useState(user_path_selection.dp_selected);
  const all_indices = []
  for (let i = 0; i<Object.keys(current_scenario_data.datapoints).length; i++){
    all_indices.push(i);
  }
  var explanation_info = [];
  if (current_scenario_data.category == 'LOAN'){
    if (props.scenario_count <= 2){
      explanation_info = ["PayDay Lenders use an algorithm to decide whether or not to approve loans. " +
                           "Here's all the information that the algorithm has on file for " + current_scenario_data.name + ".",
                          "Please read carefully..."];
    }
    else{
      explanation_info = ["PayDay Lenders use an algorithm to decide whether or not to approve loans." +
                           "Here's all the information that the algorithm has on file for " + current_scenario_data.name + "."];
    }
  }
  else{
    if (props.scenario_count <= 2){
      explanation_info = [current_scenario_data.name + "'s case is presented to an algorithm which has to decide whether " + current_scenario_data.name + " is likely to commit another crime.",
                          "The predictions from this algorithm may be used by the jury in deciding whether to allow " + current_scenario_data.name + " to be released on bail while they stand trial.",
                          "Here's all the information that the algorithm has on file for " + current_scenario_data.name + ". Please read carefully..."];
    }
    else{
      explanation_info = [current_scenario_data.name + "'s case is presented to an algorithm which has to decide whether " + current_scenario_data.name + " is likely to commit another crime. " +
                          "Here's all the information that the algorithm has on file for " + current_scenario_data.name]
    }

  }
  console.log(all_indices);
  console.log(current_scenario_data);
  if (is_narrative){
    return(
      <div className = "background-div">
      <div className='name-and-progress'>
        <div className="name-container">
          <p className="scen-back-name-header">
            <i>{current_scenario_data.name}</i>
          </p>
        </div>
        <div className="progressbar-container">
          <ProgressBarTriad scenario_count= {props.scenario_count} in_scenario_progress={1}/>
        </div>
      </div>
        <div className="presentation-container">
          <DialogComponent lines = {explanation_info}
                           onFinished = {() => {set_show_rest(true)}}/>
        </div>
        {show_rest &&
        <div>
          <div className="tables-container-thin">
            <TableCollection current_scenario = {current_scenario_data}  item_indices = {all_indices} onFinished={() => {set_show_next_page_button(true)}}/>
          </div>

          <div style={{paddingBottom: "10%"}}>
              {show_next_page_button &&
              <NextPageButton  to={`${props.parent_path}/judgingpage`} scenario_count={props.scenario_count} scenario_name={current_scenario_data.name} scenario_is_narrative={is_narrative} datapoints_selected={user_path_selection.dp_selected}/>
              }
          </div>
        </div>}
      </div>
    )
  }
  else{
    return(
      <div className = "background-div">
        <div className='name-and-progress'>
          <div className="name-container">
            <p className="scen-back-name-header">
              <i>{current_scenario_data.name}</i>
            </p>
          </div>
          <div className="progressbar-container">
            <ProgressBarTriad scenario_count= {props.scenario_count} in_scenario_progress={1}/>
          </div>
        </div>
        <div className="presentation-container">
          <DialogComponent lines = {explanation_info}
                           onFinished = {() => {set_show_rest(true)}}/>
        </div>
        {show_rest &&
        <div>
          <div className="tables-container-thin">
            <TableCollection current_scenario = {current_scenario_data}  item_indices = {all_indices} onFinished={() => {set_show_next_page_button(true)}}/>
          </div>

          <div style={{paddingBottom: "10%"}}>
              {show_next_page_button &&
              <NextPageButton  to={`${props.parent_path}/judgingpage`} scenario_count={props.scenario_count} scenario_name={current_scenario_data.name} scenario_is_narrative={is_narrative} datapoints_selected={user_path_selection.dp_selected}/>
              }
          </div>
        </div>}
      </div>
    )
  }
};

function NextPageButton(props){
  const { Track, trackEvent } = useTracking({ page: 'Scenario' });
  const history = useHistory();
  const [random_id, set_random_id] = useGlobal("random_id");
  const showNext = (to) => {
    history.push(to)
  };
  const handleClick = () => {

    showNext(props.to);
  }
  return(
    <Button onClick={handleClick}>
      SEE HOW THE ALGORITHM DECIDED
    </Button>
  );
}


export default ScenarioEvaluationPage;
