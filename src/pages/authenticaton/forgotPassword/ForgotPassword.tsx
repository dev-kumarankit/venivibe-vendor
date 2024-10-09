import { useFormik } from "formik";
import * as Yup from "yup";
import {
  emailEnvelop,

  grayEye,

  grayEyeiconClosed,

  passwordIcon,
} from "../../../assets/Icons";
import CustomButton from "../../../components/atom/button/CustomButton";
import InputFeild from "../../../components/atom/inputFeild/InputFeild";
import Loader from "../../../components/atom/loader/Loader";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getToast } from "../../../components/atom/toastify/Toastify";
import { ToggleStore } from "../../../components/store/Toggle";

import { AuthService } from "../../../services/authService/AuthService";
import LoginBackground from "../../../components/atom/login/LoginBackground";

export default function ForgotPassword() {
  const {
    forgotPasswordApi,
    forgotPasswordLoading,
    verifyOtpDetailsApi,
    verifyOtpLoading,
    resendOtpApi,
    resendOtpLoading,
  }: any = AuthService();

  const [code, setCode] = useState<any>("");
  const [tokenData, setTokenData] = useState("");
  const { forgotPasswordEmail, setForgotPasswordEmail }: any = ToggleStore();
  const [show, setShow] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
    }),
    onSubmit: async (values) => {
      await forgotPasswordApi(values).then((data: any) => {
        if (!data?.data?.success) {
          getToast("error", data?.data?.message || "Invalid Creadentials");
        } else {
          getToast("success", data?.data?.message);
          setForgotPasswordEmail(formik?.values?.email);
          setTokenData(data?.data?.data?.token);
          setShow(true);
        }
      });
    },
    validateOnMount: false,
    validateOnBlur: false,
    enableReinitialize: true,
    validateOnChange: true,
  });

  const handleForgotPassword = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    formik.handleSubmit();
  };

  const backToLogin = () => {
    navigate("/authentication/sign-in");
  };

  const goToSignUp = () =>{
    navigate("/authentication/sign-up")
  }
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCode(e.target.value);
  };

  const handleNextClick = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    if (code) {
      const data = {
        otp: code,
        email: forgotPasswordEmail,
      };
      await verifyOtpDetailsApi(data).then((data) => {
        if (data?.data?.success == true) {
          getToast("success", data?.data?.message);
          navigate("/authentication/reset-password", {
            state: {
              token: tokenData,
            },
            replace: true,
          });
        } else {
          getToast("error", data?.data?.message || "Error Occured");
        }
      });
    } else {
      getToast("error", "Please complete the code.");
    }
  };

  const handleResetCode = async () => {
    const data = {
      email: forgotPasswordEmail,
    };
    await resendOtpApi(data).then((data) => {
      if (data?.data?.success == true) {
        getToast("success", data?.data?.message);
      } else {
        getToast("error", data?.data?.message || "Please try again");
      }
    });
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const loader = forgotPasswordLoading || verifyOtpLoading || resendOtpLoading;
  return (
    <LoginBackground>
      {loader && <Loader />}
      <div className="">
        <div className="px-8">
          {!show ? (
            <div className="w-full">
              <div className="w-full pb-6 mt-20">
                <p className="text-2xl flex justify-center items-center">
                  Forgot Password
                </p>
                <span className="text-[#637381] text-sm flex justify-center items-center">
                  Forgot your password? Don’t worry enter your associated email
                </span>
                <span className="text-[#637381] text-sm flex justify-center items-center">
                  to receive code to reset your password
                </span>
              </div>
              <div className="w-full flex flex-col">
                <form onSubmit={handleForgotPassword}>
                  <div className="w-full mb-9">
                    <span className="flex mx-1 mb-2 gap-1">
                      {emailEnvelop} <p>Email</p>{" "}
                    </span>
                    <InputFeild
                      type="text"
                      name="email"
                      inputClass="!p-0 "
                      color="primary"
                      placeHolder="Email"
                      value={formik.values.email}
                      change={formik.handleChange}
                      error={formik.touched.email && formik.errors.email}
                    />
                  </div>
                  <div className="w-full flex items-center justify-center gap-x-4">
                    <CustomButton
                      type="button"
                      name="Back"
                      size="md"
                      action={backToLogin}
                      buttonClass="text-secondary flex-auto bg-transparent border border-secondary
                     focus:ring-0 focus:border-secondary enabled:hover:bg-transparent"
                    />
                    <CustomButton
                      type="submit"
                      name="Sign In"
                      size="md"
                      buttonClass="flex-auto  border-0 border-transparent
                     focus:ring-0 focus:border-transparent enabled:hover:bg-gradient-signin"
                    />
                  </div>

                  <div className="mt-60">
                    <span className="text-[#637381] text-sm gap-2  flex justify-center items-center">
                      Don’t have an account yet?{" "}
                      <span
                        className="text-[#00AB9E] cursor-pointer font-semibold"
                        onClick={goToSignUp}
                      >
                        Sign Up
                      </span>
                    </span>
                  </div>
                </form>
              </div>
            </div>
          ) : (
            <div className="w-full">
              <div className="w-full pb-6">
                <p className="text-2xl pb-2.5 text-center">Check your email</p>
                <span className="text-[#637381] text-sm flex justify-center items-center">
                  A verification code has been sent to `${"robert.smith@gmail.com"}`
                </span>
              </div>
              <div className="w-full">
                <form>
                  <div className="w-full mb-9">
                    <span className="flex mx-1 mb-2 gap-1">{passwordIcon} <p>Verification Code</p> </span>
                    <InputFeild
                      type={showPassword ? "text" : "password"}
                      name="email"
                      inputClass="!p-0"
                      color="primary"
                      placeHolder="Enter Verfication Code"
                      // iconLeft={lockIcon}
                      iconRight={showPassword ? grayEyeiconClosed : grayEye}
                      value={code}
                      change={handleEmailChange}
                      onIconRightClick={togglePasswordVisibility}
                      autoComplete
                    />

                  </div>
                  <div className="w-full flex items-center justify-center gap-x-4">
                    <CustomButton
                      type="submit"
                      name="Verify"
                      action={handleNextClick}
                      size="lg"
                      buttonClass="flex-auto border-0 
                      border-transparent focus:ring-0 focus:border-transparent 
                      enabled:hover:bg-gradient-signin"
                    />
                  </div>
                  <div className="mt-4 text-center">
                    <p className="text-black gap-2 flex justify-center items-center text-sm">
                      Didn’t receive a code?
                      <span
                        className="text-[#00AB9E] font-semibold text-sm cursor-pointer"
                        onClick={handleResetCode}
                      >
                        Resend Code
                      </span>
                    </p>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
      </div>
    </LoginBackground>
  );
}
