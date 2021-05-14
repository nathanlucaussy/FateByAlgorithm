import React, {useState} from 'react';
import Dialog from './DialogStuff/Dialog';
import Section from './DialogStuff/Section';
import SectionFocusContext from './DialogStuff/SectionFocusContext';
import Frog from './DialogStuff/performers/Frog.tsx';
import {useWindupString} from 'windups';
import styled from 'styled-components';
import './ScenarioBackground.css';
const Button = styled.button`
  background-color: #213671;
  color: white;
  border-radius: 6px;
  border: 4px solid black;
  transform: skew(-5deg);
  padding: 4px;
  font-size: calc(5px + 1.4vmin);
  font-family: "Menlo", monospace;
  font-style: italic;
  display: inline-block;
  transition: width 50ms;
  margin-left: auto;
  margin-right:auto

`;
export default function DialogComponent(props){
  const [toSkip, setToSkip] = useState(false);
  const [showFF, setShowFF] = useState(props.showFastForward);
  return(
    <div>
      <SectionFocusContext.Provider  value={{ activeSectionID: "", setActiveSectionID: () => {} }}>
          {props.person == "J" &&
          <Dialog  skipped = {toSkip} onFinished= {() => {props.onFinished(); setShowFF(false)}}>
              {props.lines.map((value, index) => {
                return <Frog expression={"JUDGE"}  autoProceed={true}>{value}</Frog>
               })}
          </Dialog>}
          {props.person == "M" &&
          <Dialog skipped = {toSkip} onFinished= {() => {props.onFinished(); setShowFF(false)}}>
              {props.lines.map((value, index) => {
                return <Frog expression={"MAN"} autoProceed={true} >{value}</Frog>
               })}
          </Dialog>}
          {props.person == "F" &&
          <Dialog skipped = {toSkip} onFinished= {() => {props.onFinished(); setShowFF(false)}}>
              {props.lines.map((value, index) => {
                return <Frog expression={"WOMAN"} autoProceed={true}>{value}</Frog>
               })}
          </Dialog>}
      </SectionFocusContext.Provider>
      {showFF &&
      <div style= {{display: 'inline-block', marginLeft:'auto', marginRight: 'auto'}} >
        <Button onClick={() => {setToSkip(true); setShowFF(false);}}>
          Fast
          <br />
          Forward
        </Button>
      </div>}
    </div>
  );
}
DialogComponent.defaultProps = {
    person: "J",
    showFastForward: false
}
export function useFixedPositionWindup(str, onFinish = () => {}) {
  const [windup, { isFinished }] = useWindupString(str, { onFinished: onFinish});

  // Create a second copy of the string which has as many characters taken off the beginning as the windup has
  // e.g. in the case of "hello",
  // windup = "hel"
  // invisible = "lo"
  const invisible = str.slice(windup.length);
  // If the windup is finished, show the endstring no matter what
  return (
    <>
      <span>{windup}</span>
      <span style={{ opacity: 0 }}>{invisible}</span>
    </>
  )
}
