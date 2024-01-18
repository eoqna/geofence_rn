import { Permission, PermissionStatus, checkMultiple, RESULTS } from "react-native-permissions";

export type PermissionProp = Permission 
  | "android.permission.ACCESS_FINE_LOCATION"
  | "android.permission.ACCESS_COARSE_LOCATION";

export const REQUIRE_LOCATION_PERMISSIONS: PermissionProp[] = 
  [
    "android.permission.ACCESS_FINE_LOCATION",
    "android.permission.ACCESS_COARSE_LOCATION", 
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