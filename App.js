import "react-native-gesture-handler";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import React from 'react';
import { StyleSheet, LogBox } from 'react-native';
import Settings from './Components/Settings';
import Quizz from './Components/Quizz';
import {Provider} from 'react-redux';
import Store from './Store/configureStore';

const Stack = createStackNavigator();

export default function App() {
  LogBox.ignoreLogs(['Remote debugger']);
  return (
    <Provider store={Store}>
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Paramètres" component={Settings}/>
        <Stack.Screen name="Quizz" component={Quizz}/>
      </Stack.Navigator>
    </NavigationContainer>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
