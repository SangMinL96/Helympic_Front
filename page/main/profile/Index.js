import React, { useEffect, useState } from 'react';

import { View, Text, TouchableOpacity, ScrollView,ActivityIndicator } from 'react-native';
import { useLogOut } from '../../../component/AuthProvider';
import styled from 'styled-components/native';
import { useQuery,useMutation } from '@apollo/react-hooks';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import MyInfo from './MyInfo';
import MyRoom from './MyRoom';
import { GET_MY_ROOM, GET_PROFILE } from './Query';
import { Card, Button } from 'react-native-elements';

function Profile() {
  const [myRoomMt] = useMutation(GET_MY_ROOM);
  const { data: userData,loading,refetch:userDataRf } = useQuery(GET_PROFILE);
  const [roomData,setRoomData]=useState()
const navigation = useNavigation()

  useEffect(() => {
    onMyRoom()
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
  return (
    <>
      {loading ? (
        <View style={{ flex: 1, justifyContent: 'center' }}>
          <ActivityIndicator size="large" color="#0059ff" />
        </View>
      ) : (
        <ProfileScreen>
          <MyInfo {...userData?.getProfile[0]} userDataRf={userDataRf}/>
          <Card containerStyle={{ width: '100%', borderRadius: 10, backgroundColor: '#f1f1f1' }}>
            <MyRoomView>
              <MyRoomHeader>
                <Text style={{ fontSize: 20, fontWeight: 'bold' }}>나의 방</Text>
                <Button onPress={()=>navigation.navigate('Search')} buttonStyle={{ width: 50, height: 23 }} title="방 추가" titleStyle={{ fontSize: 10 }} />
              </MyRoomHeader>
              <Card.Divider />
              <ScrollView>
                {roomData?.map((item) => (
                  <MyRoom key={item.id} data={item} />
                ))}
              </ScrollView>
            </MyRoomView>
          </Card>
        </ProfileScreen>
      )}
    </>
  );
}

export default Profile;

const ProfileScreen = styled.View`
  ${(props) => props.theme.screen};
  background-color: ${(props) => props.theme.backColor};
`;

const MyRoomView = styled.View`
  width: 100%;
  height: 300px;
`;
const MyRoomHeader = styled.View`
  width: 98%;
  margin-bottom: 10px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;
