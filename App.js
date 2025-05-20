import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import AppNavigation from './navigation/appNavigation.js';
import { useFonts } from 'expo-font';
import * as Font from 'expo-font';
import React from 'react';


export default function App() {
const [fontsLoaded] = useFonts({
  'NexaBold': require('./assets/fonts/NexaBold.ttf'),
  'NexaLight': require('./assets/fonts/NexaLight.ttf'),
  });
    
  
  if (!fontsLoaded) {
  return null;
  }

  return (
    <AppNavigation />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
