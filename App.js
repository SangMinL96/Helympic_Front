import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useLayoutEffect, useState } from 'react';
import { View } from 'react-native';
import { ApolloProvider } from '@apollo/react-hooks';
import { NavigationContainer } from '@react-navigation/native';
import { ThemeProvider } from 'styled-components';
import Toast from 'react-native-toast-message';
import Stack from './navigation/Stack';
import Client from './Apollo/Client';
import { AuthProvider, useIsLoggedIn, useLogIn } from './component/AuthProvider';
import styles from './styles';
import AppLoading from 'expo-app-loading';
import * as Font from 'expo-font';
import { Asset } from 'expo-asset';
import * as Icon from '@expo/vector-icons';
export default class App extends React.Component {
  state = {
    isReady: false
  };

  render() {
    if (!this.state.isReady) {
      return (
        <AppLoading
          startAsync={this._cacheResourcesAsync}
          onFinish={() => this.setState({ isReady: true })}
          onError={console.warn}
        />
      );
    }

    return (
      <ApolloProvider client={Client}>
        <ThemeProvider theme={styles}>
          <AuthProvider>
            <NavigationContainer>
              <Stack />
              <Toast ref={(ref) => Toast.setRef(ref)} position={'top'} topOffset={80} visibilityTime={1000} />
            </NavigationContainer>
          </AuthProvider>
        </ThemeProvider>
      </ApolloProvider>
    );
  }

  async _cacheResourcesAsync() {
    const images = [
      require('./Image/createicon.png'), 
      require('./Image/descImg.jpg'),
       require('./Image/first.png'),
        require('./Image/hashTagImg.jpg'),
         require('./Image/headericon.png'), 
         require('./Image/headerLogo.png'),
          require('./Image/headerTitle.png'),
          require('./Image/logo.png'),
          require('./Image/poster2.jpg'),
          require('./Image/second.png'),
          require('./Image/third.png'),
          require('./Image/titleIcon.png'),
          require('./Image/titleImg.jpg')];

    const cacheImages = images.map((image) => {
      return Asset.fromModule(image).downloadAsync();
    });
    const cacheIcon = Font.loadAsync({
      ...Icon.MaterialCommunityIcons.font
    });

    return Promise.all(cacheImages,cacheIcon) ;
  }
}
