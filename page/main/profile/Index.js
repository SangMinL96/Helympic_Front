import React, { useEffect } from 'react';

import { View, Text, TouchableOpacity, ScrollView,ActivityIndicator } from 'react-native';
import { useLogOut } from '../../../component/AuthProvider';
import styled from 'styled-components/native';
import { useQuery } from '@apollo/react-hooks';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import MyInfo from './MyInfo';
import MyRoom from './MyRoom';
import { GET_MY_ROOM, GET_PROFILE } from './Query';
import { Card, Button } from 'react-native-elements';

function Profile() {
  const { data: roomData, loading } = useQuery(GET_MY_ROOM);
  const { data: userData } = useQuery(GET_PROFILE);
const navigation = useNavigation()
  useEffect(() => {}, []);

  return (
    <>
      {loading ? (
        <View style={{ flex: 1, justifyContent: 'center' }}>
          <ActivityIndicator size="large" color="#0059ff" />
        </View>
      ) : (
        <ProfileScreen>
          <MyInfo {...userData?.getProfile[0]}/>
          <Card containerStyle={{ width: '100%', borderRadius: 10, backgroundColor: '#f1f1f1' }}>
            <MyRoomView>
              <MyRoomHeader>
                <Text style={{ fontSize: 20, fontWeight: 'bold' }}>나의 방</Text>
                <Button onPress={()=>navigation.navigate('Search')} buttonStyle={{ width: 50, height: 23 }} title="방 추가" titleStyle={{ fontSize: 10 }} />
              </MyRoomHeader>
              <Card.Divider />
              <ScrollView>
                {roomData.getMyRoomList?.map((item) => (
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
