// components/Line5Icon.js
import React from 'react';
import Svg, { Path } from 'react-native-svg';

const LongLine = (props) => (
  <Svg width={186} height={6} viewBox="0 0 186 6" fill="none" {...props}>
    <Path
      d="M3 3H183"
      stroke="#ECF87F"
      strokeWidth={5}
      strokeLinecap="round"
    />
  </Svg>
);

export default LongLine;