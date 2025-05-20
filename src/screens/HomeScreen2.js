// where the current tasks of the user will be available
import React, {useState} from 'react';
import { SafeAreaView } from 'react-native-safe-area-context'
import { KeyboardAvoidingView, Text, View, TextInput, Platform, TouchableOpacity } from 'react-native';
import styles from '../styling/HomeScreen2Styles';
import AddButton from '../components/Add-button';
import TaskTangle from '../components/TaskTangle';

export default function HomeScreen2() {


    return (
    <SafeAreaView style={styles.tasksWrapper}>
        <Text style={styles.sectionTitle}>To Do List</Text>
        <Text style={styles.firstSection1}>Current Tasks</Text>
        <TaskTangle style={styles.tasktangle1}/>
        <TaskTangle style={styles.tasktangle2}/>
        <TaskTangle style={styles.tasktangle3}/>
        <TaskTangle style={styles.tasktangle4}/>
        <AddButton style={styles.addbutton}/>
        
        <View style={styles.iphone1415ProMax1Inner} />
    </SafeAreaView>
    )
}