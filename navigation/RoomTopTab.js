import React, { useEffect } from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import AllRoomView from '../page/main/home/allroom/Index';
import MyRoomView from '../page/main/home/myroom/Index';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Record from '../page/main/room/record/Index';
import Chat from '../page/main/room/chat/Index';
import Feed from '../page/main/room/feed/Index';
import { HeaderBackButton } from '@react-navigation/stack';
import styled from "styled-components/native"

const TopTab = createMaterialTopTabNavigator();

function RoomTopTab({navigation,route}) {
    useEffect(() => {
        navigation.setOptions({
            headerLeft:(props)=>(
                <RoomHeaderView>
                <HeaderBackButton
                {...props}
                onPress={(ev) => {
                    navigation.navigate("Tebs")
                }}
              />
              <RoomHeaderText>{route.params.title}</RoomHeaderText>
              </RoomHeaderView>
            )
          })
      }, [navigation,route]);
    
  return (
    <TopTab.Navigator
      tabBarOptions={{
        showIcon: true,
        showLabel: false,  
        style:{backgroundColor:"#ebebee"}
      }}
    >
       <TopTab.Screen
       initialRouteName={route.params.id}
        name="Record"
        initialParams={{id:route.params.id,title:route.params.title}}
        component={Record}
        options={{
          tabBarIcon: ({ color }) => <MaterialCommunityIcons name="signal-cellular-outline" color={color} size={26} />
        }}
      />
      <TopTab.Screen
        name="Chat"
        component={Chat}
        initialParams={{id:route.params.id,title:route.params.title}}
        options={{
          tabBarIcon: ({ color }) => <MaterialCommunityIcons name="comment-processing-outline" color={color} size={26} />
        }}
      />
      <TopTab.Screen
        name="Feed"
        component={Feed}
        initialParams={{id:route.params.id,title:route.params.title}}
        options={{
          tabBarIcon: ({ color }) => <MaterialCommunityIcons name="movie-filter-outline" color={color} size={26} />
        }}
      />
    </TopTab.Navigator>
  );
}
export default RoomTopTab;

const RoomHeaderView =styled.View`
  flex-direction: row;
  align-items: center;
`
const RoomHeaderText =styled.Text`
  font-size: 20px;
  font-weight: bold;
`