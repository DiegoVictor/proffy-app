import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { Landing } from '../pages/Landing';
import { GiveClasses } from '../pages/GiveClasses';
import { StudyTabs } from './StudyTabs';

export type StackParamList = {
  Landing: undefined;
  GiveClasses: undefined;
  Study: undefined;
};

const { Navigator, Screen } = createNativeStackNavigator<StackParamList>();

const AppStack: React.FC = () => {
  return (
    <NavigationContainer>
      <Navigator
        screenOptions={{ headerShown: false }}
        initialRouteName="Landing"
      >
        <Screen name="Landing" component={Landing} />
        <Screen name="GiveClasses" component={GiveClasses} />
        <Screen name="Study" component={StudyTabs} />
      </Navigator>
    </NavigationContainer>
  );
};

export { AppStack };
