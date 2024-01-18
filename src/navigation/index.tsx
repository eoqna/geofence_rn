import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Authority from "../screen/Authority";
import Main from "../screen/Main";
import { RootStackParamList } from "./navigation";

const RootStack = createNativeStackNavigator<RootStackParamList>();

const Navigations = () => {
  return (
    <NavigationContainer>
      <RootStack.Navigator initialRouteName="Authority">
        <RootStack.Group>
          {/* 권한 */}
          <RootStack.Screen name="Authority" component={Authority} options={{ headerShown: false, gestureEnabled: false }} />
          {/* 메인 */}
          <RootStack.Screen name="Main" component={Main} options={{ headerShown: false, animation: "fade", gestureEnabled: false }} />
        </RootStack.Group>
      </RootStack.Navigator>
    </NavigationContainer>
  );
};

export default Navigations;
