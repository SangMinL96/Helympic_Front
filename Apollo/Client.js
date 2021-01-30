import { ApolloClient, HttpLink, ApolloLink, InMemoryCache } from '@apollo/client';
import AsyncStorage from '@react-native-community/async-storage';
import {getToken} from "../component/getToken"
import { RetryLink } from 'apollo-link-retry';
import { onUserInfo } from '../component/utils';
import { HOST_IP } from '../config';


const httpLink = new HttpLink({
  uri: HOST_IP
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

  let userInfo = await onUserInfo()
  if(userInfo){
    const token = JSON.parse(userInfo)?.token
    operation.setContext(({ headers = {} }) => ({
      headers: {
        ...headers,
        Authorization: `Bearer ${token}`
      }
    }));
  
  }
  return forward(operation);
});

export default new ApolloClient({
  cache: new InMemoryCache({
    dataIdFromObject: o => (o._id ? `${o.__typename}:${o._id}`: null),
    typePolicies: {
      Query: {
        fields: {
          getRoomList: {
            merge(existing, incoming) {
              return incoming;
            },
            
          },
          getRoomVideo: {
            merge(existing, incoming) {
              return incoming;
            },
            
          },
        },
      },
    }
  }),
  link: ApolloLink.from([authMiddleware,retryLinks, httpLink])
});
 

