import React, { createRef, useEffect, useRef, useState } from 'react';
import { Image } from 'react-native';
import { ImageBackground } from 'react-native';

import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import styled from 'styled-components/native';
import logo from '../../../Image/logo.png';
import { Avatar } from 'react-native-elements';
import RoomContainer from '../../../component/RoomContainer';

function AllRoom({ test }) {
  useEffect(() => {}, []);

  const onAvatarClick =(ev)=>{
    console.log(test)
  }
  const onListClick =(ev)=>{
    const id =ev.target
    console.log("리스트",id)
  }
  return (
     <RoomContainer  title={"테스트"} onAvatarClick={onAvatarClick}onListClick={onListClick} />
  );
}

export default AllRoom;
