import React, { useEffect, useState } from 'react';
import { HeaderBackButton } from '@react-navigation/stack';
import { View, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styled from 'styled-components/native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { Input } from "react-native-elements";
import Toast from 'react-native-toast-message';

function Desc({route}) {
  const navigation = useNavigation();
  const [desc,setDesc] = useState()
  const avatar = route.params.avatar;
  const title = route.params.title;
  useEffect(() => {
    navigation.setOptions({
      header: () => {}
    });
  }, [navigation]);

  return (
    <RoomCreateView>
      <RoomCreateBg resizeMode="stretch" source={require('../../../Image/descImg.jpg')}>
        <RoomCreateHeader>
          <TouchableOpacity onPress={() => navigation.navigate('Tebs')}>
            <MaterialCommunityIcons name="close" color={'white'} size={26} />
          </TouchableOpacity>
          <Text style={{ color: 'white', fontSize: 18 }}>설명</Text>
          <TouchableOpacity onPress={() =>desc? navigation.navigate('HashTag',{avatar,title,desc}):Toast.show({ text1: '설명을 입력해주세요.', type: 'error' })}>
            <Text style={{ color: 'white', fontSize: 18 }}>다음</Text>
          </TouchableOpacity>
        </RoomCreateHeader>
        <Input
            containerStyle={{width:350}}
            disabledInputStyle={{ background: "#ffffff" }}
            inputStyle={{color:"white"}}
            label="방의 설명을 입력해주세요."
            labelStyle={{color:"white"}}
            onChangeText={(ev)=>setDesc(ev)}
            leftIcon={<MaterialCommunityIcons name="form-select" color={'white'} size={26} />}
          />
      </RoomCreateBg>
    </RoomCreateView>
  );
}

export default Desc;
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
