import React, {  useCallback, useEffect,  useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, FlatList, SafeAreaView } from 'react-native';
import styled from 'styled-components/native';
import MyRoom from './MyRoom';
import {  useMutation } from '@apollo/react-hooks';
import { GET_MY_ROOM } from './Query';
import { RefreshControl } from 'react-native';
import { ActivityIndicator } from 'react-native';

function MyRoomView({ navigation }) {
  const [refreshing, setRefreshing] = useState(false);
  const [myRoomMt] = useMutation(GET_MY_ROOM,{fetchPolicy:"no-cache"});
  const [roomData,setRoomData]=useState()
 
  useEffect(() => {
    onMyRoom();
  }, [onMyRoom]);
  const onMyRoom =async()=>{
    try{
    const rslt = await myRoomMt()
   if(rslt){
     setRoomData(rslt?.data?.getMyRoomList)
   }
    }catch(err){

    }
}
  const wait = (timeout) => {
    return new Promise((resolve) => {
      setTimeout(resolve, timeout);
    });
  };
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => {
      myRoomMt()
      setRefreshing(false);
    });
  }, [myRoomMt]);
  const renderItem = useCallback((item) => <MyRoom key={item.id}data={item.item}/>, [])
  const keyExtractor = useCallback((item) => item.id.toString(), [])
 
  return (
    <>
      {false ? (
        <View style={{ flex: 1, justifyContent: 'center' }}>
          <ActivityIndicator size="large" color="#0059ff" />
        </View>
      ) : (
        <MyRoomViewScreen>
          <SafeAreaView>
            <FlatList
              refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
              data={roomData||[]}
              renderItem={renderItem}
              keyExtractor={keyExtractor}
            />
          </SafeAreaView>
        </MyRoomViewScreen>
      )}
    </>
  );
}

export default MyRoomView;
const MyRoomViewScreen = styled.View`
  ${(props) => props.theme.screen};
  background-color: ${(props) => props.theme.backColor};
`;
