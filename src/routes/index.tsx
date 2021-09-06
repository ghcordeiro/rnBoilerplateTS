import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Splash from '../pages/Splash';
import Home from '../pages/Home';


const Stack = createNativeStackNavigator();

function Routes() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          animation: 'fade_from_bottom',
          animationTypeForReplace: 'push',
          gestureEnabled: true
        }}
        initialRouteName="Splash">
        <Stack.Screen
          name="Splash"
          component={Splash}
        />

        <Stack.Screen
          name="Home"
          component={Home}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Routes;
