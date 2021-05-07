import './Consent.css'
import {PageHeader, NextButton} from './PageComponents'
import React, {Component, useState} from 'reactn';
import styled from 'styled-components';

function ConsentPage(){
  const [over18, set_over18] = useState(false);
  return(
      <div className="overall-box">
      <PageHeader/>
        <div>
          <header className="name-header">
            <p style={{ borderRadius: '6px', border: '4px black solid', transform: 'skew(-5deg)', padding: '8px'}}>
              <b>Fate by Algorithm - Consent Agreement</b>
            </p>
          </header>
        </div>
        <div>
          <p style={{fontFamily: "Menlo, Consolas, Monaco, Lucida Console, Liberation Mono, DejaVu Sans Mono, Bitstream Vera Sans Mono, Courier New, monospace, serif",
                     fontSize:"calc(min(2vh, 22px))", lineHeight:"1.3", padding: "2%", width:"55%", textAlign: "center",   display: "block", marginLeft: "auto", marginRight: "auto", border:"5px solid black"}}>
            <h3>General Information: Research Ethics Approval ref. CS_C1A_21_012</h3>
            <br /><br />
            The aim of this study is to analyse the impact of forms of presentation on how we perceive the justice of algorithm’s decisions.
            <br /><br />
            We appreciate your interest in participating in this online game.  You may only participate in this game if you are over 18 years old.
            <br /><br />
            Please read through this information before agreeing to participate (if you wish to) by ticking the ‘yes’ box below.
            <br /><br />
            You may ask any questions before deciding to take part by contacting the researcher (details below).
            <br /><br />
            The Principal Researcher is Professor Van Kleek, who is attached to the Human-Centered Computing Group at the University of Oxford. The Student Researcher for this project is Nathan Lucaussy.
            <br /><br />
            In this game, you will be required to consider the case of a person in different decisional contexts.
            Each time, an algorithm is used to inform the decision.
            You’ll have your say on whether you think the decision was fair, and on the reasons as to why it may be fair or unfair.
            This should take about 4 minutes per round.  No background knowledge is required.
            This data is required to understand whether we can present information in a way that helps humans judge the fairness of algorithms' decisions.
            All data collected will be anonymised, and it will be analysed by our team of researchers at Oxford.
            When data has been fully anonymised, it may be shared as an open-access dataset.
            <br /><br />
            Cases shown may include references to crime, financial difficulty, theft, domestic abuse, depression and drug abuse.
            <br /><br />
            Please, do not include information that may identify you personally in any of your answers.
          </p>
      </div>
      <div>
        <p style={{fontFamily: "Menlo, Consolas, Monaco, Lucida Console, Liberation Mono, DejaVu Sans Mono, Bitstream Vera Sans Mono, Courier New, monospace, serif",
                   fontSize:"calc(min(2vh, 22px))", lineHeight:"1.3", padding: "2%", width:"55%", textAlign: "center",   display: "block", marginLeft: "auto", marginRight: "auto"}}>

          <h3> Do I have to take part?</h3>


          <br /><br />
          No.  Please note that participation is voluntary.  If you do decide to take part, you may withdraw at any point for any reason before submitting your answers by pressing the exit button on the top right corner. At the end of the survey, we will provide you with a unique code. If you would like us to delete your submission, please contact us at any time quoting this code.
          <br /><br />


          <h3>How will my data be used?</h3>
          <br />


          We will not collect any data that could directly identify you.
          <br /><br />
          Your IP address will not be stored.  We will take all reasonable measures to ensure that data remain confidential.
          <br /><br />


          The responses you provide will be stored in a password-protected electronic file and may be used in academic publications.  If you have included any identifiable information, it will be deleted as soon as it is no longer required for the research.  Research data (including consent records) will be stored for three years after publication or public release.


          <br /><br />
          The data that we collect from you may be transferred to, stored and/ or processed at a destination outside the UK and the European Economic Area ("EEA").  By submitting your personal data, you agree to this transfer, storing or processing.
          <br /><br />


          <h3> Who will have access to my data?</h3>
          <br />


          The University of Oxford is the data controller with respect to your personal data, and as such will determine how your personal data is used in the study.  The University will process your personal data for the purpose of the research outlined above.  Research is a task that we perform in the public interest.  Further information about your rights with respect to your personal data is available from https://compliance.admin.ox.ac.uk/individual-rights.
          <br /><br />
          We would also like your permission to use the data in future studies, and to share data with other researchers (e.g. in online databases).  Data will be de-identified before it is shared with other researchers or results are made public.
          <br /><br />
          This project will be written up for an MCompSciPhil degree.
          <br /><br />


          <h3> Who has reviewed this study?</h3>
          <br />


          This project has been reviewed by, and received ethics clearance through, the University of Oxford Central University Research Ethics Committee [ref. CS_C1A_21_012].
          <br /><br />


          <h3> Who do I contact if I have a concern or I wish to complain?</h3>

          <br />

          If you have a concern about any aspect of this study, please speak to Nathan Lucaussy (email: nathan.lucaussy@univ.ox.ac.uk) or their supervisor Professor Max Van Kleek (email: max.van.kleek@cs.ox.ac.uk) and we will do our best to answer your query.  We will acknowledge your concern within 10 working days and give you an indication of how it will be dealt with.  If you remain unhappy or wish to make a formal complaint, please contact the Chair of the Research Ethics Committee at the University of Oxford who will seek to resolve the matter as soon as possible:

          <br /><br />

          E-mail: ethics@cs.ox.ac.uk

          <br /><br />

          Address:
          <br /><br />
          <i>Research Ethics Committee,
          <br />
          Department of Computer Science, University of Oxford
          <br />
          Wolfson Building,
          <br />
          Parks Road,
          <br />
          OXFORD,
          <br />
          OX1 3QD
          <br />
          UK</i>
        </p>
      </div>
      <div style={{border: "5px solid black", borderRadius: "20px", paddingLeft: "30px",paddingRight: "30px",marginBottom:'150px', paddingTop: "30px", display: 'inline-block'}}>
        <label style={{fontSize: 'calc(min(2vh, 28px))'}}>
              Are you over 18?:
              <input
                name="over18"
                className= "checkbox"
                type="checkbox"
                checked={over18}
                onChange={() => set_over18((!(over18)))} />
        </label>
        <div style = {{paddingTop: '50px', paddingBottom: '30px'}}>
          {over18 && <NextButton text="NEXT" to={"instructions"}/>}
        </div>
      </div>
    </div>
  );
}
export default ConsentPage;
