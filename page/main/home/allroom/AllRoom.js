import React, { createRef, useEffect, useRef, useState } from 'react';
import { Image } from 'react-native';
import { ImageBackground } from 'react-native';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import styled from 'styled-components/native';
import RoomDetail from '../../../../component/RoomDetail';
import RoomList from '../../../../component/RoomList';

function AllRoom({ id, title, uCount, desc, rDate, tag, masterid, name }) {
  const [open, setOpen] = useState(false);
  useEffect(() => {}, []);

  const onListClick = (ev) => {
    const id = ev.target;
    setOpen(true);
  };

  return (
    <>
      <RoomList title={title} tag={tag} uCount={uCount} onListClick={onListClick} />
      {open ? (
        <RoomDetail
          id={id}
          name={name}
          rDate={rDate}
          title={title}
          desc={desc}
          tag={tag}
          masterid={masterid}
          uCount={uCount}
          open={open}
          setOpen={setOpen}
        />
      ) : null}
    </>
  );
}

export default AllRoom;
