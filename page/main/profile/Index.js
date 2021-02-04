import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView,ActivityIndicator } from 'react-native';
import { useLogOut } from '../../../component/AuthProvider';
import styled from 'styled-components/native';
import { useQuery,useMutation } from '@apollo/react-hooks';
import { useNavigation } from '@react-navigation/native';
import MyInfo from './MyInfo';
import MyRoom from './MyRoom';
import { GET_MY_ROOM, GET_MY_VIDEO, GET_PROFILE } from './Query';
import { Card, Button } from 'react-native-elements';
import { TouchableWithoutFeedback } from 'react-native';
import MyVideo from './MyVideo';

function Profile() {
  const [myRoomMt] = useMutation(GET_MY_ROOM);
  const { data: userData,loading,refetch:userDataRf } = useQuery(GET_PROFILE,{fetchPolicy:"network-only"});
  const { data: videoData } = useQuery(GET_MY_VIDEO,{fetchPolicy:"cache-and-network"});

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
          <View style={{height:200}}>
            <MyInfo {...userData?.getProfile[0]} userDataRf={userDataRf}/>
          </View>
           <ScrollView style={{width:"100%"}}>
          <Card containerStyle={{  borderRadius: 10, backgroundColor: '#f1f1f1' }}>
            <MyRoomView>
              <MyRoomHeader>
                <Text style={{ fontSize: 20, fontWeight: 'bold' }}>나의 방</Text>
                <Button onPress={()=>navigation.navigate('Search')} buttonStyle={{ width: 50, height: 23 }} title="방 추가" titleStyle={{ fontSize: 10 }} />
              </MyRoomHeader>
              <Card.Divider />
              <ScrollView nestedScrollEnabled={true}>
                {roomData?.map((item,index) => (
                  <MyRoom key={index} data={item} />
                ))}
              </ScrollView>
            </MyRoomView>
          </Card>
          
            <MyVideoView>
              <Card containerStyle={{  borderRadius: 10, backgroundColor: '#f1f1f1' }}>
                <Text style={{ fontSize: 20, fontWeight: 'bold' }}>나의 동영상</Text>
              </Card>
              <ScrollView style={{ width: '100%'}} nestedScrollEnabled={true}>
                {videoData?.getMyVideo?.map((item,index) => (
                  <MyVideo key={index} data={item} />
                ))}
              </ScrollView>
            </MyVideoView>
          
           </ScrollView>
        </ProfileScreen>
      )}
    </>
  );
}

export default Profile;

const ProfileScreen = styled.View`
 
  background-color: ${(props) => props.theme.backColor};
`;

const MyRoomView = styled.View`
  width: 100%;
  height: 300px;
`;
const MyVideoView = styled.View`
flex: 1;
margin-bottom: 200px;
padding-bottom: 100px;
`;
const MyRoomHeader = styled.View`
  width: 98%;
  margin-bottom: 10px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;
