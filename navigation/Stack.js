import React, { useEffect, useState } from 'react';
import { createStackNavigator, create } from '@react-navigation/stack';
import Login from '../page/login/Login';
import SignUp from '../page/login/SignUp';
import Tabs from './Tebs';
import { useIsLoggedIn, useLogIn, useLogOut } from '../component/AuthProvider';
import { onUserInfo } from '../component/utils';
import RoomCreate from '../page/main/roomcreate/Index';
import Desc from '../page/main/roomcreate/Desc';
import HashTag from '../page/main/roomcreate/HashTag';
import Title from '../page/main/roomcreate/Title';
import Avatar from '../page/main/roomcreate/Avatar';
import RoomTopTab from './RoomTopTab';
import Record from '../page/main/room/record/Index';
import Setting from '../page/main/room/setting/Index';


export default function Stack() {
  const isLogined = useIsLoggedIn();
  const onLogin = useLogIn();
  const onLoginOut = useLogOut();

  useEffect(() => {
    onLogihState();
  }, [onLogihState]);

    /**
   * 사용자가 로그아웃을 직접하지 않았다면 스토리지에 
   * 사용가능한 토큰이나 만료된 토큰을 가지고 있으면 로그인 상태 유지
   */
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
          <Stack.Screen name="Record" component={Record} />
          <Stack.Screen name="Room" component={RoomTopTab} />
          <Stack.Screen name="Setting" options={{
            title:"방 설정"
          }} component={Setting} />
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

