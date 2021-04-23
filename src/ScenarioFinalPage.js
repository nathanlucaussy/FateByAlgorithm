import React, {useEffect, Component, useGlobal, useState} from 'reactn';
import {Button} from './PageComponents';
import {useTracking} from 'react-tracking';
import {useRouteMatch, useHistory, Route, Link, Switch } from "react-router-dom";
import {Fade} from "react-reveal";
import DialogComponent from './DialogComponent.js';
import ProgressBarTriad from './ProgressBarTriad.js';
import './ScenarioFinalPage.css';

// Using an ES6 transpiler like Babel
import Slider from '@appigram/react-rangeslider';
// To include the default styles
import '@appigram/react-rangeslider/lib/index.css';

export default function ScenarioFinalPage(props){
  var to = "";
  var buttonText = "";
  var explanation_info = [];
  if (props.scenario_count < 8){
    explanation_info = ["Hang on tight! "
                        + "Your job as the fairness lawyer isn't over yet..."]
    to = "/scenario".concat((parseInt(props.scenario_count) + 1)).concat('/backgroundpage')
    buttonText = "Reveal my next case..."
  }
  else {
    explanation_info = ["Hooray! "
                        + "Your fairness report is ready."]
    to = "/results_page"
    buttonText = "Show me"
  }

  const [user_path, set_user_path] = useGlobal("user_path");
  const [scenario_store, set_scenario_store] = useGlobal("scenario_store");
  const current_scenario_index = user_path[parseInt(parseInt(props.scenario_count) -1 )].scenario_index;
  const user_path_selection = user_path[parseInt(parseInt(props.scenario_count) -1 )];
  const is_narrative = user_path[parseInt(parseInt(props.scenario_count) -1 )].is_narrative;
  const current_scenario_data = scenario_store[current_scenario_index];


  const [show_rest, set_show_rest] = useState(false);

  return(
    <div className = "background-div">
      <div className='name-and-progress'>
        <div className="progressbar-container">
          <ProgressBarTriad scenario_count= {props.scenario_count} in_scenario_progress={3}/>
        </div>
      </div>
      <div className="presentation-container">
        <DialogComponent lines = {explanation_info}
                         onFinished = {() => {set_show_rest(true)}}/>
      </div>
      {show_rest &&
      <div style={{paddingBottom: "10%"}}>
        <NextPageButton  to = {to} scenario_count={props.scenario_count}
                         buttonText = {buttonText}
                         scenario_name={current_scenario_data.name} scenario_is_narrative={is_narrative} datapoints_selected={user_path_selection.dp_selected}/>
      </div>}
      {((props.scenario_count >=3) && (props.scenario_count < 8)) &&
      <div style={{marginBottom: '80px'}}>
        <p>
          We'd hate to see you go <span>😢</span>, but if you must leave now,
          you can exit early to see your fairness report:
        </p>
        <SkipButton/>
      </div>
      }
    </div>
  );
}
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
      {props.buttonText}
    </Button>
  );
}
function SkipButton(props){
  const history = useHistory();
  const showNext = () => {
    history.push("/results_page")
  };
  const handleClick = () => {

    showNext();
  }
  return(
    <Button onClick={handleClick}>
      Skip
    </Button>
  );
}
