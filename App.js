import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import TabStack from './src/navigation/BottomNavigation';
import GlobalErrorBoundary from './src/utils/ErrorBoundary';
import Toast from 'react-native-toast-message';
import { CreatePassword, ForgotPassword, Login, OtpVerification, SignUp, Splash, Welcome } from './src/screens';
import { Provider } from 'react-redux';
import store from './src/redux/Store';
import { ThemeProvider } from './src/context/ThemeContext';

const Stack = createStackNavigator();

const App = () => {
  return (
    <Provider store={store}>
      <GlobalErrorBoundary>
        <ThemeProvider>
          <NavigationContainer>
            <Stack.Navigator initialRouteName='Splash'>
              <Stack.Screen name="Splash" component={Splash} options={{ headerShown: false }} />
              <Stack.Screen name="Welcome" component={Welcome} options={{ headerShown: false }} />
              <Stack.Screen name="SignUp" component={SignUp} options={{ headerShown: false }} />
              <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
              <Stack.Screen name="ForgotPassword" component={ForgotPassword} options={{ headerShown: false }} />
              <Stack.Screen name="OtpVerification" component={OtpVerification} options={{ headerShown: false }} />
              <Stack.Screen name="CreatePassword" component={CreatePassword} options={{ headerShown: false }} />
              <Stack.Screen name="TabStack" component={TabStack} options={{ headerShown: false }} />
            </Stack.Navigator>
          </NavigationContainer>
          <Toast />
        </ThemeProvider>
      </GlobalErrorBoundary>
    </Provider>
  )
}

export default App