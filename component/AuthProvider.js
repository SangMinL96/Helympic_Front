import React, { createContext, useContext, useState } from "react";
import {   useMutation } from '@apollo/react-hooks';
import {gql} from "apollo-boost"
import CryptoJS from "react-native-crypto-js";
import { AppLoading } from "expo";
import AsyncStorage from "@react-native-community/async-storage";
import { HASH_KEY } from "../config";

export const AuthContext = createContext();
export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(true);


  const logUserIn = async (userInfo) => {
    console.log("asdf")
    try {
      const info = await CryptoJS.AES.encrypt(JSON.stringify(userInfo), HASH_KEY).toString()
      setIsLoggedIn(true);
      await AsyncStorage.setItem("user", info);
    } catch (e) {
      console.log(e);
    }
  };

  const logUserOut = async () => {
    try {
      console.log("로그아웃")
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