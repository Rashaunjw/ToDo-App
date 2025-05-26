import React from 'react';
import Svg, { Path } from 'react-native-svg';

const DeleteBox = (props) => (
  <Svg
    width="371"
    height="326"
    viewBox="0 0 371 326"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    style={props.style} 
  >
    <Path
      d="M3 53C3 25.3858 25.3858 3 53 3H318C345.614 3 368 25.3858 368 53V273C368 300.614 345.614 323 318 323H53C25.3858 323 3 300.614 3 273V53Z"
      fill="#59981A"
      stroke="#ECF87F"
      strokeWidth="5"
      strokeLinejoin="round"
    />
  </Svg>
);

export default DeleteBox;