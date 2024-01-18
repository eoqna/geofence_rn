import React, { useEffect } from "react";
import { SafeAreaView } from "react-native";
import { MainProps } from "../navigation/navigation";
import useGeolocation from "../hooks/useGeolocation";
import useDataStore from "../store/useDataStore";
import { Layout, TextFont } from "../utils/styles";

const Main = ({route, navigation}: MainProps) => {
  const { position } = useDataStore();
  const { onWatchPosition, onClearWatch } = useGeolocation();

  useEffect(() => {
    onWatchPosition();

    return () => onClearWatch();
  }, [position]);

  return (
    <SafeAreaView>
      <Layout>
        <TextFont>latitude : {position.latitude}</TextFont>
        <TextFont>longitude : {position.longitude}</TextFont>
      </Layout>
    </SafeAreaView>
  );
};

export default Main;