import { Video } from 'expo-av';
import React, { useState } from 'react';
import styled from 'styled-components/native';
import VideoPlayer from 'expo-video-player';
import { ScrollView } from 'react-native';
import { Button, ListItem } from 'react-native-elements';
import { useQuery, useMutation } from '@apollo/react-hooks';
import * as ScreenOrientation from 'expo-screen-orientation';
import { GET_ROOM_VIDEO, SAVE_LIKE } from './Query';

import { ActivityIndicator } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { View, Text, TouchableOpacity } from 'react-native';
import { UPLOAD_URL } from '../../../config';

function MyVideo({ data }) {
  return (
    <>
      {data?.video === null ? (
        <View style={{margin:20}}>
          <Text style={{fontSize:15}}>동영상이 존재하지 않습니다.</Text>
        </View>
      ) : (
        <VideoView>
          <ListItem containerStyle={{ backgroundColor: '#f8f8f8', padding: 10 }}>
            <RoomAvatar
              resizeMode="cover"
              source={{ uri: data.avatar ? `${UPLOAD_URL}image/?fn=${data.avatar}` : null }}
            />
            <ListItem.Content>
              <DtlBoldText>{data?.title}</DtlBoldText>
              <DtlText>{data?.rDate}</DtlText>
            </ListItem.Content>
            <LikeView>
              <Icon name="heart" size={25} color="red" />
              <Text style={{ color: 'gray' }}>{data.vCount}</Text>
            </LikeView>
          </ListItem>
          <VideoPlayer
            height={280}
            textStyle={{ fontSize: 13, color: '#e9e9e9' }}
            showFullscreenButton={false}
            videoProps={{
              shouldPlay: false,
              resizeMode: Video.RESIZE_MODE_CONTAIN,
              source: {
                uri: data?.video ? `${UPLOAD_URL}video/?fn=${data.video}` : null
              }
            }}
          />
        </VideoView>
      )}
    </>
  );
}

export default MyVideo;

const VideoView = styled.View`
  width: 100%;
  height: 380px;
  margin-bottom: 25px;
  margin-top: 10px;
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
const LikeView = styled.View`
  margin-top: 10px;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;
const LikeBtn = styled.View`
  border: 1px solid #dddddd;
  padding: 11px;
  background-color: #dddddd;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;
