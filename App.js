import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { ApolloProvider } from '@apollo/react-hooks';
import { NavigationContainer } from "@react-navigation/native";

import Stack from './navigation/Stack';
import Client from './Apollo/Client';
export default function App() {
const [isLogin,setIsLogin] =useState(false)
useEffect(()=>{
  //스토리지 로그인시 true 반환
  if(true){
    setIsLogin(true)
  }

},[])

  return (
    <ApolloProvider client={Client}>
      <NavigationContainer>
       <Stack isLogin={isLogin}/>
      </NavigationContainer>
    </ApolloProvider>
  );
}

