import React from 'react';
import { TouchableOpacity } from 'react-native';
import { Text } from 'react-native';
import styled from "styled-components/native"

function TagChip({children,text,onPress}) {
  return (
   <TouchableOpacity style={{marginTop:10}} onPress={onPress}>
     <TagText>{text}{children}</TagText>
   </TouchableOpacity>
  );
}

export default TagChip;

const TagText = styled.Text`
position: relative;
font-size: 13px;
height:24px;

border:1px solid #1f1f1f;
background-color: white;
  padding: 2px 8px 3px 8px;
  border-radius: 50px;
  margin-left: 5px;
  margin-bottom: 5px;
;
`