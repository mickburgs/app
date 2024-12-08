import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import MenuScreen from './screens/MenuScreen';
import TicTacToeScreen from './screens/TicTacToeScreen';

const Stack = createStackNavigator();

export default function App() {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Menu">
                <Stack.Screen name="Menu" component={MenuScreen} options={{ headerShown: false }} />
                <Stack.Screen name="Game" component={TicTacToeScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}
