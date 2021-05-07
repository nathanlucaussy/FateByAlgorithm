import React, {setGlobal, addCallback} from 'reactn';
import ReactDOM from 'react-dom';
import './index.css';
import TrackedApp from './App.js';

window.git_hash = process.env.REACT_APP_GIT_HASH;


addCallback(global => {
  if (!(global.user_path == []) || !(global.random_id = 0)){
    window.sessionStorage.setItem('user_path', JSON.stringify(global.user_path))
    window.sessionStorage.setItem('random_id', JSON.stringify(global.random_id))

  }
  return null;
});

setGlobal({
    random_id: JSON.parse(window.sessionStorage.getItem('random_id')) || 0,
    most_recent_fairness: 0,
    scenario_store:[{
      "name": "Martha",
      "narrative":  [ "Martha works a manual job in a supermarket.",

                      "Two years ago, Martha fell ill due to overworking. She was not able to work for 6 months. Because of this, she was late on mortage repayments. She has recovered and has been able to work & repay her mortgage loan for the past year.",

                      "Martha applies for a 2000USD cash loan from PayDay Lenders®. She has already filed two other unsuccessful loan applications with banks this year.",

                      "This will help her fund the last two years of her children's secondary schooling."],
      "category": 'LOAN',
      "gender": "F",

      "datapoints": {
                    "Number of family members": "3",
                    "Deprivation index of neighbourhood": "HIGHLY DEPRIVED",
                    "Population density": "0.4",

                    "Credit score": "LOW",
                    "Number of loan applications in past year\n (successful or unsuccessful)": "4",
                    "Num. late payments past 3 years": "8",

                    "Total annual income": "$15000",
                    "Loan purpose": "Cash Loan",
                    "Amount requested to borrow": "$2000",

                    "Number of days employed at job": "365",
                    "Days since last phone change": "60",

      },
      'outcome': 'REJECTED',
      "dp_indications": {
                    "Number of family members": "AVERAGE",
                    "Deprivation index of neighbourhood": "HIGH",
                    "Population density": "AVERAGE",

                    "Credit score": "LOW",
                    "Number of loan applications in past year\n (successful or unsuccessful)": "AVERAGE",
                    "Num. late payments past 3 years": "HIGH",

                    "Total annual income": "LOW",
                    "Loan purpose": "N/A",
                    "Amount requested to borrow": "AVERAGE",

                    "Number of days employed at job": "LOW",
                    "Days since last phone change": "LOW",
                        }
    },
    {
      'name': 'Elijah',
      "narrative": ["Elijah was arrested for stealing a phone.",
                    "He was born in a high-crime neighbourhood, where a few of his childhood friends were arrested.",

                    "Elijah was a very good student at school and university. He would sometimes commit petty thefts to help feed his family.",

                    "Because of this, he was arrested three times as a juvenile.",

                    "Elijah now has a well-paying job as a schoolteacher, and has no trouble paying bills."],
      "category": "CRIM",
      "datapoints": {

        "Neighbourhood crime levels":	"HIGH",
        "Number of friends that have ever been arrested":	"SOME",

        "Heroin, cocaine, crack or meth use as a juvenile":	"NO",
        "Number of arrests, either as an adult or as a juvenile":	"3",

        "Current charge": "Robbery",
        "Crime severity": "3",
        "Does the offence involve family violence": "NO",

        "Trouble paying bills?": "NO",
        "Ability to 'sweet talk' people into getting what they want?":	'YES',
        "Usual grades in high school?":	"GOOD"
      },
      "outcome": "HIGH-RISK",
      "gender": 'M',
      "dp_indications":{
        "Neighbourhood crime levels":	"HIGH",
        "Number of friends that have ever been arrested":	"HIGH",

        "Heroin, cocaine, crack or meth use as a juvenile":	"COMMON",
        "Number of arrests, either as an adult or as a juvenile":	"AVERAGE",

        "Current charge": "N/A",
        "Crime severity": "AVERAGE",
        "Does the offence involve family violence": "COMMON",

        "Trouble paying bills?": "UNCOMMON",
        "Ability to 'sweet talk' people into getting what they want?":	'UNCOMMON',
        "Usual grades in high school?":	"UNCOMMON",
      }
    },
    {
      'name':'Ray',
      "narrative": ["Ray is a gig-economy worker. He was born in a modest neighbourhood.Although Ray was a good student, he dropped out when his parents fell ill. Ray started working to cover family expenses. "

                    + "Since then, Ray has been working as a delivery worker. Through this, he earns $23 000 per year - although it makes for 9-hour days.",

                    "Ray has a worse-than-average credit score - he is sometimes late on repayment of his phone bill. However, he has always paid rent on time - this is 20x the phone bill, yet the landlord does not declare it to the credit bureau; therefore it does not improve Ray's credit score.",

                    "Ray applies for a $2000 loan to buy a scooter and transition into a salaried courier job."],
      "category": 'LOAN',
      "gender": "M",
      'datapoints': {
        "Number of family members": "7",
        "Deprivation index of neighbourhood": "HIGHLY DEPRIVED",
        "Population density": "0.9",

        "Credit score": "LOW",
        "Number of loan applications in past year\n (successful or unsuccessful)": "2",
        "Num. late payments past 3 years": "7",

        "Total annual income": "$23000",
        "Loan purpose": "Automotive",
        "Amount requested to borrow": "$2000",

        "Number of days employed at job": "1200",
        "Days since last phone change": "33",
      },
      'outcome': 'REJECTED',
      'dp_indications': {
        "Number of family members": "HIGH",
        "Deprivation index of neighbourhood": "HIGH",
        "Population density": "HIGH",

        "Credit score": "LOW",
        "Number of loan applications in past year\n (successful or unsuccessful)": "AVERAGE",
        "Num. late payments past 3 years": "HIGH",

        "Total annual income": "LOW",
        "Loan purpose": "N/A",
        "Amount requested to borrow": "AVERAGE",

        "Number of days employed at job": "AVERAGE",
        "Days since last phone change": "LOW",
        },
      },
      {
        'name': 'John',
        "narrative": ["John was arrested for assault. John was born in a high-crime neighbourhood. Until the age of 15, John was a good student. "

                      + "However, influenced by friends,  John became dependent on alcohol. John still drinks heavily, and hops from minimum-wage job to minimum-wage job.",

                      "Twice when drunk and hungry, John has stolen food from a store - this happened when he was unemployed. In a drunken fight, he causes a minor physical injury to another man.",

                      "In the time before he is due to stand trial, he has enrolled in a rehabilitation course at the best institution in the country, where he is making good progress."],
        "category": "CRIM",
        "datapoints": {

          "Neighbourhood crime levels":	"HIGH",
          "Number of friends that have ever been arrested":	"SOME",

          "Heroin, cocaine, crack or meth use as a juvenile":	"YES",
          "Number of arrests, either as an adult or as a juvenile":	"2",

          "Current charge": "Assault",
          "Crime severity": "6",
          "Does the offence involve family violence": "NO",

          "Trouble paying bills?": "OFTEN",
          "Ability to 'sweet talk' people into getting what they want?":	'NO',
          "Usual grades in high school?":	"POOR"
        },
        "outcome": "HIGH-RISK",
        "gender": 'M',
        "dp_indications":{
          "Neighbourhood crime levels":	"HIGH",
          "Number of friends that have ever been arrested":	"HIGH",

          "Heroin, cocaine, crack or meth use as a juvenile":	"UNCOMMON",
          "Number of arrests, either as an adult or as a juvenile":	"AVERAGE",

          "Current charge": "N/A",
          "Crime severity": "HIGH",
          "Does the offence involve family violence": "COMMON",

          "Trouble paying bills?": "HIGH",
          "Ability to 'sweet talk' people into getting what they want?":	'COMMON',
          "Usual grades in high school?":	"COMMON",
        }
      },
      {
        'name': 'Jacob',
        "narrative": ["Jacob was arrested for assault. Jacob is 60-year old doctor. Everyone sees Jacob as trustworthy. He lives in a safe neighbourhood, and has no trouble paying bills."

                      +" Jacob has never been arrested and has never used any drugs. He has the ability to sweet-talk people into getting what he wants.",

                      "Jacob is often violent towards his wife. She has contemplated calling the police about this for many years, but only recently had the courage to do so. Jacob was charged with assault."],
        "category": "CRIM",
        "datapoints": {

          "Neighbourhood crime levels":	"LOW",
          "Number of friends that have ever been arrested":	"NONE",

          "Heroin, cocaine, crack or meth use as a juvenile":	"NO",
          "Number of arrests, either as an adult or as a juvenile":	"0",

          "Current charge": "Assault",
          "Crime severity": "5",
          "Does the offence involve family violence": "YES",

          "Trouble paying bills?": "NEVER",
          "Ability to 'sweet talk' people into getting what they want?":	'YES',
          "Usual grades in high school?":	"GOOD"
        },
        "outcome": "LOW-RISK",
        "gender": 'M',
        "dp_indications":{
          "Neighbourhood crime levels":	"LOW",
          "Number of friends that have ever been arrested":	"LOW",

          "Heroin, cocaine, crack or meth use as a juvenile":	"COMMON",
          "Number of arrests, either as an adult or as a juvenile":	"LOW",

          "Current charge": "N/A",
          "Crime severity": "AVERAGE",
          "Does the offence involve family violence": "UNCOMMON",

          "Trouble paying bills?": "LOW",
          "Ability to 'sweet talk' people into getting what they want?":	'UNCOMMON',
          "Usual grades in high school?":	"UNCOMMON",
        }
      },
      {
        'name':'Cynthia',
        "narrative": ["Cynthia is applying for a $2000 loan to buy a car. Cynthia was born in a privileged neighbourhood, to well-off parents.",

                      "She failed her first year of university. She returned home and her parents decided to help her buy a car. This loan is visible on PayDay Lenders' internal system.",

                      "Drunk, Cynthia crashed the car on her way to a nightclub. Cynthia now works at a local café. She consumes many drugs and generally engages in irresponsible behaviour, which makes her employment  precarious.",

                      "She applies for a 2000USD loan to buy a car so that she does not have to depend on her parents' car any more."],
        "category": 'LOAN',
        "gender": 'F',
        'datapoints': {
          "Number of family members": "3",
          "Deprivation index of neighbourhood": "NOT DEPRIVED",
          "Population density": "0.7",

          "Credit score": "HIGH",
          "Number of loan applications in past year\n (successful or unsuccessful)": "1",
          "Num. late payments past 3 years": "0",

          "Total annual income": "$18000",
          "Loan purpose": "Automotive",
          "Amount requested to borrow": "$2000",

          "Number of days employed at job": "25",
          "Days since last phone change": "400",
        },
        'outcome': 'ACCEPTED',
        'dp_indications': {
          "Number of family members": "LOW",
          "Deprivation index of neighbourhood": "LOW",
          "Population density": "AVERAGE",

          "Credit score": "HIGH",
          "Number of loan applications in past year\n (successful or unsuccessful)": "LOW",
          "Num. late payments past 3 years": "LOW",

          "Total annual income": "LOW",
          "Loan purpose": "N/A",
          "Amount requested to borrow": "AVERAGE",

          "Number of days employed at job": "LOW",
          "Days since last phone change": "AVERAGE",
          },
        },
        {
          'name':'Jackson',
          "narrative": ["Jackson is applying for a loan to start a business. The credit amount is $10 000.",

                        "Jackson has been employed at his current job for 1500 days, where he currently earns $31 000 a year. He does not have any children.",

                        "The region where Jackson lives has been rated as 'moderately deprived'. Twice in the past 3 years, Jackson had a late-payment on a loan, and he has an average credit score",

                        "Jackson's loan application was denied."],
          "category": 'LOAN',
          "gender": 'M',
          'datapoints': {
            "Number of family members": "1",
            "Deprivation index of neighbourhood": "MODERATELY DEPRIVED",
            "Population density": "0.6",

            "Credit score": "AVERAGE",
            "Number of loan applications in past year\n (successful or unsuccessful)": "1",
            "Num. late payments past 3 years": "2",

            "Total annual income": "$31000",
            "Loan purpose": "Start Business",
            "Amount requested to borrow": "$10000",

            "Number of days employed at job": "1500",
            "Days since last phone change": "900",
          },
          'outcome': 'REJECTED',
          'dp_indications': {
            "Number of family members": "LOW",
            "Deprivation index of neighbourhood": "AVERAGE",
            "Population density": "AVERAGE",

            "Credit score": "AVERAGE",
            "Number of loan applications in past year\n (successful or unsuccessful)": "LOW",
            "Num. late payments past 3 years": "AVERAGE",

            "Total annual income": "AVERAGE",
            "Loan purpose": "N/A",
            "Amount requested to borrow": "HIGH",

            "Number of days employed at job": "HIGH",
            "Days since last phone change": "HIGH",
            },
          },
          {
            'name': 'Denise',
            "narrative": ["Denise is currently charged with drugs possession/use (classed with a crime-severity of 4/10).This offence did not involve family violence.",

                          "There is some crime in Denise's neighbourhood, and many of her friends have been arrested in the past."

                          + " She has been arrested once (either as an adult or as a juvenile), but never used heroin, cocaine, crack or meth as a juvenile.",

                          "Denise usually had good grades in high school. She sometimes has trouble paying bills, and believes she has the ability to 'sweet talk' people into getting what she wants." ],
            "category": "CRIM",
            "datapoints": {

              "Neighbourhood crime levels":	"AVERAGE",
              "Number of friends that have ever been arrested":	"MANY",

              "Heroin, cocaine, crack or meth use as a juvenile":	"NO",
              "Number of arrests, either as an adult or as a juvenile":	"1",

              "Current charge": "Drugs possession/use",
              "Crime severity": "4",
              "Does the offence involve family violence": "NO",

              "Trouble paying bills?": "SOMETIMES",
              "Ability to 'sweet talk' people into getting what they want?":	'YES',
              "Usual grades in high school?":	"GOOD"
            },
            "outcome": "HIGH-RISK",
            "gender": 'F',
            "dp_indications":{
              "Neighbourhood crime levels":	"AVERAGE",
              "Number of friends that have ever been arrested":	"HIGH",

              "Heroin, cocaine, crack or meth use as a juvenile":	"COMMON",
              "Number of arrests, either as an adult or as a juvenile":	"LOW",

              "Current charge": "N/A",
              "Crime severity": "AVERAGE",
              "Does the offence involve family violence": "COMMON",

              "Trouble paying bills?": "AVERAGE",
              "Ability to 'sweet talk' people into getting what they want?":	'UNCOMMON',
              "Usual grades in high school?":	"UNCOMMON",
            }
          },
    ],
    categories: {
      'LOAN': {
                'domain-relevant': [6, 7, 8],
                'esoteric': [9, 10],
                'past': [3, 4, 5],
                'groups': [0, 1, 2]
              },
      'CRIM': {
                'domain-relevant': [4, 5, 6],
                'esoteric': [7, 8, 9],
                'past': [2, 3],
                'groups': [0, 1]
      }
    },
    user_path: JSON.parse(window.sessionStorage.getItem('user_path')) || [],

});
ReactDOM.render(
  <React.StrictMode>
    <TrackedApp />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
