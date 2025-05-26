import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';

const InputBox = ({ value, onChangeText, style, ...props }) => {
  return (
    <View style={[styles.container, style]}>
      <TextInput
        value={value}
        onChangeText={onChangeText}
        style={styles.input}
        placeholderTextColor="#3D550C"
        {...props}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderWidth: 3,
    borderColor: '#3D550C',
    backgroundColor: 'white',
    borderRadius: 20,
    paddingHorizontal: 10,
    
  },
  input: {
    height: 35,
    fontSize: 16,
    color: '#3D550C',
  },
});

export default InputBox;
