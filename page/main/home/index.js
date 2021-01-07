import React, { createRef, useEffect, useRef, useState } from 'react';
import { Image } from 'react-native';
import { ImageBackground } from 'react-native';

import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import styled from 'styled-components/native';
import logo from '../../../Image/logo.png';
import { Avatar } from 'react-native-elements';
import RoomContainer from '../../../component/RoomContainer';
import AllRoom from './AllRoom';

function Home({ navigation }) {
 const test =[{id:"1"},{id:"2"}]
  useEffect(() => {}, []);

  return (
    <HomeScreen>
      <ScrollView>
      {test.map(item=><AllRoom test={item.id}/>)}
      </ScrollView>
     
    </HomeScreen>
  );
}

export default Home;
const HomeScreen = styled.View`
  ${(props) => props.theme.screen};
  background-color: #b5c3d1;
`;