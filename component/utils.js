import AsyncStorage from "@react-native-community/async-storage"

export const onUserInfo =async()=>{
    try{
    const result =await AsyncStorage.getItem("user")
    const userInfo = JSON.parse(result)
    return userInfo
    }catch(err){
     console.log(err)
     throw Error ("AsyncStorage Error")
    }
 }