import React, { createRef, useEffect, useRef, useState } from 'react';
import RoomDetail from '../../../../component/RoomDetail';
import RoomList from '../../../../component/RoomList';
import { useMutation } from '@apollo/react-hooks';

import Toast from 'react-native-toast-message';
function AllRoom({ data }) {
  const [open, setOpen] = useState(false);

  useEffect(() => {}, []);

  const onListClick = (ev) => {
    setOpen(true);
  };

  return (
    <>
      <RoomList {...data} onListClick={onListClick} />
      {open ? <RoomDetail {...data} open={open} setOpen={setOpen} /> : null}
    </>
  );
}

export default AllRoom;
