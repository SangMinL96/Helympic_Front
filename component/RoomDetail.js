import React, { useEffect, useState } from 'react';
import { TouchableOpacity } from 'react-native';
import { Button, Overlay, ListItem, Avatar } from 'react-native-elements';
import styled from 'styled-components/native';
import { View, Text, ActivityIndicator } from 'react-native';
import TagChip from './TagChip';
import { useMutation, useQuery } from '@apollo/react-hooks';
import { SIGN_ROOM_CHECK, GET_ROOM_AGE } from '../page/main/home/allroom/Query';
import { UPLOAD_URL } from '../config';

function RoomDetail({ id, name, title, rDate, hash_tag, open, setOpen, uCount,avatar, onSignRoom }) {
  const [btnState, setBtnState] = useState();
  const { data: signData } = useQuery(SIGN_ROOM_CHECK, { variables: { roomId: id } });
  const { data: ageData } = useQuery(GET_ROOM_AGE, { variables: { id } });
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    if (signData) {
      setBtnState(signData?.signRoomCheck?.rslt);
      setLoading(false);
    }
  }, [setBtnState, signData]);

  return (
    <>
      <View>
        <Overlay style={{ width: '80%' }} isVisible={open} onBackdropPress={() => setOpen(false)}>
          {loading ? (
            <ActivityIndicator size="large" color="#0059ff" />
          ) : (
            <RoomDtlView>
              <DtlTitle>{title}</DtlTitle>
              <DtlDescView>
                <DtlText>개설일 : {rDate}</DtlText>
                <DtlText>
                  참여 인원 : {String(uCount)}명 | 평균 연령 : {ageData ? parseInt(ageData?.getRoomAge?.data) : ''}세
                </DtlText>
                <ListItem bottomDivider>
                  <RoomAvatar  resizeMode="cover" source={{ uri: avatar?`${UPLOAD_URL}image/?fn=${avatar}`:null }} />
                  <ListItem.Content>
                    <DtlBoldText>{name}</DtlBoldText>
                    <DtlText>방장</DtlText>
                  </ListItem.Content>
                </ListItem>
              </DtlDescView>
              <DtlTagView>
                {hash_tag
                  ? hash_tag
                      ?.split('#')
                      .filter((item) => item !== '')
                      .map((text, index) => <TagChip key={index} text={'#' + text} />)
                  : null}
              </DtlTagView>

              <Button
                titleStyle={{ fontWeight: 'bold' }}
                buttonStyle={{ height: 35 }}
                title={
                  btnState === '1'
                    ? '입장 하기'
                    : btnState === '2'
                    ? '승인 대기중 (신청취소)'
                    : btnState === '3'
                    ? '입장 신청'
                    : ''
                }
                onPress={() => onSignRoom(id, btnState, setLoading)}
              />
            </RoomDtlView>
          )}
        </Overlay>
      </View>
    </>
  );
}

export default RoomDetail;

const RoomDtlView = styled.View`
  width: 280px;
  flex-direction: column;
  justify-content: space-between;
`;
const DtlTitle = styled.Text`
  text-align: center;
  font-size: 20px;
  font-weight: 700;
  margin-bottom: 5px;
`;

const DtlDescView = styled.View`
  height: 100px;
`;
const DtlText = styled.Text`
  font-size: 13px;
`;
const DtlBoldText = styled.Text`
  font-size: 14px;
  font-weight: bold;
`;
const DtlTagView = styled.View`
  width: 280px;
  flex-direction: row;
  align-items: flex-start;
  margin-top: 10px;
  flex-wrap: wrap;
  margin-bottom: 10px;
`;
const RoomAvatar = styled.Image`
  border-radius: 50px;
  width: 40px;
  height: 40px;
  background-color: #d1d8e0;
  /* background-color: ${(props) => props.theme.darkGreyColor}; */
`;
