import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Login from "../page/login/Login"
import Main from "../page/main/Main"

export default function Stack({ isLogin }) {
 const Stack = createStackNavigator();
  return (
    <Stack.Navigator
      mode="card"
      screenOptions={{
        headerStyle: {
          backgroundColor: "black",
          borderBottomColor: "black",
          shadowColor: "black",
        },
        headerTintColor: "white",
        headerBackTitleVisible: false,
      }}
    >
      {isLogin ? (
           <Stack.Screen name="메인" component={Main} />
          ) : (
           <Stack.Screen name="로그인" component={Login} />
      )}
    </Stack.Navigator>
  );
}
