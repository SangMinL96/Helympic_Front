import React, { createRef, useEffect, useRef, useState } from 'react';
import RoomDetail from '../../../../component/RoomDetail';
import RoomList from '../../../../component/RoomList';
import { useMutation } from '@apollo/react-hooks';
import { SIGN_ROOM } from './Query';
import Toast from 'react-native-toast-message';
function AllRoom({ id, title, uCount, avatar,desc, rDate, tag, masterid, name }) {
  const [open, setOpen] = useState(false);

  const [signRoomMt] = useMutation(SIGN_ROOM);
  useEffect(() => {}, []);

  const onListClick = (ev) => {
    setOpen(true);
  };
  
  const onSignRoom =async (id,btnState,setLoading) => {
    setLoading(true)
    try{
      if(btnState ==="1"){
        setLoading(false)
      }else if(btnState ==="2"){

      }else if(btnState ==="3"){
        const rslt = await signRoomMt({ variables: { roomId: id } });
        if(rslt?.data?.signRoom?.rslt ==="OK"){
         Toast.show({ text1: '참가 신청 완료 되었습니다.' });
         setOpen(false);
        }
      }
    }catch(err){

    }
  };

  return (
    <>
      <RoomList title={title} avatar={avatar} tag={tag} uCount={uCount} onListClick={onListClick} />
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
          onSignRoom={onSignRoom}
        />
      ) : null}
    </>
  );
}

export default AllRoom;
