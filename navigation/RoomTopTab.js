import React, { useEffect } from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Record from '../page/main/room/record/Index';
import Chat from '../page/main/room/chat/Index';
import Feed from '../page/main/room/feed/Index';
import { HeaderBackButton } from '@react-navigation/stack';
import styled from 'styled-components/native';
import {TouchableOpacity} from "react-native"

const TopTab = createMaterialTopTabNavigator();

function RoomTopTab({ navigation, route }) {
  useEffect(() => {
    navigation.setOptions({
      headerLeft: (props) => (
        <RoomHeaderView>
          <HeaderBackButton
            {...props}
            onPress={(ev) => {
              navigation.navigate('Tebs');
            }}
          />
          <RoomHeaderText>{route.params.title}</RoomHeaderText>
        </RoomHeaderView>
      ),
      headerRight: () => (
      <TouchableOpacity>
        <MaterialCommunityIcons
          onPress={() => navigation.navigate('Setting', { id: route.params.id})}
          name="cog-outline"
          color={'gray'}
          size={26}
          style={{ marginRight: 15 }}
        />
        </TouchableOpacity>
      )
    });
  }, [navigation, route]);

  return (
    <TopTab.Navigator
      tabBarOptions={{
        showIcon: true,
        showLabel: false,
        style: { backgroundColor: '#ebebee' }
      }}
    >
      <TopTab.Screen
        initialRouteName={route.params.id}
        name="Drawer"
        initialParams={{ id: route.params.id, title: route.params.title }}
        component={Record}
        options={{
          tabBarIcon: ({ color }) => <MaterialCommunityIcons name="signal-cellular-outline" color={color} size={26} />
        }}
      />
      <TopTab.Screen
        name="Chat"
        component={Chat}
        initialParams={{ id: route.params.id, title: route.params.title }}
        options={{
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="comment-processing-outline" color={color} size={26} />
          )
        }}
      />
      <TopTab.Screen
        name="Feed"
        component={Feed}
        initialParams={{ id: route.params.id, title: route.params.title }}
        options={{
          tabBarIcon: ({ color }) => <MaterialCommunityIcons name="movie-filter-outline" color={color} size={26} />
        }}
      />
    </TopTab.Navigator>
  );
}
export default RoomTopTab;

const RoomHeaderView = styled.View`
  flex-direction: row;
  align-items: center;
`;
const RoomHeaderText = styled.Text`
  font-size: 20px;
  font-weight: bold;
  color: #5f5f5f;
`;
