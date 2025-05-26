import React, { useEffect, useState } from 'react';
import AppNavigation from './navigation/appNavigation.js';
import { useFonts } from 'expo-font';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ActivityIndicator, View } from 'react-native';


export default function App() {
  const [fontsLoaded] = useFonts({
    'NexaBold': require('./assets/fonts/NexaBold.ttf'),
    'NexaLight': require('./assets/fonts/NexaLight.ttf'),
  });

  const [initialRoute, setInitialRoute] = useState(null);

  useEffect(() => {
    const checkTasks = async () => {
      try {
        const taskData = await AsyncStorage.getItem('currentTask');
        if (taskData) {
          setInitialRoute('HomeScreen2');
        } else {
          setInitialRoute('HomeScreen1');
        }
      } catch (e) {
        console.error('Error checking stored tasks:', e);
        setInitialRoute('HomeScreen1');
      }
    };

    checkTasks();
  }, []);

  if (!fontsLoaded || initialRoute === null) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#81B622" />
      </View>
    );
  }

  return <AppNavigation initialRouteName={initialRoute} />;
}
