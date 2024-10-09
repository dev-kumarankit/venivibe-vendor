import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CustomButton from "../../components/atom/button/CustomButton";
import { userService } from "../../services/userService/UserService";
import { useFormik } from "formik";
import * as Yup from "yup";
import Loader from "../../components/atom/loader/Loader";
import { getToast } from "../../components/atom/toastify/Toastify";
import { editIcon, uploadIcon } from "../../assets/Icons";
import CustomTab from "../../components/atom/customTab/CustomTab";
import OrganiserInfo from "../../components/organiserInfo/OrganiserInfo";
import PayoutInfo from "../../components/payoutInfo/PayoutInfo";
import PersonalInfo from "../../components/personalInfo/PersonalInfo";
import { formatDateOfBirthDate } from "../../utils/Helpers";
import ImageInitials from "../../components/atom/images/ImageInitials";

export default function VendorDetails() {
  const [isEditing, setIsEditing] = useState(false);
  const [profilePic, setProfilePic] = useState<string>("");
  const [selectedFile, setSelectedFile] = useState<any>(null);
  const [selectedBusinessDoc, setSelectedBusinessDoc] = useState<any>(null);
  const [selectedFrontDoc, setSelectedFrontDoc] = useState<any>(null);
  const [selectedBackDoc, setSelectedBackDoc] = useState<any>(null);
  const {
    getSingleUserInfoApi,
    getSingleUserInfo,
    getSingleUserInfoLoading,
    editUserDetailsApi,
    suspendUnsuspendUserApi,
    approveRejectVendorApi,
    verifyVendorApi,
    editOrganizerApi,
    editOrganizerApiLoading,
    editUserLoading,
  }: any = userService();
  
  const [activeTab, setActiveTab] = useState("Tab1");

  const { id } = useParams();

  const tabData = [
    { id: "Tab1", label: "Personal Info" },
    { id: "Tab2", label: "Organizer Info" },
    { id: "Tab3", label: "Pay Out Info" },
  ];

  // Function to handle tab click and update active tab
  const handleTabClick = (tab: React.SetStateAction<string>) => {
    formik.resetForm();
    setIsEditing(false);
    setActiveTab(tab);
  };

  const getDetails = () => {
    const data = {
      id: id,
    };
    getSingleUserInfoApi(data);
  };
  useEffect(() => {
    if (id) {
      getDetails();
      setProfilePic(getSingleUserInfo?.profile_pic);
    }
  }, [id]);

  const formik = useFormik({
    initialValues: {
      userName: getSingleUserInfo?.name || "",
      userEmail: getSingleUserInfo?.email || "",
      userPhoneNumber: getSingleUserInfo?.phone || "",
      dateOfBirth: getSingleUserInfo?.d_o_b || "",
      is_verified: getSingleUserInfo?.is_verified || false,
      is_approved: getSingleUserInfo?.is_approved || false,
      is_suspend: getSingleUserInfo?.is_suspend || false,

      organizerName: getSingleUserInfo?.organizer_details?.name || "",
      organizerEmail: getSingleUserInfo?.organizer_details?.email || "",
      organizerPhone: getSingleUserInfo?.organizer_details?.phone || "",
      organizerLocation: getSingleUserInfo?.organizer_details?.location || "",
      organizerAddress: getSingleUserInfo?.organizer_details?.address || "",
      organizerInfo: getSingleUserInfo?.organizer_details?.info || "",
      organizerTags: getSingleUserInfo?.organizer_details?.tags || [],
      organizerBusinessRegDoc:
        getSingleUserInfo?.organizer_details?.business_reg_doc || "",
      organizerNationIdFront:
        getSingleUserInfo?.organizer_details?.national_id_front || "",
      orgainzerNationalIdBack:
        getSingleUserInfo?.organizer_details?.national_id_back || "",
        organizerLocationLat:
        getSingleUserInfo?.organizer_details?.location?.[0] || "",
        organizerLocationLng:
        getSingleUserInfo?.organizer_details?.location?.[1] || "",



      paymentInterval: getSingleUserInfo?.payout_info_details?.interval || "",
      paymentMethod: getSingleUserInfo?.payout_info_details?.method || "",
      paymentAccountName: getSingleUserInfo?.bank_details?.account_name || "",
      paymentAccontHolderName:
        getSingleUserInfo?.bank_details?.account_holders_name || "",
      paymentBankName: getSingleUserInfo?.bank_details?.bank_name || "",
      paymentBranchName: getSingleUserInfo?.bank_details?.branch_name || "",
      paymentAccountNumber:
        getSingleUserInfo?.bank_details?.account_number || "",
      paymentRoutingNumber:
        getSingleUserInfo?.bank_details?.routing_number || "",
      paymentSwiftCode: getSingleUserInfo?.bank_details?.swift_code || "",

      mobileMoneyNetwork: getSingleUserInfo?.network || "1",
      mobileMoneyNetworkName:
        getSingleUserInfo?.network_name || "Mobie Money Network Name",
      mobileMoneyNumber: getSingleUserInfo?.number || "Mobie Money Number",
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

      if (selectedFile) {
        formData.append("profile_pic", selectedFile);
      }

      // Tab 1: User Details Update

      if (activeTab == "Tab1" || selectedFile) {
        if (initialValues.userName !== currentValues.userName) {
          formData.append("name", currentValues.userName);
        }
        if (initialValues.userEmail !== currentValues.userEmail) {
          formData.append("email", currentValues.userEmail);
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

        // Check if there are any changes before making the API call
        if (
          formData.has("name") ||
          formData.has("email") ||
          formData.has("phone") ||
          formData.has("DOB") ||
          formData.has("profile_pic")
        ) {
          // await editUserDetailsApi(id, formData).then((data: any) => {
          //   if (data?.success) {
          //     getToast("success", data?.message);
          //   } else {
          //     getToast("error", data?.message || "Error Occurred");
          //   }
          // });
        } else {
          getToast("error", "No Fields Edited");
        }
      }

      if (activeTab == "Tab2") {
        if (initialValues.organizerName !== currentValues.organizerName) {
          formData.append("name", currentValues.organizerName);
        }
        if (initialValues.organizerEmail !== currentValues.organizerEmail) {
          formData.append("email", currentValues.organizerEmail);
        }
        if (initialValues.organizerPhone !== currentValues.organizerPhone) {
          formData.append("phone", currentValues.organizerPhone);
        }
        if (initialValues.organizerAddress !== currentValues.organizerAddress) {
          formData.append("address", currentValues.organizerAddress);
        }
        if (initialValues.organizerInfo !== currentValues.organizerInfo) {
          formData.append("info", currentValues.organizerInfo);
        }
        if (initialValues.organizerTags !== currentValues.organizerTags) {
          formData.append("tags", currentValues.organizerTags);
        }

        if (selectedBusinessDoc) {
          formData.append("business_reg_doc", selectedBusinessDoc);
        }

        if (selectedFrontDoc) {
          formData.append("national_id_front", selectedFrontDoc);
        }

        if (selectedBackDoc) {
          formData.append("national_id_back", selectedBackDoc);
        }

        // Check if there are any changes before making the API call
        if (
          formData.has("name") ||
          formData.has("email") ||
          formData.has("phone") ||
          formData.has("address") ||
          formData.has("info") ||
          formData.has("business_reg_doc") ||
          formData.has("national_id_back") ||
          formData.has("national_id_front") ||
          formData.has("tags")
        ) {
          await editOrganizerApi(id, formData).then((data: any) => {
            if (data?.success) {
              getToast("success", data?.message);
            } else {
              getToast("error", data?.message || "Error Occurred");
            }
          });
        } else {
          getToast("error", "No Fields Edited");
        }
      }

      if (activeTab == "Tab3") {
        if (initialValues.paymentInterval !== currentValues.paymentInterval) {
          formData.append("interval", currentValues.paymentInterval);
        }
        if (initialValues.paymentMethod !== currentValues.paymentMethod) {
          formData.append("method", currentValues.paymentMethod);
        }
        if (
          initialValues.paymentAccontHolderName !==
          currentValues.paymentAccontHolderName
        ) {
          formData.append(
            "account_holders_name",
            currentValues.paymentAccontHolderName
          );
        }
        if (initialValues.paymentBankName !== currentValues.paymentBankName) {
          formData.append("bank_name", currentValues.paymentBankName);
        }
        if (
          initialValues.paymentBranchName !== currentValues.paymentBranchName
        ) {
          formData.append("branch_name", currentValues.paymentBranchName);
        }
        if (
          initialValues.paymentAccountNumber !==
          currentValues.paymentAccountNumber
        ) {
          formData.append("account_number", currentValues.paymentAccountNumber);
        }
        if (
          initialValues.paymentRoutingNumber !==
          currentValues.paymentRoutingNumber
        ) {
          formData.append("routing_number", currentValues.paymentRoutingNumber);
        }
        if (initialValues.paymentSwiftCode !== currentValues.paymentSwiftCode) {
          formData.append("swift_code", currentValues.paymentSwiftCode);
        }
        if (
          formData.has("interval") ||
          formData.has("method") ||
          formData.has("account_holders_name") ||
          formData.has("bank_name") ||
          formData.has("branch_name") ||
          formData.has("account_number") ||
          formData.has("routing_number") ||
          formData.has("swift_code")
        ) {

          // await editUserDetailsApi(id, formData).then((data: any) => {
          //   if (data?.success) {
          //     getToast("success", data?.message);
          //   } else {
          //     getToast("error", data?.message || "Error Occurred");
          //   }
          // });
        } else {
          getToast("error", "No Fields Edited");
        }
      }
      // Reset after submission
      setSelectedFile(null);
      formik.resetForm();
      setIsEditing(false);
      // getDetails()
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

  // useEffect(() => {
  //   if (getSingleUserInfo) {
  //     formik.resetForm({
  //       values: {
  //         userName: getSingleUserInfo?.name || "",
  //         userEmail: getSingleUserInfo?.email || "",
  //         userPhoneNumber: getSingleUserInfo?.phone || "",
  //         dateOfBirth: getSingleUserInfo?.d_o_b || "",
  //         is_verified: getSingleUserInfo.is_verified,
  //         is_suspend: getSingleUserInfo.is_suspend,
  //       },
  //     });
  //   }
  // }, [getSingleUserInfo]);
  useEffect(() => {
    if (getSingleUserInfo?.profile_pic) {
      setProfilePic(getSingleUserInfo?.profile_pic);
    }
  }, [getSingleUserInfo]);

  return (
    <>
      {(getSingleUserInfoLoading || editUserLoading) && <Loader />}

      <p className="text-xs font-normal pb-3 cursor-pointer inline-block">
        Dashboard / <span className="text-secondaryBlue ">Event Organizer</span>
      </p>

      <div className="w-full bg-white py-6 px-[24px] rounded-xl">
        <div className="flex items-center justify-between pb-4">
          <p className="text-primary-text font-medium">
            Event Organizer Details
          </p>
          {!isEditing ? (
            <CustomButton
              type="button"
              buttonClass="border border-secondaryBlue text-secondaryBlue rounded-full px-6 py-2.5 "
              icon={editIcon}
              action={handleEditClick}
              iconClass="mt-0.5 mr-1"
              color={""}
              name="Edit"
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
            <span className="absolute right-0 bottom-[5px]">{uploadIcon}</span>
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
              className="font-normal text-secondaryBlue text-base cursor-pointer"
            >
              Upload Photo
            </p>
          )}
        </div>
        
        <CustomTab
          tabs={tabData}
          activeTab={activeTab}
          onTabClick={handleTabClick}
        />

        {activeTab == "Tab2" && (
          <OrganiserInfo
            setSelectedBusinessDoc={setSelectedBusinessDoc}
            setSelectedFrontDoc={setSelectedFrontDoc}
            setSelectedBackDoc={setSelectedBackDoc}
            organizerName={formik?.values?.organizerName}
            organizerEmail={formik?.values?.organizerEmail}
            organizerPhone={formik?.values?.organizerPhone}
            organizerLocation={formik?.values?.organizerLocation}
            organizerTags={formik?.values?.organizerTags}
            organizerInfo={formik?.values?.organizerInfo}
            organizerAddress={formik?.values?.organizerAddress}
            organizerBusinessRegDoc={formik?.values?.organizerBusinessRegDoc}
            organizerNationIdFront={formik?.values?.organizerNationIdFront}
            orgainzerNationIdBack={formik?.values?.orgainzerNationalIdBack}
            isEditing={isEditing}
            change={formik.handleChange}
            formik={formik}
            activeTab="Tab2"
          />
        )}
        {activeTab == "Tab3" && (
          <PayoutInfo
            payInterval={formik?.values?.paymentInterval}
            payMethod={formik?.values?.paymentMethod}
            accountName={formik?.values?.paymentAccountName}
            holderName={formik?.values?.paymentAccontHolderName}
            bankName={formik?.values?.paymentBankName}
            branchName={formik?.values?.paymentBranchName}
            accountNumber={formik?.values?.paymentAccountNumber}
            routingNumber={formik?.values?.paymentRoutingNumber}
            swiftCode={formik?.values?.paymentSwiftCode}
            isEditing={isEditing}
            change={formik.handleChange}
            formik={formik}
            activeTab="Tab3"
            mobileMoneyNetwork={formik?.values?.mobileMoneyNetwork}
            mobileMoneyNetworkName={formik?.values?.mobileMoneyNetworkName}
            mobileMoneyNumber={formik?.values?.mobileMoneyNumber}
          />
        )}
        {activeTab == "Tab1" && (
          <PersonalInfo
            isEditing={isEditing}
            userName={formik?.values?.userName}
            change={formik.handleChange}
            userNameErr={formik.touched.userName && formik.errors.userName}
            userNameColor={formik.errors.userName ? "error" : "primary"}
            userEmail={formik?.values?.userEmail}
            userEmailColor={formik.errors.userEmail ? "error" : "primary"}
            userEmailErr={formik.touched.userEmail && formik.errors.userEmail}
            userPhone={formik?.values?.userPhoneNumber}
            userPhoneErr={
              formik.touched.userPhoneNumber && formik.errors.userPhoneNumber
            }
            userPhoneColor={formik.errors.userPhoneNumber ? "error" : "primary"}
            dob={formik?.values?.dateOfBirth}
            suspendStatus={formik?.values?.is_suspend}
            approvedStatus={formik?.values?.is_approved}
            verifiedStatus={formik?.values?.is_verified}
            formik={formik}
            activeTab="Tab1"
          />
        )}
      </div>
    </>
  );
}
