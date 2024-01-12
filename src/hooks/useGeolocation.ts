import { useCallback, useState } from "react";
import { PermissionsAndroid, Platform } from "react-native";
import GeoLocation from "react-native-geolocation-service";
import useDataStore from "../store/useDataStore";

let watchId = -1;

const getWatchId = () => watchId;

const setWatchId = (id: number) => {
  watchId = id;
};

const useGeolocation = () => {
  const isAndroid = Platform.OS ? "android" : "ios";
  const { position, setPosition } = useDataStore();

  // 위치 권한 요청
  const onPermissionCheck = useCallback(async () => {
    console.log(PermissionsAndroid);
    if( isAndroid ) {
      await PermissionsAndroid.requestMultiple([
        PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION,
        PermissionsAndroid.PERMISSIONS.ACCESSS_FINE_LOCATION,
      ]);
    }
  }, []);

  const onClearWatch = useCallback(() => {
    console.log("watch id : ", watchId);

    if( getWatchId() !== -1 ) {
      console.log("위치 수집 종료");
      GeoLocation.clearWatch(watchId);
      GeoLocation.stopObserving();
    }
  }, []);

  const onWatchPosition = useCallback(() => {
    if( position.latitude === 0 && position.longitude === 0 ) {
      console.log("위치 수집 시작");
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
          android: "low",
          ios: "best",
        },
        enableHighAccuracy: true, // 정확한 위치 추적
        distanceFilter: 0, // 수집 거리 - n미터 마다 위치 수집
        interval: 1000,
        showsBackgroundLocationIndicator: true, //
      });
  
      setWatchId(id);
    }
    // } else {
    //   onClearWatch();
    // }
  }, [position]);

  return {
    onPermissionCheck,
    onWatchPosition,
    onClearWatch,
  }
};

export default useGeolocation;