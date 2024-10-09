import { useEffect, useRef, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import "react-datepicker/dist/react-datepicker.css";
import "tailwindcss/tailwind.css";
import Select from "react-select";
import { eventManagementService } from "../../services/eventManagementService/EventManagementService";
import { IoIosAdd } from "react-icons/io";
import InputFeild from "../../components/atom/inputFeild/InputFeild";
import { Breadcrumb, Textarea } from "flowbite-react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { IoMdClose } from "react-icons/io";
import CustomButton from "../../components/atom/button/CustomButton";
import {
  APIProvider,
  Map,
  useAdvancedMarkerRef,
} from "@vis.gl/react-google-maps";
import { format } from "date-fns";
import { AutocompleteCustomHybrid } from "./OnPlaceSelect";
import { MAP_KEY } from "../../utils/Constant";
import Autocomplete from "react-google-autocomplete";
import { getToast } from "../../components/atom/toastify/Toastify";
import Loader from "../../components/atom/loader/Loader";
import { MdDelete } from "react-icons/md";
import CreateEventTicket from "./CreateEventTicket";
import { useNavigate } from "react-router-dom";
import EventProgress from "../../components/eventProgress/EventProgress";
import { uploadIcon } from "../../assets/Icons";
import { SingleSelect } from "../../components/atom/singleSelect/SingleSelect";
import AddInfo from "../../components/createEvent/addInfo/AddInfo";
import { StepForm } from "../../components/store/Toggle";
import Ticket from "../../components/createEvent/ticket/Ticket";
import UploadItems from "../../components/createEvent/uploadItems/UploadItems";
import AddOns from "../../components/createEvent/addOns/AddOns";
import UniqueExperience from "../../components/createEvent/uniqueExperience/UniqueExperience";

const customStyles = {
  control: (provided, state) => ({
    ...provided,
    width: "304px",
    border: "none",
    borderRadius: "8px",
    backgroundColor: "#F8F8F8",
    minHeight: "52px",
    boxShadow: state.isFocused ? "none" : provided.boxShadow,
    "&:hover": {
      borderColor: state.isFocused ? "none" : provided.borderColor,
    },
  }),
  placeholder: (provided) => ({
    ...provided,
    color: "#A8A8A8",
  }),
};

const validationSchema = Yup.object().shape({
  name: Yup.string().required("Event Title is required"),
  organizer_name: Yup.string().required("Organizer Name is required"),
  venue: Yup.string().required("Venue is required"),
  address: Yup.string().required("Address is required"),
  start_date: Yup.date().required("Start Date is required").nullable(),
  end_date: Yup.date()
    .required("End Date is required")
    .min(Yup.ref("start_date"), "End Date must be after Start Date")
    .nullable(),
  about: Yup.string().required("Event Details are required"),
  // ticket_details: Yup.array().of(
  //   Yup.object().shape({
  //     name: Yup.string().required("Ticket Name is required"),
  //     quantity: Yup.number()
  //       .required("Quantity is required")
  //       .positive("Quantity must be positive")
  //       .integer("Quantity must be an integer"),
  //     price: Yup.number()
  //       .required("Price is required")
  //       .positive("Price must be positive"),
  //     ticket_availble_date: Yup.date()
  //       .nullable()
  //       .required("Ticket availble date is required"),

  //     sale_starts_on: Yup.date().nullable().required("Start date is required"),
  //     sale_ends_on: Yup.date().nullable().required("End date is required"),

  //     description: Yup.string().required("Ticket Description is required"),
  //   })
  // ),
});

const CreateEvent = (props: any) => {
  const { getDetails, setCreateEvent } = props || {};
  const { createEventApi, createEventLoading,refundPolicy,eventCategory,eventCategoryData,refundData }: any = eventManagementService();
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const [eventId, setEventId] = useState("");
  const [eventImages, setEventImages] = useState<string[]>([]);
  const [bannerImage, setBannnerImage] = useState<string[]>([]);
  const [bannerImageFiles, setBannerImageFiles] = useState<File[]>([]);
  const [eventImageFiles, setEventImageFiles] = useState<File[]>([]);
  const [selectedPlace, setSelectedPlace] =
    useState<google.maps.places.PlaceResult | null>(null);
  const [markerRef, marker] = useAdvancedMarkerRef();
  const [eventCreatedSuccessfully, setEventCreatedSuccessfully] =
  useState(false);  
  const {stepper,setStepper}:any = StepForm();
  console.log(eventCategoryData?.data?.eventCategories,"stepper234")
  
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
      // ticket_details: [
      //   {
      //     name: "",
      //     quantity: "",
      //     price: "",
      //     sale_starts_on: "",
      //     sale_ends_on: "",
      //     description: "",
      //     ticket_availble_date: "",
      //   },
      // ],
    },
    validationSchema,
    onSubmit: async (values) => {
      const formData = new FormData();

      // Append each field from values individually
      // for (const key in values) {
      //   if (values[key] && !(values[key] instanceof File)) {
      //     formData.append(key, values[key]);
      //     console.log(`Appended ${key}: ${values[key]}`);
      //   }
      // }
      // Append each field from values individually
      for (const key in values) {
        if (values[key] && !(values[key] instanceof File)) {
          // If the value is an array (e.g., ticket_details), serialize it
          if (Array.isArray(values[key])) {
            formData.append(key, JSON.stringify(values[key]));
          } else {
            formData.append(key, values[key]);
          }
        }
      }
      // Append images separately

      eventImageFiles.forEach((file) => {
        formData.append("images", file);
      });

      bannerImageFiles.forEach((file) => {
        formData.append("main_image", file);
      });

      // console.log("FormData contents:");
      // formData.forEach((value, key) => {
      //   console.log(key, value);
      // });

      try {
        await createEventApi(formData).then((data: any) => {
          setEventId(data?.data?.event?.id);

          if (data?.success) {
            getToast("success", data?.message);
            setEventCreatedSuccessfully(true);
          } else {
            getToast("error", data?.message || "Error Occured");
            setEventCreatedSuccessfully(false);
          }
        });
        // await setCreateEvent(false);
        // await getDetails();
      } catch (error) {
        console.error("Error creating event:", error);
      }
    },
    validateOnChange: true,
    validateOnBlur: false,
    enableReinitialize: true,
  });


  // Handling Date and Time changes
  const handleStartDateChange = (date) => {
    setStartDate(date);
    // Format the date as yyyy-MM-dd
    const formattedDate = format(date, "yyyy-MM-dd");

    // Format the time as hh:mm a
    const formattedTime = format(date, "hh:mm a");

    // Set the formatted date and time in Formik
    formik.setFieldValue("start_date", formattedDate); // For date only
    formik.setFieldValue("start_time", formattedTime); // For time only

    // Update the local state if needed
    setStartDate(date);
  };

  const handleEndDateChange = (date) => {
    // Format the date as yyyy-MM-dd
    const formattedDate = format(date, "yyyy-MM-dd");

    // Format the time as hh:mm a
    const formattedTime = format(date, "hh:mm a");

    // Set the formatted date and time in Formik
    formik.setFieldValue("end_date", formattedDate); // For date only
    formik.setFieldValue("end_time", formattedTime); // For time only

    // Update the local state if needed
    setEndDate(date);
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement> ) => {
    if (event.target.files) {
      console.log(event.target.files,"event1234")
      const files = Array.from(event.target.files);
      const newImages = files.map((file) => URL.createObjectURL(file));
      setEventImages((prevImages) => [...prevImages, ...newImages]);
      setEventImageFiles((prevFiles) => [...prevFiles, ...files]);
    }
  };

  const handleBannerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newFiles: any = Array.from(e.target.files || []);
    const bannerImage = newFiles.map((file: any) => URL.createObjectURL(file));
    setBannnerImage((prev: any) => [...prev, ...bannerImage]);
    setBannerImageFiles((prevFiles) => [...prevFiles, ...newFiles]);
  };

  const handleDeleteBannerImage = (index: number) => {
    const updatedBannerImages = bannerImage.filter((_, i) => i !== index);
    const updatedBannnerFiles = bannerImageFiles.filter((_, i) => i !== index);
    setBannnerImage(updatedBannerImages);
    setBannerImageFiles(updatedBannnerFiles);
  };

  const handleDeleteImage = (index: number) => {
    const updatedImages = eventImages.filter((_, i) => i !== index);
    const updatedFiles = eventImageFiles.filter((_, i) => i !== index);
    setEventImages(updatedImages);
    setEventImageFiles(updatedFiles);
  };

  const openFileInput = () => {
    document.getElementById("eventImageInput")?.click();
  };

  const openBannerInput = () => {
    document.getElementById("eventbannerInput")?.click();
  };

  const handlePlaceSelect = (place: google.maps.places.PlaceResult | null) => {
  };
  const handleDeleteTicket = (index) => {
    const updatedTickets = formik.values.ticket_details.filter(
      (_, i) => i !== index
    );
    formik.setFieldValue("ticket_details", updatedTickets);
  };

  const handleTicketDateChange = (
    index: number,
    field: string,
    date: Date | null
  ) => {
    const formattedDate = date ? format(date, "yyyy-MM-dd HH:mm:ss") : "";
    formik.setFieldValue(`ticket_details[${index}].${field}`, formattedDate);
  };

  return (
    <>
      {createEventLoading && <Loader />}
      <div className="w-full p-4 ">
      <div className="w-full pb-3">
          <Breadcrumb
            aria-label="Default breadcrumb"
            className="cursor-pointer"
          >
            <Breadcrumb.Item
              onClick={() => {
                navigate("/dashboard");
              }}
            >
              Dashboard
            </Breadcrumb.Item>
            <Breadcrumb.Item onClick={() => {
                navigate("/events");
              }}>
              <span className="text-secondary">Event</span>
            </Breadcrumb.Item>
            <Breadcrumb.Item>
              <span className="text-secondary">Create Event</span>
            </Breadcrumb.Item>
          </Breadcrumb>
        </div>
        {/* <div className="w-full pb-3">
          {!eventCreatedSuccessfully ? (
            <div>
              <span className="text-primaryText font-semibold">
                Event Information
              </span>

              <form onSubmit={formik.handleSubmit}>
                <div className="w-full flex items-start gap-x-4 pb-5">
                  <div className="flex-1">
                    <InputFeild
                      labelValue="Event Title"
                      color="primary"
                      type="text"
                      name="name"
                      change={formik.handleChange}
                      value={formik.values.name}
                      error={formik.errors.name}
                    />
                  </div>
                  <div className="flex-1">
                    <InputFeild
                      labelValue="Organizer Name"
                      color="primary"
                      type="text"
                      name="organizer_name"
                      change={formik.handleChange}
                      value={formik.values.organizer_name}
                      error={formik.errors.organizer_name}
                    />
                  </div>
                  <div className="flex-1">
                    <InputFeild
                      labelValue="Venue"
                      color="primary"
                      type="text"
                      name="venue"
                      change={formik.handleChange}
                      value={formik.values.venue}
                      error={formik.errors.venue}
                    />
                  </div>
                </div>

                <div className="w-full pb-5">
                  <span className="text-sm font-medium">Event Details</span>
                  <div className="w-full mt-1.5">
                    <Textarea
                      id="eventDetails"
                      rows={4}
                      name="about"
                      onChange={formik.handleChange}
                      value={formik.values.about}
                    />

                    {formik.touched.about && formik.errors.about && (
                      <div className="text-red-500 text-sm mt-1">
                        {formik.errors.about}
                      </div>
                    )}
                  </div>
                </div>

                <div className="w-full pb-5">
                  <span className="text-sm font-medium"> Add Event Banner</span>
                  <div className="w-full flex flex-wrap gap-y-4 items-center pt-4">
                    {bannerImage.map((image, index) => (
                      <div key={index} className="w-full mr-4">
                        <div className="w-full rounded-lg relative">
                          <img
                            src={image}
                            alt={`event preview ${index}`}
                            className="w-full rounded-lg object-cover"
                          />
                          <button
                            className="absolute text-xs top-1 right-1 bg-red-500 text-white rounded-full p-1 hover:bg-red-700"
                            onClick={() => handleDeleteBannerImage(index)}
                          >
                            <IoMdClose />
                          </button>
                        </div>
                      </div>
                    ))}

                    {bannerImage.length != 1 && (
                      <div className="w-full">
                        <div
                          className="w-full rounded-lg border border-primary cursor-pointer bg-white p-4 shadow-md flex flex-wrap items-center justify-center"
                          onClick={openBannerInput}
                        >
                          <div className="w-full flex items-center justify-center">
                            <span>
                              <IoIosAdd />
                            </span>
                          </div>
                          <div className="w-full flex items-center justify-center pb-4">
                            <span className="text-xs text-textSlate text-center">
                              Add banner
                            </span>
                          </div>
                        </div>
                        <input
                          type="file"
                          id="eventbannerInput"
                          hidden
                          accept="image/*"
                          onChange={handleBannerChange}
                        />
                      </div>
                    )}
                  </div>
                </div>

                <div className="w-full flex items-start gap-x-4 pb-5">
                  <div className="flex-1">
                    <label
                      htmlFor="start_date"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Start Date & Time
                    </label>
                    <DatePicker
                      selected={startDate}
                      showTimeSelect
                      onChange={handleStartDateChange}
                      minDate={new Date()}
                      className="w-full border-gray-300 rounded-md shadow-sm p-2"
                      dateFormat="MM/dd/yyyy"
                      onFocus={(e) => {
                        e.target.classList.add("border-primary", "bg-primary");
                      }}
                      onBlur={(e) => {
                        e.target.classList.remove(
                          "border-primary",
                          "bg-primary"
                        );
                      }}
                    />
                    {formik.touched.start_date && formik.errors.start_date && (
                      <div className="text-red-500 text-sm mt-1">
                        {formik.errors.start_date}
                      </div>
                    )}
                  </div>

                  <div className="flex-1">
                    <label
                      htmlFor="end_date"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      End Date & Time
                    </label>
                    <DatePicker
                      selected={endDate}
                      showTimeSelect
                      onChange={handleEndDateChange}
                      minDate={startDate}
                      className="w-full border-gray-300 rounded-md shadow-sm p-2"
                      dateFormat="MM/dd/yyyy"
                      onFocus={(e) => {
                        e.target.classList.add("border-primary", "bg-primary");
                      }}
                      onBlur={(e) => {
                        e.target.classList.remove(
                          "border-primary",
                          "bg-primary"
                        );
                      }}
                    />
                    {formik.touched.end_date && formik.errors.end_date && (
                      <div className="text-red-500 text-sm mt-1">
                        {formik.errors.end_date}
                      </div>
                    )}
                  </div>
                </div>

                <div className="w-full flex items-start gap-x-4 pb-5">
                  <div className="flex-1">
                    <InputFeild
                      labelValue="Address"
                      color="primary"
                      type="text"
                      change={formik.handleChange}
                      name="address"
                      value={formik.values.address}
                      error={formik.errors.address}
                    />
                  </div>
                </div>

                <div className="w-full pb-5">
                  <span className="text-sm font-medium"> Add Event Images</span>
                  <div className="w-full flex flex-wrap gap-y-4 items-center pt-4">
                    {eventImages.map((image, index) => (
                      <div key={index} className="size-28 mr-4">
                        <div className="size-28 rounded-lg relative">
                          <img
                            src={image}
                            alt={`event preview ${index}`}
                            className="size-28 rounded-lg object-cover"
                          />
                          <button
                            className="absolute text-xs top-1 right-1 bg-red-500 text-white rounded-full p-1 hover:bg-red-700"
                            onClick={() => handleDeleteImage(index)}
                          >
                            <IoMdClose />
                          </button>
                        </div>
                      </div>
                    ))}
                    <div className="size-28">
                      <div
                        className="size-28 rounded-lg border border-primary cursor-pointer bg-white p-4 shadow-md flex flex-wrap items-center justify-center"
                        onClick={openFileInput}
                      >
                        <div className="w-full flex items-center justify-center">
                          <span>
                            <IoIosAdd />
                          </span>
                        </div>
                        <div className="w-full flex items-center justify-center pb-4">
                          <span className="text-xs text-textSlate text-center">
                            Add Images
                          </span>
                        </div>
                      </div>
                      <input
                        type="file"
                        id="eventImageInput"
                        hidden
                        accept="image/*"
                        multiple
                        onChange={handleImageChange}
                      />
                    </div>
                  </div>
                </div>
                <div className="w-full flex items-center gap-x-2 ">
                  <CustomButton
                    type="button"
                    name="Back"
                    size="sm"
                    buttonClass="rounded-md bg-transparent text-primaryText border border-primary  enabled:hover:bg-transparent focus:ring-0 focus:outline-0"
                  />

                  <CustomButton
                    type="submit"
                    name="Create Event"
                    size="sm"
                    buttonClass="rounded-md bg-primary text-white border border-primary  enabled:hover:bg-primary focus:ring-0 focus:outline-0"
                  />
                </div>
              </form>
            </div>
          ) : (
            <CreateEventTicket
              eventId={eventId}
              getDetails={getDetails}
              setCreateEvent={setCreateEvent}
            />
          )}
        </div> */}

        <div className="bg-white p-6 rounded-xl">
          <div className="pb-6">
            <EventProgress />
          </div>
         {stepper=="0" && <AddInfo/>}  
         {stepper=="1" && <Ticket/>}  
         {stepper=="2"&& <UploadItems/>}
         {stepper=="3" && <AddOns/>}
         {stepper=="4" && <UniqueExperience/>}
        </div>
      </div>
    </>
  );
};

export default CreateEvent;
