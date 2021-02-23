import React, { useCallback, useEffect, useState } from 'react';
import { FlatList, SafeAreaView, ScrollView } from 'react-native';
import styled from 'styled-components/native';

import { useMutation } from '@apollo/react-hooks';
import { SEARCH_ROOM } from './Query';
import { ActivityIndicator, View } from 'react-native';
import { Input } from '@99xt/first-born';
import SearchRoom from './SearchRoom';

function SearchView({ navigation, route }) {
  const [searchData, setSearchData] = useState();
  const [loading, setLoading] = useState(false);
  const [searchMt] = useMutation(SEARCH_ROOM);
  const [value, setValue] = useState();

  useEffect(() => {
    setValue(route?.params?.text);
  }, [route, setValue]);

  const onSearchRoom = async (ev) => {
    try {
      setLoading(true);
      const text = ev.nativeEvent.text;
      const rslt = await searchMt({ variables: { text } });
      if (rslt) {
        setSearchData(rslt?.data?.searchRoomList);
        setLoading(false);
      }
    } catch (err) {}
  };
  const renderItem = useCallback(
    (item) => <SearchRoom key={item.item.id} data={item.item}  />,
    []
  );
  const keyExtractor = useCallback((item) => item.id.toString(), []);

  return (
    <>
      {loading ? (
        <View style={{ flex: 1, justifyContent: 'center' }}>
          <ActivityIndicator size="large" color="#0059ff" />
        </View>
      ) : (
        <SearchViewScreen>
          <Input
            value={value || ''}
            onChangeText={(ev) => setValue(ev)}
            onSubmitEditing={onSearchRoom}
            placeholder="방 제목, 닉네임, 태그"
          />
          <SafeAreaView>
            <FlatList
              data={searchData || []}
              renderItem={renderItem}
              keyExtractor={keyExtractor}
            />
          </SafeAreaView>
        </SearchViewScreen>
      )}
    </>
  );
}

export default SearchView;
const SearchViewScreen = styled.View`
  ${(props) => props.theme.screen};
  background-color: ${(props) => props.theme.backColor};
`;
