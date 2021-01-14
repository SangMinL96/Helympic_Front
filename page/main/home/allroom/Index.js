import React, { createRef, useEffect, useRef, useState } from 'react';
import { Image } from 'react-native';
import { ImageBackground } from 'react-native';

import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import styled from 'styled-components/native';
import { Avatar } from 'react-native-elements';
import AllRoom from './AllRoom';
import { onUserInfo } from '../../../../component/utils';

function AllRoomView({ navigation }) {
 const test =[{id:"1"},{id:"2"}]


  return (
    <AllRoomViewScreen>
      <ScrollView>
      {test.map(item=><AllRoom key={item.id} test={item.id}/>)}
      </ScrollView>
     
    </AllRoomViewScreen>
  );
}

export default AllRoomView;
const AllRoomViewScreen = styled.View`
  ${(props) => props.theme.screen};
  background-color: ${props=>props.theme.backColor}
`;