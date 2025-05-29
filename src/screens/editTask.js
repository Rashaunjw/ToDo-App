// EditTask.js
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
import { useRoute } from '@react-navigation/native';
import { useEffect } from 'react';

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

  const [taskTitle, setTaskTitle] = useState('');
  const [dueDate, setDueDate] = useState(null);
  const [showDatePicker, setShowDatePicker] = useState(false);

  const [timeSensitive, setTimeSensitive] = useState(null);
  const [showTimePicker, setShowTimePicker] = useState(false);

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
    
  const [title, setTitle] = useState(task.title);
  const [date, setDate] = useState(task.date || '');
  const [time, setTime] = useState(task.time || '');

  const handleSave = async () => {
    try {
      const savedTasks = await AsyncStorage.getItem('tasks');
      let tasks = JSON.parse(savedTasks) || [];

      // Replace the task at the original index
      tasks[index] = {
        ...tasks[index],
        title,
        date,
        time,
      };

      await AsyncStorage.setItem('tasks', JSON.stringify(tasks));
      navigation.goBack(); // Return to HomeScreen2
    } catch (e) {
      console.error('Failed to update task:', e);
    }
  };
  
  const handleClose = () => {
    navigation.goBack(); // navigate back
  };

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
          placeholder="Enter task title"
        />

        <Text style={styles.sectionbody2}>Due Date</Text>
        <View style={{ marginVertical: 10 }}>
          <TouchableOpacity
            onPress={() => setShowDatePicker(!showDatePicker)}
            style={styles.dateBox1}
          >
<Text style={styles.dateText1}>
  {dueDate instanceof Date && !isNaN(dueDate)
    ? dueDate.toLocaleDateString()
    : 'Select Due Date'}
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
          <TouchableOpacity
            onPress={() => setShowTimePicker(!showTimePicker)}
            style={styles.dateBox2}
          >
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