import logo from './Graphics/CompSci_logo.png';
import React, {Component, useGlobal} from 'reactn';
import {useHistory} from 'react-router-dom';
import styled from 'styled-components';
import './PageComponents.css';


const Button = styled.button`
  background-color: #213671;
  color: white;
  border-radius: 6px;
  border: 4px solid black;
  transform: skew(-5deg);
  padding: 8px;
  font-size: calc(10px + 2vmin);
  font-family: "Menlo", monospace;
  font-style: italic;
  display: inline-block;
  transition: width 50ms;
  margin-left: auto;
  margin-right:auto

`;

const FairButton = styled.button`
  background-color: #F4976C;
  color: black;
  border-radius: 6px;
  border: 4px solid black;
  transform: skew(-5deg);
  padding: 6px;
  font-size: calc(10px + 1.8vmin);
  font-family: "Menlo", monospace;
  font-style: italic;
  display: inline-block;
  transition: width 50ms;
  margin-left: auto;
  margin-right:auto
`;

function NextButton(props){
  const history = useHistory()

  const showNext = (to) => {
    history.push(to)
  };
  const handleClick = () => {
    showNext(props.to)
  };


  return(
    <Button onClick={handleClick}>
      {props.text}
    </Button>
    )
}

function PageHeader() {
  return(
    <div className="page-header">
      <a href="https://www.cs.ox.ac.uk">
        <img  alt="logo" src={logo} className="logo-cs"/>
      </a>
      <div className="hcc-text">
        <p>
           <h3>Human-Centered Computing</h3>
           Department of Computer Science, Oxford
        </p>
      </div>
    </div>
  )
};

function Footer(){
  return(
    <div className="footer">
      <p style= {{textAlign:'center', color:'white', paddingTop:'5px', paddingBottom: '5px', marginTop: '0px', marginBottom: '0px'}}>
        Created by (Student) and Professor Van Kleek, HCC Oxford
      </p>
    </div>
  )
}
export {Footer, FairButton, NextButton, PageHeader, Button};
