import React, { memo, useState } from "react";
import InputFeild from "../atom/inputFeild/InputFeild";
import Select from "react-select";
import {
  AccountHolderIcon,
  AddMoreIcon,
  addTagsIcon,
  bankIcon,
  emailEnvelop,
  locationIcon2,
  nameInfoicon,
  organizerInfoIcon,
  paymentWalletIcon,
  swiftCodeIcon,
  telephoneIcon,
} from "../../assets/Icons";
import CustomDatePicker from "../../utils/CustomDatePicker";
import CustomButton from "../atom/button/CustomButton";
import { useNavigate } from "react-router-dom";

// Define the interface for the props
interface PayoutInfoProps {
  payInterval?: any;
  payMethod?: any;
  accountName?: any;
  holderName?: any;
  bankName?: any;
  branchName?: any;
  accountNumber?: any;
  routingNumber?: any;
  swiftCode?: any;
  isEditing?: any;
  change?: any;
  formik?: any;
  activeTab?: any;
  mobileMoneyNetwork?: any;
  mobileMoneyNetworkName?: any;
  mobileMoneyNumber?: any;
}

// Use the memo function to prevent unnecessary re-renders
const PayoutInfo: React.FC<PayoutInfoProps> = memo(() => {
  // const payMethod = 1;
  const navigate = useNavigate();

  return (
    <>
      <div className="">
        <p className=" text-base font-semibold text-black mb-10">
          Payout Information
        </p>

        <form
          onSubmit={(e) => e.preventDefault()}
          className="grid grid-cols-2 gap-6"
        >
          {/* Full Name */}
          <div className="">
            <span className="flex mx-1  gap-1">
              {paymentWalletIcon} <p>Choose Payment Interval</p>{" "}
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
              {paymentWalletIcon} <p>Payment Method</p>{" "}
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
              {organizerInfoIcon} <p>Account Name</p>{" "}
            </span>

            <InputFeild
              name="userPhoneNumber"
              placeHolder="Your Name"
              color="primary"
              type="text"
            />
          </div>

          {/* Date of Birth */}
          <div className="">
            <span className="flex mx-1  gap-1">
              {AccountHolderIcon} <p>Account Holders Name</p>{" "}
            </span>

            <InputFeild
              placeHolder="Enter Name"
              name="password"
              color="primary"
              type="text"
            />
          </div>
          <div >
            <span className="flex mx-1  gap-1">
              {bankIcon} <p>Bank Name</p>{" "}
            </span>
            <InputFeild
              placeHolder="Enter bank name"
              name="password"
              color="primary"
              type="text"
            />
          </div>
          {/* Password */}
     
            <div className="">
              <span className="flex mx-1 gap-1">
                {bankIcon}
                <p>Branch Name (optional)</p>
              </span>

              <InputFeild placeHolder="Location" color="primary" type="text" />
       
          </div>
          <div className="">
            <span className="flex mx-1  gap-1">
              {bankIcon} <p>Account Number</p>{" "}
            </span>

            <InputFeild
              name="userPhoneNumber"
              placeHolder="Account Number"
              color="primary"
              type="text"
            />
          </div>
          <div className="">
            <span className="flex mx-1  gap-1">
              {swiftCodeIcon} <p>Routing Number (optional)</p>{" "}
            </span>

            <InputFeild
              name="userPhoneNumber"
              placeHolder="Enter contact number"
              color="primary"
              type="text"
            />
          </div>
          <div className="">
            <span className="flex mx-1  gap-1">
              {swiftCodeIcon} <p>Swift Code</p>{" "}
            </span>

            <InputFeild
              name="userPhoneNumber"
              placeHolder="Enter contact number"
              color="primary"
              type="text"
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
      <p className="text-center">Already have an account? <span 
      onClick={()=>navigate("/authentication/sign-in")} 
      className="cursor-pointer font-semibold text-[#00AB9E]">Login Up</span> </p>
     
    </>
  );
});

export default PayoutInfo;
