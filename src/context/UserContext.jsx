import { createContext, useContext } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getUser, login as loginApi, logout as logoutApi } from "../api/AuthApi.js";

const UserContext = createContext(undefined);

export const UserProvider = ({ children }) => {
  const queryClient = useQueryClient();

  const {
    data: user,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["authUser"],
    queryFn: getUser,
    retry: false,
    staleTime: Infinity,
  });

  const loginMutation = useMutation({
    mutationFn: loginApi,
    onSuccess: (data) => {
      // data.user must exist in the /login response for this to work —
      // if your backend only returns a message, add 'user' => auth()->user()
      // to the Laravel login response.
      queryClient.setQueryData(["authUser"], data.user);
    },
  });

  const logoutMutation = useMutation({
    mutationFn: logoutApi,
    onSuccess: () => {
      queryClient.setQueryData(["authUser"], null); // instantly clear cached user
      queryClient.invalidateQueries({ queryKey: ["authUser"] });
    },
  });

  return (
    <UserContext.Provider
      value={{
        user,
        isLoading,
        isError,
        login: loginMutation.mutateAsync,
        logout: logoutMutation.mutateAsync,
        isLoggingIn: loginMutation.isPending,
        loginError: loginMutation.error,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};