import React, {useEffect, Component, useGlobal, useState} from 'reactn';
import { useTracking } from 'react-tracking';
import {Button, FairButton, NextButton, PageHeader} from './PageComponents';
import {useRouteMatch, useHistory, Route, Link, Switch } from "react-router-dom";
import {ExplainedTableDataPoints, Input, AdditionalInformation, InputForms, NarrativeText} from './ScenarioComments.js';
import {Fade} from "react-reveal";
import {Triad} from './DatapointBackground.js';
import DialogComponent, {useFixedPositionWindup} from './DialogComponent.js';
import ProgressBarTriad from './ProgressBarTriad.js';
import './ScenarioJudging.css';
import {WindupChildren} from 'windups';
import styled from 'styled-components';
import Timer from 'react-compound-timer';
import { fetchApi } from './fetchApi';
// Using an ES6 transpiler like Babel
import Slider from '@appigram/react-rangeslider';
// To include the default styles
import '@appigram/react-rangeslider/lib/index.css';



function ScenarioJudgingPage(props){

  const [user_path, set_user_path] = useGlobal("user_path");
  const [scenario_store, set_scenario_store] = useGlobal("scenario_store");
  const current_scenario_index = user_path[parseInt(parseInt(props.scenario_count) -1 )].scenario_index;
  const user_path_selection = user_path[parseInt(parseInt(props.scenario_count) -1 )];
  const is_narrative = user_path[parseInt(parseInt(props.scenario_count) -1 )].is_narrative;
  const current_scenario_data = scenario_store[current_scenario_index];
  const [use_thin, set_use_thin] = useState(false);
  const [fairness_val, set_fairness_val] = useState(50);
  const [most_recent_fairness, set_most_recent_fairness] = useState(0);
  const [scen_prog, set_scen_prog] = useState(1);
  const [show_page_0, set_show_page_0] = useState(true);
  const [show_page_1, set_show_page_1] = useState(false);

  var table_class_name = "";
  var left_class_name = "";
  var right_class_name = "";
  if (show_page_0){
    table_class_name = "tables-container thin";
    left_class_name = "scen-recap-left full";
    right_class_name = "scen-comm-right invis";
  }
  else{
    table_class_name = "tables-container wide";
    left_class_name = "scen-recap-left fifty";
    right_class_name = "scen-comm-right vis";
  };
  const [show_rest, set_show_rest] = useState(false);

  const [item_indices, set_item_indices] = useState(user_path_selection.dp_selected);
  var explanation_info = [];
  if (current_scenario_data.category == 'LOAN'){
    if (props.scenario_count > 2){
      explanation_info = [current_scenario_data.name + "'s application was " + current_scenario_data.outcome + " by the algorithm."
                          + "Specifically, PayDay lenders' algorithm used the following pieces of information about " + current_scenario_data.name + " to decide this."
                          ]
    }
    else{
      explanation_info = [current_scenario_data.name + "'s application was " + current_scenario_data.outcome + " by the algorithm.",
                          " Specifically, PayDay lenders' algorithm used the following pieces of information about " + current_scenario_data.name + " to decide this."
                          ]
    }
  }
  else{
    if (props.scenario_count > 2){
      explanation_info = ["" + current_scenario_data.name + " was classified as "
                          + current_scenario_data.outcome + " by the algorithm."
                          + " Specifically, the algorithm used the following pieces of information about " + current_scenario_data.name + " to decide this.",
                        ];
    }
    else{
      explanation_info = ["" + current_scenario_data.name + " was classified as "
                          + current_scenario_data.outcome+" by the algorithm.",
                          "Specifically, the algorithm used the following pieces of information about " + current_scenario_data.name + " to decide this.",
                        ];
    }

  }
  if (is_narrative){
    return(
      <div className = "background-div">
        <div className='name-and-progress'>
          <span style={{fontSize: "1.5vw"}}>
            <div className="name-container">
              <p className="scen-back-name-header">
                <i>{current_scenario_data.name}</i>
              </p>
            </div>
          </span>
          <div className="progressbar-container">
            <ProgressBarTriad scenario_count= {props.scenario_count} in_scenario_progress={scen_prog}/>
          </div>
        </div>
        <div id = 'comments' className="presentation-container">
          <DialogComponent lines = {explanation_info}
                           onFinished = {() => {set_show_rest(true)}}/>
        </div>
        {show_rest &&
        <div className= "scen-comm-split">
          <div className={left_class_name}>
            {show_page_1 &&
            <div>
              <p className="scen-back-name-header">
                <span style={{fontSize: '0.8em'}}>
                  <i>{current_scenario_data.name} Case Files:</i>
                </span>
              </p>
              <p style={{color: '#000C66', fontSize: '1.6em', borderTop: '5px solid black'}}>
                {current_scenario_data.name}'s story:
              </p>
              <div>
                <NarrativeText narrative={current_scenario_data.narrative}/>
              </div>
            </div>}
            <div>
              {show_page_0 &&
              <div>
                <p style={{marginLeft: 'auto', marginRight: 'auto', display: 'inline-block', padding: '5px', border: '4px solid black', borderRadius: '10px',textAlign:'center', fontSize: '1.4em'}}>
                  <b>Features that weighed most in the decision:</b>
                </p>
                <div className={table_class_name}>
                  <ExplainedTableDataPoints thin= {use_thin} className="tables" current_scenario = {current_scenario_data} user_path_selection={user_path_selection} item_indices = {user_path_selection.dp_selected} show_importance={true} importance={"HIGH"}/>
                </div>
                <br /><br />
              </div>}
              {show_page_1 && <p style={{ color: '#000C66', fontSize: '1.6em', borderTop: '5px solid black'}}>
                What the algorithm <b>*knows*</b> about {current_scenario_data.name}:
              </p>}
              <div className={table_class_name}>
                <AdditionalInformation thin={use_thin} className="tables" current_scenario = {current_scenario_data} user_path_selection={user_path_selection} item_indices = {user_path_selection.dp_selected} importance={"LOW"}/>
              </div>

              {show_page_0 &&
              <Fade delay={400}>
              <div>
                <p style={{
                          marginLeft:'auto',
                          marginRight: 'auto',
                          width: '60%',
                          padding: "1%",
                          fontSize: "calc(10px + 1.5vmin)",
                          textAlign:"center",
                          fontFamily: "Consolas, Menlo, Monaco, Lucida Console, Liberation Mono, DejaVu Sans Mono, Bitstream Vera Sans Mono, Courier New, monospace, serif"}}>
                  <b><i>Based on the information used by the algorithm and what you know about {current_scenario_data.name}, how fair do you believe this decision to be?</i></b>
                </p>
                <div style={{paddingBottom: "10%"}}>
                  <div style={{display: 'inline-block', border: '5px solid black', borderRadius: '30px', padding: '20px'}}>
                    <FairnessButtons  set_page_change = {() => {set_scen_prog(2); set_show_page_0(false);  set_show_page_1(true); set_use_thin(true);}}  set_most_recent_fairness = {set_most_recent_fairness} scenario_count={props.scenario_count} scenario_name={current_scenario_data.name} scenario_is_narrative={is_narrative} datapoints_selected={user_path_selection.dp_selected}/>
                  </div>
                </div>
              </div>
              </Fade>}
            </div>
          </div>

          <div className={right_class_name}>
            {show_page_1 &&
            <CommentsDialog current_scenario = {current_scenario_data} scenario_count = {props.scenario_count} most_recent_fairness = {most_recent_fairness} is_narrative = {is_narrative} item_indices = {user_path_selection.dp_selected}/>}
          </div>
        </div>}
      </div>
    )
  }
  else{
      return(
        <div className = "background-div">
          <div className='name-and-progress'>
            <span style={{fontSize: "1.5vw"}}>
              <div className="name-container">
                <p className="scen-back-name-header">
                  <i>{current_scenario_data.name}</i>
                </p>
              </div>
            </span>
            <div className="progressbar-container">
              <ProgressBarTriad scenario_count= {props.scenario_count} in_scenario_progress={scen_prog}/>
            </div>
          </div>
          <div id = 'comments' className="presentation-container">
            <DialogComponent lines = {explanation_info}
                             onFinished = {() => {set_show_rest(true)}}/>
          </div>
          {show_rest &&
          <div className= "scen-comm-split">
            <div className={left_class_name}>
              {show_page_1 &&
              <div>
                <p className="scen-back-name-header">
                  <span style={{fontSize: '0.8em'}}>
                    <i>{current_scenario_data.name} Case Files:</i>
                  </span>
                </p>
              </div>}
              <div>
                {show_page_0 &&
                <div>
                  <p style={{marginLeft: 'auto', marginRight: 'auto', padding:'5px', display: 'inline-block', border: '4px solid black', borderRadius: '10px',textAlign:'center', fontSize: '1.2em'}}>
                    <b>Features that weighed most in the decision:</b>
                  </p>
                  <div className={table_class_name}>
                    <ExplainedTableDataPoints thin= {use_thin} className="tables" current_scenario = {current_scenario_data} user_path_selection={user_path_selection} item_indices = {user_path_selection.dp_selected} show_importance={true} importance={"HIGH"}/>
                  </div>
                  <br /><br />
                </div>}
                {show_page_1 && <p style={{ color: '#000C66', fontSize: '1.6em', borderTop: '5px solid black'}}>
                  What the algorithm <b>*knows*</b> about {current_scenario_data.name}:
                </p>}
                <div className={table_class_name}>
                  <AdditionalInformation thin={use_thin} className="tables" current_scenario = {current_scenario_data} user_path_selection={user_path_selection} item_indices = {user_path_selection.dp_selected} importance={"LOW"}/>
                </div>

                {show_page_0 &&
                <Fade delay={400}>
                <div>
                  <p style={{
                            marginLeft:'auto',
                            marginRight: 'auto',
                            width: '60%',
                            padding: "1%",
                            fontSize: "calc(10px + 1.5vmin)",
                            textAlign:"center",
                            fontFamily: "Consolas, Menlo, Monaco, Lucida Console, Liberation Mono, DejaVu Sans Mono, Bitstream Vera Sans Mono, Courier New, monospace, serif"}}>
                    <b><i>Based on the information used by the algorithm and what you know about {current_scenario_data.name}, how fair do you believe this decision to be?</i></b>
                  </p>
                  <div style={{paddingBottom: "10%"}}>
                    <div style={{display: 'inline-block', border: '5px solid black', borderRadius: '30px', padding: '20px'}}>
                      <FairnessButtons  set_page_change = {() => {set_show_page_0(false); set_scen_prog(2); set_show_page_1(true); set_use_thin(true);}}  set_most_recent_fairness = {set_most_recent_fairness} scenario_count={props.scenario_count} scenario_name={current_scenario_data.name} scenario_is_narrative={is_narrative} datapoints_selected={user_path_selection.dp_selected}/>
                    </div>
                  </div>
                </div>
                </Fade>}
              </div>
            </div>

            <div className={right_class_name}>
              {show_page_1 &&
              <CommentsDialog current_scenario = {current_scenario_data} scenario_count = {props.scenario_count} most_recent_fairness = {most_recent_fairness} is_narrative = {is_narrative} item_indices = {user_path_selection.dp_selected}/>}
            </div>
          </div>}
        </div>
      )
  }
};
/**
 * Shuffles array in place. ES6 version
 * @param {Array} a items An array containing the items.
 */
