import React, { useEffect } from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import Profile from '../page/main/profile/Index';
import Home from '../page/main/home';
import Search from '../page/main/search/Index';
import Popularity from '../page/main/popularity/Index';
import RoomCreate from '../page/main/roomcreate/Index';
import headerLogo from '../Image/headerLogo.png';
import { Image  } from 'react-native';
import { View } from 'react-native';


const Tab = createMaterialBottomTabNavigator();

function Tebs({navigation}) {
  useEffect(() => {
      navigation.setOptions({
        headerLeft:()=>(
          <View>
          <Image  source={headerLogo} />
          </View>
        )
      })
  }, []);
  return (
    <Tab.Navigator
      initialRouteName="Home"
      activeColor="#f0edf6"
      inactiveColor="#818181"
      barStyle={{ backgroundColor: '#353b48' }}
      shifting={true}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        
        options={{
          tabBarColor:"#74b9ff",
          tabBarLabel: 'Home',
          tabBarIcon: ({ color }) => <MaterialCommunityIcons name="home" color={color} size={26} />
        }}
      />
      <Tab.Screen
        name="Search"
        component={Search}
        options={{
          tabBarColor:"#00b894",
          tabBarLabel: "search",
          tabBarIcon: ({ color }) => <MaterialCommunityIcons name="magnify" color={color} size={26} />
        }}
      />

      <Tab.Screen
        name="RoomCreate"
        component={RoomCreate}
        options={{
          tabBarColor:"#535c68",
          tabBarLabel: 'create',
          tabBarIcon: ({ color }) => <MaterialCommunityIcons name="plus-box-outline" color={color} size={26} />
        }}
      />

      <Tab.Screen
        name="Popularity"
        component={Popularity}
        options={{
          tabBarColor:"#0984e3",
          tabBarLabel: 'pop',
          tabBarIcon: ({ color }) => <MaterialCommunityIcons name="heart" color={color} size={26} />
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarColor:"#686de0",
          tabBarLabel: 'Profile',
          tabBarIcon: ({ color }) => <MaterialCommunityIcons name="account" color={color} size={26} />
        }}
      />
    </Tab.Navigator>
  );
}

export default Tebs;
