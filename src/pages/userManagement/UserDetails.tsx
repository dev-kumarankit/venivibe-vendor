import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import dummyImg from "../../assets//dummyImage.png";
import CustomButton from "../../components/atom/button/CustomButton";
import InputFeild from "../../components/atom/inputFeild/InputFeild";
import { userService } from "../../services/userService/UserService";
import { useFormik } from "formik";
import * as Yup from "yup";
import Loader from "../../components/atom/loader/Loader";
import { getToast } from "../../components/atom/toastify/Toastify";
import "react-datepicker/dist/react-datepicker.css";
import CustomDatePicker from "../../utils/CustomDatePicker";
import Select from "react-select";
import { editIcon, uploadIcon } from "../../assets/Icons";
import { formatDateOfBirthDate } from "../../utils/Helpers";
import ImageInitials from "../../components/atom/images/ImageInitials";
import { SingleSelect } from "../../components/atom/singleSelect/SingleSelect";
import countryData from "../../utils/countryCode/countryCode.json";
export default function UserDetails() {
  const [isEditing, setIsEditing] = useState(false);
  const [profilePic, setProfilePic] = useState<string>(dummyImg);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const {
    getSingleUserInfoApi,
    getSingleUserInfo,
    getSingleUserInfoLoading,
    editUserDetailsApi,
    editUserLoading,
    suspendUnsuspendUserApi,
    verifyVendorApi,
  }: any = userService();

  const { id } = useParams();
  const getDetails = () => {
    const data = {
      id: id,
    };
    getSingleUserInfoApi(data);
  };
  useEffect(() => {
    if (id) {
      getDetails();
    }
  }, [id, getSingleUserInfoApi]);
  useEffect(() => {
    if (getSingleUserInfo?.profile_pic) {
      setProfilePic(getSingleUserInfo?.profile_pic);
    }
  }, [getSingleUserInfo]);

  const formik = useFormik({
    initialValues: {
      userName: getSingleUserInfo?.name || "",
      dateOfBirth: getSingleUserInfo?.d_o_b || "",
      gender: getSingleUserInfo?.gender || "",
      userEmail: getSingleUserInfo?.email || "",
      userCountryCode: getSingleUserInfo?.country_code || "",
      userPhoneNumber: getSingleUserInfo?.phone || "",
      is_verified: getSingleUserInfo?.is_verified || false,
      is_suspend: getSingleUserInfo?.is_suspend || false,
    },
    validationSchema: Yup.object({
      userName: Yup.string().required("User Name is required"),
      userEmail: Yup.string()
        .email("Invalid email")
        .required("Email is required"),
    }),
    onSubmit: async () => {
      const formData = new FormData();
      const initialValues = formik.initialValues;
      const currentValues = formik.values;

      // Check for changes and append only the edited fields
      if (initialValues.userName !== currentValues.userName) {
        formData.append("name", currentValues.userName);
      }
      if (initialValues.userEmail !== currentValues.userEmail) {
        formData.append("email", currentValues.userEmail);
      }

      if (initialValues.userCountryCode !== currentValues.userCountryCode) {
        formData.append("country_code", currentValues.userCountryCode);
      }

      if (initialValues.userPhoneNumber !== currentValues.userPhoneNumber) {
        formData.append("phone", currentValues.userPhoneNumber);
      }
      if (initialValues.dateOfBirth !== currentValues.dateOfBirth) {
        formData.append(
          "DOB",
          formatDateOfBirthDate(currentValues.dateOfBirth)
        );
      }
      if (initialValues.gender !== currentValues.gender) {
        formData.append("gender", currentValues.gender);
      }

      // Add profile picture if it has been changed
      if (selectedFile) {
        formData.append("profile_pic", selectedFile);
      }

      // Check if there are any changes before making the API call
      if (
        formData.has("name") ||
        formData.has("email") ||
        formData.has("phone") ||
        formData.has("dateOfBirth") ||
        formData.has("DOB") ||
        formData.has("gender") ||
        formData.has("profile_pic") ||
        formData.has("country_code")
      ) {
        await editUserDetailsApi(id, formData).then((data: any) => {
          if (data?.success) {
            getToast("success", data?.message);
          } else {
            getToast("error", data?.message || "Error Occurred");
          }
        });
      } else {
        getToast("error", "No Fields Edited");
      }
      setSelectedFile(null);
      formik.resetForm();

      setIsEditing(false);
      getDetails();
    },

    validateOnMount: false,
    validateOnBlur: false,
    enableReinitialize: true,
    validateOnChange: true,
  });

  const handleSaveClick = async () => {
    if (isEditing) {
      formik.handleSubmit();
    }
  };

  const handleEditClick = async () => {
    setIsEditing(!isEditing);
  };

  const handleVerifyToggle = async (id: any) => {
    formik.setFieldValue("is_verified", !formik.values.is_verified);

    const data = {
      id: id,
    };
    verifyVendorApi(data).then(async (data: any) => {
      if (data?.data?.success) {
        await getToast("success", data?.data?.message);
      } else {
        await getToast("error", data?.data?.message || "Error Occured");
      }
    });
  };

  const handleSuspendToggle = async (id: any) => {
    formik.setFieldValue("is_suspend", !formik.values.is_suspend);
    const data = {
      id: id,
    };
    suspendUnsuspendUserApi(data).then(async (data: any) => {
      if (data?.data?.success) {
        await getToast("success", data?.data?.message);
      } else {
        await getToast("error", data?.data?.message || "Error Occured");
      }
    });
  };

  const handleEditProfilePicClick = () => {
    const fileInput = document.createElement("input");
    fileInput.type = "file";
    fileInput.accept = "image/*";
    fileInput.onchange = (e) => {
      const file = e?.target?.files?.[0];
      if (file) {
        setProfilePic(URL.createObjectURL(file));
        setSelectedFile(file);
      }
    };
    fileInput.click();
  };
  useEffect(() => {
    if (getSingleUserInfo) {
      formik.resetForm({
        values: {
          userName: getSingleUserInfo?.name || "",
          userEmail: getSingleUserInfo?.email || "",
          userPhoneNumber: getSingleUserInfo?.phone || "",
          dateOfBirth: getSingleUserInfo?.d_o_b || "",
          gender: getSingleUserInfo?.gender || "",
          is_verified: getSingleUserInfo.is_verified,
          is_suspend: getSingleUserInfo.is_suspend,
        },
      });
    }
  }, [getSingleUserInfo]);

  const genderOptions = [{ name: "Male" }, { name: "Female" }];

  const customStyles = {
    control: (styles) => ({
      ...styles,
      backgroundColor: "#F8F8F8",
      border: "none",
      boxShadow: "none",
      minHeight: 52,
      borderRadius: "8px",
    }),
    option: (styles) => ({
      ...styles,
      color: "gray",
    }),
  };

  return (
    <>
      {(getSingleUserInfoLoading || editUserLoading) && <Loader />}

      <div className="w-full min-h-screen p-5">
        <p className="text-xs font-normal pb-3 cursor-pointer inline-block">
          Dashboard / <span className="text-secondaryBlue ">User Details</span>
        </p>

        <div className="w-full bg-white py-6 px-[24px] rounded-xl">
          <div className="flex items-center justify-between pb-4">
            <p className="text-primary-text font-medium">User Details</p>
            {!isEditing ? (
              <CustomButton
                type="button"
                buttonClass="border border-secondaryBlue text-secondaryBlue rounded-full px-6 py-2.5 "
                icon={editIcon}
                action={handleEditClick}
                iconClass="mt-0.5 mr-1"
                color={""}
                name={"Edit"}
              />
            ) : (
              <div className="flex gap-2 mb-4">
                <CustomButton
                  type="button"
                  buttonClass="border border-gray text-gray text-gray rounded-full px-6 py-2.5"
                  action={() => {
                    formik.resetForm();
                    setIsEditing(!isEditing);
                  }}
                  iconClass="mt-0.5 mr-1"
                  color={""}
                  name={"Cancel"}
                />
                <CustomButton
                  type="button"
                  buttonClass="border border-secondaryBlue text-secondaryBlue rounded-full px-6 py-2.5"
                  iconClass="mt-0.5 mr-1"
                  color={""}
                  name={"Save Change"}
                  action={() => {
                    handleSaveClick();
                  }}
                />
              </div>
            )}
          </div>

          <div className="w-full flex items-center gap-[35px] bg-[#F0F4F6] px-10 py-6 rounded-xl">
            <div className="w-fit relative">
              <ImageInitials
                imageUrl={profilePic}
                alt={formik?.values?.userName}
                name={formik?.values?.userName}
                className="h-[102px] w-[102px] rounded-full max-w-none border-[6px] border-white"
              />

              <span className="absolute right-0 bottom-[5px]">
                {uploadIcon}
              </span>
            </div>
            {!isEditing ? (
              <div>
                <p className="leading-[36px] text-primary-text">
                  {formik.values.userName}
                </p>

                <p className="text-[#637381] text-sm">
                  {formik.values.userEmail}
                </p>
              </div>
            ) : (
              <p
                onClick={handleEditProfilePicClick}
                className="font-normal text-secondaryBlue text-base"
              >
                Upload Photo
              </p>
            )}
          </div>

          <div className="border border-grayBorder px-4 py-6 mt-4 rounded-xl">
            <p className="mb-3 text-base font-medium text-black">
              Personal Information
            </p>
            {isEditing ? (
              <div>
                <form className="flex flex-wrap gap-4">
                  <div className="flex justify-between w-full gap-4">
                    <div className="w-[33.33%]">
                      <InputFeild
                        placeHolder="Full Name"
                        name="userName"
                        value={formik.values.userName}
                        change={formik.handleChange}
                        error={
                          formik.touched.userName && formik.errors.userName
                        }
                        color="primary"
                        inputClass="!p-0"
                        type="text"
                        borderColor={
                          formik.touched.userName && formik.errors.userName
                            ? "border border-red-500"
                            : ""
                        }
                      />
                    </div>

                    <div className="w-[33.33%]">
                      <InputFeild
                        placeHolder="Email"
                        name="userEmail"
                        value={formik.values.userEmail}
                        change={formik.handleChange}
                        error={
                          formik.touched.userEmail && formik.errors.userEmail
                        }
                        color="primary"
                        inputClass="!p-0"
                        type="text"
                        borderColor={
                          formik.touched.userEmail && formik.errors.userEmail
                            ? "border border-red-500"
                            : ""
                        }
                      />
                    </div>
                    <div className="w-[33.33%] flex gap-2">
                      <div className="w-[35%]">
                        <Select
                          value={
                            countryData.find(
                              (option) =>
                                option.dial_code ===
                                formik.values.userCountryCode
                            )
                              ? {
                                  value: formik.values.userCountryCode,
                                  label: formik.values.userCountryCode,
                                }
                              : null
                          }
                          options={countryData?.map((country) => ({
                            value: country.dial_code,
                            label: country.dial_code,
                          }))}
                          onChange={(selectedOption) => {
                            formik.setFieldValue(
                              "userCountryCode",
                              selectedOption.value
                            );
                          }}
                          placeholder=""
                          styles={customStyles}
                          className="[&>div>select]:bg-[#F8F8F8] [&>div>select]:border-0 [&>div>select]:min-h-[52px] [&>div>select]:text-gray focusShadow"
                        />
                      </div>
                      <div className="w-[60%]">
                        <InputFeild
                          name="userPhoneNumber"
                          placeHolder="Phone No"
                          value={formik.values.userPhoneNumber}
                          change={formik.handleChange}
                          color="primary"
                          inputClass="!p-0"
                          type="text"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="flex  w-full gap-4">
                    <div className="w-[32.33%] [&>div]:w-full">
                      <CustomDatePicker
                        selectedDate={
                          formik.values.dateOfBirth
                            ? new Date(formik.values.dateOfBirth)
                            : ""
                        }
                        onChange={(date) =>
                          formik.setFieldValue("dateOfBirth", date)
                        }
                      />
                    </div>
                    <div className="w-[32.33%]">
                      <SingleSelect
                        options={genderOptions}
                        placeholder="Gender"
                        defaultValue={
                          formik.values.gender == "1" ? "Male" : "Female"
                        }
                        onChange={(gender) => {
                          const genderValue = gender == "Male" ? 1 : 2;
                          formik.setFieldValue("gender", genderValue);
                        }}
                      />
                    </div>
                  </div>
                </form>
              </div>
            ) : (
              <div className="flex gap-10">
                <>
                  <div className="text-sm font-normal text-gray">
                    Full Name
                    <p className="mt-1 font-normal text-base text-black">
                      {formik.values.userName || "-"}
                    </p>
                  </div>

                  <div className="text-sm font-normal text-gray">
                    Email Address{" "}
                    <p className="mt-1 font-normal text-base text-black ">
                      {formik.values.userEmail || "-"}
                    </p>
                  </div>

                  <div className="text-sm font-normal text-gray">
                    Date of Birth{" "}
                    <p className="mt-1 font-normal text-base text-black text-center">
                      {formik.values.dateOfBirth || "-"}
                    </p>
                  </div>

                  <div className="text-sm font-normal text-gray">
                    Gender{" "}
                    <p className="mt-1 font-normal text-base text-black text-center">
                      {formik.values.gender == "1"
                        ? "Male"
                        : formik.values.gender == "2"
                        ? "Female"
                        : "-" || "-"}
                    </p>
                  </div>

                  <div className="text-sm font-normal text-gray">
                    Phone Number
                    <p className="mt-1 font-normal text-base text-black text-center">
                    {formik.values.userCountryCode} {formik.values.userPhoneNumber ? formik.values.userPhoneNumber : '-'}                    </p>
                  </div>
                </>
              </div>
            )}
          </div>

          <div className="w-full border border-grayBorder mt-4 px-4 py-6 rounded-xl">
            <span className="text-base font-medium mb-3 flex text-black">
              User permissions
            </span>
            <div className="flex gap-11">
              <div className=" flex items-center rounded-md dark:bg-[#0D0D0D]">
                <label className="inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    value=""
                    className="sr-only peer"
                    title="sendWeeklySummaryEmail"
                    checked={formik.values.is_suspend}
                    onChange={() => {
                      handleSuspendToggle(id);
                    }}
                  />
                  <div className="relative w-11 h-6 bg-[#D5DDE5] peer-focus:outline-none peer-focus:ring-0 peer-focus:ring-transparent dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-transparent after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-secondaryBlue mr-2"></div>
                </label>
                <h4 className="text-sm md:text-base text-black  dark:text-[#CCD4DF]">
                  User Suspended
                </h4>
              </div>

              <div className=" flex items-center rounded-md dark:bg-[#0D0D0D]">
                <label className="inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    value=""
                    className="sr-only peer"
                    title="sendWeeklySummaryEmail"
                    checked={formik.values.is_verified}
                    onChange={() => {
                      handleVerifyToggle(id);
                    }}
                  />
                  <div className="relative w-11 h-6 bg-[#D5DDE5] peer-focus:outline-none peer-focus:ring-0 peer-focus:ring-transparent dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-transparent after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-secondaryBlue mr-2"></div>
                </label>
                <h4 className="text-sm md:text-base text-black dark:text-[#CCD4DF]">
                  User Verified
                </h4>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}