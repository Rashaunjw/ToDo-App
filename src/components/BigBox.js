import React from 'react';
import Svg, { Path } from 'react-native-svg';

const BigBox = (props) => (
  <Svg
    width={366}
    height={245}
    viewBox="0 0 366 245"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <Path
      d="M2 52C2 24.3858 24.3858 2 52 2H314C341.614 2 364 24.3858 364 52V193C364 220.614 341.614 243 314 243H52C24.3858 243 2 220.614 2 193V52Z"
      fill="#3D550C"
      stroke="#ECF87F"
      strokeWidth="3"
    />
  </Svg>
);

export default BigBox;