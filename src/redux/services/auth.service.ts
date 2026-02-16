import { PRIVATE_API, PUBLIC_API } from "@/api/interceptors";
import {
  IForgotPasswordRequest,
  IForgotPasswordResponse,
  IUserRegister,
  IUserLogin,
  IAuthResponse,
  IUserProfile,
  IEditProfileRequest,
  IVerifyResetCodeRequest,
} from "../models/auth.model";

class AuthService {
  private BASE_URL = "/auth/";

  logout() {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
  }

  async forgotPassword(data: IForgotPasswordRequest) {
    const response = await PUBLIC_API.post<IForgotPasswordResponse>(
      `.${this.BASE_URL}forgot-password`,
      data,
    );
    return response.data;
  }

  async register(userData: IUserRegister): Promise<IAuthResponse> {
    const response = await PUBLIC_API.post<IAuthResponse>(
      `${this.BASE_URL}register`,
      userData,
    );
    return response.data;
  }

  async login(credentials: IUserLogin): Promise<IAuthResponse> {
    const response = await PUBLIC_API.post<IAuthResponse>(
      `${this.BASE_URL}login`,
      credentials,
    );
    return response.data;
  }

  async getMyData(): Promise<IUserProfile> {
    const response = await PRIVATE_API.get<IUserProfile>(
      `${this.BASE_URL}my-data`,
    );
    return response.data;
  }

  async editProfile(data: IEditProfileRequest): Promise<IUserProfile> {
    const response = await PRIVATE_API.put(
      `${this.BASE_URL}edit-profile`,
      data,
    );
    return response.data;
  }

  async verifyResetCode(data: IVerifyResetCodeRequest) {
    const response = await PUBLIC_API.post(
      `${this.BASE_URL}verify-reset-code`,
      data,
    );
    return response.data;
  }
}

export const authService = new AuthService();

///////////////
