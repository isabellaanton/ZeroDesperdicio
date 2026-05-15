import 'react-native-gesture-handler'; 
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

// IMPORT DO PROVIDER
import { ThemeProvider } from './ThemeContext'; 

// ... import das suas telas ...

const Stack = createStackNavigator();

export default function App() {
  return (
    <ThemeProvider>
      <NavigationContainer>
        <Stack.Navigator 
          initialRouteName="Inicio"
          screenOptions={{ headerShown: false }}
        >
          {/* Todas as rotas... */}
        </Stack.Navigator>
      </NavigationContainer>
    </ThemeProvider>
  );
}