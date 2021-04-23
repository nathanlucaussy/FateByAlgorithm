import React, {useState} from 'reactn';
import {Fade} from 'react-reveal';
import './DatapointBackground.css'
import {TableDescriptionText, ValueText} from './ScenarioComments.js';
import {WindupChildren, Pace} from 'windups';
import GaugeChart from 'react-gauge-chart';
import styled, { keyframes } from "styled-components";
import {Flash} from "react-animations";
import arrow_img from './Graphics/arrow_image.png'

const FlashAnimation = keyframes`${Flash}`;
const FlashDiv = styled.div`
  animation: infinite 5s ${FlashAnimation};
`;
export const TightTableDescriptionText = styled.button`
  color: white;
  font-family: Consolas, Menlo, Monaco, Lucida Console, Liberation Mono, DejaVu Sans Mono, Bitstream Vera Sans Mono, Courier New, monospace, serif;
  font-size: 1.2em;
  margin: 0.5em;
  padding: 4px;
  background-color: #606060;
  border-radius: 10px;
  vertical-align: middle;
  display: table-cell;
  box-shadow: 4px 4px 50px rgba(0, 0, 0, 0.05);
  font-style: italic;
  text-align: center;
`;

export const TightValueText = styled.button`
  color: black;
  font-family: Consolas, Menlo, Monaco, Lucida Console, Liberation Mono, DejaVu Sans Mono, Bitstream Vera Sans Mono, Courier New, monospace, serif;
  font-size: 1.4em;
  margin: 0.2em;
  background-color: white;
  border-radius: 25px;
  vertical-align: middle;
  display: table-cell;
  border: 5px solid black;
`;
export function Speedo(props){
  function DisplayValue(val) {
    return(props.indication)
  };
  console.log(props.text_value)
  var level = 0;
  if (props.indication == "LOW" || props.indication == "COMMON"){
    level = 0.25;
  }
  else if (props.indication == "AVERAGE") {
    level = 0.5;
  }
  else{
    level = 0.8;
  }
  if (props.thin){
    if (props.only_val || props.indication == "N/A"){
      return(
        <div className = "only-value">
          <ValueText style={{marginTop: "0px"}}><b>{props.text_value}</b></ValueText>
        </div>
      );
    }
    else if (props.only_gauge){
      return(
        <GaugeChart style={{width: '150px', position: 'relative', display: 'inline-block'}} percent={level} arcWidth={0.25}  nrOfLevels={30} formatTextValue={DisplayValue} textColor={'black'} colors={['#E1AD01',  '#ff741a', '#bf0000']}/>
      );
    }
    else{
      return(
        <div className= 'speedo-split'>
          <TightValueText><b>{props.text_value}</b></TightValueText>
          <div className = "gaugechart-container">
            <GaugeChart style={{width: '150px', position: 'relative', display: 'inline-block'}} percent={level} arcWidth={0.25} nrOfLevels={30} formatTextValue={DisplayValue} textColor={'black'} colors={['#E1AD01',  '#ff741a', '#bf0000']}/>
          </div>
        </div>
      );
    }
  }
  else{
    if (props.only_val || props.indication == "N/A"){
      return(
        <div className = "only-value">
          <ValueText style={{marginTop: "0px"}}><b>{props.text_value}</b></ValueText>
        </div>
      );
    }
    else if (props.only_gauge){
      return(
        <GaugeChart style={{position: 'relative', display: 'inline-block'}} percent={level} arcWidth={0.25}  nrOfLevels={30} formatTextValue={DisplayValue} textColor={'black'} colors={['#E1AD01',  '#ff741a', '#bf0000']}/>
      );
    }
    else{
      return(
        <div className= 'speedo-split'>
          <TightValueText><b>{props.text_value}</b></TightValueText>
          <div className = "gaugechart-container">
            <GaugeChart style={{position: 'relative', display: 'inline-block'}} percent={level} arcWidth={0.25} nrOfLevels={30} formatTextValue={DisplayValue} textColor={'black'} colors={['#E1AD01',  '#ff741a', '#bf0000']}/>
          </div>
        </div>
      );
    }
  }
};

