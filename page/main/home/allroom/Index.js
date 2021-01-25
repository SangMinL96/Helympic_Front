import React, {  useCallback, useEffect,  useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import styled from 'styled-components/native';
import AllRoom from './AllRoom';
import { useQuery, useLazyQuery } from '@apollo/react-hooks';
import { GET_ROOM } from './Query';
import { RefreshControl } from 'react-native';
import { ActivityIndicator } from 'react-native';

function AllRoomView({ navigation }) {
  const [refreshing, setRefreshing] = useState(false);
  const [getRoom, { data: roomData, loading }] = useLazyQuery(GET_ROOM, {
    fetchPolicy: 'network-only'
  });

  useEffect(() => {
    getRoom();
  }, [getRoom]);

  const wait = (timeout) => {
    return new Promise((resolve) => {
      setTimeout(resolve, timeout);
    });
  };
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => {
      getRoom();
      setRefreshing(false);
    });
  }, [getRoom]);

  return (
    <>
      {loading ? (
        <View style={{ flex: 1, justifyContent: 'center' }}>
          <ActivityIndicator size="large" color="#0059ff" />
        </View>
      ) : (
        <AllRoomViewScreen>
          <ScrollView refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
            {roomData?.getRoomList?.map((item) => (
              <AllRoom
                key={item.id}
                data={item}
              />
            ))}
          </ScrollView>
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
