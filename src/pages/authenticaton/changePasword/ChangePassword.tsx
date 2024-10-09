import InputFeild from "../../../components/atom/inputFeild/InputFeild";
import CustomButton from "../../../components/atom/button/CustomButton";
import { useNavigate } from "react-router-dom";
import { userTokenData } from "../../../components/interfaces/Interfacer";
import { passwordIcon } from "../../../assets/Icons";
import { useFormik } from "formik";
import * as Yup from "yup";
import { getToast } from "../../../components/atom/toastify/Toastify";
import Loader from "../../../components/atom/loader/Loader";
import { AuthService } from "../../../services/authService/AuthService";

export default function ChangePassword() {
  const { changePassowrdApi, changePasswordLoading }: any = AuthService();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      currentPassword: "",
      newPassword: "",
      confirmNewPassword: "",
    },
    validationSchema: Yup.object({
      currentPassword: Yup.string().required("Current Password is required"),
      newPassword: Yup.string()
        .min(6, "Password must be at least 6 characters") // Corrected min length
        .required("New Password is required"),
      confirmNewPassword: Yup.string()
        .oneOf([Yup.ref("newPassword")], "Passwords must match") // Validation for matching passwords
        .required("Confirm New Password is required"),
    }),

    onSubmit: async (values) => {
      const data = {
        old_password: values.currentPassword,
        new_password: values.newPassword,
      };
      await changePassowrdApi(data)
        .then((response: userTokenData) => {
          if (response) {
            try {
              if (response?.data?.success && response?.status === 200) {
                getToast("success", response?.data?.message);
                localStorage.clear();
                navigate("/authentication/sign-in");
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

  return (
    <>
      {changePasswordLoading && <Loader />}

      <div className="w-full h-auto min-h-screen relative top-0 bottom-0 z-[999] opacity-100 flex justify-center items-center py-[30px] px-0 bg-gradient-primary">
        <div className="container my-0 mx-auto">
          <div className="w-full flex tems-center justify-center flex-wrap bg-[#ffffff] shadow-login-shadow rounded-xl opacty-100 text-centeritems-center relative z-0 md:max-w-[920px] mx-auto">
            <div className="w-full lg:w-6/12 self-center shrink-0 grow-0 basis-auto">
              <div className="w-full  mx-auto md:p-14 md:pr-0">
                <div className="w-full text-center text-primaryText pb-5">
                  <h1 className="font-semibold text-[29px]  pb-3">
                    Change Your Password{" "}
                  </h1>
                </div>
                <div className="w-full">
                  <form onSubmit={handlePasswordChange}>
                    <div className="w-full pb-5 text-start">
                      <InputFeild
                        name="currentPassword"
                        icon={passwordIcon}
                        id="authInput"
                        type="password"
                        labelFor="Current Password"
                        labelValue="Current Password"
                        placeHolder="Enter Your Current Password"
                        inputClass=""
                        value={formik.values.currentPassword}
                        change={formik.handleChange}
                        error={
                          formik.touched.currentPassword &&
                          formik.errors.currentPassword
                        }
                        color={
                          formik.errors.currentPassword ? "error" : "primary"
                        }
                      />
                    </div>
                    <div className="w-full pb-5 text-start">
                      <InputFeild
                        name="newPassword"
                        icon={passwordIcon}
                        id="authInput"
                        type="password"
                        labelFor="confirmPassoword"
                        labelValue="New Password"
                        placeHolder="Enter Your New Password"
                        inputClass=""
                        value={formik.values.newPassword}
                        change={formik.handleChange}
                        error={
                          formik.touched.newPassword &&
                          formik.errors.newPassword
                        }
                        color={formik.errors.newPassword ? "error" : "primary"}
                      />
                    </div>
                    <div className="w-full pb-5 text-start">
                      <InputFeild
                        name="confirmNewPassword"
                        icon={passwordIcon}
                        id="authInput"
                        type="password"
                        labelFor="Re-Enter New Password"
                        labelValue="Re-Enter New Password"
                        placeHolder="Re-Enter Your New Password"
                        inputClass=""
                        value={formik.values.confirmNewPassword}
                        change={formik.handleChange}
                        error={
                          formik.touched.confirmNewPassword &&
                          formik.errors.confirmNewPassword
                        }
                        color={
                          formik.errors.confirmNewPassword ? "error" : "primary"
                        }
                      />
                    </div>
                    <div className="w-full pb-5">
                      <CustomButton
                        type="submit"
                        buttonClass="h-[40px] w-full bg-primary enabled:hover:bg-primary text-white  focus:outilne-0 py-5"
                        name="Submit"
                      />
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
