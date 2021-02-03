import { Input } from '@99xt/first-born';
import React, { useEffect, useState } from 'react';
import { Text } from 'react-native';
import { ScrollView } from 'react-native';
import { ListItem } from 'react-native-elements';
import styled from 'styled-components/native';
import { REDIS_URL, UPLOAD_URL } from '../../../../config';
import socketio from 'socket.io-client';
import { View,ActivityIndicator } from 'react-native';


function Chatting({ id, name, avatar, roomId }) {
  const socket = socketio.connect(REDIS_URL);
  socket.emit('joinRoom', String(roomId));
  const [chatList, setChatList] = useState([]);
  const [value,setValue]=useState()

 
  const onChating = (ev) => {
    const msg = ev.nativeEvent.text;
    socket.emit('chatting', { roomId: String(roomId), avatar, id, name, msg });
    setValue("")
  };
  useEffect(() => {
    //방 아이디에 따라 조인
    socket.on('message', (data) => {
      setChatList((props) => props.concat(data));
    });
    socket.on('joinData', (data) => {
      setChatList([])
      data.map(item=>setChatList(props=>props.concat(item)))
    });
    return () => {
      socket.off('message');
     socket.off('joinData');
    };
  }, [setChatList]);

  return (
    <ChatView>
      <ScrollView contentOffset={{ x: 0, y: -100 }} >
        {chatList?.map((item, index) =>
          item.id !== id ? (
            <ListItem key={index} containerStyle={{ backgroundColor: '#ebebee', padding: 10 }}>
              <RoomAvatar
                resizeMode="cover"
                source={{ uri: item.avatar ? `${UPLOAD_URL}image/?fn=${item.avatar}` : null }}
              />
              <ListItem.Content>
                <DtlBoldText>{item.name}</DtlBoldText>
                <DtlText>{item.msg}</DtlText>
              </ListItem.Content>
            </ListItem>
          ) : (
            <ListItem
              key={index}
              containerStyle={{
                backgroundColor: '#ebebee',
                padding: 10,
                justifyContent: 'flex-end',
                flexDirection: 'row'
              }}
            >
              <DtlMyText>{item.msg}</DtlMyText>
            </ListItem>
          )
        )}
      </ScrollView>
  
      <Input onChangeText={(text)=>setValue(text)} value={value||""} onSubmitEditing={onChating} placeholder="...message" />
    </ChatView>
  );
}

export default Chatting;
const ChatView = styled.View`
  flex: 1;
  justify-content: space-between;
  position: relative;
`;

const DtlText = styled.Text`
  font-size: 13px;
  border: 1px solid #c0c0c0;
  padding: 5px;
  margin-top: 4px;
  background-color: #f3f3f3;
  border-radius: 10px;
  max-width: 75%;
`;
const DtlMyText = styled.Text`
  font-size: 13px;
  border: 1px solid #c0c0c0;
  text-align: right;
  padding: 5px;
  margin-top: 4px;
  background-color: #f3f3f3;
  border-radius: 10px;
  max-width: 75%;
`;
const DtlBoldText = styled.Text`
  font-size: 13.5px;
  font-weight: bold;
`;
const RoomAvatar = styled.Image`
  border-radius: 20px;
  width: 50px;
  height: 50px;
  background-color: #d1d8e0;
  /* background-color: ${(props) => props.theme.darkGreyColor}; */
`;
