import React, { memo } from "react";
import InputFeild from "../atom/inputFeild/InputFeild";
import CustomDatePicker from "../../utils/CustomDatePicker";
import { format, parse } from "date-fns";
import CustomButton from "../atom/button/CustomButton";
import {
  birthdatCakeIcon,
  emailEnvelop,
  passwordIcon,
  telephoneIcon,
} from "../../assets/Icons";
import { useNavigate } from "react-router-dom";

// Define the interface for the props
interface OrganiserInfoProps {
  userName?: string;
  change?: any;
  userNameErr?: any;
  userNameColor?: string;
  userEmail?: string;
  userEmailColor?: any;
  userEmailErr?: any;
  userPhone?: any;
  isEditing?: any;
  userPhoneErr?: any;
  userPhoneColor?: any;
  dob?: any;
  handleSuspendToggle?: any;
  handleApproveToggle?: any;
  suspendStatus?: boolean;
  verifiedStatus?: boolean;
  formik: any;
  approvedStatus?: boolean;
  activeTab?: string;
}

// Use the memo function to prevent unnecessary re-renders
const PersonalInfo: React.FC<OrganiserInfoProps> = memo(() => {
  const navigate = useNavigate();
  return (
    <>
      <div className="">
        <p className=" text-base font-semibold text-black mb-10">
          Personal Information
        </p>

        <form
          onSubmit={(e) => e.preventDefault()}
          className="grid grid-cols-2 gap-6"
        >
          {/* Full Name */}
          <div className="">
            <span className="flex mx-1  gap-1">
              {passwordIcon} <p>Full Name</p>{" "}
            </span>

            <InputFeild
              placeHolder="Full Name"
              name="userName"
              color="primary"
              type="text"
            />
          </div>

          {/* Email */}
          <div className="">
            <span className="flex mx-1  gap-1">
              {emailEnvelop} <p>Email</p>{" "}
            </span>

            <InputFeild
              placeHolder="Email"
              name="userEmail"
              color="primary"
              type="text"
            />
          </div>

          {/* Phone Number */}
          <div className="">
            <span className="flex mx-1  gap-1">
              {telephoneIcon} <p>Phone Number</p>{" "}
            </span>

            <InputFeild
              name="userPhoneNumber"
              placeHolder="Phone Number"
              color="primary"
              type="text"
            />
          </div>

          {/* Date of Birth */}
          <div className="">
            <span className="flex mx-1  gap-1">
              {birthdatCakeIcon} <p>Date of Birth (Optional)</p>{" "}
            </span>

            <CustomDatePicker
              dateFormat="dd/MM/yyyy"
              onChange={(date) => {
                const formattedDate = format(date, "dd/MM/yyyy");
                formik.setFieldValue("dateOfBirth", formattedDate);
              }}
            />
          </div>

          {/* Password */}
          <div className="">
            <span className="flex mx-1  gap-1">
              {passwordIcon} <p>Password</p>{" "}
            </span>

            <InputFeild
              placeHolder="Password"
              name="password"
              color="primary"
              type="password"
            />
          </div>

          {/* Confirm Password */}
          <div className="">
            <span className="flex mx-1 gap-1">
              {passwordIcon} <p>Confirm Password</p>{" "}
            </span>

            <InputFeild
              placeHolder="Confirm Password"
              name="confirmPassword"
              color="primary"
              type="password"
            />
          </div>
        </form>
      </div>
      <hr className="text-slate-200" />
      <div className="flex justify-end">
        <CustomButton
          type="submit"
          name="Save & Next"
          size="md"
          buttonClass="border-0 border-transparent 
          focus:ring-0 focus:border-transparent"
        />
      </div>
      <p className="text-center">Already have an account? 
        <span onClick={()=>navigate("/authentication/sign-in")} 
      className="cursor-pointer font-semibold text-[#00AB9E]">Login Up</span> </p>
    </>
  );
});

export default PersonalInfo;
