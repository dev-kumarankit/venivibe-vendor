import React, { useEffect, useRef, useState } from "react";
import InputFeild from "../../atom/inputFeild/InputFeild";
import {
  addImageIcon,
  calenderIcon,
  closeIcon,
  instaIcon,
  locationIcon,
  timeIcon,
  titktokIcon,
  uploadGrayIcon,
  xUrlIcon,
  youtubeIcon,
} from "../../../assets/Icons";
import { SingleSelect } from "../../atom/singleSelect/SingleSelect";
import DatePicker from "react-datepicker";
import FormCheckbox from "../../atom/checkbox/Checkbox";
import { Textarea } from "flowbite-react";
import CustomButton from "../../atom/button/CustomButton";
import { useFormik } from "formik";
import * as Yup from "yup";
import { eventManagementService } from "../../../services/eventManagementService/EventManagementService";
import { getToast } from "../../atom/toastify/Toastify";
import { format } from "date-fns";
import { StepForm } from "../../store/Toggle";

export default function AddInfo() {
  const [photos, setPhotos] = useState<any>([]);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const [startTime, setStartTime] = useState<any>();
  const [endTime, setEndTime] = useState<any>();
  const grpImage = useRef<HTMLInputElement | null>(null);
  const [eventImageFiles, setEventImageFiles] = useState<File[]>([]);
  const [imageObj, setImageObj] = useState<any>({
    groupImage: null,
  });
  const { setStepper }: any = StepForm();
  const {
    createEventApi,
    refundPolicy,
    eventCategory,
    eventCategoryData,
    refundData,
  }: any = eventManagementService();

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Event Name is required"),
    venue: Yup.string().required("Venue is required"),
  });

  const formik = useFormik({
    initialValues: {
      organizer_name: "",
      name: "",
      venue: "",
      address: "",
      start_date: "",
      end_date: "",
      start_time: "",
      end_time: "",
      about: "",
      x_url: "",
      insta_url: "",
      tiktok_url: "",
      youtube_url: "",
      refund_policy: "",
      type: "",
      is_approved: false,
      is_sponsored: false,
    },
    validationSchema,
    onSubmit: async (values: any) => {
      const formData = new FormData();
      for (const key in values) {
        if (
          values[key] !== undefined &&
          values[key] !== null &&
          values[key] !== ""
        ) {
          if (Array.isArray(values[key])) {
            formData.append(key, JSON.stringify(values[key]));
          } else {
            formData.append(key, values[key]);
          }
        }
      }
      eventImageFiles.forEach((file) => {
        formData.append("images", file);
      });

      formData.append("main_image", imageObj.groupImage);
      try {
        await createEventApi(formData).then((data: any) => {
          if (data?.success) {
            localStorage.setItem("eventId", data?.data?.event?.id);
            getToast("success", data?.message);
            setStepper( "1");
          } else {
            getToast("error", data?.message || "Error Occured");
          }
        });
      } catch (error) {
        console.error("Error creating event:", error);
      }
    },
    validateOnChange: true,
    validateOnBlur: false,
    enableReinitialize: true,
  });

  useEffect(() => {
    refundPolicy();
    eventCategory();
  }, []);

  const handleAddPhoto = (event: any) => {
    if (event.target.files[0]) {
      const files = Array.from(event.target.files);
      const newPhoto = URL.createObjectURL(event.target.files[0]);
      setPhotos((prevPhotos: any) => [...prevPhotos, newPhoto]);
      setEventImageFiles((prevFiles: any) => [...prevFiles, ...files]);
    }
  };

  const handleRemovePhoto = (index: number) => {
    setPhotos((prevPhotos: any) =>
      prevPhotos.filter((_: any, i: number) => i !== index)
    );
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    setImageObj({ ...imageObj, groupImage: file });
  };

  const handleStartDateChange = (date: any) => {
  
    setStartDate(date);
    const formattedDate = format(date, "yyyy-MM-dd");
    formik.setFieldValue("start_date", formattedDate);
    setStartDate(date);
  };

  const handleStartTimeChange = (time: any) => {
    const formattedTime = format(time, "hh:mm a");
    formik.setFieldValue("start_time", formattedTime);
    setStartTime(time);
  };

  const handleEndDateChange = (date: any) => {
    const formattedDate = format(date, "yyyy-MM-dd");
    formik.setFieldValue("end_date", formattedDate);
    setEndDate(date);
  };

  const handleEndTimeChange = (time: any) => {
    const formattedTime = format(time, "hh:mm a");
    formik.setFieldValue("end_time", formattedTime);
    setEndTime(time);
  };

  const handleSelectChange = (value: string) => {
    formik.setFieldValue("refund_policy", value);
  };

  const handleEventChange = (value: string) => {
    formik.setFieldValue("type", value);
  };

  return (
    <form onSubmit={formik.handleSubmit}>
      <div
        className={`border-dashed border border-gray rounded-xl py-4 px-6 flex flex-col gap-3 text-center h-[190px] justify-center pb-4`}
        onClick={() => grpImage.current?.click()}
      >
        {imageObj.groupImage && (
          <img
            src={URL.createObjectURL(imageObj.groupImage)}
            alt=""
            className="w-full h-full object-cover"
          />
        )}
        <div className={`${imageObj.groupImage && "hidden"} space-y-3`}>
          <p className="mx-auto flex justify-center flex-col items-center gap-2">
            {uploadGrayIcon} <span>Upload Banner Event Image</span>
          </p>
          <input
            type="file"
            accept="image/jpg ,image/jpeg,image/png"
            name="myImage"
            className="z-50 hidden"
            ref={grpImage}
            onChange={(event) => handleImageChange(event)}
          />
        </div>
      </div>
      <div className="p-6 border border-grayBorder rounded-xl my-4">
        <div>
          <p>Event Information</p>
        </div>

        <div>
          <div className="flex flex-wrap gap-4">
            <div className="flex justify-between w-full gap-4">
              <div className="w-[69%]">
                <InputFeild
                  name="name"
                  placeHolder="Name of Event"
                  change={formik.handleChange}
                  value={formik.values.name}
                  error={formik.errors.name}
                  color="primary"
                  inputClass="!p-0 "
                  type="text"
                />
              </div>
              <div className="w-[33.33%]">
                <InputFeild
                  placeHolder="Venue Name"
                  name="venue"
                  change={formik.handleChange}
                  value={formik.values.venue}
                  error={formik.errors.venue}
                  color="primary"
                  inputClass="!p-0 "
                  type="text"
                />
              </div>
            </div>

            <div className="flex justify-between w-full gap-4">
              <InputFeild
                placeHolder="Address"
                change={formik.handleChange}
                name="address"
                value={formik.values.address}
                error={formik.errors.address}
                iconRight={locationIcon}
                color="primary"
                inputClass="!p-0 w-full"
                type="text"
              />

              <div className="w-full">
                <SingleSelect
                  options={refundData?.data?.refundPolicies}
                  placeholder="Refund Policy"
                  onChange={handleSelectChange}
                />
              </div>
              <div className="w-full">
                <SingleSelect
                  options={eventCategoryData?.data?.eventCategories}
                  placeholder="Event Category"
                  onChange={handleEventChange}
                />
              </div>
            </div>

            <div className="flex justify-between w-full gap-4">
              <div className="w-full flex gap-4">
                <div className="w-full relative">
                  <DatePicker
                    selected={startDate}
                    onChange={handleStartDateChange}
                    minDate={new Date()}
                    placeholderText="Start Date"
                    className="w-full border-gray-300 rounded-md shadow-sm px-4 p-2 border-none bg-[#F8F8F8] text-sm"
                    dateFormat="MM/dd/yyyy"
                    onFocus={(e) => {
                      e.target.classList.add("border-primary", "bg-primary");
                    }}
                    onBlur={(e) => {
                      e.target.classList.remove("border-primary", "bg-primary");
                    }}
                  />
                  <span className="absolute top-2.5 right-[10px]">
                    {calenderIcon}
                  </span>
                </div>

                <div className="w-full relative">
                  <DatePicker
                    selected={startTime}
                    onChange={handleStartTimeChange}
                    showTimeSelect
                    placeholderText="Start Time"
                    className="w-full border-gray-300 rounded-md shadow-sm px-4 p-2 border-none bg-[#F8F8F8] text-sm"
                    showTimeSelectOnly
                    timeIntervals={15}
                    timeCaption="Time"
                    dateFormat="h:mm aa"
                  />
                  <span className="absolute top-2.5 right-[10px]">
                    {timeIcon}
                  </span>
                </div>
                <div className="w-full flex items-center">
                <FormCheckbox
                  id="is_approved"
                  label={"Hide Start Time"}
                  defaultChecked
                  name="is_approved"
                  checked={formik.values.is_approved}
                  onChange={formik.handleChange}
                />
              </div>
              </div>
              

              <div className="w-full flex gap-4">
                <div className="w-full relative">
                  <DatePicker
                    selected={endDate}
                    onChange={handleEndDateChange}
                    minDate={new Date()}
                    placeholderText="End Date"
                    className="w-full border-gray-300 rounded-md shadow-sm px-4 p-2 border-none bg-[#F8F8F8] text-sm"
                    dateFormat="MM/dd/yyyy"
                    onFocus={(e) => {
                      e.target.classList.add("border-primary", "bg-primary");
                    }}
                    onBlur={(e) => {
                      e.target.classList.remove("border-primary", "bg-primary");
                    }}
                  />
                  <span className="absolute top-2.5 right-[10px]">
                    {calenderIcon}
                  </span>
                </div>

                <div className="w-full relative">
                  <DatePicker
                    selected={endTime}
                    onChange={handleEndTimeChange}
                    showTimeSelect
                    placeholderText="End Time"
                    className="w-full border-gray-300 rounded-md shadow-sm px-4 p-2 border-none bg-[#F8F8F8] text-sm"
                    showTimeSelectOnly
                    timeIntervals={15}
                    timeCaption="Time"
                    dateFormat="h:mm aa"
                  />
                  <span className="absolute top-2.5 right-[10px]">
                    {timeIcon}
                  </span>
                </div>
                <div className="w-full flex items-center">
                <FormCheckbox
                  id="is_approved"
                  label={"Hide End Time"}
                  defaultChecked
                  name="is_approved"
                  checked={formik.values.is_approved}
                  onChange={formik.handleChange}
                />
              </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div>
        <Textarea
          id="description"
          rows={4}
          name="about"
          placeholder="Event Description"
          onChange={formik.handleChange}
          value={formik.values.about}
          className="p-6 border border-grayBorder rounded-xl resize-none textAreaShadow"
        />
      </div>

      <div className="p-6 border border-grayBorder rounded-xl my-4">
        <div className="pb-3">
          <p>Social Media</p>
        </div>
        <div className="flex justify-between w-full gap-4">
          <div className="">
            <InputFeild
              name="x_url"
              change={formik.handleChange}
              value={formik.values.x_url}
              // error={formik.errors.x_url}
              placeHolder="X URL (Optional)"
              iconRight={xUrlIcon}
              color="primary"
              inputClass="!p-0 "
              type="text"
            />
          </div>
          <div className="">
            <InputFeild
              name="insta_url"
              change={formik.handleChange}
              value={formik.values.insta_url}
              // error={formik.errors.insta_url}
              placeHolder="Instagram URL (Optional)"
              color="primary"
              iconRight={instaIcon}
              inputClass="!p-0 "
              type="text"
            />
          </div>
          <div className="">
            <InputFeild
              name="tiktok_url"
              change={formik.handleChange}
              value={formik.values.tiktok_url}
              // error={formik.errors.tiktok_url}
              placeHolder="Tik Tok URL (Optional)"
              iconRight={titktokIcon}
              color="primary"
              inputClass="!p-0 "
              type="text"
            />
          </div>
          <div className="">
            <InputFeild
              name="youtube_url"
              change={formik.handleChange}
              value={formik.values.youtube_url}
              // error={formik.errors.youtube_url}
              placeHolder="YouTube URL (Optional)"
              iconRight={youtubeIcon}
              color="primary"
              inputClass="!p-0 "
              type="text"
            />
          </div>
        </div>
      </div>

      <div>
        <FormCheckbox
          id="accept"
          label={"Sponsorship Event"}
          name="is_sponsored"
          checked={formik.values.is_sponsored}
          onChange={formik.handleChange}
        />
      </div>

      <div className="p-6 border border-grayBorder rounded-xl my-4">
        <div>
          <h4 className="pb-3">Upload Event Gallery</h4>
          <div className="flex gap-4 flex-wrap">
            {photos.map((photo: string | undefined, index: any) => (
              <div
                key={index}
                className="h-[168px] w-[200px] relative rounded-xl hover:bg-black"
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                <img
                  src={photo}
                  alt={`uploaded ${index}`}
                  className="w-full h-full object-cover rounded-xl hover:opacity-60 group-hover:hover:opacity-60"
                  width="100"
                  height="100"
                />
                {hoveredIndex === index && (
                  <span
                    className="group"
                    onClick={() => handleRemovePhoto(index)}
                    style={{
                      position: "absolute",
                      top: "5px",
                      right: "5px",
                      cursor: "pointer",
                      backgroundColor: "rgba(255, 255, 255, 0.7)",
                      borderRadius: "50%",
                    }}
                  >
                    {closeIcon}
                  </span>
                )}
              </div>
            ))}
            {photos.length < 10 && (
              <label className="add-photo-button">
                <input
                  type="file"
                  accept="image/*"
                  style={{ display: "none" }}
                  onChange={handleAddPhoto}
                />
                <div className="rounded-xl cursor-pointer border-dashed border border-gray rounded py-4 px-6 flex  items-center flex-col gap-3 text-center  justify-center pb-4 h-[168px] w-[200px]">
                  <span role="img" aria-label="add photo">
                    {addImageIcon}
                  </span>
                  <p>Add Photo</p>
                </div>
              </label>
            )}
          </div>
        </div>
      </div>
      <div className="flex justify-end">
        <CustomButton
          type="submit"
          name="Save & Next"
          color={""}
          buttonClass="bg-gradient-primary font-semibold text-white text-sm px-6 py-4"
        />
      </div>
    </form>
  );
}
