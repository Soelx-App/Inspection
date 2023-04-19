import React from "react";
import { StatusBar } from 'react-native';
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import Routes from "./src/routes";
import AuthProvider from "./src/context/auth";
import 'react-native-reanimated';

const colorPri="#1B4368";
const colorSec="#38ADB5";
function App() {
    const MyTheme = {
        ...DefaultTheme,
        colors: {
          ...DefaultTheme.colors,
          primary: colorPri,
          text: '#FFF',
          card: colorPri
        },
      };
    return (
        <NavigationContainer theme={MyTheme}>
            <AuthProvider>
                <StatusBar  backgroundColor="#1B4368" barStyle="light-content"  translucent={true}/>
                <Routes/>
            </AuthProvider>
        </NavigationContainer>
    );
}

export default App;