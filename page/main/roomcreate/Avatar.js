import React, { useEffect, useState } from 'react';
import { HeaderBackButton } from '@react-navigation/stack';
import { View, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styled from 'styled-components/native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { Button, Input } from "react-native-elements";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios';
function Avatar({route}) {
  const navigation = useNavigation();
  const [photo,setPhoto]=useState()
  console.log(photo)

  useEffect(() => {
    navigation.setOptions({
      header: () => {}
    });
  }, [navigation]);
  let openImagePickerAsync = async () => {
    try{
    let permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (permissionResult.granted === false) {
      alert("Permission to access camera roll is required!");
      return;
    }

    let pickerResult = await ImagePicker.launchImageLibraryAsync();
     await setPhoto(pickerResult);
  }catch(err){

    }
  }



  const onUpload =async () => {
  try{
      const formData = new FormData();
      formData.append("photo", {
        name: "test",
        type: "image/jpeg",
        uri: photo.uri
      });
    
      await axios.post("http://192.168.56.1:4000/upload", formData,null);
    }catch(err){
      console.log(err)
    }
  };
  return (
    <RoomCreateView>
      <RoomCreateBg resizeMode="stretch" source={require('../../../Image/descImg.jpg')}>
        <RoomCreateHeader>
          <TouchableOpacity onPress={() => navigation.navigate('Tebs')}>
            <MaterialCommunityIcons name="close" color={'white'} size={26} />
          </TouchableOpacity>
          <Text style={{ color: 'white', fontSize: 18 }}>설명</Text>
          <TouchableOpacity onPress={() => navigation.navigate('HashTag',{title,desc})}>
            <Text style={{ color: 'white', fontSize: 18 }}>다음</Text>
          </TouchableOpacity>
        </RoomCreateHeader>
        <Button
            titleStyle={{ fontWeight: 'bold' }}
            containerStyle={{ width: '48%', marginTop: '5%' }}
            title="파일"
            onPress={openImagePickerAsync}
          />
              <Button
            titleStyle={{ fontWeight: 'bold' }}
            containerStyle={{ width: '48%', marginTop: '5%' }}
            title="업로드"
            onPress={onUpload}
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
