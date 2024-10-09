import { create } from "zustand";
import axiosAPI from "../../utils/InterceptorApi";

export const AuthService = create((set) => ({
  loginData: {},
  loginloading: false,
  loginError: null,

  ForgotPasswordData: {},
  forgotPasswordLoading: false,
  resetPassowrdError: null,

  resendOtpLoading: false,
  resendOtpError: null,

  changePasswordLoading: false,
  changePasswordError: null,

  verifyOtpLoading: false,
  verifyOtpError: null,

  resetPasswordLoading: false,
  forgotPaswordError: null,

  //login API
  onUserLogin: async (data: object) => {
    try {
      set({ loginloading: true });
      const response = await axiosAPI.post(`/admin/login`, data);
      const { status } = response || { message: "error" };
      if (status == 200) {
        set({
          loginloading: false,
          loginData: response,
        });
        return response;
      } else {
        throw "error";
      }
    } catch (err) {
      set({ loginloading: false, loginError: err });
      return err;
    }
  },

  //forgot password API
  forgotPasswordApi: async (data: object) => {
    try {
      set({ forgotPasswordLoading: true });
      const response = await axiosAPI.post(`admin/forgot-password`, data);

      const { status } = response || { message: "error" };
      if (status == 200) {
        set({
          forgotPasswordLoading: false,
          forgotPasswordData: response?.data,
        });
        return response;
      } else {
        throw "error";
      }
    } catch (err) {
      set({ forgotPasswordLoading: false, forgotPaswordError: err });
      return err;
    }
  },

  //update password API
  changePassowrdApi: async (data: object) => {
    try {
      set({ changePasswordLoading: true });
      const response = await axiosAPI.post(`admin/update-password`, data);
      const { status } = response || { message: "error" };
      if (status == 200) {
        set({
          changePasswordLoading: false,
        });
        return response;
      } else {
        throw "error";
      }
    } catch (err) {
      set({ changePasswordLoading: false, changePasswordError: err });
      return err;
    }
  },

  //resend OTP API
  resendOtpApi: async (data: object) => {
    try {
      set({ resendOtpLoading: true });
      const response = await axiosAPI.post(`admin/resend-otp`, data);
      const { status } = response || { message: "error" };
      if (status == 200) {
        set({
          resendOtpLoading: false,
        });
        return response;
      } else {
        throw "error";
      }
    } catch (err) {
      set({ resendOtpLoading: false, resendOtpError: err });
      return err;
    }
  },

  //verify-otp API
  verifyOtpDetailsApi: async (data: object) => {
    try {
      set({ verifyOtpLoading: true });
      const response = await axiosAPI.post(`admin/verify-otp`, data);
      const { status } = response || { message: "error" };
      if (status == 200) {
        set({
          verifyOtpLoading: false,
        });
        return response;
      } else {
        throw "error";
      }
    } catch (err) {
      set({ verifyOtpLoading: false, verifyOtpError: err });
      return err;
    }
  },

  //reset-password API
  resetPassowrdDetailsApi: async (data: object) => {
    try {
      set({ resetPasswordLoading: true });
      const response = await axiosAPI.post(`admin/reset-password`, data);
      const { status } = response || { message: "error" };
      if (status == 200) {
        set({
          resetPasswordLoading: false,
        });
        return response;
      } else {
        throw "error";
      }
    } catch (err) {
      set({ resetPasswordLoading: false, resetPassowrdError: err });
      return err;
    }
  },
}));
