import AsyncStorage from "@react-native-community/async-storage"
import CryptoJS from "react-native-crypto-js";
import { HASH_KEY } from "../config";
export const onUserInfo =async()=>{
    try{
    const result =await AsyncStorage.getItem("user")
 
    if(result){
        let cryptoHash  =await CryptoJS.AES.decrypt(result,HASH_KEY);
        let userInfo = cryptoHash?.toString(CryptoJS.enc.Utf8);
        return userInfo
    }else{
        return null
    }
   
    }catch(err){
     console.log(err)
     throw Error ("AsyncStorage Error")
    }
 }