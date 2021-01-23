import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import AllRoomView from '../page/main/home/allroom/Index';
import MyRoomView from '../page/main/home/myroom/Index';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const TopTab = createMaterialTopTabNavigator();

function HomeTopTab() {
  return (
    <TopTab.Navigator
    
      tabBarOptions={{
        showIcon: true,
        showLabel: false,  
        style:{backgroundColor:"#ebebee"}
      }}
    >
      <TopTab.Screen
        name="AllRoom"
        component={AllRoomView}
        options={{
        
          tabBarIcon: ({ color }) => <MaterialCommunityIcons name="home-variant-outline" color={color} size={26} />
        }}
      />
      <TopTab.Screen
        name="MyRoom"
        component={MyRoomView}
        options={{
          tabBarIcon: ({ color }) => <MaterialCommunityIcons name="account-box-outline" color={color} size={26} />
        }}
      />
    </TopTab.Navigator>
  );
}
export default HomeTopTab;
