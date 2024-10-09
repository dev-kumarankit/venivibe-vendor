import { useEffect, useState } from "react";
import InputFeild from "../../../components/atom/inputFeild/InputFeild";
import CustomButton from "../../../components/atom/button/CustomButton";
import { Link, useNavigate } from "react-router-dom";
import { userTokenData } from "../../../components/interfaces/Interfacer";
import {
  emailEnvelop,
  eye,
  grayEyeIcon,
  passwordIcon,
} from "../../../assets/Icons";

import { verifyAuth } from "../../../router/ProtectedRoute";
import { useFormik } from "formik";
import * as Yup from "yup";
import Loader from "../../../components/atom/loader/Loader";
import { getToast } from "../../../components/atom/toastify/Toastify";
import { AuthService } from "../../../services/authService/AuthService";
import LoginBackground from "../../../components/atom/login/LoginBackground";
import googleIcon from "../../../assets/googleIcon.svg";
import appleIcon from "../../../assets/appleIcon.svg";
import facebookIcon from "../../../assets/facebookIcon.svg";
export default function SignIn() {
  const [showPassword, setShowPassword] = useState(false);
  const isAuth = verifyAuth();
  const { onUserLogin, loginloading }: any = AuthService();
  const navigation = useNavigate();
  const goToSignUp = () => {
    navigation("/authentication/sign-up");
  };
  useEffect(() => {
    if (isAuth) {
      navigation("/");
    }
  }, [isAuth, navigation]);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
      password: Yup.string()
        .min(5, "Password must be at least 6 characters")
        .required("Password is required"),
    }),
    onSubmit: async (values) => {
      const data = {
        email: values.email,
        password: values.password,
      };
      await onUserLogin(data)
        .then((response: userTokenData) => {
          if (response) {
            try {
              if (response?.data?.success && response?.status === 200) {
                localStorage.setItem("auth_token", response?.data?.data?.token);
                localStorage.setItem(
                  "user_details",
                  JSON.stringify(response?.data?.data?.user || "")
                );
                navigation("/");
                getToast("success", response?.data?.message);
              } else {
                getToast("error", response?.data?.message || "Error Occured");
              }
            } catch (error) {
              console.log(error, "errrrr");
            }
          }
        })
        .catch((error: Error) => {
          console.log(error, "error");
        });
    },
    validateOnMount: false,
    validateOnBlur: false,
    enableReinitialize: true,
    validateOnChange: true,
  });

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    formik.handleSubmit();
  };
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  return (
    <LoginBackground>
      {loginloading && <Loader />}
      <div className="w-full pb-6 flex justify-center items-center">
        <p className="text-2xl pb-2.5">
          Welcome to <span className="font-bold">VENIVIBE</span>
        </p>
      </div>

      <form onSubmit={handleLogin}>
        <div className="w-full mb-6">
          <span className="flex mx-1 mb-2 gap-1">
            {emailEnvelop} <p>Email</p>{" "}
          </span>
          <InputFeild
            type="text"
            name="email"
            inputClass="!p-0"
            placeHolder="Email"
            color="primary"
            value={formik.values.email}
            change={formik.handleChange}
            error={formik.touched.email && formik.errors.email}
          />
        </div>
        <div className="w-full pb-9">
          <div className="w-full pb-4">
            <span className="flex mx-1 mb-2 gap-1">
              {passwordIcon} <p>Password</p>{" "}
            </span>

            <InputFeild
              inputClass="focus:bg-transparent"
              name="password"
              type={showPassword ? "text" : "password"}
              placeHolder="Password"
              value={formik.values.password}
              change={formik.handleChange}
              color="primary"
              // iconLeft={passwordIcon}
              iconRight={showPassword ? grayEyeIcon : eye}
              error={formik.touched.password && formik.errors.password}
              onIconRightClick={togglePasswordVisibility}
            />
          </div>
          <div className="w-full flex items-center justify-end">
            <Link to="/authentication/forgot-password">
              <span className="w-full text-secondary cursor-pointer">
                Forgot Password?
              </span>
            </Link>
          </div>
        </div>

        <div className="w-full">
          <CustomButton
            type="submit"
            name="Login"
            size="lg"
            buttonClass="w-full  border-0 border-transparent focus:ring-0 focus:border-transparent"
          />
        </div>
        <div className="flex flex-col items-center justify-center mt-8 text-gray text-sm">
          <span>Or Log in with</span>
          <div className="flex gap-2 mt-6">
            <img
              src={googleIcon}
              alt=""
              className="cursor-pointer"
              onClick={() => {
                alert("googleLoggedin");
              }}
            />
            <img
              src={appleIcon}
              alt=""
              className="cursor-pointer"
              onClick={() => {
                alert("googleLoggedin");
              }}
            />
            <img
              src={facebookIcon}
              alt=""
              className="cursor-pointer"
              onClick={() => {
                alert("googleLoggedin");
              }}
            />
          </div>
        </div>
        <div className="mt-8">
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
    </LoginBackground>
  );
}
