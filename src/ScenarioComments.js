import React, {useEffect, Component, useGlobal, useState} from 'reactn';
import { useTracking } from 'react-tracking';
import './ScenarioComments.css';
import {NextButton, Button} from './PageComponents';
import {useRouteMatch, useHistory, Route, Link, Switch } from "react-router-dom";
import {SpeedoInTable, TriadExpanded} from './DatapointBackground.js';
import DialogComponent from './DialogComponent.js';
import styled from 'styled-components';
import ProgressBarTriad from './ProgressBarTriad';
import Arrow, { DIRECTION } from 'react-arrows'
import TextareaAutosize from 'react-textarea-autosize';
import { fetchApi } from './fetchApi';

const MoreButton = styled.button`
  display:inline-block;
  margin-left:auto;
  margin-right:auto;
  color: white;
  font-family: Consolas, Menlo, Monaco, Lucida Console, Liberation Mono, DejaVu Sans Mono, Bitstream Vera Sans Mono, Courier New, monospace, serif;
  font-size: calc(min(2.5vh, 30px));
  margin: 1em;
  background-color: black;
  border-radius: 10px;
  vertical-align: middle;
`;
export const TableDescriptionText = styled.button`
  color: white;
  font-family: Consolas, Menlo, Monaco, Lucida Console, Liberation Mono, DejaVu Sans Mono, Bitstream Vera Sans Mono, Courier New, monospace, serif;
  font-size: calc(min(2.5vh, 30px));
  margin: 1em;
  padding: 7px;
  background-color: #606060;
  border-radius: 10px;
  vertical-align: middle;
  display: table-cell;
  box-shadow: 4px 4px 50px rgba(0, 0, 0, 0.05);
  font-style: italic;

`;
export const ThinTableDescriptionText = styled.button`
  color: white;
  font-family: Consolas, Menlo, Monaco, Lucida Console, Liberation Mono, DejaVu Sans Mono, Bitstream Vera Sans Mono, Courier New, monospace, serif;
  font-size: calc(min(2vh, 20px));
  width: 150px;
  margin: 0.5em;
  padding: 2px;
  background-color: #606060;
  border-radius: 7px;
  vertical-align: middle;
  display: table-cell;
  box-shadow: 4px 4px 50px rgba(0, 0, 0, 0.05);
  font-style: italic;
`;

export const ValueText = styled.button`
  color: black;
  font-family: Consolas, Menlo, Monaco, Lucida Console, Liberation Mono, DejaVu Sans Mono, Bitstream Vera Sans Mono, Courier New, monospace, serif;
  font-size: calc(min(2.5vh, 30px));
  margin: 1em;
  background-color: white;
  border-radius: 25px;
  vertical-align: middle;
  display: table-cell;
  border: 5px solid black;
`;
const IndicationText = styled.button`
  color: black;
  font-family: Consolas, Menlo, Monaco, Lucida Console, Liberation Mono, DejaVu Sans Mono, Bitstream Vera Sans Mono, Courier New, monospace, serif;
  font-size: calc(min(2.5vh, 30px));
  margin: 1em;
  background-color: white;
  border-radius: 10px;
  vertical-align: middle;
  display: table-cell;
  border: 5px solid black;
`;
const ThinExplanatoryText = styled.button`
  color: black;
  font-family: Consolas, Menlo, Monaco, Lucida Console, Liberation Mono, DejaVu Sans Mono, Bitstream Vera Sans Mono, Courier New, monospace, serif;
  font-size: 1.0em;
  margin: 0.5em;
  background-color: white;
  border-radius: 10px;
  vertical-align: middle;
  display: table-cell;
  border: 3px dotted black;
`;
const ExplanatoryText = styled.button`
  color: black;
  font-family: Consolas, Menlo, Monaco, Lucida Console, Liberation Mono, DejaVu Sans Mono, Bitstream Vera Sans Mono, Courier New, monospace, serif;
  font-size: calc(min(2.5vh, 30px));
  margin: 1em;
  background-color: white;
  border-radius: 10px;
  vertical-align: middle;
  display: table-cell;
  border: 3px dotted black;
`;
export const Input = styled(TextareaAutosize)`
  font-family: Consolas, Menlo, Monaco, Lucida Console, Liberation Mono, DejaVu Sans Mono, Bitstream Vera Sans Mono, Courier New, monospace, serif;
  padding: 0.5em;
  margin: 0.5em;
  color: black;
  background-color: #FDFFD4;
  border: 4px solid black;
  border-radius: 5px;
  font-size: calc(10px + 1vmin);
  resize: vertical;

`;
const DescriptionText = styled.text`
  font-size: calc(10px + 1vmin);
  text-align: center;
  font-family: Consolas, Menlo, Monaco, Lucida Console, Liberation Mono, DejaVu Sans Mono, Bitstream Vera Sans Mono, Courier New, monospace, serif;
  display: inline-block;
  margin-left: auto;
  margin-right: auto;
  left: 50%;
`;


