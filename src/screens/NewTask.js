// NewTask page where all current tasks will be displayed

import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Text, View, Platform, TouchableOpacity, Keyboard, TouchableWithoutFeedback } from 'react-native';
import styles from '../styling/NewTaskStyling';
import CloseXWhite from '../components/CloseXWhite';
import InputBox from '../components/InputBox';
import FilledCheckCircle from '../components/FilledCheckCircle';
import OpenCheckCircle from '../components/OpenCheckCirlce';
import DateTimePicker from '@react-native-community/datetimepicker';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function NewTask() {
  const navigation = useNavigation();

  // state hooks to hold task information
  const [taskTitle, setTaskTitle] = useState('');
  const [dueDate, setDueDate] = useState(null);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [timeSensitive, setTimeSensitive] = useState(null);
  const [showTimePicker, setShowTimePicker] = useState(false);

  // navigates back to previous screen when "X" button is pressed
  const handleClose = () => {
    navigation.goBack(); 
  };
  
  // hide date and time pickers and closing keyboard when tapping outside
  const dismissAll = () => {
    Keyboard.dismiss();
    setShowDatePicker(false);
    setShowTimePicker(false);
  };

  // saves new task to AsyncStorage and navigates back to HomeScreen2
  const saveTask = async () => {
    try {
      const task = {
        id: Date.now().toString(), // unique ID based on timestamp
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
        checked: false
      };
      
      const existingTasks = await AsyncStorage.getItem('tasks');
      const tasks = existingTasks ? JSON.parse(existingTasks) : [];
      tasks.push(task);
      await AsyncStorage.setItem('tasks', JSON.stringify(tasks));
      navigation.navigate('HomeScreen2');
    } catch (e) {
      console.error('Failed to save task:', e);
    }
  };


  return (
    <TouchableWithoutFeedback onPress={dismissAll}>
      <SafeAreaView style={styles.tasksWrapper}>
        <Text style={styles.sectionTitle}>To Do List</Text>
        <Text style={styles.sectionheader}>New Task</Text>
        <Text style={styles.sectionbody1}>Task Title*</Text>
        <InputBox
          style={styles.inputbox1}
          value={taskTitle}
          onChangeText={(text) => setTaskTitle(text)}
          placeholder="Enter task title"/>

        <Text style={styles.sectionbody2}>Due Date</Text>
        <View style={{ marginVertical: 10 }}>
          <TouchableOpacity
            onPress={() => setShowDatePicker(!showDatePicker)}
            style={styles.dateBox1}>

            <Text style={styles.dateText1}>
              {dueDate ? dueDate.toLocaleDateString() : 'Select Due Date'}
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
        <TouchableOpacity onPress={() => setShowTimePicker(!showTimePicker)} style={styles.dateBox2}>
        <Text style={styles.dateText2}> {timeSensitive ? timeSensitive.toLocaleTimeString([], {hour: '2-digit', minute: '2-digit', hour12: true}): 'Select Time'}</Text>
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
