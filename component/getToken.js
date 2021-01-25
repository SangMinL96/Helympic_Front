import AsyncStorage from '@react-native-community/async-storage'
import Axios from 'axios'
import { onUserInfo } from './utils'
import CryptoJS from "react-native-crypto-js";
import { HASH_KEY, HOST_IP } from '../config';




  /**
   * 로그인시 받은 토큰 만료시간 15분이 지난후 사용자가 
   * Api사용시 401에러를 받으면 토큰을 새롭게 받는 함수
   * @param {Int} error 네트워크 에러 번호 (401: 토큰인증에러)
   */
export const getToken = async (error, operation) => {
  if (error?.statusCode === 401) {
    try {
      const userInfo = await onUserInfo()
      if(userInfo){
      const cryptoInfo = JSON.parse(userInfo)
      const token = await Axios.get(`${HOST_IP}getToken`,{params:{id:cryptoInfo?.id}})
      if (token?.data) {
       if(operation !==undefined){
         operation.setContext(({ headers = {} }) => ({
          headers: { ...headers, Authorization: `Bearer ${token.data}` || null },
        }))
       } 
      const newInfo = {...cryptoInfo,token:token.data}
      const newInfoHash = await CryptoJS.AES.encrypt(JSON.stringify(newInfo), HASH_KEY).toString()
      await AsyncStorage.setItem("user", newInfoHash);
        return 'OK'
      } else {
        await AsyncStorage.removeItem("user")
      }
     }
    } catch (e) {
      console.log(e)
      await AsyncStorage.removeItem("user")
    }
    
}
}



