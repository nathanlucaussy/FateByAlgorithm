import React, {useEffect, Component, useGlobal, useState} from 'reactn';
import './ScenarioBackground.css';
import {PageHeader, NextButton} from './PageComponents';
import styled from 'styled-components';
import DialogComponent, {useFixedPositionWindup} from './DialogComponent.js';
import Dialog from './DialogStuff/Dialog';
import SectionFocusContext from './DialogStuff/SectionFocusContext';
import ProgressBarTriad from './ProgressBarTriad.js';
import {ExplainedTableDataPoints, AdditionalInformation} from './ScenarioComments.js';
import TableInfoSpeedos, {TriadCollection} from './DatapointBackground.js';
import {useRouteMatch, useHistory, Route, Link, Switch } from "react-router-dom";
import {WindupChildren, useRewind, Linebreaker, useWindupString} from 'windups';




function ScenarioBackgroundPage(props){
  const history = useHistory();
  const [user_path, set_user_path] = useGlobal("user_path");
  const [scenario_store, set_scenario_store] = useGlobal("scenario_store");
  const current_scenario_index = user_path[parseInt(parseInt(props.scenario_count) -1 )].scenario_index;
  const is_narrative = user_path[parseInt(parseInt(props.scenario_count) -1 )].is_narrative;
  const user_path_selection = user_path[parseInt(parseInt(props.scenario_count) -1 )];
  const current_scenario_data = scenario_store[current_scenario_index]
  const all_items_indices = []
  const [show_next, set_show_next] = useState(false);
  const [show_dialog, set_show_dialog] = useState(false);

  const [show_briefer, set_show_briefer] = useState(true);
  const [show_dp, set_show_dp] = useState(false);

  const transition_to_dp = () => {
    set_show_dp(true);
  };
  for (let i =0; i < Object.keys(current_scenario_data.datapoints).length; i++){
    all_items_indices.push(i);
  }
  const case_adjectives = ["first", "second", "third", "fourth", "fifth", "sixth", "seventh", "eighth"]
  var case_adjective = case_adjectives[props.scenario_count - 1]

  var explanation_info = "";
  if (current_scenario_data.category == 'LOAN'){
    explanation_info = current_scenario_data.name + ' is applying for a loan from PayDay Lenders®.'
  }
  else{
    explanation_info = current_scenario_data.name + ' has committed a crime.'
  }
  if (is_narrative){
    return(
      <div className="overall-div">
        <PageHeader/>
        <div className='frame-below-header'>
          <div className='name-and-progress'>
            <div className="name-container">
              <p className="scen-back-name-header">
                <i>{current_scenario_data.name}</i>
              </p>
            </div>
            <div className="progressbar-container">
              <ProgressBarTriad scenario_count= {props.scenario_count} in_scenario_progress={0}/>
            </div>
          </div>
          <div style={{display:'block'}}>
            <div  className="presentation-container">
              <DialogComponent lines = {[current_scenario_data.name + ' is your ' + case_adjective + ' case as the fairness lawyer!\n' + explanation_info]}
                                person = {current_scenario_data.gender}
                                onFinished = {() => set_show_dialog(true)}/>
            </div>
          </div>
          <div className="scen-background-split">
            <div className="scen-background-left">
              {show_dialog &&
                <div className="dialog-box">
                    <DialogComponent person = {current_scenario_data.gender} lines={current_scenario_data.narrative} onFinished = {() => {set_show_next(true)}}/>
                    <div style = {{textAlign:'center', padding: '5%'}}>
                      {show_next && <NextButton to={`${props.parent_path}/evaluationpage`} text='CONTINUE'/>}
                    </div>
                </div>}
            </div>
          </div>

        </div>
      </div>
    )
  }
  else{
    return(
      <div className="overall-div">
        <PageHeader/>
        <div className='frame-below-header'>
          <div className='name-and-progress'>
            <div className="name-container">
              <p className="scen-back-name-header">
                <i>{current_scenario_data.name}</i>
              </p>
            </div>
            <div className="progressbar-container">
              <ProgressBarTriad scenario_count= {props.scenario_count} in_scenario_progress={0}/>
            </div>
          </div>
          <div style={{display:'block'}}>
            <div  className="presentation-container">
             <DialogComponent lines = {[current_scenario_data.name + ' is your ' + case_adjective + ' case as the fairness lawyer!\n', explanation_info]}
                              person = {current_scenario_data.gender}
                              onFinished = {() => setTimeout(function(){
                                              history.push(`${props.parent_path}/evaluationpage`)
                                            },    2000)}/>
            </div>
          </div>
          {show_next && <NextButton to={`${props.parent_path}/evaluationpage`} text='CONTINUE'/>}
        </div>
      </div>
    )
  }

};
const Button = styled.button`
  background-color: blue;
  color: white;
  font-size: 20px;
  padding: 10px 60px;
  border-radius: 5px;
  margin: 10px 0px;
  cursor: pointer;
`;
const ContinueButton = (props) => {
  const rewind = useRewind();
  const handleClick= () => {
    props.count_setter(props.count + 3);
  }
  return(
    <Button onClick={handleClick}>
      Go on...
    </Button>
    )
}


export default ScenarioBackgroundPage;
