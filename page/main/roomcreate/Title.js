import React, { useEffect, useState } from 'react';
import { HeaderBackButton } from '@react-navigation/stack';
import { View, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styled from 'styled-components/native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { Input } from "react-native-elements";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
function Title({route}) {
  const navigation = useNavigation();
  const [title,setTitle] = useState()
  // const avatar = route.params.avatar;
  useEffect(() => {
    navigation.setOptions({
      header: () => {}
    });
  }, [navigation]);

  return (
    <RoomCreateView>
      <RoomCreateBg resizeMode="stretch" source={require('../../../Image/titleImg.jpg')}>
        <RoomCreateHeader>
          <TouchableOpacity onPress={() => navigation.navigate('Tebs')}>
            <MaterialCommunityIcons name="close" color={'white'} size={26} />
          </TouchableOpacity>
          <Text style={{ color: 'white', fontSize: 18 }}>타이틀</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Desc',{avatar,title})}>
            <Text style={{ color: 'white', fontSize: 18 }}>다음</Text>
          </TouchableOpacity>
        </RoomCreateHeader>
        <Input
            containerStyle={{width:350}}
            disabledInputStyle={{ background: "#ffffff" }}
            inputStyle={{color:"white"}}
            label="타이틀을 입력해주세요."
            labelStyle={{color:"white"}}
            onChangeText={(ev)=>setTitle(ev)}
            leftIcon={<Icon name="robot" size={30} color={"white"} />}
          />
      </RoomCreateBg>
    </RoomCreateView>
  );
}

export default Title;
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
