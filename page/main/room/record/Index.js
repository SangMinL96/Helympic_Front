import { HeaderBackButton } from '@react-navigation/stack';
import React, { useEffect } from 'react';
import styled from "styled-components/native"
import { View, Text, TouchableOpacity } from 'react-native';
import Records from './Records';

function Record({ navigation,route }) {


  return (
    <RecordScreen>
       <Records {...route?.params} />
    </RecordScreen>
  );
}

export default Record;
const RecordScreen = styled.View`
  ${(props) => props.theme.screen};
  background-color: ${(props) => props.theme.backColor};
`;