function ScenarioCommentsPage(props){
  const [user_path, set_user_path] = useGlobal("user_path");
  const [scenario_store, set_scenario_store] = useGlobal("scenario_store");
  const current_scenario_index = user_path[parseInt(parseInt(props.scenario_count) -1 )].scenario_index;
  const user_path_selection = user_path[parseInt(parseInt(props.scenario_count) -1 )];
  const is_narrative = user_path[parseInt(parseInt(props.scenario_count) -1 )].is_narrative;
  const current_scenario_data = scenario_store[current_scenario_index];

  const [show_rest, set_show_rest] = useState(false);

  const [input_main_text, set_input_main_text] = useState("");
  const [input_left_text, set_input_left_text] = useState("");
  const [input_right_text, set_input_right_text] = useState("");

  const [fairness_val, set_fairness_val] = useGlobal("most_recent_fairness");

  var fairness_text = "";
  if  (fairness_val > 70){
    fairness_text = "FAIR"
  }
  else if (fairness_val > 30){
    fairness_text = "NEUTRAL"
  }
  else{
    fairness_text = "UNFAIR"
  };

  var explanation_info = [];
  if (current_scenario_data.category == 'LOAN'){
    explanation_info = [
                          "You marked the algorithm's decision about " + current_scenario_data.name + ' as ' + fairness_text,
                          "Can you think of some particular reasons why the decision struck you as " + fairness_text + ' ?'
                        ]
  };
  var to_address = "";
  if (props.scenario_count == 1){
    to_address = ("/scenario".concat((parseInt(props.scenario_count) ).toString())).concat('/final_page');
  }
  else{
    to_address = ("/results_page")
  }
  if (is_narrative){
    return(
      <div className= "background-div">
        <Arrow
          className='arrow'
          from={{
            direction: DIRECTION.BOTTOM,
            node: () => document.getElementById('presentation'),
            translation: [0, 1],
          }}
          to={{
            direction: DIRECTION.TOP,
            node: () => document.getElementById('right-container'),
            translation: [0.0, -1],
          }}
        />
        <div>
          <div className='name-and-progress'>
            <div className="name-container">
              <p className="scen-back-name-header">
                <i>{current_scenario_data.name}</i>
              </p>
            </div>
            <div className="progressbar-container">
              <ProgressBarTriad scenario_count= {props.scenario_count} in_scenario_progress={2}/>
            </div>
          </div>
          <div id= 'presentation' className="presentation-container">
            <DialogComponent lines = {explanation_info}
                             onFinished = {() => {set_show_rest(true)}}/>
          </div>
        </div>
        {show_rest &&
        <>
          <div className= "scen-comm-split">
            <div className="scen-comm-left">
              <p className="scen-judg-name-header">
                <i>{current_scenario_data.name} - recap.</i>
              </p>
              <div>
                <NarrativeText narrative={current_scenario_data.narrative}/>
              </div>
              <p style={{ fontSize: "calc(10px + 1.5vmin)",
                          textAlign:"center",
                          fontFamily: "Consolas, Menlo, Monaco, Lucida Console, Liberation Mono, DejaVu Sans Mono, Bitstream Vera Sans Mono, Courier New, monospace, serif",
                          border: "3px solid black",
                          borderRadius: '10px',
                          display:'inline-block',
                          marginLeft: 'auto',
                          marginRight: 'auto',
                          left: '50%'
                        }}>
                Amongst the data about {current_scenario_data.name} that the algorithm used,
                <br />
                the following contributed the most to its decision:
              </p>
              <ExplainedTableDataPoints current_scenario = {current_scenario_data} user_path_selection={user_path_selection} item_indices = {user_path_selection.dp_selected} importance={"HIGH"}/>
              <AdditionalInformation current_scenario = {current_scenario_data} user_path_selection={user_path_selection} item_indices = {user_path_selection.dp_selected} importance={"LOW"}/>
            </div>
            <div id='right-container' className="scen-comm-right">
              <InputForms set_input_main_text={set_input_main_text} set_input_left_text={set_input_left_text} set_input_right_text={set_input_right_text}/>
            </div>
          </div>
          <NextPageButton style={{display:"inline-block"}} scenario_count={props.scenario_count} scenario_is_narrative={is_narrative} scenario_name={current_scenario_data.name} datapoints_selected={user_path_selection.dp_selected} input_main_text={input_main_text} input_left_text={input_left_text} input_right_text={input_right_text} to={to_address}/>
        </>
        }
      </div>
    )
  }
  else{
    return(
      <div className= "background-div">
        <div>
          <div className='name-and-progress'>
            <div className="name-container">
              <p className="scen-back-name-header">
                <i>{current_scenario_data.name}</i>
              </p>
            </div>
            <div className="progressbar-container">
              <ProgressBarTriad scenario_count= {props.scenario_count} in_scenario_progress={2}/>
            </div>
          </div>
          <div className="presentation-container">
            <DialogComponent lines = {explanation_info}
                             onFinished = {() => {set_show_rest(true)}}/>
          </div>
        </div>
        {show_rest &&
        <>
          <div className= "scen-comm-split">
            <div className="scen-comm-left">
              <p className="scen-judg-name-header">
                <i>{current_scenario_data.name} - recap.</i>
              </p>
              <p style={{ fontSize: "calc(10px + 1.5vmin)",
                          textAlign:"center",
                          fontFamily: "Consolas, Menlo, Monaco, Lucida Console, Liberation Mono, DejaVu Sans Mono, Bitstream Vera Sans Mono, Courier New, monospace, serif",
                          border: "3px solid black",
                          borderRadius: '10px',
                          display:'inline-block',
                          marginLeft: 'auto',
                          marginRight: 'auto',
                          left: '50%'
                        }}>
                Amongst the data about {current_scenario_data.name} that the algorithm used,
                <br />
                the following contributed the most to its decision:
              </p>
              <ExplainedTableDataPoints current_scenario = {current_scenario_data} user_path_selection={user_path_selection} item_indices = {user_path_selection.dp_selected} importance={"HIGH"} />
              <AdditionalInformation current_scenario = {current_scenario_data} user_path_selection={user_path_selection} item_indices = {user_path_selection.dp_selected} importance={"LOW"}/>

            </div>


            <div className="scen-comm-right">
              <InputForms set_input_main_text={set_input_main_text} set_input_left_text={set_input_left_text} set_input_right_text={set_input_right_text}/>
            </div>
          </div>
          <NextPageButton style={{display:"inline-block"}} scenario_count={props.scenario_count} scenario_is_narrative={is_narrative} scenario_name={current_scenario_data.name} datapoints_selected={user_path_selection.dp_selected} input_main_text={input_main_text} input_left_text={input_left_text} input_right_text={input_right_text} to={to_address}/>
        </>
        }
      </div>
    )
  }
};
export function InputForms(props){
  function handleChangeMain(event){
    props.set_input_main_text(event.target.value);
  }
  function handleChangeLeft(event){
    props.set_input_left_text(event.target.value);
  }
  function handleChangeRight(event){
    props.set_input_right_text(event.target.value);
  }
  function resize_box(){
    this.style.height = this.scrollHeight + "px"
  }
  return(
    <div style={{marginRight:"5%",marginLeft:"5%",marginTop:"1%", height:'100%'}}>

      <p style={{ fontSize: "calc(10px + 1vmin)",
                  textAlign:"center",
                  fontFamily: "Consolas, Menlo, Monaco, Lucida Console, Liberation Mono, DejaVu Sans Mono, Bitstream Vera Sans Mono, Courier New, monospace, serif",
                  display:'inline-block',
                  marginLeft: 'auto',
                  marginRight: 'auto',
                  left: '50%',
                  width: '100%'
                }}>
        <i>Why do you think this decision was fair / unfair?</i>
        <br /><br />
        I think it was <b>fair to deny</b> Martha the loan because  ...
      </p>
      <div className = "main-input">
        <Input  placeholder="all your thoughts can go here..." onChange={handleChangeMain} minRows="6"  wrap="soft" type="text" style={{width: "90%"}}/>
      </div>
      <div className = 'additional-comments'>
        <div className = 'top-split'>
          <div className= "left-text">
            <DescriptionText style={{height:"5%"}} >
              Information I think should have been used that wasn't includes ....
            </DescriptionText>
          </div>
          <div className ="right-text">
            <DescriptionText style={{height:"5%"}} >
              Information I think shouldn't have been used includes ....
            </DescriptionText>
          </div>
        </div>
        <div className = 'bottom-split'>
          <div className = 'left-input'>
            <Input placeholder="and here..." onChange={handleChangeLeft} minRows="6" wrap="soft" type="text" resize="vertical"  style={{ width: "80%"}}/>
          </div>
          <div className = "right-input">
            <Input placeholder="and here as well!" onChange={handleChangeRight} minRows="6"  wrap="soft" type="text" style={{ width: "80%"}}/>
          </div>
        </div>
      </div>
    </div>
  )
}
export function NarrativeText(props){
  const [show_full, set_show_full] = useState(false);
  const handleClickMore = () => {
    set_show_full(true);
  };
  const handleClickLess = () => {
    set_show_full(false);
  };
  var narrative = []
  if (show_full){
    for (let i = 0; i < props.narrative.length; i++){
      if (i < props.narrative.length -1){
        narrative.push(props.narrative[i]);
        narrative.push(<><br /><br /></>)
      }
      else{
        narrative.push(props.narrative[i]);
      }
    }
  }
  else {
    narrative = props.narrative.slice(0, 1);
  }

  return(
    <div>
      <div className = "narrative-box">
        <span style={{fontFamily: "Consolas, Menlo, Monaco, Lucida Console, Liberation Mono, DejaVu Sans Mono, Bitstream Vera Sans Mono, Courier New, monospace, serif",
                    fontSize:"1.2em",
                    color: 'black',
                    whiteSpace: "pre-line",
                    lineHeight: '1.3',
                    paddingTop: '1%',
                    paddingBottom: '1%'
                  }}>
                  {narrative}
        </span>
      </div>
      {(!(show_full)) && <MoreButton onClick={handleClickMore}>See more...</MoreButton>}
      {(show_full) && <MoreButton onClick={handleClickLess}>See less...</MoreButton>}
    </div>
  )
};