function shuffle(a) {
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
};

class ChoiceSlider extends Component {
  constructor (props, context) {
    super(props, context)
    this.state = {
      slider_val : this.props.fairness_val
    }
  }


  handleChange = (value) => {
    this.setState({
      slider_val: value
    })
    this.props.set_fairness_val(value);
  };

  render () {
    const { slider_val } = this.state

    const labels = {
      0: 'Very Unfair',
      25: 'Unfair',
      50: 'Neutral',
      75: 'Fair',
      100: 'Very Fair'
    }


    return (
      <div className='slider-choice'>
        <Slider
          value={slider_val}
          orientation='horizontal'
          labels={labels}
          handleLabel={""}
          onChange={this.handleChange}
        />
      </div>
    )
  }
}

export const DatapointChoice = styled.button`
  color: black;
  font-family: Consolas, Menlo, Monaco, Lucida Console, Liberation Mono, DejaVu Sans Mono, Bitstream Vera Sans Mono, Courier New, monospace, serif;
  font-size: 1.4em;
  margin: 1em;
  background-color: white;
  border-radius: 10px;
  vertical-align: middle;
  display: table-cell;
  border: 5px solid black;
`;
export const DatapointChoiceSmall = styled.button`
  color: black;
  font-family: Consolas, Menlo, Monaco, Lucida Console, Liberation Mono, DejaVu Sans Mono, Bitstream Vera Sans Mono, Courier New, monospace, serif;
  font-size: 1.2em;
  margin: 0.85em;
  background-color: white;
  border-radius: 10px;
  vertical-align: middle;
  display: table-cell;
  border: 2px solid black;
`;

