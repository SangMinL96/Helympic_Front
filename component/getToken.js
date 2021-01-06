import AsyncStorage from '@react-native-community/async-storage'
import Axios from 'axios'
import { onUserInfo } from './utils'



export const getToken = async (error, operation) => {
  if (error?.statusCode === 401) {
    try {
    const userInfo =await onUserInfo()
    console.log(userInfo)
    const token = await Axios.get('http://192.168.56.1:4000/getToken',{params:{id:userInfo?.id}})
      if (token?.data) {
       if(operation !==undefined){
         operation.setContext(({ headers = {} }) => ({
          headers: { ...headers, Authorization: `Bearer ${token.data}` || null },
        }))
       } 
       await AsyncStorage.mergeItem("user",JSON.stringify({token: token.data }))
        return 'OK'
      } else {
        await AsyncStorage.removeItem("user")
      }
    } catch (e) {
      console.log(e)
      await AsyncStorage.removeItem("user")
    }
}
}



