import React, { createRef, useEffect, useRef, useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import styled from 'styled-components/native';
import { Avatar } from 'react-native-elements';

function MyRoomView({ navigation }) {
 const test =[{id:"1"},{id:"2"}]
  useEffect(() => {}, []);

  return (
    <MyRoomViewScreen>
     
     
    </MyRoomViewScreen>
  );
}

export default MyRoomView;
const MyRoomViewScreen = styled.View`
  ${(props) => props.theme.screen};
  background-color: ${props=>props.theme.backColor}
`;