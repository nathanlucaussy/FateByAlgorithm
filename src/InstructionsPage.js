import './InstructionsPage.css';
import AvJudg from "./DialogStuff/images/Judge/open_mouth.png";
import {PageHeader, NextButton} from './PageComponents.js';
import React, {Component, useState, useGlobal} from 'reactn';
import styled from 'styled-components';
import Chat from './DialogStuff/content/Chat_instructions';
import {Emphasis} from './DialogStuff/Char';
import DialogComponent from './DialogComponent.js';
import {WindupChildren, Pace} from 'windups';
function InstructionsPage(){
  const [user_path, set_user_path] = useGlobal("user_path");
  const [scenario_store, set_scenario_store] = useGlobal("scenario_store");
  const current_scenario_index = user_path[0].scenario_index;
  const current_scenario_data = scenario_store[current_scenario_index];

  const lines = [ "We'll first show the profile of a specific person " +  current_scenario_data.name,
                  "Then, an algorithm makes a decision about some aspect of their life.",
                  "As the 'fairness expert', you'll tell us whether you think the decision is fair. Your task is to convince us (the judges) of why you think so!",
                  "After this, you'll meet a bunch of other people...",
                  "When you're done (phew!), you'll get a personalised report showing what kind of 'fairness expert' you are!"
                ];
  const [show_next, set_show_next] = useState(false);

  return(
    <div>
      <PageHeader/>
      <div className = "ip-split">
        <header className = "ip-name-header">
          <p>
            Instructions
          </p>
        </header>
        <div className="ip-left">

            <div style={{width: '95%', marginLeft: 'auto', marginRight: "auto"}}>
              <span style={{ fontSize:"1vw", lineHeight:"1.5", marginLeft: "15%", marginRight: "15%"}}>
                <Chat lines = {lines} onFinished={() => set_show_next(true)}/>
              </span>
            </div>
            <div style={{ textAlign: 'center'}}>
              {show_next && <div style={{display: 'inline-block', paddingLeft: '2%', paddingRight: '2%', paddingBottom: '2%', borderRadius: '10px',
                                         border:"5px solid black", textAlign: 'center', backgroundColor: '#b6bca6'}}>
                <WindupChildren>
                  <p style={{fontSize:"1.5vw", textAlign: "center",
                             fontFamily:  "Menlo, Consolas, Monaco, Lucida Console, Liberation Mono, DejaVu Sans Mono, Bitstream Vera Sans Mono, Courier New, monospace, serif",}}>
                    {'Ready to take on the role of the fairness expert?'}
                    <br />{'The court will now convene...'}
                  </p>
                  <NextButton text="START JUDGING" to={"/scenario1"} />
                </WindupChildren>
              </div>}
            </div>
        </div>
        <div className="ip-right">
          <div style={{border: '5px solid black', borderRadius:'30px'}}>
            <img style={{ width:"75%", display: "block", marginLeft: "auto", marginRight: "auto"}} src={AvJudg}/>
            <div style={{width:"75%", display: "inline-block", margin: "0 auto"}}>
              <p style={{fontSize:"calc(min(2.2vh, 30px))", textAlign: "center"}}>
                I'm one of the judges!
                Let me be your guide
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
export default InstructionsPage;
