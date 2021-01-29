
import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useLayoutEffect, useState } from 'react';
import { View } from 'react-native';
import { ApolloProvider } from '@apollo/react-hooks';
import { NavigationContainer } from '@react-navigation/native';
import { ThemeProvider } from "styled-components";
import Toast from 'react-native-toast-message';
import Stack from './navigation/Stack';
import Client from './Apollo/Client';
import { AuthProvider, useIsLoggedIn,useLogIn, } from './component/AuthProvider';
import styles from './styles';


export default function App() {
 

  return (
    <ApolloProvider client={Client}>
      <ThemeProvider theme={styles}>
        <AuthProvider >
          <NavigationContainer>
              <Stack />
              <Toast ref={(ref) => Toast.setRef(ref)} position={"top"}  topOffset={80} visibilityTime={1800} />
            </NavigationContainer>
        </AuthProvider>
      </ThemeProvider>
    </ApolloProvider>
  );
}
