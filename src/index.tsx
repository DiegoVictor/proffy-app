import { useEffect, useState } from 'react';
import { createStaticNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import {
  Archivo_400Regular,
  Archivo_700Bold,
} from '@expo-google-fonts/archivo';
import {
  Poppins_400Regular,
  Poppins_600SemiBold,
} from '@expo-google-fonts/poppins';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { Ionicons } from '@react-native-vector-icons/ionicons';
import { Landing } from './pages/Landing';
import { GiveClasses } from './pages/GiveClasses';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { TeacherList } from './pages/Study/TeacherList';
import { Favorites } from './pages/Study/Favorites';
import { AppProvider } from './contexts/AppContext';

export type StackParamList = {
  Landing: undefined;
  GiveClasses: undefined;
  Study: {
    TeacherList: undefined;
    Favorites: undefined;
  };
};

const BottomTabNavigator = createBottomTabNavigator<StackParamList['Study']>({
  screenOptions: {
    tabBarActiveBackgroundColor: '#ebebf5',
    tabBarActiveTintColor: '#32264d',
    tabBarInactiveBackgroundColor: '#fafafc',
    tabBarInactiveTintColor: '#c1bccc',
    tabBarIconStyle: {
      flex: 0,
      height: 20,
      width: 20,
    },
    tabBarItemStyle: {
      alignItems: 'center',
      flexDirection: 'row',
      justifyContent: 'center',
    },
    tabBarLabelStyle: {
      fontFamily: 'Archivo_700Bold',
      fontSize: 13,
      marginLeft: 16,
    },
    tabBarStyle: {
      elevation: 0,
      height: 64,
      shadowOpacity: 0,
    },
  },
  screens: {
    TeacherList: {
      screen: TeacherList,
      options: {
        headerShown: false,
        tabBarLabel: 'Proffys',
        tabBarIcon: ({ color, size, focused }) => (
          <Ionicons
            name="easel"
            size={size}
            color={focused ? '#8257e5' : color}
          />
        ),
      },
    },
    Favorites: {
      screen: Favorites,
      options: {
        headerShown: false,
        tabBarLabel: 'Favoritos',
        tabBarIcon: ({ color, size, focused }) => {
          return (
            <Ionicons
              name="heart"
              size={size}
              color={focused ? '#8257e5' : color}
            />
          );
        },
      },
    },
  },
});
const StackNavigator = createNativeStackNavigator<StackParamList>({
  screenOptions: {
    headerShown: false,
  },
  screens: {
    Landing,
    GiveClasses,
    Study: BottomTabNavigator,
  },
  initialRouteName: 'Landing',
});
const Navigation = createStaticNavigation(StackNavigator);

SplashScreen.preventAutoHideAsync();

export const App = () => {
  const [fontsLoaded] = useFonts({
    Archivo_400Regular,
    Archivo_700Bold,
    Poppins_400Regular,
    Poppins_600SemiBold,
  });
  const [userLoaded, setUserLoaded] = useState(false);

  useEffect(() => {
    (async () => {
      if (fontsLoaded && userLoaded) {
        await SplashScreen.hideAsync();
      }
    })();
  }, [fontsLoaded, userLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <>
      <StatusBar style="light" />
      <AppProvider afterLoad={async () => setUserLoaded(true)}>
        <Navigation />
      </AppProvider>
    </>
  );
};
