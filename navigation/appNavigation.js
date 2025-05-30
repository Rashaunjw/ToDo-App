// navigation file between each page

import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import HomeScreen1 from '../src/screens/HomeScreen1';
import HomeScreen2 from '../src/screens/HomeScreen2';
import NewTask from '../src/screens/NewTask';
import EditTask from '../src/screens/editTask';

// create a native stack navigator
const Stack = createNativeStackNavigator();

export default function AppNavigation() {
  // this state decides which screen is loaded first
  const [initialRoute, setInitialRoute] = useState(null); 

  useEffect(() => {
    // check if tasks exist in AsyncStorage to determine intial route
    const checkStoredTasks = async () => {
      try {
        const tasks = await AsyncStorage.getItem('TASKS');
        if (tasks && JSON.parse(tasks).length > 0) {
          setInitialRoute('HomeScreen2'); // show task list if tasks exist
        } else {
          setInitialRoute('HomeScreen1'); // show welcome screen if no tasks exist
        }
      } catch (error) {
        console.error('Failed to load tasks from storage:', error);
        setInitialRoute('HomeScreen1'); // fallback route
      }
    };

    checkStoredTasks();
  }, []);

  // prevent rendering navigation container until initialRoute is determined
  if (!initialRoute) return null;

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={initialRoute} screenOptions={{ headerShown: false }}>
        {/* defines all app screens */}
        <Stack.Screen name="HomeScreen1" component={HomeScreen1} />
        <Stack.Screen name="HomeScreen2" component={HomeScreen2} />
        <Stack.Screen name="NewTask" component={NewTask} />
        <Stack.Screen name="EditTask" component={EditTask} />

      </Stack.Navigator>
    </NavigationContainer>
  );
}