function CommentsDialog(props){
  const [dp_keys, set_dp_keys] = useState([]);
  const [categories, set_categories] = useGlobal("categories");
  const [first_dps, set_first_dps] = useState([]);
  const [second_dps, set_second_dps] = useState([]);
  const history = useHistory();
  const [random_id, set_random_id] = useGlobal("random_id")
  useEffect(() => {

    for (let i=0; i<props.item_indices.length; i++){
      const dp_key = Object.keys(props.current_scenario.datapoints)[props.item_indices[i]];
      first_dps.push(<DatapointChoice onClick={() => {chose_datapoint_first(dp_key, random_id, props.scenario_count, props.current_scenario.name, props.is_narrative, props.item_indices, history)}}><b>{dp_key}</b></DatapointChoice>)
    }
    for (let i=0; i<Object.keys(props.current_scenario.datapoints).length; i++){
      if (!(props.item_indices.includes(i))){
        const dp_key = Object.keys(props.current_scenario.datapoints)[i];
        second_dps.push(<DatapointChoiceSmall onClick={() => {chose_datapoint_second(dp_key, random_id, props.scenario_count, props.current_scenario.name, props.is_narrative, props.item_indices, history)}}><b>{dp_key}</b></DatapointChoiceSmall>)
      }
    }
  }, []);
  //page 1 states
  const [show_first_page, set_show_first_page] = useState(true);
  const [show_second_page, set_show_second_page] = useState(false);
  const [show_datapoints, set_show_datapoints] = useState(false);
  const [show_dialog_2, set_show_dialog_2] = useState(false);
  const [show_judge_reason, set_show_judge_reason] = useState(false);
  const [selected_category_1, set_selected_category_1] = useState(false);
  const [selected_category_2, set_selected_category_2] = useState(false);
  const [show_text_boxes, set_show_text_boxes] = useState(false);
  const [show_end_first_comments, set_show_end_first_comments] = useState(false);
  const [show_new_comments_button, set_show_new_comments_button] = useState(false);
  const [clicked_first_continue, set_clicked_first_continue] = useState(false);
  const [show_first_dps, set_show_first_dps] = useState(true);
  const [show_second_dps, set_show_second_dps] = useState(false);
  const [show_second_dps_prompt, set_show_second_dps_prompt] = useState(false);

  //page 2 states
  const [show_extraneous_text_box, set_show_extraneous_text_box] = useState(false);
  const [selected_extraneous_category, set_selected_extraneous_category] = useState("");
  const [extraneous_prompt_text, set_extraneous_prompt_text] = useState("");
  const [show_extraneous_info_choices, set_show_extraneous_info_choices] = useState(false);

  const [category_fairness_comment_1, set_category_fairness_comment_1] = useState("");
  const [category_fairness_comment_2, set_category_fairness_comment_2] = useState("");
  const [category_fairness_comment_3, set_category_fairness_comment_3] = useState("");

  const [extraneous_comment, set_extraneous_comment] = useState("");

  const [completed_text_box_1, set_completed_text_box_1] = useState(false);
  const [completed_text_box_2, set_completed_text_box_2] = useState(false);
  const [completed_text_box_3, set_completed_text_box_3] = useState(false);
  const [completed_text_box_4, set_completed_text_box_4] = useState(false);

  var page = {};
  var reason_complement = "";

  var fairness_choice = "NEUTRAL";
  var dialog_1_lines = [""];
  var second_dp_lines = "";
  var dialog_2_lines = [""];
  var dialog_3_lines = [""];

  var dialog_1_style = {};
  var dialog_2_style = {};
  var datapoints_style = {};
  var reason_instructions_style = {};

  const [textbox1, set_textbox1] = useState("starting");
  const [textbox2, set_textbox2] = useState("starting");
  const [textbox3, set_textbox3] = useState("starting");


  function chose_datapoint_first(dp_key, random_id, scenario_count, scenario_name, scenario_is_narrative, datapoints_selected, history){
    set_show_second_dps_prompt(true);
    datapoints_style =  {filter: 'opacity(50%)'}
    set_selected_category_1(dp_key);
  }
  function chose_datapoint_second(dp_key, random_id, scenario_count, scenario_name, scenario_is_narrative, datapoints_selected, history){
    set_show_dialog_2(true);
    datapoints_style =  {filter: 'opacity(50%)'}
    set_selected_category_2(dp_key);
    if ((scenario_count != 2) && (scenario_count != 5)){
      const requestOptions = {
          headers:{
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          method: 'POST',
          body: JSON.stringify({
            'user_id': random_id,
            'scenario_count': scenario_count,
            'scenario_name': scenario_name,
            'is_narrative': scenario_is_narrative.toString(),
            'dp_selected': datapoints_selected.toString(),
            'chosen_dp_1': selected_category_1,
            'chosen_dp_2': dp_key
          })
      };
      fetchApi('/send_short_comments', requestOptions);
      history.push(("/scenario".concat((parseInt(scenario_count) ).toString())).concat('/final_page'))
    }
  }

  if (props.scenario_count <= 1){
    if (props.most_recent_fairness < 50){
      fairness_choice = "UNFAIR";

      dialog_1_lines = "You marked the decision as " + fairness_choice + ", but we're not convinced & we ask you to explain how you made your mind up.\n\n Of the following datapoints the algorithm actually used, which do you think it was LEAST justified in using?";
      dialog_2_lines = ["Why is it *unfair* to use the '" + String.prototype.toUpperCase.apply(selected_category_1) + "' info? Convince me with as many reasons as you can! "];
      second_dp_lines = "Which info do you think it should have used instead?"
    }
    else if (props.most_recent_fairness > 50){
      fairness_choice = "FAIR";
      dialog_1_lines = "You marked the decision as " + fairness_choice + ", but we're not convinced & we ask you to explain how you made your mind up.\n\nOf the following datapoints the algorithm actually used, which do you think it was MOST justified in using?";
      dialog_2_lines = ["Why is it *fair* to use the '" + String.prototype.toUpperCase.apply(selected_category_1) + "' info? Convince me with as many reasons as you can! "]
      second_dp_lines = "Which additional info do you think the algorithm should have used?"
    }
    else{
      fairness_choice = "NEUTRAL";

      dialog_1_lines = "You marked the decision as " + fairness_choice + ", but we're not convinced & we ask you to explain how you made your mind up.\n\nOf the following datapoints the algorithm actually used, which do you think it was LEAST justified in using?";
      dialog_2_lines = ["Why is it *unfair* to use the '" + String.prototype.toUpperCase.apply(selected_category_1) + "' info? Convince me with as many reasons as you can! "];
      second_dp_lines = "Which info do you think it should have used instead?"
    }
  }
  else{
    if (props.most_recent_fairness <= 50){
      fairness_choice = "UNFAIR";

      dialog_1_lines = "Of the following datapoints the algorithm actually used, which do you think it was LEAST justified in using?";
      dialog_2_lines = ["Why is it *unfair* to use the '" + String.prototype.toUpperCase.apply(selected_category_1) + "' info? Convince me with as many reasons as you can! "];
      second_dp_lines = "Which info do you think it should have used instead?"
    }
    else if (props.most_recent_fairness > 50){
      fairness_choice = "FAIR";
      dialog_1_lines = "Of the following datapoints the algorithm actually used, which do you think it was MOST justified in using?";
      dialog_2_lines = [ "Why is it *fair* to use the '" + String.prototype.toUpperCase.apply(selected_category_1) + "' info? Convince me with as many reasons as you can! "]
      second_dp_lines = "Which additional info do you think the algorithm should have used?"

    }
    else{
      fairness_choice = "NEUTRAL";

      dialog_1_lines = "Of the following datapoints the algorithm actually used, which do you think it was LEAST justified in using?";
      dialog_2_lines = ["Why is it *unfair* to use the '" + String.prototype.toUpperCase.apply(selected_category_1) + "' info? Convince me with as many reasons as you can! "];
      second_dp_lines = "Which info do you think it should have used instead?"
    }
  }

  function change_page_comments(){
    set_show_first_page(false);
    set_show_second_page(true);
    var element_to_scroll_to = document.getElementById('comments');
    element_to_scroll_to.scrollIntoView();
  }

  if (props.current_scenario.category == "LOAN"){
    reason_complement = "applied for a loan?";
  }
  else{
    reason_complement = "committed a crime?";
  }

  var page_2_instructions = []
  var page_2_instructions_init = ""
  if (props.scenario_count >2){
    page_2_instructions_init = ""
  }
  else{
    page_2_instructions_init = "⟸ There's one more thing I'd need help with. \n"
  }
  if (props.is_narrative){
    if (props.current_scenario.category == "LOAN"){
      page_2_instructions =
              [page_2_instructions_init+"Is there any part of " + props.current_scenario.name + "'s story which you think is relevant to the loan decision, that the algorithm does not know about?",
               "Would you ask for more info about:"]}
    else{
      page_2_instructions =
              [page_2_instructions_init + "Is there anything about " + props.current_scenario.name + "'s story which you think is relevant to their criminal risk, that the algorithm does not know about?",
               "Would you ask for more info about:"]
    };
  }
  else{
    if (props.current_scenario.category == "LOAN"){
      page_2_instructions =
              [page_2_instructions_init + "Is there anything about " + props.current_scenario.name + " which you think is relevant to the loan decision, that the algorithm does not know about?",
               "Would you ask for more info about:"]}
    else{
      page_2_instructions =
              [page_2_instructions_init + "Is there anything about " + props.current_scenario.name + " which you think is relevant to their criminal risk, that the algorithm does not know about?",
               "Would you ask for more info about:"]
    };
  }

  function chose_extraneous(category){
    set_show_extraneous_text_box(true);
    set_selected_extraneous_category(category);
    if (category == 'upbringing'){
        set_extraneous_prompt_text("How does knowing more about "+props.current_scenario.name+"’s upbringing make the decision fairer?")
    }
    else if (category == 'employment'){
      set_extraneous_prompt_text("How does knowing more about "+props.current_scenario.name+"’s employment make the decision fairer?")
    }

    else if (category == 'future'){
      set_extraneous_prompt_text("How does knowing more about "+props.current_scenario.name+"’s future plans make the decision fairer?")
    }
    else if (category == 'finances'){
      set_extraneous_prompt_text( "How does knowing more about "+props.current_scenario.name+"’s finances make the decision fairer?")
    }
    else if (category == "other"){
      set_extraneous_prompt_text("What would you like to know about " + props.current_scenario.name + " which would help you in making a fairer decision?")
    }
    else if (category == "friends"){
      set_extraneous_prompt_text("How does knowing more about "+props.current_scenario.name+"’s friends, family & neighbourhood make the decision fairer?")
    }
    else if (category == "criminal_history"){
        set_extraneous_prompt_text("How does knowing more about "+props.current_scenario.name+"’s criminal history make the decision fairer?")
    }
  }

  function handleChange_first_reason(event){
    set_category_fairness_comment_1(event.target.value)
    if (event.target.value.split(' ').length > 4){
        set_completed_text_box_1(true)
    }
    if (event.target.value.split(' ').length == 5){
      const element_to_scroll_to = document.getElementById('savebutton');
      if (element_to_scroll_to){
        element_to_scroll_to.scrollIntoView();
      }
    }
  }
  function handleChange_second_reason(event){
    set_textbox1("grayed")
    set_category_fairness_comment_2(event.target.value)
    if (event.target.value.split(' ').length > 4){
        set_completed_text_box_2(true)
    }
    if (event.target.value.split(' ').length == 5){
      const element_to_scroll_to = document.getElementById('continuebutton');
      if (element_to_scroll_to){
        element_to_scroll_to.scrollIntoView();
      }
    }
  }
  function handleChange_third_reason(event){
    set_textbox2("grayed")
    set_category_fairness_comment_3(event.target.value)
    if (event.target.value.split(' ').length > 4){
        set_completed_text_box_3(true)
    }
  }


  function handleChange_extraneous(event){
    set_extraneous_comment(event.target.value)
    if (event.target.value.split(' ').length > 4){
        set_completed_text_box_4(true)
    }
  }
  const first_dps_prompt = useFixedPositionWindup(dialog_1_lines, () => {dialog_1_style = {filter: 'opacity(50%)'}; set_show_first_dps(true)})
  const second_dps_prompt = useFixedPositionWindup(second_dp_lines, () => { set_show_second_dps(true)})
  const extraneous_prompt = useFixedPositionWindup(extraneous_prompt_text)
  if (show_first_page){
    page =
      <div>
        <div className='prompt'  style = {dialog_1_style}>
          {first_dps_prompt}
        </div>
        {show_first_dps &&
        <div style = {datapoints_style}>
          {first_dps}
        </div>}
        {show_second_dps_prompt &&
        <div className='prompt'>
          {second_dps_prompt}
        </div>}
        {show_second_dps && show_second_dps_prompt &&
        <div style = {datapoints_style}>
          {second_dps}
        </div>}
        {show_dialog_2 &&
        <span style={{textAlign:'left'}}>
          <DialogComponent style = {dialog_2_style} lines={dialog_2_lines} onFinished= {() => { set_show_text_boxes(true); dialog_2_style = {filter: 'opacity(50%)'}}}/>
        </span>}
        {show_text_boxes &&
        <div style ={{paddingBottom: '20px' }}>
          <div>
            <div style= {{display: 'block', width: '100%'}}>
              <Timer initialTime={120000}
                     direction="backward"
                     checkpoints={[
                                   {
                                       time: 2,
                                       callback: () => change_page_comments(),
                                   }]}>
                {() => (
                    <div className="timer-box">
                      <React.Fragment>
                          <b>
                          {"TIMER: "}
                          <Timer.Minutes />{":"}
                          <Timer.Seconds /></b>
                      </React.Fragment>
                    </div>
                )}
              </Timer>
            </div>
          </div>
          {(props.most_recent_fairness > 50) && <span style={{textAlign:'left'}} className = 'prompt '><p> I think it's fair to use that information because...</p></span>}
          {(props.most_recent_fairness <= 50) && <span style={{textAlign:'left'}} className = 'prompt '><p> I think it's unfair to use that information because...</p></span>}
          <Input className = {textbox1} placeholder="all your thoughts can go here... (5 words min.)"  onChange = {handleChange_first_reason} minRows="1"  wrap="soft" type="text" style={{width: "90%"}}/>
          <br />
          {completed_text_box_1 &&
            <div>
              <span style={{textAlign:'left'}} className = 'prompt '><p> and because...</p></span>
              <Input className = {textbox2} placeholder="all your thoughts can go here... (5 words min.)"  onChange = {handleChange_second_reason} minRows="1"  wrap="soft" type="text" style={{width: "90%"}}/>
              <br />
            </div>
          }
          {(completed_text_box_1 && (!(completed_text_box_2))&& (!(clicked_first_continue))) &&
          <div style ={{display: "block"}}>
            <Button id = "savebutton" onClick={change_page_comments}>
              Save answers
              & continue
            </Button>
          </div>}
          {(completed_text_box_2 && (!(clicked_first_continue))) &&
          <div style={{display:'block'}}>
            <Button id = "continuebutton" onClick={change_page_comments}>CONTINUE</Button>
          </div>}
        </div>}
      </div>
  }
  else{
    page =
      <div>
        <span style={{textAlign:'left'}}>
          <DialogComponent id = 'page_2_dialog'
                           lines = {page_2_instructions}
                           onFinished = {() => {set_show_extraneous_info_choices(true)}}/>
        </span>
        {show_extraneous_info_choices &&
          <ExtraneousChoices category={props.current_scenario.category} current_scenario = {props.current_scenario}chose_extraneous = {chose_extraneous}/>
        }
        {show_extraneous_text_box && (!(selected_extraneous_category == "none")) &&
        <div>
          <Timer initialTime={60000}
                 direction="backward"
                 checkpoints={[
                               {
                                   time: 2,
                                   callback: () => {SecondTimerEnd(("/scenario".concat((parseInt(props.scenario_count) ).toString())).concat('/final_page'),
                                                                  props.scenario_count,
                                                                  props.current_scenario.name,
                                                                  props.is_narrative,
                                                                  props.item_indices,
                                                                  selected_category_1,
                                                                  selected_category_2,
                                                                  category_fairness_comment_1,
                                                                  category_fairness_comment_2,
                                                                  category_fairness_comment_3,
                                                                  selected_extraneous_category,
                                                                  extraneous_comment,
                                                                  random_id,
                                                                  history)},
                               }]}>
            {() => (
                <div className="timer-box">
                  <React.Fragment>
                      <b>
                      {"TIMER: "}
                      <Timer.Minutes />{":"}
                      <Timer.Seconds /></b>
                  </React.Fragment>
                </div>
            )}
          </Timer>
          <span style={{textAlign:'center'}} className = 'prompt '><p> {extraneous_prompt}</p></span>
          <Input  placeholder="all your thoughts can go here... (5 words minimum)" onChange={handleChange_extraneous} minRows="1"  wrap="soft" type="text" style={{width: "90%"}}/>
        </div>}
        <div style={{marginBottom: '40px'}}>
        {(completed_text_box_4 || (selected_extraneous_category == "none")) &&
          <NextPageButton to={("/scenario".concat((parseInt(props.scenario_count) ).toString())).concat('/final_page')}
                          scenario_count={props.scenario_count}
                          scenario_name={props.current_scenario.name}
                          is_narrative = {props.is_narrative}
                          datapoints_selected = {props.item_indices}
                          selected_category_1 = {selected_category_1}
                          selected_category_2 = {selected_category_2}
                          category_fairness_comment_1 = {category_fairness_comment_1}
                          category_fairness_comment_2 = {category_fairness_comment_2}
                          category_fairness_comment_3 = {category_fairness_comment_3}
                          selected_extraneous_category = {selected_extraneous_category}
                          extraneous_comment = {extraneous_comment}
                          />
        }
        </div>
      </div>
    }
    return(
      <div style={{scrollBehaviour: 'smooth'}}>
        {page}
      </div>
    )
};

function SecondTimerEnd(to, scenario_count,
                        scenario_name, is_narrative,
                        datapoints_selected, selected_category_1, selected_category_2,
                        category_fairness_comment_1, category_fairness_comment_2,
                        category_fairness_comment_3,
                        selected_extraneous_category,
                        extraneous_comment,
                        random_id,
                        history
                      ){
                        const showNext = (to) => {
                          history.push(to)
                        };
                        const requestOptions = {
                            headers:{
                              'Accept': 'application/json',
                              'Content-Type': 'application/json'
                            },
                            method: 'POST',
                            body: JSON.stringify({
                              //identifying information
                              'user_id': random_id,
                              'scenario_count': scenario_count,
                              'scenario_name': scenario_name,
                              'is_narrative': is_narrative.toString(),
                              'dp_selected': datapoints_selected.toString(),
                              'chosen_dp_1': selected_category_1,
                              'chosen_dp_2': selected_category_2,
                              'dp_fairness_comment_1': category_fairness_comment_1,
                              'dp_fairness_comment_2': category_fairness_comment_2,
                              'dp_fairness_comment_3': category_fairness_comment_3,
                              'chosen_extraneous_dp': selected_extraneous_category,
                              'extraneous_comment': extraneous_comment
                            })
                        };

                        fetchApi('/send_comments', requestOptions);
                        showNext(to);
                       };

//props: to, scenario_count, scenario_name, scenario_is_narrative, datapoints_selected
//props contd: selected_category, category_fairness_comment, selected_extraneous_category, extraneous_comment
function NextPageButton(props){
  const history = useHistory();
  const [random_id, set_random_id] = useGlobal("random_id");
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
          //identifying information
          'user_id': random_id,
          'scenario_count': props.scenario_count,
          'scenario_name': props.scenario_name,
          'is_narrative': props.is_narrative.toString(),
          'dp_selected': props.datapoints_selected.toString(),
          'chosen_dp_1': props.selected_category_1,
          'chosen_dp_2': props.selected_category_2,
          'dp_fairness_comment_1': props.category_fairness_comment_1,
          'dp_fairness_comment_2': props.category_fairness_comment_2,
          'dp_fairness_comment_3': props.category_fairness_comment_3,

          'chosen_extraneous_dp': props.selected_extraneous_category,
          'extraneous_comment': props.extraneous_comment
        })
    };


    fetchApi('/send_comments', requestOptions);
    showNext(props.to);

  }
  return(
    <Button onClick={handleClick}>
      Continue
    </Button>
  );
}

