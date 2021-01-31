import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import styled from 'styled-components/native';
import { useMutation } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import axios from 'axios';
import { Alert } from 'react-native';
import Icons from 'react-native-vector-icons/MaterialCommunityIcons';
import { Button, Input, Overlay } from 'react-native-elements';
import Toast from 'react-native-toast-message';
import * as ImagePicker from 'expo-image-picker';
import { ActivityIndicator } from 'react-native';
import { UPLOAD_URL } from '../../../../config';
import {EDIT_ROOM_INFO,EDIT_ROOM_AVATAR } from './Query';
function RoomInfo({ avatar, id, title, desc1, hash_tag, infoRf }) {
 
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [values, setValues] = useState({roomId:id, title, desc1, hash_tag });
  const [editRoomMt] = useMutation(EDIT_ROOM_INFO)
  const [editAvatarMt] = useMutation(EDIT_ROOM_AVATAR)
  useEffect(() => {}, []);
  console.log(avatar)
  const onEdit = async (ev) => {
    try{
      setLoading(true)
      const rslt = await editRoomMt({ variables: { param:values } });
      console.log(rslt)
      if (rslt?.data?.roomInfoEdit?.rslt === 'OK') {
        setLoading(false)
        setOpen(false)
        infoRf()
        Toast.show({ text1: '성공적으로 수정되었습니다.' });
      } 
    }catch(err){

    }
  };

  /**
   * 엑스포 이미지 픽커
   */
  let openImagePickerAsync = async () => {
    try {
      let permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (permissionResult.granted === false) {
        alert('카메라 앨범에 액세스할 수 있는 권한이 필요합니다!');
        return;
      }
      let pickerResult = await ImagePicker.launchImageLibraryAsync();
      const avatarName = `avatar_${new Date().valueOf()}`;
      const formData = new FormData();
      formData.append('avatar', { name: avatarName, type: 'image/jpeg', uri: pickerResult.uri });
      setLoading(true);
      const rslt = await axios.post(`${UPLOAD_URL}upload`, formData, null);
      if (rslt?.data === 'OK') {
        const rslt = await editAvatarMt({ variables: {roomId:id, avatar: avatarName } });
        console.log(rslt)
        if (rslt?.data?.editRoomAvatar?.rslt === 'OK') {
          Toast.show({ text1: '성공적으로 프로필사진 변경하였습니다.' });
          await axios.get(`${UPLOAD_URL}image/remove/?fn=${avatar}`);
          setLoading(false);
          infoRf();
        }
      }
    } catch (err) {}
  };
  return (
    <>
      {loading ? (
        <View style={{ flex: 1, justifyContent: 'center' }}>
          <ActivityIndicator size="large" color="#0059ff" />
        </View>
      ) : (
        <RoomInfoScreen>
          <TouchableOpacity onPress={openImagePickerAsync}>
            <RoomAvatar resizeMode="cover" source={{ uri: `${UPLOAD_URL}image/?fn=${avatar}` }} />
          </TouchableOpacity>
          <RoomName>
            {title}
            <TouchableOpacity onPress={() => setOpen(true)}>
              <Icons name="cog-outline" size={18} />
            </TouchableOpacity>
          </RoomName>
          <RoomInfoText>{desc1} </RoomInfoText>
          <RoomInfoText>{hash_tag}</RoomInfoText>
          <Overlay isVisible={open} onBackdropPress={() => setOpen(false)}>
            <Input
              containerStyle={{ width: 300,marginTop:10 }}
              inputContainerStyle={{ height: 40 }}
              inputStyle={{ fontSize: 14 }}
              placeholder="타이틀"
              value={values.title}
              onChangeText={(title) => setValues((props) => ({ ...props, title }))}
            />
            <Input
              containerStyle={{ width: 300 }}
              inputContainerStyle={{ height: 40 }}
              inputStyle={{ fontSize: 14 }}
              placeholder="방 설명"
              value={values.desc1}
              onChangeText={(desc1) => setValues((props) => ({ ...props, desc1 }))}
            />
            <Input
              containerStyle={{ width: 300 }}
              inputContainerStyle={{ height: 40 }}
              inputStyle={{ fontSize: 14 }}
              placeholder="태그"
              value={values.hash_tag}
              onChangeText={(hash_tag) => setValues((props) => ({ ...props, hash_tag }))}
            />
            <Button onPress={onEdit} buttonStyle={{  height: 30 }} title="수정 하기" />
          </Overlay>
        </RoomInfoScreen>
      )}
    </>
  );
}

export default RoomInfo;

const RoomInfoScreen = styled.View`
  width: 100%;
  height: 220px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const RoomAvatar = styled.Image`
  border-radius: 50px;
  width: 110px;
  height: 110px; ;
`;
const RoomName = styled.Text`
  font-size: 18px;
  font-weight: bold;
  margin-top: 10px;
`;
const RoomInfoText = styled.Text`
  font-size: 10px;
  color: gray;
`;

const InputBox = styled.View`
  position: relative;
`;

const InputBtn = styled.TouchableOpacity`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  right: 3%;
  top: 22px;
  width: 52px;
  background-color: #3498db;
  height: 20px;
  border-radius: 10px;
`;
const InputText = styled.Text`
  font-size: 10px;
  font-weight: 500;
  color: white;
`;
