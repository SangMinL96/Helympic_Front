import React, { createRef, useEffect, useRef, useState } from 'react';
import { Image } from 'react-native';
import { ImageBackground } from 'react-native';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import styled from 'styled-components/native';
import RoomDetail from '../../../../component/RoomDetail';
import RoomList from '../../../../component/RoomList';

function AllRoom({ test }) {
  const [open,setOpen] = useState(false)
  useEffect(() => {}, []);

  const onAvatarClick =(ev)=>{
    console.log(test)
  }
  const onListClick =(ev)=>{
    const id =ev.target
    setOpen(true)
  }
  return (
    <>
      <RoomList  title={"테스트"} onAvatarClick={onAvatarClick}onListClick={onListClick} />
     {open ?  <RoomDetail test={test} open={open} setOpen={setOpen}/> :null}
     </>
  );
}

export default AllRoom;
const RoomListView = styled.View`
  flex: 1;
  background-color: red;
  margin-top: 10px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;