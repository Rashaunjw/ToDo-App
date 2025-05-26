import React from 'react';
import { TouchableOpacity } from 'react-native';
import Svg, { G, Path } from 'react-native-svg';

const CloseXWhite = ({ onPress, style }) => (
  <TouchableOpacity onPress={onPress} style={style}>
    <Svg width="26" height="25" viewBox="0 0 26 25" fill="none">
      <G id="Group 10">
        <Path id="Line 15" d="M2.04187 1.9209L23.6239 22.7587" strokeWidth="3"stroke="white" strokeLinecap="round" />
        <Path id="Line 16" d="M2 22.5281L23.8769 2" stroke="white" strokeWidth="3" strokeLinecap="round" />
      </G>
    </Svg>
  </TouchableOpacity>
);

export default CloseXWhite;
