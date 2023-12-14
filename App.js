import {StatusBar} from 'expo-status-bar';
import * as SplashScreen from 'expo-splash-screen';
import {StyleSheet, Text, useColorScheme, View} from 'react-native';

import HomeScreen from "./screens/HomeScreen";
import UserScreen from "./screens/UserScreen";

import {NavigationContainer} from "@react-navigation/native";
import {createMaterialBottomTabNavigator} from 'react-native-paper/react-navigation';

import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import {SafeAreaProvider} from "react-native-safe-area-context";
import GradesScreen from "./screens/GradesScreen";

import {Provider} from "react-redux";
import {store} from "./redux/store";

import {useDispatch, useSelector} from "react-redux";

import {adaptNavigationTheme, PaperProvider, DefaultTheme} from "react-native-paper";
import { useMaterial3Theme } from '@pchmn/expo-material3-theme';

import {
  MD3LightTheme
} from 'react-native-paper';
import {useCallback, useEffect, useState} from "react";
import {setTheme} from "./redux/slice/theme";

//console.log(MD3LightTheme);

const Tab = createMaterialBottomTabNavigator();

SplashScreen.preventAutoHideAsync();

export default function App() {
  return (
    <Provider store={store}>
      <AppNoRedux />
    </Provider>
  );
}

function AppNoRedux() {
  const dispatch = useDispatch();

  const [appIsReady, setAppIsReady] = useState(false);

  useEffect(() => {
    async function prepare() {
      try {
        await dispatch(setTheme(MD3LightTheme));
        // Once theme is set, mark the app as ready
        setAppIsReady(true);
      } catch (e) {
        console.error(e);
        // Handle errors if necessary
      }
    }

    prepare();
  }, [dispatch]);

  useEffect(() => {
    const hideSplash = async () => {
      if (appIsReady) {
        try {
          await SplashScreen.hideAsync();
        } catch (error) {
          console.error('Error hiding splash:', error);
        }
      }
    };

    hideSplash();
  }, [appIsReady]);

  if (!appIsReady) {
    return null; // Or a loading indicator
  }

  return (
    <PaperProvider theme={MD3LightTheme}>
      <SafeAreaProvider>
        <NavigationContainer theme={MD3LightTheme}>
          <Tab.Navigator
            screenOptions={({route}) => ({
              tabBarIcon: ({focused, color, size}) => {
                let iconName;

                if (route.name === 'Home') {
                  iconName = focused
                    ? 'home'
                    : 'home-outline';
                } else if (route.name === 'User') {
                  iconName = focused ? 'account' : 'account-outline';
                } else if (route.name === 'Grades') {
                  iconName = focused ? 'school' : 'school-outline';
                }

                return <MaterialCommunityIcons name={iconName} size={26} color={color}/>;
              },
            })}>
            <Tab.Screen name={"Home"} component={HomeScreen}/>
            <Tab.Screen name={"Grades"} component={GradesScreen}/>
            <Tab.Screen name={"User"} component={UserScreen}/>
          </Tab.Navigator>
        </NavigationContainer>
      </SafeAreaProvider>
    </PaperProvider>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
