import * as React from 'react';
import { View, Text, Button } from 'react-native';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';
import Record from '../page/main/room/record/Index';
import RoomTopTab from './RoomTopTab';
import Chat from '../page/main/room/chat/Index';
import Feed from '../page/main/room/feed/Index';


function CustomDrawerContent(props) {
  return (
    <DrawerContentScrollView {...props}>
      <DrawerItemList {...props} />
      <DrawerItem
        label="Close drawer"
        onPress={() => props.navigation.closeDrawer()}
      />
      <DrawerItem
        label="Toggle drawer"
        onPress={() => props.navigation.toggleDrawer()}
      />
    </DrawerContentScrollView>
  );
}

const Drawers = createDrawerNavigator();

function Drawer() {
  return (
    <Drawers.Navigator drawerContent={props => <CustomDrawerContent {...props} />}>
      <Drawers.Screen name="RoomDrawer" component={Record} />
   
    </Drawers.Navigator>
  );
}
export default Drawer