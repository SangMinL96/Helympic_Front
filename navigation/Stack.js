import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Login from '../page/login/Login';
import logo from '../Image/logo.png';
import Main from '../page/main/Main';
import SignUp from '../page/login/SignUp';
import styled from 'styled-components/native';
export default function Stack({ isLogin }) {
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
      {isLogin ? (
        <Stack.Screen name="메인" component={Main} />
      ) : (
        <>
          <Stack.Screen name="로그인" component={Login} />
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
