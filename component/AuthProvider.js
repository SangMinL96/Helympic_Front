import React, { createContext, useContext, useState } from "react";
import {   useMutation } from '@apollo/react-hooks';
import {gql} from "apollo-boost"

import { AppLoading } from "expo";
import AsyncStorage from "@react-native-community/async-storage";

const GET_TOKENED = gql`
mutation getToken( $id: String!) {
  getToken(id: $id) {
    scalar
  }
}
`;
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  const logUserIn = async (userInfo) => {
    try {
      await AsyncStorage.setItem("user", userInfo);
      setIsLoggedIn(true);
    } catch (e) {
      console.log(e);
    }
  };

  const logUserOut = async () => {
    try {
      await AsyncStorage.removeItem("user");
      setIsLoggedIn(false);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn,logUserIn, logUserOut }}>
      {children}
    </AuthContext.Provider>
  );
};


export const useIsLoggedIn = () => {
  const { isLoggedIn } = useContext(AuthContext);
  return isLoggedIn;
};

export const useLogIn = () => {
  const { logUserIn } = useContext(AuthContext);
  return logUserIn;
};

export const useLogOut = () => {
  const { logUserOut } = useContext(AuthContext);
  return logUserOut;
};