import React, { memo, useState } from "react";
import InputFeild from "../atom/inputFeild/InputFeild";
import CustomDatePicker from "../../utils/CustomDatePicker";
import { format, parse } from "date-fns";
import CustomButton from "../atom/button/CustomButton";
import {
  AddMoreIcon,
  addTagsIcon,
  birthdatCakeIcon,
  emailEnvelop,
  locationIcon2,
  nameInfoicon,
  organizerInfoIcon,
  passwordIcon,
  telephoneIcon,
} from "../../assets/Icons";

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
const OrganizerInfo: React.FC<OrganiserInfoProps> = memo(() => {
  const [fields, setFields] = useState([{ id: 1, value: "" }]);
  const navigate = useNavigate();
  const handleAddField = () => {
    setFields([...fields, { id: fields.length + 1, value: "" }]);
  };

  const handleChange = (id, value) => {
    setFields(
      fields.map((field) => (field.id === id ? { ...field, value } : field))
    );
  };
  return (
    <>
      <div className="">
        <p className=" text-base font-semibold text-black mb-10">
          Organizer Information
        </p>

        <form
          onSubmit={(e) => e.preventDefault()}
          className="grid grid-cols-2 gap-6"
        >
          {/* Full Name */}
          <div className="">
            <span className="flex mx-1  gap-1">
              {nameInfoicon} <p>Name of Organizer</p>{" "}
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
              {emailEnvelop} <p>Email (Optional)</p>{" "}
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
              {telephoneIcon} <p>Phone Number (Optional)</p>{" "}
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
              {locationIcon2} <p>Location (Optional)</p>{" "}
            </span>

            <CustomDatePicker
              dateFormat="dd/MM/yyyy"
              onChange={(date) => {
                const formattedDate = format(date, "dd/MM/yyyy");
                formik.setFieldValue("dateOfBirth", formattedDate);
              }}
            />
          </div>
          <div className="w-full">
            <span className="flex mx-1  gap-1">
              {organizerInfoIcon} <p>Organizer Info (Optional)</p>{" "}
            </span>
            <InputFeild
              placeHolder="Password"
              name="password"
              color="primary"
              type="password"
            />
          </div>
          <br />
          {/* Password */}
          <div className="flex gap-4">
            {fields.map((field, index) => (
              <div className="" key={field.id}>
                <span className="flex mx-1 gap-1">
                  {addTagsIcon}
                  <p>Add Tags</p>
                </span>

                <InputFeild
                  placeHolder="Add tags..."
                  name={`tags-${field.id}`}
                  color="primary"
                  type="password"
                  value={field.value}
                  onChange={(e) => handleChange(field.id, e.target.value)}
                />
              </div>
            ))}
            <button className="mt-5" onClick={handleAddField}>
              {AddMoreIcon}
            </button>
          </div>
        </form>
        <div className="flex gap-3 mt-2">
          <span className="bg-[#00AB9E0F] rounded text-center w-20">tags1</span>
          <span className="bg-[#00AB9E0F] rounded text-center w-20">tags2</span>
        </div>
      </div>
      <hr className="text-slate-200" />
      <div className="flex justify-end">
        <CustomButton
          type="submit"
          name="Save & Next"
          size="md"
          buttonClass="border-0 border-transparent focus:ring-0 focus:border-transparent"
        />
      </div>

      <p className="text-center">
        Already have an account?
        <span
          onClick={() => navigate("/authentication/sign-in")}
          className="cursor-pointer font-semibold text-[#00AB9E]"
        >
          Login Up
        </span>{" "}
      </p>
    </>
  );
});

export default OrganizerInfo;
