import { Video } from 'expo-av';
import React from 'react';
import styled from 'styled-components/native';
import VideoPlayer from 'expo-video-player';
function Feeds() {
  return (
    <FeedsView>
      <VideoPlayer
        videoProps={{
          shouldPlay: true,
          resizeMode: Video.RESIZE_MODE_CONTAIN,
          source: {
            uri: 'https://i.imgur.com/zcyfMLI.mp4'
          }
        }}
        inFullscreen={true}
      />
      {/* <Video
        source={{ uri: 'https://i.imgur.com/zcyfMLI.mp4' }}
        rate={1.0}
        volume={1.0}
        isMuted={false}
        resizeMode="cover"
        
        
        style={{ width: 300, height: 300 }}
      /> */}
    </FeedsView>
  );
}

export default Feeds;
const FeedsView = styled.View`
  flex: 1;
`;
