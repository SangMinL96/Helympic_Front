import { ApolloClient, HttpLink, ApolloLink, InMemoryCache } from '@apollo/client';
import AsyncStorage from '@react-native-community/async-storage';
import {getToken} from "../component/getToken"
import { RetryLink } from 'apollo-link-retry';


const httpLink = new HttpLink({
  uri: `http://192.168.56.1:4000/`
});
const retryLinks = new RetryLink({
  attempts: (count, operation, error) => {
     const result = getToken(error,operation)
      return result.then(res => (res === 'OK' ? true : false))
  },
  delay: (count, operation, error) => {
    return count * 1000 * Math.random();
  },
});
const authMiddleware = new ApolloLink(async(operation, forward) => {
  const result =await AsyncStorage.getItem("user")
  const userInfo = JSON.parse(result)
  const token = userInfo?.token
  operation.setContext(({ headers = {} }) => ({
    headers: {
      ...headers,
      Authorization: `Bearer ${token}`
    }
  }));

  return forward(operation);
});

export default new ApolloClient({
  cache: new InMemoryCache(),
  link: ApolloLink.from([authMiddleware,retryLinks, httpLink])
});
 

