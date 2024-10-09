import InputFeild from "../../../components/atom/inputFeild/InputFeild";
import CustomButton from "../../../components/atom/button/CustomButton";
import { useLocation, useNavigate } from "react-router-dom";
import { userTokenData } from "../../../components/interfaces/Interfacer";
import {
  eye,
  grayEye,
  grayEyeIcon,
  grayEyeiconClosed,
  logoLogin,
  passwordIcon,
  passwordIconGray,
} from "../../../assets/Icons";
import { useFormik } from "formik";
import * as Yup from "yup";
import { getToast } from "../../../components/atom/toastify/Toastify";
import Loader from "../../../components/atom/loader/Loader";
import { useEffect, useState } from "react";
import loginBanner from "../../../assets/loginBanner.svg";
import { AuthService } from "../../../services/authService/AuthService";
import FormCheckbox from "../../../components/atom/checkbox/Checkbox";
import LoginBackground from "../../../components/atom/login/LoginBackground";

export default function ResetPassword() {
  const [showPassword, setShowPassword] = useState(false);
  const [showconfirmPassword, setShowconfirmPassword] = useState(false);
  const [isMinCharMet, setIsMinCharMet] = useState(false);
  const [isNumberMet, setIsNumberMet] = useState(false);
  const [isLetterMet, setIsLetterMet] = useState(false);
  const { resetPassowrdDetailsApi, resetPasswordLoading }: any = AuthService();
  const navigate = useNavigate();
  const { state } = useLocation();
  const formik = useFormik({
    initialValues: {
      newPassword: "",
      confirmNewPassword: "",
    },
    validationSchema: Yup.object({
      newPassword: Yup.string()
        .min(8, "Password must be at least 8 characters") // Corrected min length
        .required("New Password is required"),
      confirmNewPassword: Yup.string()
        .oneOf([Yup.ref("newPassword")], "Passwords must match") // Validation for matching passwords
        .required("Confirm New Password is required"),
    }),

    onSubmit: async (values) => {
      const data = {
        password: values?.newPassword,
        token: state?.token,
      };

      await resetPassowrdDetailsApi(data)
        .then((response: userTokenData) => {
          if (response) {
            try {
              if (response?.data?.success && response?.status === 200) {
                getToast("success", response?.data?.message);
                navigate("/authentication/sign-in", { replace: true });
                localStorage.clear();
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

  const handlePasswordChange = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    formik.handleSubmit();
  };

  // useEffect(() => {
  //   if (!state?.token) {
  //     getToast("error", "Error occured please try again");
  //     navigate("/authentication/forgot-password", { replace: true }); // Redirect to home if no token
  //   }
  // }, [state?.token, navigate]);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const toggleConfirmPasswordVisibility = () => {
    setShowconfirmPassword(!showconfirmPassword);
  };
  useEffect(() => {
    const password = formik?.values?.newPassword;
    setIsMinCharMet(password.length >= 8);
    setIsNumberMet(/\d/.test(password)); // Checks for at least one number
    setIsLetterMet(/[a-zA-Z]/.test(password)); // Checks for at least one letter
  }, [formik?.values?.newPassword]);
  return (
    <LoginBackground>
      {resetPasswordLoading && <Loader />}
      <div>
        <div className="flex  justify-center">
          <div className="">
            <div className="w-full">
              <div className="w-full pb-6">
                <p className="text-2xl pb-2.5 font-normal	text-black">
                  Reset Password
                </p>
                <span className="text-[#637381] text-sm">
                  Strong passwords include numbers, letters and characters
                </span>
              </div>
              <div className="w-full">
                <form onSubmit={handlePasswordChange}>
                  <div className="w-full mb-6">
                    <InputFeild
                      name="newPassword"
                      iconLeft={passwordIconGray}
                      id="authInput"
                      type={showPassword ? "text" : "password"}
                      placeHolder="New Password"
                      inputClass=""
                      iconRight={showPassword ? grayEyeiconClosed : grayEye}
                      onIconRightClick={togglePasswordVisibility}
                      value={formik.values.newPassword}
                      change={formik.handleChange}
                      error={
                        formik.touched.newPassword && formik.errors.newPassword
                      }
                      color="primary"
                    />
                  </div>

                  <div className="w-full mb-6">
                    <InputFeild
                      name="confirmNewPassword"
                      iconLeft={passwordIconGray}
                      id="authInput"
                      type={showconfirmPassword ? "text" : "password"}
                      placeHolder="Confirm Password"
                      inputClass=""
                      iconRight={
                        showconfirmPassword ? grayEyeiconClosed : grayEye
                      }
                      onIconRightClick={toggleConfirmPasswordVisibility}
                      value={formik.values.confirmNewPassword}
                      change={formik.handleChange}
                      error={
                        formik.touched.confirmNewPassword &&
                        formik.errors.confirmNewPassword
                      }
                      color="primary"
                    />
                    <div className="mt-2 ">
                      <p className="text-gray font-normal	 text-sm	">
                        Password must contain
                      </p>
                      <div className="flex gap-6 mt-2">
                        <FormCheckbox
                          id="eight_char"
                          label={"Atleast 8 characters"}
                          name="eight_char"
                          checkboxClass={"text-xs font-normal text-gray"}
                          checked={isMinCharMet}
                        />

                        <FormCheckbox
                          id="one_number"
                          label={"Atleast one number"}
                          checkboxClass={"text-xs font-normal text-gray"}
                          name="one_number"
                          checked={isNumberMet}
                        />

                        <FormCheckbox
                          id="one_letter"
                          label={"Atleast one letter"}
                          checkboxClass={"text-xs font-normal text-gray"}
                          name="one_letter"
                          checked={isLetterMet}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="w-full flex items-center justify-center gap-x-4">
                    <CustomButton
                      type="submit"
                      buttonClass="flex-auto  border-0
                       border-transparent focus:ring-0 focus:border-transparent"
                      name="Submit"
                    />
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </LoginBackground>
  );
}
