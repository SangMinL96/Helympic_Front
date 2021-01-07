import React from 'react';
import {  TouchableOpacity } from 'react-native';
import styled from 'styled-components/native';
function RoomContainer({title, onAvatarClick, onListClick }) {
  return (
   
    <RoomList>
      <TouchableOpacity  onPress={onAvatarClick}>
        <RoomAvatar  resizeMode="stretch" source={require('../Image/logo.png')} />
      </TouchableOpacity>
      <RoomListView>
        <TouchableOpacity onPress={onListClick}>
          <RommListText>{title}</RommListText>
        </TouchableOpacity>
      </RoomListView>
    </RoomList>
 
  );
  
}

export default RoomContainer;
const RoomList = styled.View`
  display: flex;
  margin-top: 10px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;
const RoomAvatar = styled.ImageBackground`
  border-radius: 50px;
  background-color: #e9e9e9;
  width: 60px;
  height: 60px; ;
  background-color: ${props=>props.theme.whiteColor};
`;

const RoomListView = styled.View`
  width: 78%;
 
`;
const RommListText = styled.Text`
  padding: 12px;
  background-color: white;
  border-radius: 10px;
  font-weight: 700;
  background-color: ${props=>props.theme.whiteColor};
`;

