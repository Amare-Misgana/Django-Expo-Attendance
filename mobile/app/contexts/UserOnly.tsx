import { CommonActions, useNavigation } from "@react-navigation/native";
import React, { useEffect } from "react";
import Toast from "react-native-toast-message";
import { useAuth } from "./AuthContext";

type Props = {
  children: React.ReactNode;
  isStaffOnly?: boolean;
};

export default function UseOnly({ children, isStaffOnly = false }: Props) {
  const { user, getAccessToken } = useAuth();
  const navigation = useNavigation<any>();

  useEffect(() => {
    (async () => {
      const token = await getAccessToken();

      if (!token || !user) {
        Toast.show({
          type: "error",
          text1: "Access denied",
          text2: "You must be logged in to access this page",
        });

        navigation.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [{ name: "Login" }],
          })
        );
        return;
      }

      if (isStaffOnly && !user.is_staff) {
        Toast.show({
          type: "error",
          text1: "Permission denied",
          text2: "You are not allowed to access this page",
        });

        navigation.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [{ name: "Login" }],
          })
        );
      }
    })();
  }, [user]);

  return <>{children}</>;
}
