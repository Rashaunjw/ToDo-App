import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';

import HomeScreen1 from '../src/screens/HomeScreen1';
import HomeScreen2 from '../src/screens/HomeScreen2';
import NewTask from '../src/screens/NewTask';
import EditTask from '../src/screens/editTask';

const Stack = createNativeStackNavigator();

export default function AppNavigation() {
  const [initialRoute, setInitialRoute] = useState(null); 

  useEffect(() => {
    const checkStoredTasks = async () => {
      try {
        const tasks = await AsyncStorage.getItem('TASKS');
        if (tasks && JSON.parse(tasks).length > 0) {
          setInitialRoute('HomeScreen2');
        } else {
          setInitialRoute('HomeScreen1');
        }
      } catch (error) {
        console.error('Failed to load tasks from storage:', error);
        setInitialRoute('HomeScreen1'); 
      }
    };

    checkStoredTasks();
  }, []);

  if (!initialRoute) return null;

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={initialRoute} screenOptions={{ headerShown: false }}>
        <Stack.Screen name="HomeScreen1" component={HomeScreen1} />
        <Stack.Screen name="HomeScreen2" component={HomeScreen2} />
        <Stack.Screen name="NewTask" component={NewTask} />
        <Stack.Screen name="EditTask" component={EditTask} />

      </Stack.Navigator>
    </NavigationContainer>
  );
}
