import { Platform } from "react-native";
import { getSystemVersion } from "react-native-device-info";
import { Permission, request, requestMultiple, PermissionStatus, checkMultiple, check, RESULTS } from "react-native-permissions";

export type PermissionProp = Permission 
  | "android.permission.ACCESS_FINE_LOCATION"
  | "android.permission.ACCESS_COARSE_LOCATION";

export const isAndroid = Platform.OS === "android";
export const isAndroid12: boolean = (() => {
  if (isAndroid) {
    const [version] = getSystemVersion().split(".");
    const parse = parseInt(version);
    return parse === 12 ? true : false;
  } else {
    return false;
  }
})();

export const isAndroid13: boolean = (() => {
  if (isAndroid) {
    const [version] = getSystemVersion().split(".");
    const parse = parseInt(version);
    return parse >= 13 ? true : false;
  } else {
    return false;
  }
})();

export const REQUIRE_LOCATION_PERMISSIONS: PermissionProp[] = isAndroid
  ? [
    "android.permission.ACCESS_FINE_LOCATION",
    "android.permission.ACCESS_COARSE_LOCATION", 
  ]
  : [
    "ios.permission.LOCATION_ALWAYS",
  ];

// 다중 권한 확인
export const checkPermissions = async (props: PermissionProp[]) => {
  const result: any = await checkMultiple(props as Permission[]);
  const parser: Record<PermissionProp, PermissionStatus> = result;
  const status: PermissionStatus[] = [RESULTS.BLOCKED, RESULTS.DENIED];

  for (const permission of Object.keys(parser)) {
    if (status.includes(parser[permission as PermissionProp])) {
      return { result: false, permission: permission as PermissionProp, status: parser[permission as PermissionProp] };
    }
  }

  return { result: true, permission: null, status: RESULTS.GRANTED };
};

// 단일 권한 확인
export const checkPermission = async (prop: PermissionProp): Promise<boolean> => {
  return await check(prop as Permission).then(async (status) => {
    return status === RESULTS.GRANTED;
  });
};

// 다중 권한 요청
export const requestPermissions = async (props: PermissionProp[]): Promise<{ result: boolean; permission: PermissionProp | null; status: PermissionStatus; }> => {
  const result: any = await requestMultiple(props as Permission[]);
  const parser: Record<PermissionProp, PermissionStatus> = result;
  const status: PermissionStatus[] = [RESULTS.BLOCKED, RESULTS.DENIED];

  for (const permission of Object.keys(parser)) {
    if (status.includes(parser[permission as PermissionProp])) {
      return { result: false, permission: permission as PermissionProp, status: parser[permission as PermissionProp] };
    }
  }

  return { result: true, permission: null, status: RESULTS.GRANTED };
};

// 단일 권한 요청
export const requestPermission = async (prop: PermissionProp): Promise<boolean> => {
  return await request(prop as Permission).then(async (status) => {
    return status === RESULTS.GRANTED;
  });
};