import { create } from "zustand";
import { useFetch } from "../_helpers/client";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect } from "react";

interface User {
  id: string;
  email: string;
}

const userStore = create<User | null>(() => null);

export default function useUserService() {
  const fetch = useFetch();
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentUser = userStore();

  useEffect(() => {
    fetch
      .get("/api/account/current")
      .then((user: any) => userStore.setState(user))
      .catch(() => {});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    currentUser,
    login: async (email: string, password: string) => {
      try {
        const currentUser = await fetch.post("/api/account/login", {
          email,
          password,
        });
        userStore.setState(currentUser);

        // TODO: Should take to the dashboard
        const returnUrl = searchParams.get("returnUrl") || "/";
        router.push(returnUrl);
      } catch (error: any) {
        console.error(error);
        // alertService.error(error);
      }
    },
    logout: async () => {
      await fetch.post("/api/account/logout");
      router.push("/login");
    },
  };
}
