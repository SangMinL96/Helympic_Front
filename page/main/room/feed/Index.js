import React, { useEffect } from 'react';
import styled from "styled-components/native"
import { View, Text, TouchableOpacity } from 'react-native';
import Feeds from './Feeds';



function Feed({ navigation }) {
  useEffect(() => {
   
  }, []);

 

 
  return (
    <FeedScreen>
      <Feeds />
    </FeedScreen>
  );
}

export default Feed;
const FeedScreen = styled.View`
  ${(props) => props.theme.screen};
  background-color: ${(props) => props.theme.backColor};
`;