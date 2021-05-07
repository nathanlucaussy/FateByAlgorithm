import './LandingPage.css'
import lp_flowchart from './Graphics/lp_flowchart.png';
import {PageHeader, Footer} from './PageComponents'
import React, {Component, useGlobal, useState, useEffect} from 'reactn';
import track, { useTracking } from 'react-tracking';
import TypeWriter from 'react-typewriter';
import styled from 'styled-components';
import {useHistory} from "react-router-dom";
import Chat from './DialogStuff/content/Chat';
import {useFixedPositionWindup} from './DialogComponent.js';
import mallet_before from './Graphics/mallet_before.png';
import mallet_mid from './Graphics/mallet_mid.png';
import mallet_after from './Graphics/mallet_after.png';
import { fetchApi } from './fetchApi';

/*const Button = styled.button`
  background-color: black;
  color: white;
  font-size: 20px;
  padding: 10px 60px;
  border-radius: 5px;
  margin: 10px 0px;
  cursor: pointer;
`;*/
const Button = styled.button`
  color: white;
  background-color: #213671;
  border-radius: 6px;
  border: 4px black solid;
  transform: skew(-5deg);
  padding: 8px;
  font-size: calc(min(3vmin, 50px));
  font-family: "Menlo", monospace;
  font-style: italic;
  display: inline-block;
  margin-left: auto;
  margin-right:auto;
  cursor: pointer;
  transition: 50ms;
`;


function StartButton(){
  const [random_id, set_random_id] = useGlobal("random_id");
  const [user_path, set_user_path] = useGlobal("user_path");
  const [scenario_store, set_scenario_store] = useGlobal("scenario_store");
  const [categories, set_categories] = useGlobal("categories");
  const [path_selected, set_path_selected] = useGlobal(false);
  const scenario_names = ['Jacob','Cynthia', 'John', 'Jackson','Denise','Ray','Elijah','Martha' ];
  const history= useHistory();
  const { Track, trackEvent } = useTracking({ page: 'StartPage' });
  const showNext = () => {
    history.push('/consent', { from: "homepage" })
  };
  function find_scenario(name, store){
    var scenario = {};
    for (let j = 0; j < store.length; j++ ){
      scenario = store[j];
      if (scenario.name == name){
        return(scenario)
      }
    }
    return {}
  };

  function find_scenario_index(name, store){
    var scenario = {};
    for (let j = 0; j < store.length; j++ ){
      scenario = store[j];
      if (scenario.name == name){
        return(j)
      }
    }
    return 0
  };
  function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  const num_scenarios = 8;
  const [chosen_names, set_chosen_names] = useState({});

  useEffect(() => {
    fetchApi('/counts_backend').then(res => res.json()).then(data => {
      set_chosen_names(data);

    });


  }, []);
  if (!(path_selected) && !(chosen_names && Object.keys(chosen_names).length === 0 && chosen_names.constructor === Object)){
    console.log(chosen_names)
    var use_narrative = Math.random() < 0.5;
    var path = [];
    for (let name_index = 0; name_index < 8; name_index ++){
      const cur_name = Object.values(chosen_names)[name_index]
      console.log(cur_name)
      const scen = find_scenario(cur_name, scenario_store);
      console.log(scen)
      const index = find_scenario_index(cur_name, scenario_store);
      console.log(index)
      const dps = Object.values(categories[scen.category])[getRandomInt(0, 3)];
      path.push(
        {
          'scenario_index' : index,
          'is_narrative' : use_narrative,
          'dp_selected': dps
        }
      );
      use_narrative = !(use_narrative);
    }
    set_user_path(path);
    set_path_selected(true);
  }
  //Function to select the scenario order. Will have to be exported to its own component in due course...
  const handleClick = () => {
    const calculated_user_id = Math.floor(Math.random() * 1000000000000);
    set_random_id(calculated_user_id);
    trackEvent({user_id: calculated_user_id});
    showNext();

  };


  return(
    <Button onClick={handleClick}>
      GET STARTED
    </Button>
  )

}

function LandingPage(){
  const [show_start_button, set_show_start_button] = useState(false);
  const [show_mallet_before, set_show_mallet_before] = useState(false);
  const [show_mallet_mid, set_show_mallet_mid] = useState(false);
  const [show_mallet_after, set_show_mallet_after] = useState(false);
  const [show_explanation_beta, set_show_explanation_beta] = useState(false);
  const [show_chat, set_show_chat] = useState(false);
  const show_mallets = () => {
    set_show_mallet_before(true);
    setTimeout(() => {
      set_show_mallet_before(false);
      set_show_mallet_mid(true);
      setTimeout(() => {
        set_show_mallet_mid(false);
        set_show_mallet_after(true);
        setTimeout(() => {
          set_show_explanation_beta(true);
        }, 500);
      }, 300);
    }, 300);
  };

  const explanation_beta = useFixedPositionWindup("Thank you for visiting the beta version of Fate By Algorithm! We're trialling the game with a select few people, and by participating you will help us improve and refine the game.", () => {setTimeout(() =>{set_show_chat(true)}, 400)});

  const mallet = (props) => {
    var object =  <img style={{width: '100px'}} src={mallet_before}/>;
    if (props.show_mallet_mid){
      object = <img style={{width: '100px'}} src={mallet_mid}/>;
    }
    else if (props.show_mallet_after){
      object = <img style={{width: '100px'}} src={mallet_after}/>;
    }
    return(object)
  }
  return(
    <div>
      <PageHeader className="lp-header"/>
      <div className="split">
        <div className="lp-left">
        <div className="appname">
          <header className="App-header">
            <p>
              <b>
                {useFixedPositionWindup("Fate by Algorithm", () => {})}
              </b>
              <br />
              <span style={{fontSize: "0.5em"}}>
                {useFixedPositionWindup("- The Oxford AI Fairness Experiment -", () => {show_mallets()})}
              </span>
            </p>
          </header>
        </div>
          <div className='mallet'>
            {show_mallet_before && <img style={{width: '200px'}} src={mallet_before}/>}
            {show_mallet_mid && <img style={{width: '200px'}} src={mallet_mid}/>}
            {show_mallet_after && <img style={{width: '200px'}} src={mallet_after}/>}
          </div>
          <div style ={{display: 'block', width: '60%', marginLeft: 'auto', marginRight: 'auto', padding: '40px', borderRadius: '30px', border: '5px solid black', marginBottom: '40px'}}>
            <span style={{fontSize: "2vh"}}>
             <b>
              {show_explanation_beta && explanation_beta}
             </b>
            </span>
          </div>

          <div className='chat-box'>
            {show_chat && <Chat onFinished={() => {set_show_start_button(true)}} />}
          </div>
          <div className="start-button-div">
            {show_start_button && <StartButton/>}
          </div>
        </div>
        <div className="lp-right">
          <img style={{top: "150px", maxWidth:"100%", margin: "auto"}} src={lp_flowchart}/>
        </div>
      </div>
      <Footer/>
    </div>
  )
}
export default LandingPage;
