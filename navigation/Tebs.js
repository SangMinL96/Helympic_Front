import React, { useEffect } from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import Profile from '../page/main/profile/Index';

import Search from '../page/main/search/Index';
import Popularity from '../page/main/popularity/Index';
import RoomCreate from '../page/main/roomcreate/Index';
import headerLogo from '../Image/headerLogo.png';
import headerTitle from '../Image/headerTitle.png';
import { Image ,View } from 'react-native';
import styled from "styled-components/native"
import AllRoomView from '../page/main/home/allroom/Index';
import HomeTopTab from './HomeTopTab';

 
const Tab = createMaterialBottomTabNavigator();

function Tebs({navigation}) {
  useEffect(() => {
      
    /**
   * 기본 헤더 스타일
   */
      navigation.setOptions({
        headerLeft:()=>(
          <HeaderView>
            <Image source={require('../Image/headericon.png')} />
            <Image  source={headerTitle} />
          </HeaderView>
        )
      })
  }, [navigation]);

  return (
    <Tab.Navigator
      initialRouteName="Home"
      activeColor="#f0edf6"
      inactiveColor="#818181"
      barStyle={{ backgroundColor: '#353b48' }}
      shifting={true}
      labeled={false}
    >
      <Tab.Screen
        name="Home"
        component={HomeTopTab}
        options={{
          tabBarColor:"#74b9ff",
          tabBarIcon: ({ color }) => <MaterialCommunityIcons name="home" color={color} size={26} />
        }}
      />
      <Tab.Screen
        name="Search"
        component={Search}
        options={{
          tabBarColor:"#00b894",
          tabBarIcon: ({ color }) => <MaterialCommunityIcons name="magnify" color={color} size={26} />
        }}
      />

      <Tab.Screen
        name="RoomCreate"
        component={RoomCreate}
        options={{
          tabBarColor:"#535c68",
          tabBarIcon: ({ color }) => <MaterialCommunityIcons name="plus-box-outline" color={color} size={26} />
        }}
      />

      <Tab.Screen
        name="Popularity"
        component={Popularity}
        options={{
          tabBarColor:"#0984e3",
          tabBarIcon: ({ color }) => <MaterialCommunityIcons name="heart" color={color} size={26} />
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarColor:"#686de0",
          tabBarIcon: ({ color }) => <MaterialCommunityIcons name="account" color={color} size={26} />
        }}
      />
    </Tab.Navigator>
  );
}

export default Tebs;

const HeaderView =styled.View`
flex-direction:row;
justify-content: center;
align-items: center;
margin-left: 10px;
height: 30px;
;
`
