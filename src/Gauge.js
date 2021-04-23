import React from 'react'

const defaultProps = {
  width: 500,
  height: 80,
  value: 0,
  max: 10,
  min: 0,
  box: { x1: "2%", x2: "96%", y1: "30%", y2: "40%", widthK: 0.96 },
  axis: { x1: "2%", x2: "98%", y1: "20%", y2: "80%", widthK: 0.98 },
  ticks: [{label: '0', value: 0}, {label: '50', value: 50}, {label: '100', value: 100}]
}

export default (props) => {

  props = {
    ...defaultProps,
    ...props
  };

  function calcAxisPos(val) {
    if(props.min === val) {
      return props.axis.x1;
    } else if (props.max === val) {
      return props.axis.x2;
    } else {
      return (val-props.min) * (props.width * props.axis.widthK)/(props.max-props.min);
    }
  }
  var v1 = 0
  var v2 = 0
  if (props.value1 > props.value2){
    v1 = 4.5
    v2 = 2
  }
  else if (props.value1 == props.value2){
    v1 = 4.5
    v2 = 4.5
  }
  else{
    v1 = 4.5
    v2 = 7.5
  }


  return (
      <svg width={props.width} height={props.height}>
        <defs>
          <linearGradient id="gradient" x1={props.box.x1} y1={props.box.y1} x2={props.box.x2} y2={props.box.y1} spreadMethod="pad">
            <stop offset="0%" stopColor="red" stopOpacity="1"></stop>
            <stop offset="50%" stopColor="yellow" stopOpacity="1"></stop>
            <stop offset="100%" stopColor="green" stopOpacity="1"></stop>
          </linearGradient>
        </defs>

        <g>
          <rect x={props.box.x1} y={props.box.y1} width={props.box.x2} height={props.box.y2} rx={"15"} fill="url(#gradient)"></rect>
        </g>
        <g>
          <text textAnchor="middle" x={calcAxisPos(v1)} y={'93%'} fontSize="20" fill="#a50000">
            others
          </text>
        </g>
        <g>
          <text textAnchor="middle" x={calcAxisPos(v2)} y={props.axis.y1} fontSize="20" fill="#006872">
            you
          </text>
        </g>
        <g>
          {
            props.ticks.map((item) => {
              return (
                <line y1={props.axis.y1} x1={calcAxisPos(item.value)} y2={props.axis.y2} x2={calcAxisPos(item.value)} strokeWidth="2" stroke="#fff"></line>
              )
            })
          }
        </g>
        <g>
          <line y1={props.box.y1} x1={calcAxisPos(v1)} y2={"70%"} x2={calcAxisPos(v1)} strokeWidth="1" stroke="#000"></line>
        </g>
        <g>
          <polygon points={
            calcAxisPos(v1) + "," + (props.height * 0.5 - 4) + " " +
            (calcAxisPos(v1) - 4) + "," + props.height * 0.5 + " " +
            calcAxisPos(v1) + "," + (props.height * 0.5 + 4) + " " +
            (calcAxisPos(v1) + 4) + "," + props.height * 0.5
          } fill="#000" stroke="#a50000" stroke-width="9" />
        </g>
        <g>
          <line y1={props.box.y1} x1={calcAxisPos(v2)} y2={"70%"} x2={calcAxisPos(v2)} strokeWidth="1" stroke="#000"></line>
        </g>
        <g>
          <polygon points={
            calcAxisPos(v2) + "," + (props.height * 0.5 - 4) + " " +
            (calcAxisPos(v2) - 4) + "," + props.height * 0.5 + " " +
            calcAxisPos(v2) + "," + (props.height * 0.5 + 4) + " " +
            (calcAxisPos(v2) + 4) + "," + props.height * 0.5
          } fill="#000" stroke="#006872" stroke-width="9" />
        </g>

      </svg>
  );
}
