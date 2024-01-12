import React, { useCallback, useEffect } from 'react';
import {
  PermissionsAndroid,
  SafeAreaView,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import { Colors } from 'react-native/Libraries/NewAppScreen';
import { REQUIRE_LOCATION_PERMISSIONS, checkPermissions } from './src/utils/permission';
import { openSettings } from 'react-native-permissions';
import useSubscribe from './src/hooks/useSubscribe';
import styled from 'styled-components/native';
import useGeolocation from './src/hooks/useGeolocation';
import useDataStore from './src/store/useDataStore';

const Layout = styled.View`
  width: 100%;
  height: 100%;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Position = styled.Text`
  color: #000;
  font-weight: bold;
  font-size: 20px;
`;

const SearchButton = styled.Button`
  width: 150px;
  height: 40px;
  color: #fff;
  background: blue;
  border: 1px solid blue;
  border-radius: 5px;
`;

const App = (): React.JSX.Element => {
  const isDarkMode = useColorScheme() === "dark";
  const { position } = useDataStore();
  const { appState } = useSubscribe();
  const { onWatchPosition } = useGeolocation();

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  // 위치 권한 상태 체크
  const onLocationPermissionsCheck = useCallback(async () => {
    const { result, permission } = await checkPermissions(REQUIRE_LOCATION_PERMISSIONS);

    if ( !result && permission ) {
      PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
      )
    }
  }, []);

  useEffect(() => {
    if( appState === "active" ) {
      onLocationPermissionsCheck();
    }
  }, []);

  useEffect(() => {
    onWatchPosition();

    // return () => onClearWatch();
  }, [position]);

  return (
    <SafeAreaView style={backgroundStyle}>
      <Layout>
        {position && <Position>latitude : {position.latitude}, longitude : {position.longitude}</Position>}
        {/* <SearchButton onPress={onPressButton} title="Search Position" /> */}
      </Layout>
    </SafeAreaView>
  );
}

export default App;
