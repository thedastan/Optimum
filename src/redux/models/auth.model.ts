export interface IForgotPasswordRequest {
  email: string;
}

export interface IForgotPasswordResponse {
  message: string;
}

// src/models/auth.model.ts
export interface IUserRegister {
  email: string;
  password: string;
  first_name: string;
  last_name?: string;
  phone_number: string;
  whatsapp?: string;
}

export interface IUserLogin {
  email: string;
  password: string;
}

export interface IAuthResponse {
  access_token: string;
  refresh_token: string;
  user: {
    id: number;
    email: string;
    first_name: string;
    last_name?: string;
    phone_number: string;
    whatsapp?: string;
  };
}

export interface IEditProfileRequest {
  email: string;
  phone_number: string;
  whatsapp?: string;
  first_name: string;
}

export interface IUserProfile {
  id: number;
  first_name: string;
  last_name?: string;
  email: string;
  phone_number: string;
  whatsapp?: string;
}

export interface IResetPasswordRequest {
  new_password: string;
  token: string;
}

///////////////
