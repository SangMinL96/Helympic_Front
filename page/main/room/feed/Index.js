import React, { useEffect } from 'react';
import styled from "styled-components/native"
import { View, Text, TouchableOpacity } from 'react-native';
import Feeds from './Feeds';



function Feed({ route }) {
 

  return (
    <FeedScreen>
      <Feeds {...route?.params} />
    </FeedScreen>
  );
}

export default Feed;
const FeedScreen = styled.View`
flex: 1;
  background-color: ${(props) => props.theme.backColor};
`;