export function SpeedoInTable(props){
  function DisplayValue(val) {
    return(props.indication)
  };
  console.log(props.text_value)
  var level = 0;
  if (props.indication == "LOW" || props.indication == "COMMON"){
    level = 0.25;
  }
  else if (props.indication == "AVERAGE") {
    level = 0.5;
  }
  else{
    level = 0.8;
  }
  if (props.thin){
    if (props.only_val || props.indication == 'N/A'){
      return(
        <ValueText style={{marginTop: "0px"}}><b>{props.text_value}</b></ValueText>
      );
    }
    else if (props.only_gauge){
      return(
        <div className = "table-gaugechart-container">
          <GaugeChart style={{width: '150px', position: 'relative', display: 'inline-block'}} nrOfLevels={20} percent={level} arcWidth={0.17} width={200} formatTextValue={DisplayValue} textColor={'black'} colors={['#E1AD01',  '#F4976C', '#bf0000']}/>
        </div>
      );
    }
    else{
      return(
        <div>
          <div className = "table-gaugechart-container">
            <GaugeChart style={{width: '150px', marginLeft: 'auto', marginRight: 'auto', marginBottom : '2%', position: 'relative', display: 'inline-block'}} nrOfLevels={20} percent={level} arcWidth={0.17} width={200} formatTextValue={DisplayValue} textColor={'black'} colors={['#E1AD01',  '#F4976C', '#bf0000']}/>
            <TightValueText style={{marginLeft: 'auto', marginRight:'auto', display: 'block', marginTop: "0px"}}><b>{props.text_value}</b></TightValueText>
          </div>
        </div>
      );
    }
  }
  else{
    if (props.only_val || props.indication == 'N/A'){
      return(
        <ValueText style={{marginTop: "0px"}}><b>{props.text_value}</b></ValueText>
      );
    }
    else if (props.only_gauge){
      return(
        <div className = "table-gaugechart-container">
          <GaugeChart style={{width: '220px', position: 'relative', display: 'inline-block'}} nrOfLevels={20} percent={level} arcWidth={0.17} width={200} formatTextValue={DisplayValue} textColor={'black'} colors={['#E1AD01',  '#F4976C', '#bf0000']}/>
        </div>
      );
    }
    else{
      return(
        <div>
          <div className = "table-gaugechart-container">
            <GaugeChart style={{width: '220px', marginLeft: 'auto', marginRight: 'auto', marginBottom: '2%', position: 'relative', display: 'inline-block'}} nrOfLevels={20} percent={level} arcWidth={0.17} width={200} formatTextValue={DisplayValue} textColor={'black'} colors={['#E1AD01',  '#F4976C', '#bf0000']}/>
            <TightValueText style={{maxWidth: '400px', marginLeft: 'auto', marginRight:'auto', display: 'block', marginTop: "0px"}}><b>{props.text_value}</b></TightValueText>
          </div>
        </div>
      );
    }
  }
};
Speedo.defaultProps = {
  only_val: false,
  only_gauge: false,
  thin: false
}
SpeedoInTable.defaultProps = {
  only_val: false,
  only_gauge: false,
  thin: false
}
function InfoAndSpeedo(props){
  var right_item;
  if (props.info == "Loan purpose") {
    right_item = <ValueText> <b>{props.value}</b></ValueText>
  }
  else{
    right_item = <SpeedoInTable thin={true} text_value = {props.value} indication = {props.indication}/>
  }
  return(
      <tr>
        <th>
          <TightTableDescriptionText><b>{props.info}</b></TightTableDescriptionText>
        </th>
        <th className='speedometer_cell'>
          {right_item}
        </th>
      </tr>
  );
}

export default function TableInfoSpeedos(props){
  const len = Object.keys(props.item_indices).length;
  const items = []
  for (let i = 0; i < len; i=i+2){
    const key_1 = Object.keys(props.current_scenario.datapoints)[props.item_indices[i]];
    if (i == (len-1)){
      items.push(
        <tr>
          <th>
            <InfoAndSpeedo info={key_1} value={props.current_scenario.datapoints[key_1]} indication={props.current_scenario.dp_indications[key_1]}/>
          </th>
        </tr>
      );
    }
    else{
      const key_2 = Object.keys(props.current_scenario.datapoints)[props.item_indices[i+1]];
      items.push(
        <tr>
          <th style={{'border':'2px dotted black', 'borderRadius':'30px'}}>
            <InfoAndSpeedo info={key_1} value={props.current_scenario.datapoints[key_1]} indication={props.current_scenario.dp_indications[key_1]}/>
          </th>
          <th style={{'border':'2px dotted black', 'borderRadius':'30px'}}>
            <InfoAndSpeedo info={key_2} value={props.current_scenario.datapoints[key_2]} indication={props.current_scenario.dp_indications[key_2]}/>
          </th>
        </tr>
      );
    }
  }
  return(
    <table style={{marginLeft: 'auto', marginRight:'auto', borderSpacing: 'calc(15px)'}}>
      {items}
    </table>
  );
}


