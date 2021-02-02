import React, { useEffect } from 'react';
import styled from "styled-components/native"
import { View, Text, TouchableOpacity } from 'react-native';
import Popularitys from './Popularitys';



function Popularity() {
 

  return (
    <PopularityScreen>
      <Popularitys />
    </PopularityScreen>
  );
}

export default Popularity;
const PopularityScreen = styled.View`
 flex: 1;
  background-color: ${(props) => props.theme.backColor};
`;

