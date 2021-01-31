import React, { useEffect, useState } from 'react';
import { TouchableOpacity } from 'react-native';
import { Button, Overlay, ListItem, Avatar } from 'react-native-elements';
import styled from 'styled-components/native';
import { View, Text, ActivityIndicator } from 'react-native';
import TagChip from './TagChip';
import { useMutation, useQuery } from '@apollo/react-hooks';
import { SIGN_ROOM_CHECK, GET_ROOM_AGE, SIGN_ROOM,SIGN_DEL } from '../page/main/home/allroom/Query';
import { UPLOAD_URL } from '../config';
import Toast from 'react-native-toast-message';
import { useNavigation } from '@react-navigation/native';

function RoomDetail({ id, name, title, rDate, hash_tag, open, setOpen, uCount,avatar }) {
  const [btnState, setBtnState] = useState();
  const { data: signData,refetch } = useQuery(SIGN_ROOM_CHECK, {fetchPolicy:"network-only", variables: { roomId: id }, });
  const { data: ageData } = useQuery(GET_ROOM_AGE, { variables: { id } });
  const [loading, setLoading] = useState(true);
  const [signRoomMt] = useMutation(SIGN_ROOM);
  const [signDelMt] = useMutation(SIGN_DEL);
  const navigation = useNavigation();
  
  useEffect(() => {
    if (signData) {
      setBtnState(signData?.signRoomCheck?.rslt);
      setLoading(false);
     
    }
  }, [setBtnState, signData,refetch]);

 /**
   * 로그인시 받은 토큰 만료시간 15분이 지난후 사용자가 
   * Api사용시 401에러를 받으면 토큰을 새롭게 받는 함수
   * @param {Int} id 방 아이디
   * @param {String} btnState 1: 이미 참여한 방, 2: 승인 대기 3: 참가신청가능
   * @param {Function} setLoading 버튼 클릭시 로딩상태 바꾸는 함수
   */
  const onSignRoom =async () => {
    setLoading(true)
    try{
      if(btnState ==="1"){
        setOpen(false)
        navigation.navigate('Room',{id,title})
      }else if(btnState ==="2"){
        const rslt = await signDelMt({ variables: { roomId: id } });
        if(rslt?.data?.signDel?.rslt ==="OK"){
         Toast.show({ text1: '참가 신청 취소 되었습니다.' });
         refetch()
         setOpen(false);
        }
      }else if(btnState ==="3"){
        const rslt = await signRoomMt({ variables: { roomId: id } });
        if(rslt?.data?.signRoom?.rslt ==="OK"){
         Toast.show({ text1: '참가 신청 완료 되었습니다.' });
         refetch()
         setOpen(false);
        }
      }
    }catch(err){

    }
  };
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
                onPress={onSignRoom}
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
