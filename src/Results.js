import React, { useState, useEffect, useGlobal } from 'reactn';
import logo from './logo.svg';
import DialogComponent from './DialogComponent.js';
import HorizontalGauge from './Gauge.js';
import ProgressBarTriad from './ProgressBarTriad.js';
import YodaImg from './Graphics/yoda_filled.jpeg';
import HumansImg from './Graphics/humans.jpeg';
import TerminatorImg from './Graphics/terminator.png';
import {TwitterShareButton, FacebookShareButton, FacebookIcon, TwitterIcon} from 'react-share';
import './Results.css';

function KindnessGauge(props){
  return(
    <div >
      <p style={{ fontSize: "calc(10px + 1.0vmin)",
                  textAlign:"center",
                  fontFamily: "Consolas, Menlo, Monaco, Lucida Console, Liberation Mono, DejaVu Sans Mono, Bitstream Vera Sans Mono, Courier New, monospace, serif",
                  whiteSpace: "pre-line",
                }}>
        <b><i>
        {props.caption}
        </i></b>
      </p>
      <div>
        <div className="ok-container">
          <p className='ok'>
          <b>
            {props.right_text}
          </b>
          </p>
        </div>
        <div style={{display: 'inline-block', position:  'relative', left: '0%', width: '75%'}}>
          <HorizontalGauge ticks={[{label: '0', value: 0}, {label: '50', value: 50}, {label: '100', value: 100}]} height={70} width={(window.innerWidth)*0.315} min={0} max={10} value1={props.value_others} value2={props.value_you}/>
        </div>
        <div className="not-ok-container">
          <p className= 'not-ok'>
          <b>
            {props.left_text}
          </b>
          </p>
        </div>
      </div>
    </div>
  );
}

