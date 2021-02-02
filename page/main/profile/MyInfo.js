import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useLogOut } from '../../../component/AuthProvider';
import styled from 'styled-components/native';
import { useMutation } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import axios from 'axios';
import { Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { HOST_IP, UPLOAD_URL } from '../../../config';
import Icons from 'react-native-vector-icons/MaterialCommunityIcons';
import { Input } from 'react-native-elements';
import { NAME_CHECK, NAME_EDIT, AVATAR_EDIT } from './Query';
import Toast from 'react-native-toast-message';
import * as ImagePicker from 'expo-image-picker';
import { ActivityIndicator } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
function MyInfo({ age, avatar, id, name, rDate, userDataRf }) {
  const [nameEdit, setNameEdit] = useState(false);
  const [nameCheckMt] = useMutation(NAME_CHECK);
  const [nameEditMt] = useMutation(NAME_EDIT);
  const [avatarEditMt] = useMutation(AVATAR_EDIT);
  const [nameState, setNameState] = useState(name);
  const [loading, setLoading] = useState(false);
  const logOut = useLogOut();

  useEffect(() => {
    setNameState(name);
  }, [name]);

  const onEdit = async (ev) => {
    const name = ev.nativeEvent.text;
    const rslt = await nameCheckMt({ variables: { name } });
    if (rslt?.data?.nameCheck?.rslt === 'NG') {
      Toast.show({ text1: '중복된 닉네임이 존재합니다.', type: 'error' });
    } else {
      const rslt = await nameEditMt({ variables: { name } });
      if (rslt?.data?.userNameEdit?.rslt === 'OK') {
        Toast.show({ text1: '성공적으로 닉네임 변경하였습니다.' });
        setNameState(name);
      }
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
        const rslt = await avatarEditMt({ variables: { avatar: avatarName } });

        if (rslt?.data?.userAvatarEdit?.rslt === 'OK') {
          userDataRf();
          setLoading(false);
          Toast.show({ text1: '성공적으로 프로필사진 변경하였습니다.' });
          await axios.get(`${UPLOAD_URL}image/remove/?fn=${avatar}`);
        }
      }
    } catch (err) {}
  };
  const onLogOut = () => {
    Alert.alert(
      '로그아웃',
      "정말 로그아웃 하시겠습니까?",
      [
        {
          text: "아니요",
          style: "cancel"
        },
        { text: "네", onPress: () => logOut() }
      ],
      { cancelable: false }
    );
  };
  return (
    <>
      {loading ? (
        <View style={{ flex: 1, justifyContent: 'center' }}>
          <ActivityIndicator size="large" color="#0059ff" />
        </View>
      ) : (
        <MyInfoScreen>
          <TouchableOpacity onPress={openImagePickerAsync}>
            <MyAvatar resizeMode="cover" source={{ uri: `${UPLOAD_URL}image/?fn=${avatar}` }} />
          </TouchableOpacity>
          {nameEdit ? (
            <Input
              containerStyle={{ width: 200 }}
              inputContainerStyle={{ height: 40 }}
              defaultValue={nameState}
              inputStyle={{ fontSize: 14 }}
              placeholder="닉네임"
              onSubmitEditing={onEdit}
              onBlur={() => setNameEdit(false)}
              autoFocus={true}
            />
          ) : (
            <MyName>
              {nameState}
              <TouchableOpacity onPress={() => setNameEdit(true)}>
                <Icons name="cog-outline" size={18} />
              </TouchableOpacity>
            </MyName>
          )}

          <MyInfoText>생성날짜: {rDate} </MyInfoText>
          <MyInfoText>
            아이디: {id} | 나이: {age}
          </MyInfoText>
          <TouchableOpacity>
            <Icon name="door-open" color={'gray'} size={30} onPress={onLogOut} />
          </TouchableOpacity>
        </MyInfoScreen>
      )}
    </>
  );
}

export default MyInfo;

const MyInfoScreen = styled.View`
  width: 100%;
  height: 220px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const MyAvatar = styled.Image`
  border-radius: 50px;
  width: 110px;
  height: 110px; ;
  background-color: #dddddd;
`;
const MyName = styled.Text`
  font-size: 18px;
  font-weight: bold;
  margin-top: 10px;
`;
const MyInfoText = styled.Text`
  font-size: 10px;
  color: gray;
`;


