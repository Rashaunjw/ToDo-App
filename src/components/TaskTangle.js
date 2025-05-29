import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Svg, { Path } from 'react-native-svg';

const TaskTangle = ({ task }) => {
    if (!task || !task.title) return null;
return (
  <View style={styles.container}>
    <Svg width="400" height="82" viewBox="0 0 400 82" fill="none" xmlns="http://www.w3.org/2000/svg" style={styles.background}>
      <Path
        d="M25 1.5H375C387.979 1.5 398.5 12.0213 398.5 25V57C398.5 69.9787 387.979 80.5 375 80.5H25C12.0213 80.5 1.5 69.9787 1.5 57V25C1.5 12.0213 12.0213 1.5 25 1.5Z"
        fill="#3D550C"
        stroke="#ECF87F"
        strokeWidth="3"
      />
    </Svg>
    <View style={styles.textContainer}>
      {task.dueDate && <Text style={styles.details}>{task.dueDate} {task.time}</Text>}
    </View>
  </View>
);
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    marginTop: 0,
  },
  background: {
    position: 'absolute',
    top: 0,
    left: 0,
  },
  textContainer: {
    paddingTop: 20,
    paddingHorizontal: 40,
  },

  title: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },

  details: {
    color: '#FFF',
    fontSize: 17,
    fontFamily: 'Nexa',
    alignSelf: 'center',
  },
});

export default TaskTangle;
