import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";

import { useAppDispatch, useAppSelector } from "./store";
import { loginUser } from "@/store/slices/authSlice";

type UseAuthArgs = {
  redirectOn: "login" | "logout" | "";
  redirectTo: string;
};

const useAuth = ({ redirectOn, redirectTo }: UseAuthArgs) => {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);

  const { push, pathname } = useRouter();

  const { data, status } = useSession({
    required: true,
    onUnauthenticated() {
      if (redirectOn === "login") {
        push(redirectTo);
      }

      if (redirectOn === "logout") {
        push(redirectTo);
      }
    },
  });

  useEffect(() => {
    if (status === "authenticated" && !user) {
      dispatch(loginUser({ user: data?.user, token: data?.token }));
    }

    if (status === "authenticated" && pathname === "/login") {
      push("/");
    }
  }, [status, data, pathname]);

  return status;
};

export default useAuth;
