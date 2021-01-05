import React from 'react';
import MyDetail from '../page/main/myDetail/Index';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';

const Tab = createMaterialBottomTabNavigator();

function Tebs() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="myDetail" component={MyDetail} />
    </Tab.Navigator>
  );
}

export default Tebs;