function AdditionalInformation(props){
  const len = Object.keys(props.current_scenario.datapoints).length;
  const extra_indices = [];
  const [show_more, set_show_more] = useState(false);
  const handleClickMore = () => {
    set_show_more(true);
  };
  const handleClickLess = () => {
    set_show_more(false);
  };
  //find indices that are the complement of the indices given as a prop
  for (let i = 0; i < len; i++){
    extra_indices.push(i)
  }
  if ((show_more)){
    return(
      <div>
        <table style={{marginLeft:"auto", marginRight:"auto", width:'100%'}}>
          <TriadExpanded thin = {props.thin} current_scenario={props.current_scenario} item_indices={extra_indices}show_importance ={true} importance={props.importance}/>
        </table>
        <div className="MoreButton-container">
          <MoreButton onClick = {handleClickLess}>
            Hide all the algorithm
            had access to
          </MoreButton>
        </div>
      </div>
    )
  } else{
    return(
      <div>
        <div className="MoreButton-container">
          <MoreButton onClick = {handleClickMore}>
            See again all info
            the algorithm had access to!
          </MoreButton>
        </div>
      </div>
    )
  }
}
function ExplainedTableDataPoints(props){
  var table =
    <table className = "explained-table">
        <tr>
          <th>
            <ExplanatoryText id="expl1">Information:</ExplanatoryText>
          </th>
          <th>
            <ExplanatoryText id="expl2">Importance:</ExplanatoryText>
          </th>
        </tr>
      <TableDataPoints thin = {props.thin} current_scenario = {props.current_scenario} user_path_selection={props.user_path_selection} item_indices = {props.item_indices} importance={props.importance}/>
    </table>
  if (props.thin){
    table =
      <table className = "explained-table">
        <tr>
          <th>
            <ThinExplanatoryText id="expl1">Information</ThinExplanatoryText>
          </th>
          <th>
            <ThinExplanatoryText id="expl2">Importance:</ThinExplanatoryText>
          </th>
        </tr>
        <TableDataPoints thin = {props.thin} current_scenario = {props.current_scenario} user_path_selection={props.user_path_selection} item_indices = {props.item_indices} importance={props.importance}/>
      </table>
  }
  return(
    <div>
      {table}
      {(!(props.thin)) &&
      <div>
        <Arrow
          className='arrow'
          from={{
            direction: DIRECTION.BOTTOM,
            node: () => document.getElementById('expl3'),
            translation: [0, 0],
          }}
          to={{
            direction: DIRECTION.TOP,
            node: () => document.getElementById('dp-importance'),
            translation: [0.0, 0.0],
          }}
        />
        <Arrow
          className='arrow'
          from={{
            direction: DIRECTION.BOTTOM,
            node: () => document.getElementById('expl1'),
            translation: [0, 0],
          }}
          to={{
            direction: DIRECTION.TOP,
            node: () => document.getElementById('dp-description'),
            translation: [0.0, 0.0],
          }}
        />
        <Arrow
          className='arrow'
          from={{
            direction: DIRECTION.BOTTOM,
            node: () => document.getElementById('expl2'),
            translation: [0, 0],
          }}
          to={{
            direction: DIRECTION.TOP,
            node: () => document.getElementById('dp-value'),
            translation: [0.0, 0.0],
          }}
        />
      </div>}
    </div>
  )
};
ExplainedTableDataPoints.defaultProps = {
  thin: false,
};
function TableDataPoints(props){
  var items = [];
  var first_row = true;
  const len = Object.keys(props.current_scenario.datapoints).length;
  for (let i = 0; i < len; i++){
    const key = Object.keys(props.current_scenario.datapoints)[i];
    if (props.item_indices.includes(i)){
      if (props.thin == false){
        if (first_row){
          items.push(
            <tr>
              <th>
                <SpeedoInTable id = 'dp-value' text_value={key + ": " + props.current_scenario.datapoints[key]} only_val={key == "Loan purpose"} indication={props.current_scenario.dp_indications[key]} />
              </th>
              <th>
                <ValueText>
                  <b>{"IMPORTANCE: " + props.importance}</b>
                </ValueText>
              </th>
            </tr>);
            console.log(props.current_scenario.datapoints[key]);
            first_row = false;
        }
        else{
          items.push(
            <tr>
              <th>
                <SpeedoInTable text_value={key + ": " + props.current_scenario.datapoints[key]} only_val={key == "Loan purpose"} indication={props.current_scenario.dp_indications[key]} />
              </th>
              <th>
                <ValueText>
                  <b>{"IMPORTANCE: " + props.importance}</b>
                </ValueText>
              </th>
            </tr>);
          }
      }
      else{
        if (first_row){
          items.push(
            <tr>
              <th>
                <SpeedoInTable thin={true} id = 'dp-value' text_value={key + ": " + props.current_scenario.datapoints[key]} only_val={key == "Loan purpose"} indication={props.current_scenario.dp_indications[key]} />
              </th>
              <th>
                <SpeedoInTable thin={true} id = 'dp-importance' text_value={""} only_gauge={true} indication= {props.importance}/>
              </th>
            </tr>);
            console.log(props.current_scenario.datapoints[key]);
            first_row = false;
        }
        else{
          items.push(
            <tr>
              <th>
                <SpeedoInTable thin={true} text_value={key + ": " + props.current_scenario.datapoints[key]} only_val={key == "Loan purpose"} indication={props.current_scenario.dp_indications[key]} />
              </th>
              <th>
                <SpeedoInTable thin={true} text_value={""} only_gauge={true} indication= {props.importance}/>
              </th>
            </tr>);
          }
      }
    };
  };
  return(

      items
  )
}

