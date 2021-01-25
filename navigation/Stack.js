import React, { useEffect, useState } from 'react';
import { createStackNavigator, create } from '@react-navigation/stack';
import Login from '../page/login/Login';
import SignUp from '../page/login/SignUp';
import styled from 'styled-components/native';
import Tabs from './Tebs';
import { useIsLoggedIn, useLogIn, useLogOut } from '../component/AuthProvider';
import AsyncStorage from '@react-native-community/async-storage';
import { onUserInfo } from '../component/utils';
import Profile from '../page/main/profile/Index';
import RoomCreate from '../page/main/roomcreate/Index';
import Desc from '../page/main/roomcreate/Desc';
import HashTag from '../page/main/roomcreate/HashTag';
import { View } from 'react-native';
import { Text } from 'react-native';
import Title from '../page/main/roomcreate/Title';
import Avatar from '../page/main/roomcreate/Avatar';
import SearchView from '../page/main/search/Index';


export default function Stack() {
  const isLogined = useIsLoggedIn();
  const onLogin = useLogIn();
  const onLoginOut = useLogOut();

  useEffect(() => {
    onLogihState();
  }, [onLogihState]);

  const onLogihState = async () => {
    try {
      const userInfo = await onUserInfo()
      const cryptoInfo = JSON.parse(userInfo)
      if (cryptoInfo?.token) {
        onLogin(cryptoInfo);
        
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
          backgroundColor: '#ebebee',
        },
        
        headerStyle: {
          backgroundColor: "#ebebee",
          shadowColor: 'black',
          height: 105,
       
        },
        headerBackTitleVisible: false,
       
      
      }}
      
    >
      {isLogined ? (
        <>
          <Stack.Screen name="Tebs" component={Tabs}  />
          
          <Stack.Screen name="RoomCreate" component={RoomCreate} />
          <Stack.Screen name="Title" component={Title} />
          <Stack.Screen name="Avatar" component={Avatar} />
          <Stack.Screen name="Desc" component={Desc} />
          <Stack.Screen name="HashTag" component={HashTag} />
        </>
      ) : (
        <>
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="SignUp" component={SignUp} />
        </>
      )}
    </Stack.Navigator>
  );
}

