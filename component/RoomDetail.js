import React from 'react';
import { TouchableOpacity } from 'react-native';
import { Button, Overlay, ListItem, Avatar } from 'react-native-elements';
import styled from 'styled-components/native';
import { View, Text } from 'react-native';
import TagChip from './TagChip';

function RoomDetail({ navigation, id,name, title, desc,rDate, tag, open, setOpen,uCount }) {

  return (
    <>
      <View>
        <Overlay style={{ width: '80%' }} isVisible={open} onBackdropPress={() => setOpen(false)}>
          <RoomDtlView>
            <DtlTitle>{title}</DtlTitle>
            <DtlDescView>
              <DtlText>개설일 : {rDate}</DtlText>
              <DtlText>참여 인원 : {String(uCount)}명 | 평균 연령 : 25세</DtlText>
              <ListItem bottomDivider>
                <RoomAvatar resizeMode="stretch" source={require('../Image/logo.png')} />
                <ListItem.Content>
                  <DtlBoldText>{name}</DtlBoldText>
                  <DtlText>방장</DtlText>
                </ListItem.Content>
              </ListItem>
            </DtlDescView>
            <DtlTagView>
               {tag ?tag?.split(",").map((text,index)=><TagChip key={index} text={text}/>):null}
            </DtlTagView>
            <DtlBtnView>
              <Button
                titleStyle={{ fontWeight: 'bold' }}
                buttonStyle={{ height: 35 }}
                containerStyle={{ width: '48%' }}
                title="참가 신청"
                // loading={false}
              />
              <Button
                titleStyle={{ fontWeight: 'bold' }}
                containerStyle={{ width: '48%' }}
                buttonStyle={{ height: 35, backgroundColor: 'red' }}
                title="참가 취소"
              />
            </DtlBtnView>
          </RoomDtlView>
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
const DtlBtnView = styled.View`
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
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
const RoomAvatar = styled.ImageBackground`
  border-radius: 50px;
  width: 40px;
  height: 40px;
  background-color: #d1d8e0;
  border: 1px solid #a8b1bb;
  /* background-color: ${(props) => props.theme.darkGreyColor}; */
`;
