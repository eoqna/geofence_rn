import React, { useCallback, useEffect } from "react";
import { PermissionsAndroid } from "react-native";

import { AuthorityProps } from "../navigation/navigation";
import { REQUIRE_LOCATION_PERMISSIONS, checkPermissions } from '../utils/permission';
import { Layout, NextButton } from "../utils/styles";

const Authority = ({route, navigation}: AuthorityProps) => {
  // 위치 권한 상태 체크
  const onLocationPermissionsCheck = useCallback(async () => {
    const { result, permission } = await checkPermissions(REQUIRE_LOCATION_PERMISSIONS);

    if ( !result && permission ) {
      PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
      )
    } else {
      navigation.navigate("Main");
    }
  }, []);

  useEffect(() => {
    onLocationPermissionsCheck();
  }, []);

  return (
    <Layout>
      <NextButton 
        title="Next" 
        onPress={() => navigation.navigate("Main")} 
      />
    </Layout>
  );
};

export default Authority;