import React, { useEffect, useState } from 'react';
import { createStackNavigator, create } from '@react-navigation/stack';
import Login from '../page/login/Login';
import logo from '../Image/logo.png';
import Main from '../page/main/Main';
import SignUp from '../page/login/SignUp';
import styled from 'styled-components/native';
import Tabs from './Tebs';
import { useIsLoggedIn, useLogIn, useLogOut } from '../component/AuthProvider';
import AsyncStorage from '@react-native-community/async-storage';
export default function Stack() {
  const isLogined = useIsLoggedIn();
  const onLogin = useLogIn();
  const onLoginOut = useLogOut();
  useEffect(() => {
    onLogihState();
  }, [onLogihState]);

  const onLogihState = async () => {
    try {
      const result = await AsyncStorage.getItem('user');
      const userInfo = JSON.parse(result);
      if (userInfo?.token !== undefined) {
        onLogin(JSON.stringify(userInfo));
      } else {
        onLoginOut();
      }
    } catch (err) {}
  };
  const Stack = createStackNavigator();
  return (
    <Stack.Navigator
      mode="card"
      headerMode="screen"
      screenOptions={{
        title: '',
        cardStyle: {
          backgroundColor: '#f1f2f6'
        },
        headerStyle: {
          backgroundColor: '#f1f2f6',
          shadowColor: 'black'
        },
        headerBackTitleVisible: false
      }}
    >
      {isLogined ? (
        <Stack.Screen name="Main" component={Tabs} />
      ) : (
        <>
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="SignUp" component={SignUp} />
        </>
      )}
    </Stack.Navigator>
  );
}

const MyHeader = styled.View`
  flex: 1;
  height: 30px;
  width: 100%;
  background-color: red; ;
`;
