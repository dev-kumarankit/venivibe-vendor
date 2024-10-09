export interface loginState {
  loginData: object;
  loginloading: boolean;
  loginError: string | null;
  onUserLogin: (data: { email: string; password: string }) => Promise<any>;
}

export interface company {
  id: string;
  name: string;
  logo_url: string;
  domain_name: string;
  company_pitch: null | "";
  sample_emails_added: boolean;
  address: null | "";
  description: null | "";
  industries: null | "";
}

export interface user {
  id: string;
  DOB: string | null;
  apple_token: null | string;
  email: string;
  facebook_id: string | null;
  verified: boolean;
  first_name: string;
  last_name: string;
  gender: string;
  profile_pic: string;
  is_approved: boolean;
  is_suspend: boolean;
  is_verified: boolean;
  organizer_id: boolean;
  payout_info_id: boolean;
  phone_number: null | "";
  admin: boolean;
  // company : company,
  name: string;
}

export interface UserData {
  token: string;
  expiration: string;
  refresh_token: string;
  success: boolean;
  refresh_token_expiration: string;
  user: user;
}

export interface ApiResponseData {
  success: boolean;
  message: string;
  data: UserData;
}

export interface userTokenData {
  success: boolean;
  message: string;
  status: number;
  statusText: string;
  data: ApiResponseData;
}

export interface commanderCnstraints {
  constraint_text: string;
  created_at?: string;
  id?: string;
  updated_at?: string;
}

export interface systemPrompts {
  prompt_text: string;
  prompt_type: string;
  created_at?: string;
  id?: string;
  updated_at?: string;
}
