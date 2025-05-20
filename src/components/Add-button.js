import * as React from "react";
import Svg, { Circle, Path, G } from "react-native-svg";

const AddButton = (props) => (
  <Svg width={54} height={54} viewBox="0 0 54 54" fill="none" {...props}>
    <G id="Group 2">
      <Circle cx={27} cy={27} r={26} fill="#59981A" stroke="white" strokeWidth={2} />
      <Path d="M27 15V39" stroke="white" strokeWidth={2} strokeLinecap="round" />
      <Path d="M16 26L38 26" stroke="white" strokeWidth={2} strokeLinecap="round" />
    </G>
  </Svg>
);

export default AddButton;