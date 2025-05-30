// where current tasks are displayed

import React, { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Text, View, TouchableOpacity, ScrollView } from 'react-native';
import styles from '../styling/HomeScreen2Styles';
import AddButton from '../components/Add-button';
import TaskTangle from '../components/TaskTangle';
import SmallBox from '../components/SmallBox';
import SmallBox2 from '../components/SmallBox2';
import CloseX from '../components/CloseX';
import CheckIcon from '../components/Check';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DeleteBox from '../components/DeleteBox';

export default function HomeScreen2() {
  const [tasks, setTasks] = useState([]);
  const [showDeleteBox, setShowDeleteBox] = useState(false);
  const [taskToDeleteIndex, setTaskToDeleteIndex] = useState(null);
  const navigation = useNavigation();

  // navigation to NewTask screen
  const handleAddButtonPress = () => {
    navigation.navigate('NewTask');
  };

  // load tasks from AsyncStorage and sort them by date
  const fetchTasks = async () => {
    try {
      const savedTasks = await AsyncStorage.getItem('tasks');
      if (savedTasks) {
        const parsedTasks = JSON.parse(savedTasks);

        // sort by month/day if available
        parsedTasks.sort((a, b) => {
          const aHasDate = a.date;
          const bHasDate = b.date;

          if (aHasDate && bHasDate) {
            const [aMonth, aDay] = a.date.split('/').map(Number);
            const [bMonth, bDay] = b.date.split('/').map(Number);
            if (aMonth !== bMonth) return aMonth - bMonth;
            return aDay - bDay;
          }

          if (aHasDate) return -1;
          if (bHasDate) return 1;
          return 0;
        });

        if (parsedTasks.length === 0) {
          navigation.replace('HomeScreen1');
        } else {
          setTasks(parsedTasks);
        }
      } else {
        navigation.replace('HomeScreen1');
      }
    } catch (e) {
      console.error('Failed to load tasks:', e);
    }
  };

  // toggle check on a task
  const toggleCheck = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks[index].checked = !updatedTasks[index].checked;
    setTasks(updatedTasks);
    AsyncStorage.setItem('tasks', JSON.stringify(updatedTasks));
  };

  // prompt to confirm deletion
  const handleDeletePress = (index) => {
    setTaskToDeleteIndex(index);
    setShowDeleteBox(true);
  };

  // delete a task and update storage
  const deleteTasks = async (indexToRemove) => {
    try {
      const updatedTasks = tasks.filter((_, index) => index !== indexToRemove);
      setTasks(updatedTasks);
      await AsyncStorage.setItem('tasks', JSON.stringify(updatedTasks));
      if (updatedTasks.length === 0) {
        navigation.replace('HomeScreen1');
      }
    } catch (e) {
      console.error('Failed to delete task:', e);
    }
  };

  // initial load of tasks
  useEffect(() => {
    fetchTasks();
  }, []);

  // reload tasks when screen regains focus
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      fetchTasks();
    });
    return unsubscribe;
  }, [navigation]);

  return (
    <SafeAreaView style={styles.tasksWrapper}>
      <Text style={styles.sectionTitle}>To Do List</Text>
      <Text style={styles.firstSection1}>Current Tasks</Text>

      {/* scrollable task list */}
      <ScrollView contentContainerStyle={{ borderRadius: 15 }} style={{ marginBottom: -10 }}>
        {tasks.map((task, index) => (
          <View key={task.id || index} style={{ alignItems: 'center', marginBottom: 20 }}>
            <View style={{ width: 400, minHeight: 82, position: 'relative' }}>
             {/* TaskTangle is tappable to edit the task */}
              <TouchableOpacity
                onPress={() => navigation.navigate('EditTask', { task, index })}
                activeOpacity={0.9}
                style={{ width: 400, height: 82, position: 'relative' }}>

                <TaskTangle task={task} />

                {/* toggle task check status */}
                <TouchableOpacity
                  onPress={() => toggleCheck(index)}
                  hitSlop={{ top: 65, bottom: 85, left: 65, right: 55 }}
                  style={{
                    position: 'absolute',
                    top: 22,
                    left: 15,
                    width: 40,
                    height: 40,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>

                  {task.checked ? (
                    <>
                      <SmallBox style={styles.smallbox} />
                      <CheckIcon style={styles.checkicon} />
                    </>
                  ) : (
                    <SmallBox2 style={styles.smallbox2} />
                  )}
                </TouchableOpacity>

                {/* Open delete confirmation */}
                <TouchableOpacity
                  onPress={() => handleDeletePress(index)}
                  hitSlop={{ top: 15, bottom: 15, left: 15, right: 15 }}
                  style={{
                    position: 'absolute',
                    top: 15,
                    right: 20,
                    zIndex: 2,
                  }}>

                  <CloseX style={styles.closex} />
                </TouchableOpacity>

                {/* Title and time display centered in TaskTangle */}
                <View
                  style={{
                    position: 'absolute',
                    top: 5,
                    bottom: 0,
                    left: 60,
                    right: 60,
                    justifyContent: 'center',
                    alignItems: 'center',
                    paddingHorizontal: 20,
                    paddingVertical: 0,
                    zIndex: 1,
                  }}
                >
                  <Text
                    style={[
                      styles.firstSection2,
                      {
                        textAlign: 'center',
                        flexWrap: 'wrap',
                        // margins change depending on if there is a due date with a time constriction or if its just the title
                        marginBottom: (task.date || task.time) ? -2 : -15, 
                        marginTop: (task.date || task.time) ? 0 : 10,     
                      },
                    ]}
                  >
                    {task.title}
                  </Text>
                  {/* printing either title with just date, title with just time, or title with both date and time */}
                  <Text style={[styles.firstSection3, { textAlign: 'center', minHeight: 22 }]}>
                  {(task.date || '') + (task.date && task.time ? ' @ ' : '') + (task.time || '')}
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </ScrollView>

      <AddButton style={styles.addbutton} onPress={handleAddButtonPress} />

      {/* conditional that renders the delete task box whenever a user presses the x button */}
      {showDeleteBox && (
        <View style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0,0,0,0.6)',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 999,
        }}>
          <DeleteBox style={styles.deletebox} index={taskToDeleteIndex} />
          <Text style={styles.deletetext1}>Delete</Text>
          <Text style={styles.deletetext2}>Are you sure you want to</Text>
          <Text style={styles.deletetext3}>delete your task?</Text>
          {/* cancel deletion */}
          <TouchableOpacity
            onPress={() => {
              setShowDeleteBox(false);
              setTaskToDeleteIndex(null);
            }}
            hitSlop={{ top: 15, bottom: 15, left: 15, right: 15 }}>
          <Text style={styles.deletetext4}>Cancel</Text>
          </TouchableOpacity>
          {/* confirm deletion */}
          <TouchableOpacity
            onPress={() => {
              deleteTasks(taskToDeleteIndex);
              setShowDeleteBox(false);
              setTaskToDeleteIndex(null);
            }}
            hitSlop={{ top: 15, bottom: 15, left: 15, right: 15 }}>
            <Text style={styles.deletetext5}>Confirm</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* view that renders the color of the screen */}
      <View style={styles.iphone1415ProMax1Inner} />
    </SafeAreaView>
  );
}

