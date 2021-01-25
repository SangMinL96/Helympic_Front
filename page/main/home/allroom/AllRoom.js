import React, { createRef, useEffect, useRef, useState } from 'react';
import RoomDetail from '../../../../component/RoomDetail';
import RoomList from '../../../../component/RoomList';
import { useMutation } from '@apollo/react-hooks';
import { SIGN_ROOM } from './Query';
import Toast from 'react-native-toast-message';
function AllRoom({ data }) {
  const [open, setOpen] = useState(false);

  const [signRoomMt] = useMutation(SIGN_ROOM);
  useEffect(() => {}, []);

  const onListClick = (ev) => {
    setOpen(true);
  };
  

    /**
   * 로그인시 받은 토큰 만료시간 15분이 지난후 사용자가 
   * Api사용시 401에러를 받으면 토큰을 새롭게 받는 함수
   * @param {Int} id 방 아이디
   * @param {String} btnState 1: 이미 참여한 방, 2: 승인 대기 3: 참가신청가능
   * @param {Function} setLoading 버튼 클릭시 로딩상태 바꾸는 함수
   */
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
      <RoomList {...data} onListClick={onListClick} />
      {open ? (
        <RoomDetail
         {...data}
          open={open}
          setOpen={setOpen}
          onSignRoom={onSignRoom}
        />
      ) : null}
    </>
  );
}

export default AllRoom;
