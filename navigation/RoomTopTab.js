import React, { useEffect } from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Record from '../page/main/room/record/Index';
import Chat from '../page/main/room/chat/Index';
import Feed from '../page/main/room/feed/Index';
import { HeaderBackButton } from '@react-navigation/stack';
import styled from 'styled-components/native';
import {Text, TouchableOpacity} from "react-native"
import Toast from 'react-native-toast-message';

const TopTab = createMaterialTopTabNavigator();

function RoomTopTab({ navigation, route }) {
const onSetting = ()=>{
  if(route.params.master === "OK"){
    navigation.navigate('Setting', { id: route.params.id})
  }else{
    Toast.show({ text1: '마스터 권한이 없습니다.', type: 'error'});
  }
}
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
      <TouchableOpacity style={{flexDirection:"row",alignItems:"center"}}>
        <Text style={{fontSize:10,color:'gray'}}>승인 설정</Text>
        <MaterialCommunityIcons
          onPress={onSetting}
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
        name="Record"
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
