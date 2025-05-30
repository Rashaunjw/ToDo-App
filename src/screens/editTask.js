// EditTask.js

import React, { useState, useEffect } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Text, View, Platform, TouchableOpacity, Keyboard, TouchableWithoutFeedback } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import styles from '../styling/NewTaskStyling';
import CloseXWhite from '../components/CloseXWhite';
import InputBox from '../components/InputBox';
import FilledCheckCircle from '../components/FilledCheckCircle';
import OpenCheckCircle from '../components/OpenCheckCirlce';
import DateTimePicker from '@react-native-community/datetimepicker';
import AsyncStorage from '@react-native-async-storage/async-storage';

// function to parse time string into a Date object
function parseTimeString(timeString) {
  if (!timeString || typeof timeString !== 'string') return null;

  const trimmed = timeString.trim();
  const match = trimmed.match(/^(\d{1,2}):(\d{2})\s*(AM|PM)$/i);

  if (!match) return null;

  let [, hours, minutes, modifier] = match;
  hours = parseInt(hours, 10);
  minutes = parseInt(minutes, 10);

  if (modifier.toUpperCase() === 'PM' && hours !== 12) {
    hours += 12;
  } else if (modifier.toUpperCase() === 'AM' && hours === 12) {
    hours = 0;
  }

  const date = new Date();
  date.setHours(hours, minutes, 0, 0);

  return date;
}

export default function EditTask() {
  const navigation = useNavigation();
  const route = useRoute();
  const { task, index } = route.params;

  // state to hold edited task fields
  const [taskTitle, setTaskTitle] = useState('');
  const [dueDate, setDueDate] = useState(null);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [timeSensitive, setTimeSensitive] = useState(null);
  const [showTimePicker, setShowTimePicker] = useState(false);

  // save updated task back to AsyncStorage
  const saveTask = async () => {
    try {
      const updatedTask = {
        title: taskTitle,
        date: dueDate
          ? dueDate.toLocaleDateString('en-US', { month: 'numeric', day: 'numeric' })
          : null,
        time: timeSensitive
          ? timeSensitive.toLocaleTimeString([], {
              hour: '2-digit',
              minute: '2-digit',
              hour12: true,
            })
          : null,
      };
    
      const existingTasks = await AsyncStorage.getItem('tasks');
      const tasks = existingTasks ? JSON.parse(existingTasks) : [];
  
      if (index != null && tasks[index]) {
        tasks[index] = updatedTask;
        await AsyncStorage.setItem('tasks', JSON.stringify(tasks));
        navigation.navigate('HomeScreen2');
      } else {
        console.error('Invalid task index');
      }
    } catch (e) {
      console.error('Failed to save task:', e);
    }
  };
    
  useEffect(() => {
    if (task) {
      setTaskTitle(task.title || '');
  
      if (task.date) {
        const [month, day] = task.date.split('/').map(Number);
        const dateObj = new Date();
        dateObj.setMonth(month - 1);
        dateObj.setDate(day);
        setDueDate(dateObj);
      }
  
      if (task.time) {
        const parsedTime = parseTimeString(task.time);
        if (parsedTime instanceof Date && !isNaN(parsedTime)) {
          setTimeSensitive(parsedTime);
        } else {
          console.warn('Invalid time format:', task.time);
        }
      }
    }
  }, [task]);
    
  
  const handleClose = () => {
    navigation.goBack(); 
  };

  // hide date and time pickers and closing keyboard when tapping outside
  const dismissAll = () => {
    Keyboard.dismiss();
    setShowDatePicker(false);
    setShowTimePicker(false);
  };

  return (
    <TouchableWithoutFeedback onPress={dismissAll}>
      <SafeAreaView style={styles.tasksWrapper}>
        <Text style={styles.sectionTitle}>To Do List</Text>
        <Text style={styles.sectionheader}>Edit Task</Text>

        <Text style={styles.sectionbody1}>Task Title*</Text>
        <InputBox
          style={styles.inputbox1}
          value={taskTitle}
          onChangeText={(text) => setTaskTitle(text)}
          placeholder="Enter task title" />

        <Text style={styles.sectionbody2}>Due Date</Text>
        <View style={{ marginVertical: 10 }}>
          <TouchableOpacity
            onPress={() => setShowDatePicker(!showDatePicker)}
            style={styles.dateBox1}>
            <Text style={styles.dateText1}>
              {dueDate instanceof Date && !isNaN(dueDate)
                ? dueDate.toLocaleDateString()
                : 'Select Due Date'}
            </Text>
          </TouchableOpacity>

          {/* conditional that renders the date picker box whenever a user presses the Due Date box */}
          {showDatePicker && (
            <View style={styles.pickerContainer}>
              <DateTimePicker
                value={dueDate || new Date()}
                mode="date"
                display="inline"
                onChange={(event, selectedDate) => {
                  if (selectedDate) setDueDate(selectedDate);
                  setShowDatePicker(false);
                }}
              />
            </View>
          )}
        </View>

      <Text style={styles.sectionbody3}>Time Sensitive?</Text>
      <View style={{ marginVertical: 10 }}>
        <TouchableOpacity
          onPress={() => setShowTimePicker(!showTimePicker)}
          style={styles.dateBox2}>   
          <Text style={styles.dateText2}>
            {timeSensitive
              ? timeSensitive.toLocaleTimeString([], {
                  hour: '2-digit',
                  minute: '2-digit',
                  hour12: true,
                })
              : 'Select Time'}
          </Text>
        </TouchableOpacity>

        {/* conditional that renders the time picker if the user clicks the Time Sensitive? box */}
        {showTimePicker && (
          <View style={styles.pickerContainer2}>
            <DateTimePicker
              value={timeSensitive || new Date()}
              mode="time"
              display={Platform.OS === 'ios' ? 'spinner' : 'default'}
              onChange={(event, selectedTime) => {
                if (event.type === 'set') {
                  setTimeSensitive(selectedTime);
                  setShowTimePicker(false);
                } else {
                  setShowTimePicker(false);
                }
              }}
            />
          </View>
        )}
      </View>

      <CloseXWhite style={styles.closexwhite} onPress={handleClose} />

      {/* conditional that renders the open and filled check circles if there is input */}
      {(taskTitle?.trim()?.length > 0) ? (
        <TouchableOpacity onPress={saveTask}>
          <FilledCheckCircle style={styles.filledcheckcircle} />
        </TouchableOpacity>
        ) : (
        <OpenCheckCircle style={styles.opencheckcircle} />
      )}
      <View style={styles.iphone1415ProMax1Inner} />
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
}