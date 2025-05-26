import React from 'react';
import Svg, { G, Path, Circle } from 'react-native-svg';

const FilledCheckCircle = (props) => (
<Svg width="54" height="54" viewBox="0 0 54 54" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
<G id="Group 14">
<G id="Group 2">
<Circle id="Ellipse 1" cx="27" cy="27" r="26" fill="#59981A" stroke="white" stroke-width="2"/>
</G>
<G id="Group 8">
<Path id="Line 11" d="M17 27L25 36" stroke="white" stroke-width="2" stroke-linecap="round"/>
<Path id="Line 12" d="M25.168 36.4453L37 17" stroke="white" stroke-width="2" stroke-linecap="round"/>
</G>
</G>
</Svg>
);

export default FilledCheckCircle;