export function Triad(props){
  const [show_speedo, set_show_speedo] = useState(true);
  const [cur_val, set_cur_val] = useState('<- click on a category');
  const [cur_indic, set_cur_indic] = useState("LOW");

  const show_vals = (key) => {
    set_cur_val(key+': ' + props.current_scenario.datapoints[key]);
    console.log(cur_val);
    set_cur_indic(props.current_scenario.dp_indications[key]);
    set_show_speedo(true);
  };

  const keys = [];
  const items = [];
  for (let i = 0; i < props.item_indices.length; i++){
    keys.push(Object.keys(props.current_scenario.datapoints)[props.item_indices[i]]);
    items.push(<TightTableDescriptionText onClick={() => show_vals(keys[i])}>
                <b>{keys[i]}</b>
               </TightTableDescriptionText>);
  }

  return(
    <div className='dp-overall'>
      <div className="explainers">
        <div className="categories">
          <text className= "explanation-text">
            Browse through all the categories:
          </text>
        </div>
        <div className="values">
          <text className= "explanation-text">
            Values:
          </text>
        </div>
      </div>

      <div className="information">
        <div className="dp-back-split">
          <div className="dp-back-left">
            {items}
          </div>
          <div className="dp-back-right">
            {show_speedo && <Speedo text_value={cur_val} indication={cur_indic}/>}
            {props.show_importance && <Speedo text_value={'IMPORTANCE: ' + props.importance} indication={props.importance}/>}
          </div>
        </div>
      </div>
    </div>
  );
}
Triad.defaultProps = {
  show_importance:false
}

export function TriadExpanded(props){
  const [show_speedo, set_show_speedo] = useState(true);
  const [cur_val, set_cur_val] = useState('<- click on a category');
  const [cur_indic, set_cur_indic] = useState("LOW");

  const show_vals = (key) => {
    set_cur_val(key+': ' + props.current_scenario.datapoints[key]);
    set_cur_indic(props.current_scenario.dp_indications[key]);
    set_show_speedo(true);
  };
  const keys = [];
  const items = [];
  for (let i = 0; i < props.item_indices.length; i++){
    keys.push(Object.keys(props.current_scenario.datapoints)[props.item_indices[i]]);
    items.push(<TightTableDescriptionText onClick={() => show_vals(keys[i])}>
                <b>{keys[i]}</b>
               </TightTableDescriptionText>);
  }


  return(
    <div className='dp-overall'>
      <div className="explainers">
        <div className="categories">
          <text className= "explanation-text">
            Select a category:
          </text>
        </div>
        <div className="values">
          <text className= "explanation-text">
            Values:
          </text>
        </div>
      </div>

      <div className="information">
        <div className="dp-back-split">
          <div className="dp-back-left">
            {items}
          </div>
          <div className="dp-back-right">
            {show_speedo && <Speedo thin={props.thin} text_value={cur_val} indication={cur_indic}/>}
            {props.show_importance && <Speedo thin={props.thin} text_value={'IMPORTANCE: ' + props.importance} indication={props.importance}/>}
          </div>
        </div>
      </div>
    </div>
  );
}
TriadExpanded.defaultProps = {
  show_importance: false
}
export function TriadCollection(props){
  const [click_counter, set_click_counter] = useState(0);
  const decrement_counter = () => {
    set_click_counter(click_counter - 3);
  }
  const increment_counter = () => {
    console.log(click_counter);
    set_click_counter(click_counter + 3);
  };
  const len = Object.keys(props.item_indices).length;
  const triads = [];
  const triad_classes = [];
  const triad_parked_classes = [];

  for (let i = 0; i < len; i = i + 3){

    triads.push(
                <div className={(i < click_counter ) ? "class passed"
                                : (i == click_counter)? "class visible"
                                : "class notyet"}>
                  <Triad current_scenario={props.current_scenario} item_indices={props.item_indices.slice(i, Math.min(len, i+3))}/>
                </div>
                );
  };

  return(
    <div className = 'triads-overall-container'>
      <div className='triads-container'>
        <div className="toggle-button">
          <button  className="toggle-button" onClick={increment_counter} value='show'>Show More</button>
        </div>
        {triads}
        <br /><br />
        <br /><br />
      </div>
      {(click_counter > 0) &&
      <div className="left-arrow-container">
        <button style={{height: '100%'}}><img style={{height: '100%', transform: 'rotate(180deg)'}} onClick= {decrement_counter} src={arrow_img}/></button>
      </div>}
      {(click_counter <= len - 3) &&
      <div className="right-arrow-container">
        <button style={{height: '100%'}}><img style={{height: '100%'}} onClick= {increment_counter} src={arrow_img}/></button>
      </div>}
    </div>
  );
}

