import React from 'react';
import {  TouchableOpacity } from 'react-native';
import styled from 'styled-components/native';
import { HOST_IP, UPLOAD_URL } from '../config';

function RoomList({title, hash_tag,uCount,avatar, onListClick }) {
  return (
    <RoomListScreen>
      <TouchableOpacity  onPress={onListClick}>
        <RoomAvatar  resizeMode="cover" source={{uri:avatar?`${UPLOAD_URL}image/?fn=${avatar}`:null}} />
      </TouchableOpacity>
      <RoomListView>
        <TouchableOpacity onPress={onListClick}>
          <ListTitle>{title}</ListTitle>
          <ListText>{hash_tag}</ListText>
          <ListText>{String(uCount)}명</ListText>
        </TouchableOpacity>
      </RoomListView>
    </RoomListScreen>
 
  );
  
}

export default RoomList;
const RoomListScreen = styled.View`
  margin-top: 10px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  border-style: solid;
  border-bottom-color:#7a7a7a;
  border-bottom-width: 0.2px;
  padding-bottom: 10px;
  padding-bottom: 10px;
`;
const RoomAvatar = styled.ImageBackground`
  border-radius: 5px;
  width: 60px;
  height: 60px; ;
  background-color: #e9eaeb;
  border: 1px solid #caccce;
`;

const RoomListView = styled.View`
  width: 78%;
`;
const ListTitle = styled.Text`
  font-weight: bold;
  color:black;
`;
const ListText = styled.Text`
  color:#1e272e ;
  font-size: 12px;
 
`;