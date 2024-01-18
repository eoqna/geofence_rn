import { useCallback } from "react";
import GeoLocation from "react-native-geolocation-service";
import useDataStore from "../store/useDataStore";

let watchId = -1;

const getWatchId = () => watchId;

const setWatchId = (id: number) => {
  watchId = id;
};

const useGeolocation = () => {
  const { position, setPosition } = useDataStore();

  const onClearWatch = useCallback(() => {
    if( getWatchId() !== -1 ) {
      GeoLocation.clearWatch(watchId);
      GeoLocation.stopObserving();
    }
  }, []);

  const onWatchPosition = useCallback(() => {
    const id = GeoLocation.watchPosition(
      (position) => {
      const { latitude, longitude } = position.coords;
      
      setPosition({latitude, longitude});
    },
    (error) => {
      console.log(error);
    },
    {
      accuracy: {
        android: "high",
      },
      enableHighAccuracy: true, // 정확한 위치 추적
    });

    setWatchId(id);
  }, []);

  return {
    onWatchPosition,
    onClearWatch,
  }
};

export default useGeolocation;