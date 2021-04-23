import React from 'react';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import './ProgressBarTriad.css';


export default function ProgressBarTriad(props){
  var percentage_1 = 0;
  var percentage_2 = 0;
  var percentage_3 = 0;
  var percentage_4 = 0;
  var percentage_5 = 0;
  var percentage_6 = 0;
  var percentage_7 = 0;
  var percentage_8 = 0;

  var cur_progress =0;
  if (props.in_scenario_progress==0){
    cur_progress = 0;
  };
  if (props.in_scenario_progress==1){
    cur_progress = 33;
  };
  if (props.in_scenario_progress==2){
    cur_progress = 66;
  };
  if (props.in_scenario_progress==3){
    cur_progress = 100;
  };
  if (props.scenario_count == 1){
    percentage_1 = cur_progress;
    percentage_2 = 0;
    percentage_3 = 0;
    percentage_4 = 0;
    percentage_5 = 0;
    percentage_6 = 0;
    percentage_7 = 0;
    percentage_8 = 0;
  };
  if (props.scenario_count == 2){
    percentage_1 = 100;
    percentage_2 = cur_progress;
    percentage_3 = 0;
    percentage_4 = 0;
    percentage_5 = 0;
    percentage_6 = 0;
    percentage_7 = 0;
    percentage_8 = 0;
  };
  if (props.scenario_count == 3){
    percentage_1 = 100;
    percentage_2 = 100;
    percentage_3 = cur_progress;
    percentage_4 = 0;
    percentage_5 = 0;
    percentage_6 = 0;
    percentage_7 = 0;
    percentage_8 = 0;
  };
  if (props.scenario_count == 4){
    percentage_1 = 100;
    percentage_2 = 100;
    percentage_3 = 100;
    percentage_4 = cur_progress;
    percentage_5 = 0;
    percentage_6 = 0;
    percentage_7 = 0;
    percentage_8 = 0;
  };
  if (props.scenario_count == 5){
    percentage_1 = 100;
    percentage_2 = 100;
    percentage_3 = 100;
    percentage_4 = 100;
    percentage_5 = cur_progress;
    percentage_6 = 0;
    percentage_7 = 0;
    percentage_8 = 0;
  };
  if (props.scenario_count == 6){
    percentage_1 = 100;
    percentage_2 = 100;
    percentage_3 = 100;
    percentage_4 = 100;
    percentage_5 = 100;
    percentage_6 = cur_progress;
    percentage_7 = 0;
    percentage_8 = 0;
  };
  if (props.scenario_count == 7){
    percentage_1 = 100;
    percentage_2 = 100;
    percentage_3 = 100;
    percentage_4 = 100;
    percentage_5 = 100;
    percentage_6 = 100;
    percentage_7 = cur_progress;
    percentage_8 = 0;
  };
  if (props.scenario_count == 8){
    percentage_1 = 100;
    percentage_2 = 100;
    percentage_3 = 100;
    percentage_4 = 100;
    percentage_5 = 100;
    percentage_6 = 100;
    percentage_7 = 100;
    percentage_8 = cur_progress;
  };
  return(
    <div className="all-next-to-each-other">
      <>
        <p style={{display: "inline-block", marginRight: "10px",
                   fontFamily: 'Menlo, Consolas, Monaco, Lucida Console, Liberation Mono, DejaVu Sans Mono, Bitstream Vera Sans Mono, Courier New, monospace, serif',
                   fontSize: '1.2em'}}>
          <i>Progress: </i>
        </p>
        <div>
          <div className="progress-unit" >
            <CircularProgressbar
              value={percentage_1}
              text={`${percentage_1}%`}
              background
              backgroundPadding={6}
              styles={buildStyles({
                backgroundColor: "#E1AD01",
                textSize: '26px',
                pathColor:'white',
                textColor: 'white',

                trailColor: 'transparent'
              })}
            />
          </div>
          <div className="progress-unit" >
            <CircularProgressbar
              className="progress-unit"
              value={percentage_2}
              text={`${percentage_2}%`}
              background
              backgroundPadding={6}
              styles={buildStyles({
                backgroundColor: "#E1AD01",
                textSize: '26px',
                pathColor:'white',
                textColor: 'white',

                trailColor: 'transparent'
              })}
            />
          </div>
          <div className="progress-unit">
            <CircularProgressbar
              className="progress-unit"
              value={percentage_3}
              text={`${percentage_3}%`}
              background
              backgroundPadding={6}
              styles={buildStyles({
                backgroundColor: "#E1AD01",
                textSize: '26px',
                pathColor:'white',
                textColor: 'white',

                trailColor: 'transparent'
              })}
            />
          </div>
          <div className="progress-unit">
            <CircularProgressbar
              className="progress-unit"
              value={percentage_4}
              text={`${percentage_4}%`}
              background
              backgroundPadding={6}
              styles={buildStyles({
                backgroundColor: "#E1AD01",
                textSize: '26px',
                pathColor:'white',
                textColor: 'white',

                trailColor: 'transparent'
              })}
            />
          </div>
          <div className="progress-unit">
            <CircularProgressbar
              className="progress-unit"
              value={percentage_5}
              text={`${percentage_5}%`}
              background
              backgroundPadding={6}
              styles={buildStyles({
                backgroundColor: "#E1AD01",
                textSize: '26px',
                pathColor:'white',
                textColor: 'white',

                trailColor: 'transparent'
              })}
            />
          </div>
          <div className="progress-unit">
            <CircularProgressbar
              className="progress-unit"
              value={percentage_6}
              text={`${percentage_6}%`}
              background
              backgroundPadding={6}
              styles={buildStyles({
                backgroundColor: "#E1AD01",
                textSize: '26px',
                pathColor:'white',
                textColor: 'white',

                trailColor: 'transparent'
              })}
            />
          </div>
        </div>
      </>
    </div>
  )
}
