import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { ApolloProvider } from '@apollo/react-hooks';
export default function App() {
  return (
    <ApolloProvider client={Client}>
      <View style={styles.container}>
        <Text>가보자잇~~</Text>
        <StatusBar style="auto" />
        
      </View>
    </ApolloProvider>
  );
}

