// where the currents tasks WOULD be available but if no tasks are saved then a "Add New Task" message is displayed

import React, {useState} from 'react';
import { SafeAreaView } from 'react-native-safe-area-context'
import { KeyboardAvoidingView, Text, View, TextInput, Platform, TouchableOpacity } from 'react-native';
import styles from '../styling/HomeScreen1Styles';
import AddButton from '../components/Add-button'; // adjust path if needed
import Arrow from '../components/Arrow';
import BigBox from '../components/BigBox';
import LongLine from '../components/LongLine';
import SmallBox from '../components/SmallBox';
import ShortLine from '../components/ShortLine';

export default function HomeScreen1() {


    return (
    <SafeAreaView style={styles.tasksWrapper}>
        <Text style={styles.sectionTitle}>To Do List</Text>
        <Text style={styles.firstSection1}>You don't have any </Text>
        <Text style={styles.firstSection1}> tasks currently listed</Text>
        <Text style={styles.firstSection3}>Add New Task Here</Text>
        <AddButton style={styles.addbutton}/>
        <Arrow style={styles.arrow}/>
        <BigBox style={styles.bigbox}/>
        <LongLine style={styles.longline1}/>
        <LongLine style={styles.longline2}/>
        <LongLine style={styles.longline3}/>
        <SmallBox style={styles.smallbox1}/>
        <SmallBox style={styles.smallbox2}/>
        <SmallBox style={styles.smallbox3}/>
        <ShortLine style={styles.shortline1}/>
        <ShortLine style={styles.shortline2}/>
        <ShortLine style={styles.shortline3}/>
        <View style={styles.iphone1415ProMax1Inner} />
    </SafeAreaView>
    )
}

