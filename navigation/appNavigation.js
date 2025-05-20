import { NavigationContainer } from '@react-navigation/native'; 
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen2 from '../src/screens/HomeScreen2.js'

const Stack = createNativeStackNavigator();

export default function AppNavigation() {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="HomeScreen2" options={{headerShown: false}} component={HomeScreen2}/>
            </Stack.Navigator>
        </NavigationContainer>
    )
}