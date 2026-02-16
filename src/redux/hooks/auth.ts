import { useMutation, useQuery } from "@tanstack/react-query";
import { authService } from "../services/auth.service";
import {
  IUserRegister,
  IUserLogin,
  IAuthResponse,
  IEditProfileRequest,
  IVerifyResetCodeRequest,
} from "../models/auth.model";

export function useForgotPassword() {
  const { mutate, isPending, data, error } = useMutation({
    mutationFn: (email: string) => authService.forgotPassword({ email }),
  });

  return { mutate, isPending, data, error };
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

export function useVerifyResetCode() {
  return useMutation({
    mutationFn: (data: {
      email: string;
      reset_code: string;
      new_password: string;
    }) => authService.verifyResetCode(data),
  });
}

///////////////
