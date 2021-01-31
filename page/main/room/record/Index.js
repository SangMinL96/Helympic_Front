import { HeaderBackButton } from '@react-navigation/stack';
import React, { useEffect } from 'react';
import styled from "styled-components/native"
import { View, Text, TouchableOpacity } from 'react-native';

function Record({ navigation,route }) {

console.log(route)
  return (
    <RecordScreen>
      <Text>{"Asdfsa"}</Text>
    </RecordScreen>
  );
}

export default Record;
const RecordScreen = styled.View`
  ${(props) => props.theme.screen};
  background-color: ${(props) => props.theme.backColor};
`;