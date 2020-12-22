import {
    ApolloClient,
    HttpLink,
    ApolloLink,
    InMemoryCache,
  } from '@apollo/client';
  
  
  
  import { RetryLink } from "apollo-link-retry";
 
  const httpLink = new HttpLink({
    uri: ``,
    credentials: 'include' //
  });
  
  const authMiddleware = new ApolloLink((operation, forward) => {
    // add the authorization to the headers
    operation.setContext(({ headers = {} }) => ({
      headers: {
        ...headers,
        Authorization: ""|| null
      }
    }));
  
    return forward(operation);
  });
  
  
  
  const retryLinks = new RetryLink({
    attempts: (count, operation, error) => {
     const result = netError(error?.statusCode,operation)
    return null
    },
    delay: (count, operation, error) => {
      return count * 1000 * Math.random();
    },
  });
  
  
  const Client = new ApolloClient({
    cache: new InMemoryCache({
      typePolicies: {
        Query: {
          fields: {
        
          },
        },
      }
    }),
    
    link: ApolloLink.from([authMiddleware,retryLinks, httpLink]),
    
  });
  
  export default Client;