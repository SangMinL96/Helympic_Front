import React, { useCallback, useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, SafeAreaView, FlatList } from 'react-native';
import styled from 'styled-components/native';
import AllRoom from './AllRoom';
import { NetworkStatus } from '@apollo/client';
import { useQuery, useLazyQuery } from '@apollo/react-hooks';
import { GET_ROOM } from './Query';
import { RefreshControl } from 'react-native';
import { ActivityIndicator } from 'react-native';
import { Picker } from '@99xt/first-born';

function AllRoomView({ navigation }) {
  const [refreshing, setRefreshing] = useState(false);
  const [value, setValue] = useState('1');
  const { data: roomData, loading, refetch, networkStatus } = useQuery(GET_ROOM, {
    variables: { type: value },
    fetchPolicy: 'cache-and-network'
  });

  const onSelect = (ev) => {
    setValue(ev);
    refetch();
  };
  const wait = (timeout) => {
    return new Promise((resolve) => {
      setTimeout(resolve, timeout);
    });
  };
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => {
      refetch();
      setRefreshing(false);
    });
  }, [refetch]);
  const renderItem = useCallback((item) =><AllRoom key={item.id} data={item.item} />, [])
  const keyExtractor = useCallback((item) => console.log(item.id.toString()), [])
  return (
    <>
      {loading === true && networkStatus === 1 ? (
        <View style={{ flex: 1, justifyContent: 'center' }}>
          <ActivityIndicator size="large" color="#0059ff" />
        </View>
      ) : (
        <AllRoomViewScreen>
          <Picker onValueChange={onSelect} selectedValue={value}>
            <Picker.Item value="1" label="최근 등록일순" />
            <Picker.Item value="2" label="오래된 등록일순" />
            <Picker.Item value="3" label="참가 인원 많은순" />
            <Picker.Item value="4" label="참가 인원 적은순" />
          </Picker>
         
            <FlatList
              refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
              data={roomData?.getRoomList}
              renderItem={renderItem}
              keyExtractor={keyExtractor}
            />
        
          {/* <ScrollView refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
            {roomData?.getRoomList?.map((item) => (
              <AllRoom key={item.id} data={item} />
            ))}
          </ScrollView> */}
        </AllRoomViewScreen>
      )}
    </>
  );
}

export default AllRoomView;
const AllRoomViewScreen = styled.View`
  ${(props) => props.theme.screen};
  background-color: ${(props) => props.theme.backColor};
`;
