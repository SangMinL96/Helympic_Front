import React, { useEffect, useLayoutEffect } from 'react';
import { Image,View, Text, TouchableOpacity,ImageBackground } from 'react-native';
import styled from "styled-components/native"
import { useNavigation } from '@react-navigation/native';
import { Button } from 'react-native';
import { Card } from 'react-native-elements';


function RoomCreate() {
  const navigation = useNavigation();
  return (
    
      <RoomCreateView>
          <RoomCreateBg resizeMode="stretch"   source={require('../../../Image/poster2.jpg')}>
      
          </RoomCreateBg>
          <RoomCreateCard>
            <Card.Title style={{color:"white",marginTop:5}}>방 생성하기</Card.Title>
              <Card.Divider/>
              <View style={{alignItems:"center",width:200}}>
                <TouchableOpacity style={{width:"100%"}} onPress={()=>navigation.navigate('Title')}>
                    <RoomCreateIcon
                        resizeMode="contain"
                        source={require('../../../Image/createicon.png')}
                      />
                 </TouchableOpacity>
              </View>
            </RoomCreateCard>
       </RoomCreateView>
  );
}

export default RoomCreate;

const RoomCreateView = styled.View`
flex:1;
background-color: #242424;

`
const RoomCreateBg = styled.ImageBackground`
flex:1;
opacity: 0.5;
flex-direction:column;
justify-content: center;
align-items: center;
`
const RoomCreateCard=styled.View`
position: absolute;
top: 40%;
left:25%;
background-color: #331818;
opacity: 0.8;
border-radius: 10px;

`
const RoomCreateIcon =styled.Image`
width: 100%;
height:100px;
margin-bottom: 10px;

&:hover{
  opacity: 0.7;
}

`
