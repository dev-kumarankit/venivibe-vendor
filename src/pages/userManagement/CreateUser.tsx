import { useFormik } from "formik";
import * as Yup from "yup";

import { useRef } from "react";
import InputFeild from "../../components/atom/inputFeild/InputFeild";
import CustomButton from "../../components/atom/button/CustomButton";

export default function CreateUser() {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const onEdituserPhoto = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const updateUserDetails = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (formik.isValid) {
      formik.handleSubmit(e);
    } else {
    }
  };

  const formik = useFormik({
    initialValues: {
      firstName:"",
      lastName:  "",
      email: "",
      phone_number:"",
      headline: "",
      about:  "",
      website: "",
      address: "",
      state: "",
      zipCode:"",
      country:"",
      city:"",
    },
    validationSchema: Yup.object({
      firstName: Yup.string().required("First Name is required"),
      lastName: Yup.string().required("Last Name is required"),
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
      phone_number: Yup.string().min(10, "Please enter Correct phone number"),
      about: Yup.string(),
      website: Yup.string(),
      address: Yup.string(),
      state: Yup.string(),
      zipCode: Yup.string(),
      country: Yup.string(),
      city: Yup.string(),
    }),
    onSubmit: async (values) => {
      const userData = {
        first_name: values?.firstName,
        last_name: values?.lastName,
        email: values?.email,
        phone_number: values?.phone_number,
        about: values?.about,
        website: values?.website,
        address: values?.address,
        state: values?.state,
        zipCode: values?.zipCode,
        country: values?.country,
        city: values?.city,
      };
    },
    validateOnMount: false,
    validateOnBlur: false,
    enableReinitialize: true,
    validateOnChange: true,
  });

  return (
    <>
      <div className="w-full py-8">
        <div className="w-full flex flex-wrap items-start justify-center">
          <div className="w-full md:w-8/12 pr-4">
            <div className="w-full max-w-full relative bg-white p-6 rounded-xl">
              <p className="pb-3 text-lg">Personal Info</p>
              <form onSubmit={updateUserDetails}>
                <div className="w-full flex flex-col gap-y-5">
                  <div className="w-full flex items-start justify-center gap-x-3">
                    <div className="flex-auto">
                      <InputFeild
                        id="authInput"
                        type="text"
                        labelFor="firstName"
                        labelValue="First Name"
                        placeHolder="John"
                        inputClass=""
                        value={formik.values.firstName}
                        name="firstName"
                        change={formik.handleChange}
                        blur={formik.handleBlur}
                        error={
                          formik.touched.firstName && formik.errors.firstName
                        }
                        color={formik.errors.firstName ? "error" : "primary"}
                      />
                    </div>
                    <div className="flex-auto">
                      <InputFeild
                        id="authInput"
                        type="text"
                        labelFor="lastName"
                        labelValue="Last Name"
                        placeHolder="Doe"
                        inputClass=""
                        value={formik.values.lastName}
                        name="lastName"
                        change={formik.handleChange}
                        blur={formik.handleBlur}
                        error={
                          formik.touched.lastName && formik.errors.lastName
                        }
                        color={formik.errors.lastName ? "error" : "primary"}
                      />
                    </div>
                  </div>
                  <div className="w-full flex items-start justify-center gap-x-3">
                    <div className="flex-auto">
                      <InputFeild
                        id="authInput"
                        type="text"
                        labelFor="E-mail"
                        labelValue="E-mail"
                        name="email"
                        placeHolder="toni@for.co"
                        inputClass=""
                        value={formik.values.email}
                        change={formik.handleChange}
                        blur={formik.handleBlur}
                        error={formik.touched.email && formik.errors.email}
                        color={formik.errors.email ? "error" : "primary"}
                      />
                    </div>
                    <div className="flex-auto">
                      <InputFeild
                        id="authInput"
                        type="text"
                        labelFor="phone_number"
                        labelValue="Phone Number"
                        name="phone_number"
                        placeHolder="+91 894-------"
                        inputClass=""
                        value={formik.values.phone_number}
                        change={formik.handleChange}
                        blur={formik.handleBlur}
                        error={
                          formik.touched.phone_number &&
                          formik.errors.phone_number
                        }
                        color={formik.errors.phone_number ? "error" : "primary"}
                      />
                    </div>
                  </div>
                  <div className="w-full flex items-start justify-center gap-x-3">
                    <div className="flex-auto">
                      <InputFeild
                        id="authInput"
                        type="text"
                        labelFor="about"
                        labelValue="About"
                        name="about"
                        placeHolder="CEO / former"
                        inputClass=""
                        value={formik.values.about}
                        change={formik.handleChange}
                        blur={formik.handleBlur}
                        error={formik.touched.about && formik.errors.about}
                        color={formik.errors.about ? "error" : "primary"}
                      />
                    </div>
                    <div className="flex-auto">
                      <InputFeild
                        id="authInput"
                        type="text"
                        labelFor="website"
                        labelValue="Website"
                        name="website"
                        placeHolder="admintheme.com"
                        inputClass=""
                        value={formik.values.website}
                        change={formik.handleChange}
                        blur={formik.handleBlur}
                        error={formik.touched.website && formik.errors.website}
                        color={formik.errors.website ? "error" : "primary"}
                      />
                    </div>
                  </div>

                  <div className="w-full">
                    <InputFeild
                      id="authInput"
                      type="text"
                      labelFor="address"
                      labelValue="Address"
                      name="address"
                      placeHolder="your address"
                      inputClass=""
                      value={formik.values.address}
                      change={formik.handleChange}
                      blur={formik.handleBlur}
                      error={formik.touched.address && formik.errors.address}
                      color={formik.errors.address ? "error" : "primary"}
                    />
                  </div>

                  <div className="w-full flex items-start justify-center gap-x-3">
                    <div className="flex-auto">
                      <InputFeild
                        id="authInput"
                        type="text"
                        labelFor="state"
                        labelValue="State"
                        name="state"
                        placeHolder="california"
                        inputClass=""
                        value={formik.values.state}
                        change={formik.handleChange}
                        blur={formik.handleBlur}
                        error={formik.touched.state && formik.errors.state}
                        color={formik.errors.state ? "error" : "primary"}
                      />
                    </div>
                    <div className="flex-auto">
                      <InputFeild
                        id="authInput"
                        type="text"
                        labelFor="zipCode"
                        labelValue="zipCode"
                        name="zipCode"
                        placeHolder="49852"
                        inputClass=""
                        value={formik.values.zipCode}
                        change={formik.handleChange}
                        blur={formik.handleBlur}
                        error={formik.touched.zipCode && formik.errors.zipCode}
                        color={formik.errors.zipCode ? "error" : "primary"}
                      />
                    </div>
                  </div>

                  <div className="w-full flex items-start justify-center gap-x-3">
                    <div className="flex-auto">
                      <InputFeild
                        id="authInput"
                        type="text"
                        labelFor="country"
                        labelValue="country"
                        name="country"
                        placeHolder="your country"
                        inputClass=""
                        value={formik.values.country}
                        change={formik.handleChange}
                        blur={formik.handleBlur}
                        error={formik.touched.country && formik.errors.country}
                        color={formik.errors.country ? "error" : "primary"}
                      />
                    </div>
                    <div className="flex-auto">
                      <InputFeild
                        id="authInput"
                        type="text"
                        labelFor="city"
                        labelValue="City"
                        name="city"
                        placeHolder="your city"
                        inputClass=""
                        value={formik.values.city}
                        change={formik.handleChange}
                        blur={formik.handleBlur}
                        error={formik.touched.city && formik.errors.city}
                        color={formik.errors.city ? "error" : "primary"}
                      />
                    </div>
                  </div>

                  <div className="w-full flex items-center justify-end gap-x-3">
                    <CustomButton
                      type="submit"
                      name="Update Profile"
                      buttonClass="bg-primary text-white uppercase border border-primary enabled:hover:bg-primary focus:border-primary focus:ring-0 focus:outline-0"
                      disabled={!formik.isValid}
                    />
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
