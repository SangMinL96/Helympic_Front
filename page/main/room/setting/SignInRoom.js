import React from 'react';
import Toast from 'react-native-toast-message';
import { SAVE_ROOM_SIGN } from './Query';
import { ScrollView } from 'react-native';
import { ListItem, Button } from 'react-native-elements';
import styled from 'styled-components/native';
import { UPLOAD_URL } from '../../../../config';
import { useMutation } from '@apollo/react-hooks';
function SignInRoom({ data, roomId,signRf }) {
  const [signMt] = useMutation(SAVE_ROOM_SIGN);

  const onSignIn = async () => {
    try {
      const rslt = await signMt({ variables: { roomId, userId: data.id } });
      if(rslt?.data?.saveSignRoom?.rslt ==="OK"){
        signRf()
        Toast.show({ text1: '승인 완료 되었습니다.' });
      }
    } catch (err) {}
  };

  return (
    <ScrollView>
      <ListItem containerStyle={{ backgroundColor: '#f1f1f1', padding: 10 }}>
        <RoomAvatar resizeMode="cover" source={{ uri: data.avatar ? `${UPLOAD_URL}image/?fn=${data.avatar}` : null }} />
        <ListItem.Content>
          <DtlBoldText>{data.name}</DtlBoldText>
          <DtlText>
            아이디: {data.id} | 나이: {data.age}
          </DtlText>
        </ListItem.Content>
        <Button onPress={onSignIn} buttonStyle={{ width: 50, height: 23 }} title="승인" titleStyle={{ fontSize: 10 }} />
      </ListItem>
    </ScrollView>
  );
}

export default SignInRoom;
const DtlText = styled.Text`
  font-size: 13px;
  margin-top: 4px;
  max-width: 95%;
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
