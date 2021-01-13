import React from 'react';
import { TouchableOpacity } from 'react-native';
import { Text } from 'react-native';
import styled from "styled-components/native"

function TagChip({children  ,text,onPress}) {
  return (
   <TouchableOpacity onPress={onPress}>
     <TagText>{text}{children}</TagText>
   
   </TouchableOpacity>
  );
}

export default TagChip;

const TagText = styled.Text`
position: relative;
font-size: 13px;
height:25px;
border:1px solid #1f1f1f;
background-color: white;
  padding: 2.5px 9px 3px 12px;
  border-radius: 50px;
  margin-left: 5px;
  margin-bottom: 5px;
;
`