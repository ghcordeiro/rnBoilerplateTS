import React from 'react';
import { NavigationContainerRef } from '@react-navigation/native';
import Toast from 'react-native-tiny-toast';

export const navigationRef = React.createRef<NavigationContainerRef>();

export function navigate(name: string, params?: any) {
  Toast.show(`navigate(${name}) `);
  navigationRef.current?.navigate(name, params);
}
