// newTask.js
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  KeyboardAvoidingView,
  Text,
  View,
  TextInput,
  Platform,
  TouchableOpacity,
  Keyboard,
  TouchableWithoutFeedback,
} from 'react-native';
import styles from '../styling/NewTaskStyling';
import CloseXWhite from '../components/CloseXWhite';
import InputBox from '../components/InputBox';
import FilledCheckCircle from '../components/FilledCheckCircle';
import OpenCheckCircle from '../components/OpenCheckCirlce';
import { useNavigation } from '@react-navigation/native';
import DateTimePicker from '@react-native-community/datetimepicker';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function NewTask() {
  const navigation = useNavigation();
  const [taskTitle, setTaskTitle] = useState('');
  const [dueDate, setDueDate] = useState(null);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [timeSensitive, setTimeSensitive] = useState(null);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const handleClose = () => {
    navigation.goBack(); 
  };
  const dismissAll = () => {
    Keyboard.dismiss();
    setShowDatePicker(false);
    setShowTimePicker(false);
  };
  const saveTask = async () => {
    try {
      const task = {
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
  
      const existingTasks = await AsyncStorage.getItem('TASKS');
      const tasks = existingTasks ? JSON.parse(existingTasks) : [];
  
      tasks.push(task);
      await AsyncStorage.setItem('TASKS', JSON.stringify(tasks));
  
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
          placeholder="Enter task title"
        />

        <Text style={styles.sectionbody2}>Due Date</Text>
        <View style={{ marginVertical: 10 }}>
          <TouchableOpacity
            onPress={() => setShowDatePicker(!showDatePicker)}
            style={styles.dateBox1}
          >
            <Text style={styles.dateText1}>
              {dueDate ? dueDate.toLocaleDateString() : 'Select Due Date'}
            </Text>
          </TouchableOpacity>

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
