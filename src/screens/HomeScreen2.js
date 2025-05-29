
import React, { useState, useEffect } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  Text,
  View,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import styles from '../styling/HomeScreen2Styles';
import AddButton from '../components/Add-button';
import TaskTangle from '../components/TaskTangle';
import SmallBox from '../components/SmallBox';
import SmallBox2 from '../components/SmallBox2';
import CloseX from '../components/CloseX';
import CheckIcon from '../components/Check';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import DeleteBox from '../components/DeleteBox';

export default function HomeScreen2() {
  const [tasks, setTasks] = useState([]);
  const [showDeleteBox, setShowDeleteBox] = useState(false);
  const [taskToDeleteIndex, setTaskToDeleteIndex] = useState(null);
  const navigation = useNavigation();

  const handleAddButtonPress = () => {
    navigation.navigate('NewTask');
  };

  const fetchTasks = async () => {
    try {
      const savedTasks = await AsyncStorage.getItem('tasks');
      if (savedTasks) {
        const parsedTasks = JSON.parse(savedTasks);

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

  const toggleCheck = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks[index].checked = !updatedTasks[index].checked;
    setTasks(updatedTasks);
    AsyncStorage.setItem('tasks', JSON.stringify(updatedTasks));
  };

  const handleDeletePress = (index) => {
    setTaskToDeleteIndex(index);
    setShowDeleteBox(true);
  };

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

  useEffect(() => {
    fetchTasks();
  }, []);

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

      <ScrollView contentContainerStyle={{ borderRadius: 15 }} style={{ marginBottom: -10 }}>
        {tasks.map((task, index) => (
          <View key={task.id || index} style={{ alignItems: 'center', marginBottom: 20 }}>
            <View style={{ width: 400, minHeight: 82, position: 'relative' }}>
              <TouchableOpacity
                onPress={() => navigation.navigate('EditTask', { task, index })}
                activeOpacity={0.9}
                style={{ width: 400, height: 82, position: 'relative' }}
              >
                <TaskTangle task={task} />

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
                  }}
                >
                  {task.checked ? (
                    <>
                      <SmallBox style={styles.smallbox} />
                      <CheckIcon style={styles.checkicon} />
                    </>
                  ) : (
                    <SmallBox2 style={styles.smallbox2} />
                  )}
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => handleDeletePress(index)}
                  hitSlop={{ top: 15, bottom: 15, left: 15, right: 15 }}
                  style={{
                    position: 'absolute',
                    top: 15,
                    right: 20,
                    zIndex: 2,
                  }}
                >
                  <CloseX style={styles.closex} />
                </TouchableOpacity>

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
                        marginBottom: (task.date || task.time) ? -2 : -15, 
                        marginTop: (task.date || task.time) ? 0 : 10,     
                      },
                    ]}
                  >
                    {task.title}
                  </Text>
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
          <TouchableOpacity
            onPress={() => {
              setShowDeleteBox(false);
              setTaskToDeleteIndex(null);
            }}
            hitSlop={{ top: 15, bottom: 15, left: 15, right: 15 }}
          >
            <Text style={styles.deletetext4}>Cancel</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              deleteTasks(taskToDeleteIndex);
              setShowDeleteBox(false);
              setTaskToDeleteIndex(null);
            }}
            hitSlop={{ top: 15, bottom: 15, left: 15, right: 15 }}
          >
            <Text style={styles.deletetext5}>Confirm</Text>
          </TouchableOpacity>
        </View>
      )}

      <View style={styles.iphone1415ProMax1Inner} />
    </SafeAreaView>
  );
}

