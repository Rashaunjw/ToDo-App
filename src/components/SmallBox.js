import React from 'react';
import Svg, { Rect } from 'react-native-svg';

  const SmallBox = ({ style }) => (
    <Svg
      width={35}
      height={35}
      viewBox="0 0 35 35"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={style}>    
      <Rect x="0.5" y="0.5" width="34" height="34" rx="6.5" fill="#ECF87F" stroke="#ECF87F" />
  </Svg>
);

export default SmallBox;