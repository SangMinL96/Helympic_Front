import React from 'react';
import { TouchableOpacity } from 'react-native';
import { Text } from 'react-native';
import styled from "styled-components/native"

function TagChip() {
  return (
 <TouchableOpacity>

     <TagText>#여행</TagText>
   </TouchableOpacity>
  );
}

export default TagChip;

const TagText = styled.Text`

font-size: 12px;
border:1px solid #030303;
  padding: 1px 7px 1px 7px;
  border-radius: 50px;
  margin-left: 5px;
  margin-bottom: 5px;
;
`