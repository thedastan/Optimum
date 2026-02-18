import { useMutation, useQuery } from "@tanstack/react-query";
import { authService } from "../services/auth.service";
import {
  IUserRegister,
  IUserLogin,
  IAuthResponse,
  IEditProfileRequest,
  IResetPasswordRequest,
} from "../models/auth.model";

export function useForgotPassword() {
  const mutation = useMutation({
    mutationFn: (email: string) => authService.forgotPassword({ email }),
  });

  return {
    mutate: mutation.mutate,
    mutateAsync: mutation.mutateAsync,
    isPending: mutation.isPending,
    data: mutation.data,
    error: mutation.error,
  };
}

export function useRegister() {
  return useMutation<IAuthResponse, unknown, IUserRegister>({
    mutationFn: (userData) => authService.register(userData),
  });
}

export function useLogin() {
  return useMutation<IAuthResponse, unknown, IUserLogin>({
    mutationFn: (credentials) => authService.login(credentials),
  });
}

export const useMyData = () =>
  useQuery({
    queryKey: ["my-data"],
    queryFn: () => authService.getMyData(),
    retry: false,
  });

export function useEditProfile() {
  return useMutation({
    mutationFn: (data: IEditProfileRequest) => authService.editProfile(data),
  });
}

export function useLogout() {
  return () => {
    authService.logout();
  };
}

export function useResetPassword() {
  return useMutation({
    mutationFn: (data: IResetPasswordRequest) =>
      authService.resetPassword(data),
  });
}

///////////////
