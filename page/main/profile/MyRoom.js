import React, { createRef, useEffect, useRef, useState } from 'react';

import Toast from 'react-native-toast-message';
import RoomList from '../../../component/RoomList';
import RoomDetail from '../../../component/RoomDetail';
import { GET_MY_ROOM } from './Query';

function MyRoom({ data }) {
  const [open, setOpen] = useState(false);


  const onListClick = (ev) => {
    setOpen(true);
  };

  

  return (
    <>
      <RoomList {...data} onListClick={onListClick} />
      {open ? <RoomDetail {...data} open={open} setOpen={setOpen}  /> : null}
    </>
  );
}

export default MyRoom;
