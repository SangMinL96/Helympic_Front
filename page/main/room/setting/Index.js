import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native';

import styled from 'styled-components/native';
import { useQuery } from '@apollo/react-hooks';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import { GET_ROOM_INFO, GET_ROOM_SIGN } from './Query';
import { Card, Button } from 'react-native-elements';
import RoomInfo from './RoomInfo';
import SignInRoom from './SignInRoom';

function Setting({ route }) {
  const { data: infoData, loading, refetch: infoRf } = useQuery(GET_ROOM_INFO, {
    variables: { roomId: route?.params?.id },
    fetchPolicy: 'cache-and-network'
  });
  const { data: signData, refetch: signRf } = useQuery(GET_ROOM_SIGN, {
    variables: { roomId: route?.params?.id },
    fetchPolicy: 'cache-and-network'
  });
  return (
    <>
      {loading ? (
        <View style={{ flex: 1, justifyContent: 'center' }}>
          <ActivityIndicator size="large" color="#0059ff" />
        </View>
      ) : (
        <SettingScreen>
          <RoomInfo {...infoData?.getRoomInfo[0]} infoRf={infoRf} />
          <Card containerStyle={{ width: '100%', borderRadius: 10, backgroundColor: '#f1f1f1' }}>
            <SettingView>
              <SettingHeader>
                <Text style={{ fontSize: 20, fontWeight: 'bold' }}>승인 대기목록</Text>
              </SettingHeader>
              <Card.Divider />
              <ScrollView>
                {signData?.getSignRoom !== null
                  ? signData?.getSignRoom?.map((item) => <SignInRoom key={item.id} signRf={signRf} data={item} roomId={route?.params?.id}/>)
                  : <Text>참가 요청한 유저가 없습니다.</Text>}
              </ScrollView>
            </SettingView>
          </Card>
        </SettingScreen>
      )}
    </>
  );
}

export default Setting;

const SettingScreen = styled.View`
  ${(props) => props.theme.screen};
  background-color: ${(props) => props.theme.backColor};
`;

const SettingView = styled.View`
  width: 100%;
  height: 300px;
`;
const SettingHeader = styled.View`
  width: 98%;
  margin-bottom: 10px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;