function FairnessButton(props){
  const history = useHistory();
  const [random_id, set_random_id] = useGlobal("random_id");
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
          'user_id': random_id,
          'scenario_count': props.scenario_count,
          'fairness_val': props.fairness_val,
          'scenario_name': props.scenario_name,
          'is_narrative': props.scenario_is_narrative.toString(),
          'dp_selected': props.datapoints_selected.toString()
        })
    };
    props.set_page_change()
    fetchApi('/send_fairness', requestOptions);
    props.set_most_recent_fairness(props.fairness_val);
    var element_to_scroll_to = document.getElementById('comments');
    element_to_scroll_to.scrollIntoView();
  };

  return(
    <FairButton onClick={handleClick}>
      <b>{props.text}</b>
    </FairButton>
  );

};
function FairnessButtons(props){
  return(
    <table className='fairness-buttons-table'>
      <tr>
        <th>
          <FairnessButton text = {"Very Unfair"} set_page_change = {props.set_page_change}
                          set_most_recent_fairness = {props.set_most_recent_fairness}
                          scenario_count={props.scenario_count} scenario_name={props.scenario_name}
                          scenario_is_narrative={props.scenario_is_narrative}
                          datapoints_selected={props.datapoints_selected}
                          fairness_val = {0}/>
        </th>
        <th>
          <FairnessButton text = {"Unfair"} set_page_change = {props.set_page_change}
                       set_most_recent_fairness = {props.set_most_recent_fairness}
                       scenario_count={props.scenario_count} scenario_name={props.scenario_name}
                       scenario_is_narrative={props.scenario_is_narrative}
                       datapoints_selected={props.datapoints_selected}
                       fairness_val = {25}/>
        </th>
        <th>
          <FairnessButton text = {"Neutral"} set_page_change = {props.set_page_change}
                           set_most_recent_fairness = {props.set_most_recent_fairness}
                           scenario_count={props.scenario_count} scenario_name={props.scenario_name}
                           scenario_is_narrative={props.scenario_is_narrative}
                           datapoints_selected={props.datapoints_selected}
                           fairness_val = {50}/>
        </th>
        <th>
           <FairnessButton text = {"Fair"} set_page_change = {props.set_page_change}
                           set_most_recent_fairness = {props.set_most_recent_fairness}
                           scenario_count={props.scenario_count} scenario_name={props.scenario_name}
                           scenario_is_narrative={props.scenario_is_narrative}
                           datapoints_selected={props.datapoints_selected}
                           fairness_val = {75}/>
        </th>
        <th>
           <FairnessButton text = {"Very Fair"} set_page_change = {props.set_page_change}
                           set_most_recent_fairness = {props.set_most_recent_fairness}
                           scenario_count={props.scenario_count} scenario_name={props.scenario_name}
                           scenario_is_narrative={props.scenario_is_narrative}
                           datapoints_selected={props.datapoints_selected}
                           fairness_val = {100}/>
        </th>
      </tr>
    </table>
  );
};
function ExtraneousChoices(props){
  if (props.category == "LOAN") {
    return(
      <div className = 'extraneous-information'>
        <tr>
          <th>
            <DatapointChoice onClick={() => {props.chose_extraneous("upbringing")}}>{props.current_scenario.name}'s upbringing?</DatapointChoice>

          </th>
          <th>
            <DatapointChoice onClick={() => {props.chose_extraneous("finances")}}>{props.current_scenario.name}'s finances?</DatapointChoice>
          </th>
          <th>
            <DatapointChoice onClick={() => {props.chose_extraneous("employment")}}>{props.current_scenario.name}'s employment?</DatapointChoice>
          </th>

        </tr>
        <tr>
          <th>
            <DatapointChoice onClick={() => {props.chose_extraneous("future")}}>{props.current_scenario.name}'s future plans?</DatapointChoice>
          </th>
          <th>
            <DatapointChoice onClick={() => {props.chose_extraneous("friends")}}>{props.current_scenario.name}'s friends, neighbourhood & family?</DatapointChoice>
          </th>
          <th>
            <DatapointChoice onClick={() => {props.chose_extraneous("other")}}>something else?</DatapointChoice>
          </th>
          <th>
            <DatapointChoice onClick={() => {props.chose_extraneous("none")}}>nothing at all - the algorithm has all it needs</DatapointChoice>
          </th>
        </tr>
      </div>
    )
  }
  else{
    return(
      <div className = 'extraneous-information'>
        <tr>
          <th>
            <DatapointChoice onClick={() => {props.chose_extraneous("upbringing")}}>{props.current_scenario.name}'s upbringing?</DatapointChoice>
          </th>
          <th>
            <DatapointChoice onClick={() => {props.chose_extraneous("finances")}}>{props.current_scenario.name}'s finances?</DatapointChoice>
          </th>
          <th>
            <DatapointChoice onClick={() => {props.chose_extraneous("employment")}}>{props.current_scenario.name}'s employment?</DatapointChoice>
          </th>
          <th>
            <DatapointChoice onClick={() => {props.chose_extraneous("criminal_history")}}>{props.current_scenario.name}'s criminal history?</DatapointChoice>
          </th>
        </tr>
        <tr>
          <th>
            <DatapointChoice onClick={() => {props.chose_extraneous("future")}}>{props.current_scenario.name}'s future plans?</DatapointChoice>
          </th>
          <th>
            <DatapointChoice onClick={() => {props.chose_extraneous("friends")}}>{props.current_scenario.name}'s friends, neighbourhood & family?</DatapointChoice>
          </th>
          <th>
            <DatapointChoice onClick={() => {props.chose_extraneous("other")}}>something else?</DatapointChoice>
          </th>
          <th>
            <DatapointChoice onClick={() => {props.chose_extraneous("none")}}>nothing at all - the algorithm has all it needs</DatapointChoice>
          </th>
        </tr>
      </div>
    )
  }
}

export default ScenarioJudgingPage;