function NextPageButton(props){
  const { Track, trackEvent } = useTracking({ page: 'Scenario' });
  const [random_id, set_random_id] = useGlobal("random_id");
  const history = useHistory();
  const showNext = (to) => {
    history.push(to)
  };
  const handleClick = () => {
    const requestOptions = {
        headers:{
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify({
          'author_id': random_id,
          'main_comment': props.input_main_text,
          'should_used': props.input_left_text,
          'should_not_used': props.input_right_text,
          'scenario_count': props.scenario_count,
          'scenario_name': props.scenario_name,
          'is_narrative': props.scenario_is_narrative.toString(),
          'dp_selected': props.datapoints_selected.toString()
        })
    };
    console.log(requestOptions.body);
    fetchApi('/send_comments', requestOptions);

    trackEvent({
      'author_id': random_id,
      'main_comment': props.input_main_text,
      'should_used': props.input_left_text,
      'should_not_used': props.input_right_text,
      'scenario_count': props.scenario_count,
      'scenario_name': props.scenario_name,
      'is_narrative': props.scenario_is_narrative.toString(),
      'dp_selected': props.datapoints_selected.toString()
    });
    showNext(props.to);
  }
  return(
    <Button onClick={handleClick}>
      Continue
    </Button>
  );
}
export {AdditionalInformation, ExplainedTableDataPoints};
export default ScenarioCommentsPage;
