import React from 'react';
import Dialog from './DialogStuff/Dialog';
import Section from './DialogStuff/Section';
import SectionFocusContext from './DialogStuff/SectionFocusContext';
import Frog from './DialogStuff/performers/Frog.tsx';
import {useWindupString} from 'windups';
import './ScenarioBackground.css';

export default function DialogComponent(props){

  return(
    <SectionFocusContext.Provider  value={{ activeSectionID: "", setActiveSectionID: () => {} }}>
        {props.person == "J" &&
        <Dialog onFinished= {props.onFinished}>
            {props.lines.map((value, index) => {
              return <Frog expression={"JUDGE"}>{value}</Frog>
             })}
        </Dialog>}
        {props.person == "M" &&
        <Dialog onFinished= {props.onFinished}>
            {props.lines.map((value, index) => {
              return <Frog expression={"MAN"}>{value}</Frog>
             })}
        </Dialog>}
        {props.person == "F" &&
        <Dialog onFinished= {props.onFinished}>
            {props.lines.map((value, index) => {
              return <Frog expression={"WOMAN"}>{value}</Frog>
             })}
        </Dialog>}
    </SectionFocusContext.Provider>

  );
}
DialogComponent.defaultProps = {
    person: "J",
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
