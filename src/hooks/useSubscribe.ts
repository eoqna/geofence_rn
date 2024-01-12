import { useCallback, useState } from "react";
import { AppState } from "react-native";

const useSubscribe = () => {
  const [appState, setAppState] = useState(AppState.currentState); 

  // 앱 상태 구독
  const onAppStateSubRegister = useCallback(() => {
    return AppState.addEventListener("change", setAppState);
  }, []);

  return {
    appState, 
    onAppStateSubRegister, 
  };
};

export default useSubscribe;
