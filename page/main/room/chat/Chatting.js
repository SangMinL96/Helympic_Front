import { Input } from '@99xt/first-born';
import React, { useEffect } from 'react';
import { Text } from 'react-native';
import { ScrollView } from 'react-native';
import { ListItem } from 'react-native-elements';
import styled from 'styled-components/native';
import { UPLOAD_URL } from '../../../../config';
function Chatting({ name, avatar }) {
 
  useEffect(()=>{
   
  },[])
  const onChat = () => {
   
  };
  return (
    <ChatView>
      <ScrollView>

          
        <ListItem containerStyle={{ backgroundColor: '#ebebee',padding:10 }}>
          <RoomAvatar resizeMode="cover" source={{ uri: avatar ? `${UPLOAD_URL}image/?fn=${avatar}` : null }} />
          <ListItem.Content>
            <DtlBoldText>{name}</DtlBoldText>
            <DtlText>ㅋㅋㅋㅋㅋ그거 아니zzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzz지</DtlText>
          </ListItem.Content>
        </ListItem>


        <ListItem  containerStyle={{ backgroundColor: '#ebebee',padding:10,justifyContent:"flex-end",flexDirection:"row"}}>
            <DtlMyText >ㅋㅋㅋㅋㅋ그거 아니지</DtlMyText>
        </ListItem>
      </ScrollView>
      <Input  onSubmitEditing={onChat} placeholder="방 제목, 닉네임, 태그" />
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
