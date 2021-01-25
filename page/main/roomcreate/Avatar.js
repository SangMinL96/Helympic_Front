import React, { useEffect, useState } from 'react';
import {  Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styled from 'styled-components/native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { Button } from 'react-native-elements';
import * as ImagePicker from 'expo-image-picker';
function Avatar() {
  const navigation = useNavigation();
  const [avatar, setAvatar] = useState();
  useEffect(() => {
    navigation.setOptions({
      header: () => {}
    });
  }, [navigation]);

  
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

      await setAvatar(pickerResult);
    } catch (err) {}
  };

  return (
    <RoomCreateView>
      <RoomCreateBg resizeMode="stretch" source={require('../../../Image/descImg.jpg')}>
        <RoomCreateHeader>
          <TouchableOpacity onPress={() => navigation.navigate('Tebs')}>
            <MaterialCommunityIcons name="close" color={'white'} size={26} />
          </TouchableOpacity>
          <Text style={{ color: 'white', fontSize: 18 }}>이미지</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Title', { avatar })}>
            <Text style={{ color: 'white', fontSize: 18 }}>다음</Text>
          </TouchableOpacity>
        </RoomCreateHeader>
        <RoomAvatar source={{ uri: avatar?.uri }} />
        <Button
          titleStyle={{ fontWeight: 'bold' }}
          containerStyle={{ width: '48%', marginTop: '5%' }}
          title="방 이미지 선택"
          onPress={openImagePickerAsync}
        />
      </RoomCreateBg>
    </RoomCreateView>
  );
}

export default Avatar;
const RoomCreateView = styled.View`
  flex: 1;
  background-color: #242424;
`;
const RoomCreateBg = styled.ImageBackground`
  flex: 1;
  opacity: 0.7;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const RoomAvatar = styled.ImageBackground`
  border-radius: 8px;
  width: 120px;

  height: 120px;
`;
const RoomCreateHeader = styled.View`
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
  padding: 10px;
  align-items: center;
  position: absolute;
  top: 40px;
  opacity: 1; ;
`;
