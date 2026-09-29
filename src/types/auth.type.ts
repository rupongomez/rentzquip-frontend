export interface RegistrationPayload {
  name: string;
  email: string;
  patient: {
    contactNumber?: string;
  };
  password: string;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface VerifyAccountPayload {
  email: string;
  otp: string;
}
