// where the currents tasks WOULD be available but if no tasks are saved then a "Add New Task" message is displayed

import React, {useState} from 'react';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context'
import { KeyboardAvoidingView, Text, View, TextInput, Platform, TouchableOpacity } from 'react-native';
import styles from '../styling/HomeScreen1Styles';
import AddButton from '../components/Add-button'; // adjust path if needed
import Arrow from '../components/Arrow';
import BigBox from '../components/BigBox';
import LongLine from '../components/LongLine';
import SmallBox from '../components/SmallBox';
import ShortLine from '../components/ShortLine';
import DeleteBox from '../components/DeleteBox';

export default function HomeScreen1() {
    const navigation = useNavigation();

    const handleAddButtonPress = () => {
      navigation.navigate('NewTask'); 
    };

    return (
    <SafeAreaView style={styles.tasksWrapper}>
        <Text style={styles.sectionTitle}>To Do List</Text>
        <Text style={styles.firstSection1}>You don't have any </Text>
        <Text style={styles.firstSection1}> tasks currently listed</Text>
        <Text style={styles.firstSection3}>Add New Task Here</Text>
        <AddButton style={styles.addbutton} onPress={handleAddButtonPress}/>
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

<View style={{alignContent: 'center'}}>        
<DeleteBox style={styles.deletebox}/>
<Text style={styles.deletetext1}>Delete</Text>
<Text style={styles.deletetext2}>Are you sure you want to</Text>
<Text style={styles.deletetext3}>delete your task?</Text>
<Text style={styles.deletetext4}>Cancel</Text>
<Text style={styles.deletetext5}>Confirm</Text>
</View>