export function TableCollection(props){
  const [click_counter, set_click_counter] = useState(0);
  const decrement_counter = () => {
    set_click_counter(click_counter - 4);
  }
  const increment_counter = () => {
    console.log(click_counter);
    set_click_counter(click_counter + 4);
  };
  const len = Object.keys(props.item_indices).length;
  const items = [];
  const triad_classes = [];
  const triad_parked_classes = [];
  const [has_finished, set_has_finished] = useState(false);
  if ((!(has_finished)) && click_counter >= len-4){
    props.onFinished();
    set_has_finished(true);
  };
  for (let i = 0; i < len; i = i + 4){

    items.push(
                <div key={'table_'+ i.toString()}
                     className={(i < click_counter ) ? "class passed"
                                : (i == click_counter)? "class visible"
                                : "class notyet"}>
                  <div className = "tableunit">
                    <TableInfoSpeedos current_scenario={props.current_scenario} item_indices={props.item_indices.slice(i, Math.min(len, i+4))}/>
                  </div>
                </div>
                );
  };

  return(
    <div className = 'triads-overall-container'>
      <div className='triads-container'>
        {items}
        <br /><br />
        <br /><br />
      </div>

      <div className="left-arrow-container">
        {(click_counter > 0) &&
        <button style={{height: '100%'}}><img style={{height: '100%', transform: 'rotate(180deg)'}} onClick= {decrement_counter} src={arrow_img}/></button>
        }
      </div>
      <div className="pagecount">
        <p style={{fontSize: '1.5em', border: '5px dotted black', borderRadius: '20px'}}>
          {(Math.floor(click_counter / 4) + 1).toString() + '/' + (Math.ceil(len / 4)).toString()}
        </p>
      </div>

      <div className="right-arrow-container">
        {(click_counter < len - 4) &&
          <button style={{height: '100%'}}>
              <img className = "blink_me" style={{height: '100%'}} onClick= {increment_counter} src={arrow_img}/>
          </button>
        }
      </div>
    </div>
  );
}

export function SlidingRows(props){
  const row_height = 120;
  const [click_counter, set_click_counter] = useState(0);
  const increment_counter = () => {
    console.log(click_counter);
    set_click_counter(click_counter + 1);
  };
  const len = Object.keys(props.item_indices).length;
  const rows = [];
  const row_classes = [];
  const parked_classes = [];
  for (let i = 0; i < len; i++){
    const key = Object.keys(props.current_scenario.datapoints)[props.item_indices[i]];
    row_classes.push(
      {
        position: 'absolute',
        display:'inline-block',
        top: ((i*row_height).toString()+'px'),
        left: '100%',
        transition: '3s'
      }
    );
    parked_classes.push(
      {
        position: 'absolute',
        display:'inline-block',
        top: ((i*row_height).toString()+'px'),
        left: '0px',
      }
    );
    rows.push(
      <div style={(click_counter > i) ? parked_classes[i]: row_classes[i]}>
        <InfoAndSpeedo info={key} value={props.current_scenario.datapoints[key]} indication={props.current_scenario.dp_indications[key]}/>
      </div>
    );
  }

  return(
    <div className="split">
      <div className="left">
        {rows}
      </div>
      <div className="right">
        <button className ='toggleButton' onClick={increment_counter} value='show'>Show More</button>
      </div>
    </div>
  );
}
