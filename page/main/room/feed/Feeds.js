import { Video } from 'expo-av';
import React from 'react';
import styled from 'styled-components/native';
import VideoPlayer from 'expo-video-player';
import { ScrollView } from 'react-native';
import { Button, ListItem } from 'react-native-elements';
import { useQuery } from '@apollo/react-hooks';
import * as ScreenOrientation from 'expo-screen-orientation';
import Upload from './Upload';
import { GET_ROOM_VIDEO } from './Query';
import { UPLOAD_URL } from '../../../../config';
import { ActivityIndicator } from 'react-native';
import { View } from 'react-native';
function Feeds({ name, id }) {
  const { data, loading,refetch } = useQuery(GET_ROOM_VIDEO, {
    variables: { roomId: id },
    fetchPolicy:"network-only"
  });

  

  return (
    <FeedsView>
      {loading ? (
        <View style={{ flex: 1, justifyContent: 'center' }}>
          <ActivityIndicator size="large" color="#0059ff" />
        </View>
      ) : (
        <>
          <ScrollView style={{ flex: 1, width: '100%' }}>
            {data?.getRoomVideo?.map((item,index) => (
              <VideoView key={index}>
                <ListItem containerStyle={{ backgroundColor: '#f8f8f8', padding: 10 }}>
                  <RoomAvatar
                    resizeMode="cover"
                    source={{ uri: item.avatar ? `${UPLOAD_URL}image/?fn=${item.avatar}` : null }}
                  />
                  <ListItem.Content>
                    <DtlBoldText>{item?.name}</DtlBoldText>
                    <DtlText>{item?.id}</DtlText>
                  </ListItem.Content>
                </ListItem>
                <VideoPlayer
                  height={280}
                  textStyle={{ fontSize: 13,color:"#e9e9e9" }}
                  showFullscreenButton={false}
                  videoProps={{
                    shouldPlay: false,
                    resizeMode: Video.RESIZE_MODE_CONTAIN,
                    source: {
                      uri: item.video ? `${UPLOAD_URL}video/?fn=${item.video}` : null
                    }
                  }}
                  inFullscreen={true}
                />
              </VideoView>
            ))}
          </ScrollView>
          <Upload id={id} refetch={refetch} />
        </>
      )}
    </FeedsView>
  );
}

export default Feeds;
const FeedsView = styled.View`
  flex: 1;
`;
const VideoView = styled.View`
  height: 430px;
  margin-top: 20px;
  background-color: #f8f8f8;
`;
const DtlText = styled.Text`
  font-size: 13px;
  margin-top: 4px;
`;
const DtlBoldText = styled.Text`
  font-size: 13.5px;
  font-weight: bold;
`;
const RoomAvatar = styled.Image`
  border-radius: 20px;
  width: 50px;
  height: 50px;
  background-color: #d1d8e0;
  /* background-color: ${(props) => props.theme.darkGreyColor}; */
`;