function ResultsPage() {
  const [random_id, set_random_id] = useGlobal("random_id");
  const [overall_kindness_avg, set_overall_kindness_avg] = useState(0);
  const [kindness_narrative_avg, set_kindness_narrative_avg] = useState(0);
  const [kindness_datapoint_avg, set_kindness_datapoint_avg] = useState(0);
  const [group_info_avg, set_group_info_avg] = useState(0);
  const [esoteric_info_avg, set_esoteric_info_avg] = useState(0);
  const [past_info_avg, set_past_info_avg] = useState(0);

  const [overall_kindness, set_overall_kindness] = useState(0);
  const [kindness_narrative, set_kindness_narrative] = useState(0);
  const [kindness_datapoint, set_kindness_datapoint] = useState(0);
  const [group_info, set_group_info] = useState(0);
  const [esoteric_info, set_esoteric_info] = useState(0);
  const [past_info, set_past_info] = useState(0);

  const [user_category, set_user_category] = useState(0);
  const [title_msg, set_title_msg] = useState("");
  useEffect(() => {
    const requestOptions = {
        headers:{
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify({
          'user_id': random_id,
        })
    };
    fetch('/results_backend_avg').then(res => res.json()).then(data => {
      set_overall_kindness_avg(data.overall_kindness);
      set_kindness_narrative_avg(data.kindness_narrative);
      set_kindness_datapoint_avg(data.kindness_datapoint);
      set_group_info_avg(data.group_info);
      set_esoteric_info_avg(data.esoteric_info);
      set_past_info_avg(data.past_info);
    });
    fetch('/results_backend_self', requestOptions).then(res => res.json()).then(data => {
      set_overall_kindness(data.overall_kindness);
      set_kindness_narrative(data.kindness_narrative);
      set_kindness_datapoint(data.kindness_datapoint);
      set_group_info(data.group_info);
      set_esoteric_info(data.esoteric_info);
      set_past_info(data.past_info);
      set_user_category(data.user_category);
    });

    if (user_category == 0){
      set_title_msg("Robots love me! ")
    }
    else if (user_category == 1){
      set_title_msg("Are algorithms fair? I don't know. ")
    }
    else{
      set_title_msg("Algorithms are unfair! ")
    }
  }, []);


  console.log(user_category)
  return (
    <div className = "background-div">
      <div className='name-and-progress'>
        <div className="name-container">
          <p className="scen-back-name-header">
            <i>Fate by Algorithm</i>
          </p>
        </div>
        <div className="progressbar-container">
        </div>
      </div>
      <p style={{
                fontSize: "calc(10px + 1.5vmin)",
                textAlign:"center",
                fontFamily: "Consolas, Menlo, Monaco, Lucida Console, Liberation Mono, DejaVu Sans Mono, Bitstream Vera Sans Mono, Courier New, monospace, serif"}}>
        <span className="highlight"><b><i>Your algorithmic justice report!</i></b></span>
        <br /><br />
        <div style={{backgroundColor: '#8ECFD8', textAlign: 'center', padding: '0.5%', width: '80%', border: '5px solid black', borderRadius: '40px', marginLeft:'auto', marginRight:'auto'}}>
          <div className = 'results-l'>
            {(user_category == 0) && <img style={{border: '3px solid black', borderRadius: '20px', width: '50%'}} src={TerminatorImg}/> }
            {(user_category == 1) && <img style={{border: '3px solid black', borderRadius: '20px', width: '50%'}} src={YodaImg}/> }
            {(user_category == 2) && <img style={{border: '3px solid black', borderRadius: '20px', width: '50%'}} src={HumansImg}/> }
          </div>
          <div className = 'results-r'>
            {(user_category == 0) &&
              <p>
                <b>Terminator loves you!</b> <br /><br />
                Compared to others, you more often think that decisions by algorithms are FAIR.<br />
                You're going to let the robots run us over!
              </p>
             }
             {(user_category == 1) &&
               <p>
                 <b>You simply just can't make your mind up between<br />
                 robots being FAIR, UNFAIR, or UN-UN-FAIR!</b><br />
                 (or maybe you're just very wise and balanced in your judgement...)
               </p>
             }
             {(user_category == 2) &&
               <p>
                  <b>You just can't get enough of humans!</b>
                  <br /><br />Protector of the People - you really want to protect us against the robot overlords!
               </p>
              }
          </div>
          <div id = "single-box" className="overall-kindness-box">
            <KindnessGauge caption={"Your kindness vs others!"} left_text={"MEAN!"}  right_text = {"SUPERKIND!"} value_others={overall_kindness_avg} value_you={overall_kindness}/>
          </div>
        </div>
        <div className = "sharing">
          <div style={{marginBottom:"20px", display: "inline-block"}}>
            <text>
              {"Share your results!"}
            </text>
          </div>
          <div style={{display: 'inline-block', paddingLeft: '30px'}}>
            <TwitterShareButton url="http://fatebyalgorithm.hcc.cs.ox.ac.uk" title={title_msg + "I've just completed Oxford's 'Fate by Algorithm' AI game!"} hashtags = {['Oxford', 'FateByAlgorithm']}>
              <TwitterIcon round size={50} />
            </TwitterShareButton>
          </div>
          <div style={{display:'inline-block', paddingLeft: '30px', paddingRight: '30px'}}>
            <FacebookShareButton url ="http://fatebyalgorithm.hcc.cs.ox.ac.uk" quote = {title_msg + "I've just completed Oxford's 'Fate by Algorithm' AI game!"} hashtag = "FateByAlgorithm">
              <FacebookIcon round size={50}/>
            </FacebookShareButton>
          </div>
          <div style={{marginBottom:"20px", display: "inline-block"}}>
            <text>
              {"Contribute to science!"}
            </text>
          </div>
        </div>
        {(kindness_narrative != "NaN") && (kindness_datapoint != "NaN") &&
        <div className="narrative-vs-dp-box">
          <div className = 'left'>
            <KindnessGauge caption={"Kindness when shown candidate's story/narrative"} left_text={"MEAN!"}  right_text = {"SUPERKIND!"} value_others={kindness_narrative_avg} value_you={0.9}/>
          </div>
          <div className = 'right'>
            <KindnessGauge caption={"Kindness when shown candidate's datapoints only"} left_text={"MEAN!"}  right_text = {"SUPERKIND!"} value_others={kindness_datapoint_avg} value_you={9}/>
          </div>
        </div>}
        {(group_info != "NaN") &&
        <div id = "single-box" className="single-box">
          <KindnessGauge caption={"Using information about human networks\n(neighbourhood, friends, family..)"} left_text="NOT OK" right_text = "OK" value_others={group_info_avg} value_you={8.0}/>
        </div>}
        {(esoteric_info != "NaN") &&
        <div className="single-box">
          <KindnessGauge caption={"What you think about Big Data info \n(e.g. days since last phone change...)"} left_text = "NOT OK" right_text="OK" value_others={esoteric_info_avg} value_you={8.0}/>
        </div>}
        {(past_info != "NaN") &&
        <div className="single-box">
          <KindnessGauge caption={"Using information about past\n(e.g. debt on past credits...)"} left_text = "NOT OK" right_text="OK" value_others={group_info_avg} value_you={8.0}/>
        </div>}

      </p>
    </div>

  );
}

export default ResultsPage;
