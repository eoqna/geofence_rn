import { NativeStackScreenProps } from "@react-navigation/native-stack";

export type RootStackParamList = {
  Authority: undefined;
  Main: undefined;
};

export type AuthorityProps = NativeStackScreenProps<RootStackParamList, "Authority">;
export type MainProps = NativeStackScreenProps<RootStackParamList, "Main">;