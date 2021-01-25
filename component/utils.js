import AsyncStorage from "@react-native-community/async-storage"
import CryptoJS from "react-native-crypto-js";
import { HASH_KEY } from "../config";


  /**
   * 로그인시 암호화하여 스토리지에 저장한 유저 정보를 복호화 하여 리턴하는 함수
   */
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