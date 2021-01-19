import React, { createRef, useCallback, useEffect, useRef, useState } from 'react';
import { Image } from 'react-native';
import { ImageBackground } from 'react-native';

import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import styled from 'styled-components/native';
import { Avatar } from 'react-native-elements';
import AllRoom from './AllRoom';
import { onUserInfo } from '../../../../component/utils';
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
        <View style={{flex:1,justifyContent:"center"}}>
        <ActivityIndicator size="large" color="#0059ff" />
        </View>
      ) : (
        <AllRoomViewScreen>
          <ScrollView refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
            {roomData?.getRoomList.map((item) => (
              <AllRoom
                key={item.id}
                id={item.id}
                title={item.title}
                desc={item.desc1}
                tag={item.hash_tag}
                masterid={item.master_id}
                name={item.name}
                rDate={item.rDate}
                uCount={item.uCount}
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
