import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useLayoutEffect, useState } from 'react';
import { View } from 'react-native';
import { ApolloProvider } from '@apollo/react-hooks';
import { NavigationContainer } from '@react-navigation/native';
import Toast from 'react-native-toast-message';
import Stack from './navigation/Stack';
import Client from './Apollo/Client';
import AsyncStorage from '@react-native-community/async-storage';
import { AuthProvider, useIsLoggedIn,useLogIn,useLogOut } from './component/AuthProvider';

export default function App() {

  return (
    <ApolloProvider client={Client}>
      <AuthProvider >
       <NavigationContainer>
          <Stack />
          <Toast ref={(ref) => Toast.setRef(ref)} position={"top"}  topOffset={80} visibilityTime={1800} />
        </NavigationContainer>
      </AuthProvider>
    </ApolloProvider>
  );
}
