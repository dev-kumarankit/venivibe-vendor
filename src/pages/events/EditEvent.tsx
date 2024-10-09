import { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import CustomButton from "../../components/atom/button/CustomButton";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "tailwindcss/tailwind.css";
import { eventManagementService } from "../../services/eventManagementService/EventManagementService";
import { useParams } from "react-router-dom";
import InputFeild from "../../components/atom/inputFeild/InputFeild";
import { Textarea } from "flowbite-react";
import { format } from "date-fns";
import { IoIosAdd, IoMdClose } from "react-icons/io";
import { useAdvancedMarkerRef } from "@vis.gl/react-google-maps";
import { getToast } from "../../components/atom/toastify/Toastify";
import Loader from "../../components/atom/loader/Loader";
import { MdDelete } from "react-icons/md";

const EditEvent = (props: any) => {
  const { setShowEditModal, getEventDetails } = props || {};
  const [eventImages, setEventImages] = useState<string[]>([]);
  const [bannerImage, setBannnerImage] = useState<string[]>([]);
  const [bannerImageFiles, setBannerImageFiles] = useState<File[]>([]);
  const [eventImageFiles, setEventImageFiles] = useState<File[]>([]); //for formdata

  const { getSingleEventData, editEventApi, editEventLoading }: any =
    eventManagementService();

  const [selectedPlace, setSelectedPlace] =
    useState<google.maps.places.PlaceResult | null>(null);
  const [markerRef, marker] = useAdvancedMarkerRef();
  const { id } = useParams();

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
      ticket_details: [
        {
          id: 1,
          name: "",
          quantity: "",
          price: "",
          sale_starts_on: "",
          sale_ends_on: "",
          description: "",
          ticket_availble_date: "",
        },
      ],
    },
    validationSchema: Yup.object({
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
      ticket_details: Yup.array().of(
        Yup.object().shape({
          name: Yup.string().required("Ticket Name is required"),
          quantity: Yup.number()
            .required("Quantity is required")
            .positive("Quantity must be positive")
            .integer("Quantity must be an integer"),
          price: Yup.number()
            .required("Price is required")
            .positive("Price must be positive"),
          // sale_starts_on: Yup.date().nullable().required("Sales start is required"),
          ticket_availble_date: Yup.date()
            .nullable()
            .required("Ticket availble date is required"),
          sale_starts_on: Yup.date()
            .nullable()
            .required("Start date is required"),
          sale_ends_on: Yup.date().nullable().required("End date  is required"),

          description: Yup.string().required("Ticket Description is required"),
        })
      ),
    }),
    onSubmit: async (values) => {
      const formData = new FormData();

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

      eventImageFiles.forEach((file) => {
        formData.append("images", file);
      });

      bannerImageFiles.forEach((file) => {
        formData.append("main_image", file);
      });

      await editEventApi(id, formData).then((data: any) => {
        if (data?.success) {
          getToast("success", data?.message);
        } else {
          getToast("error", data?.message || "Error Occured");
        }
      });
      await setShowEditModal(false);
      await getEventDetails();
    },
    validateOnMount: false,
    validateOnBlur: false,
    enableReinitialize: true,
    validateOnChange: true,
  });

  useEffect(() => {
    if (getSingleEventData) {
      formik.setValues({
        name: getSingleEventData?.name || "",
        venue: getSingleEventData?.venue || "",
        address: getSingleEventData?.address || "",
        about: getSingleEventData?.about || "",
        organizer_name: getSingleEventData?.organizer_name || "",
        start_date: getSingleEventData?.start_date || "",
        end_date: getSingleEventData?.end_date || "",
        start_time: getSingleEventData?.start_time || "",
        end_time: getSingleEventData?.end_time || "",
        is_approved: getSingleEventData?.is_approved || false,
        ticket_details: getSingleEventData?.ticket_details || [
          // Handle ticket_details
          {
            id: "",
            name: "",
            quantity: "",
            price: "",
            sale_starts_on: "",
            sale_ends_on: "",
            description: "",
            ticket_availble_date: "",
          },
        ],
      });
      setBannnerImage([getSingleEventData?.main_image]);
      setEventImages(getSingleEventData?.images || []);
    }
  }, [getSingleEventData]);

  const [startDate, setStartDate] = useState(() => {
    return getSingleEventData?.start_date
      ? new Date(getSingleEventData?.start_date)
      : "";
  });

  const [endDate, setEndDate] = useState(() => {
    return getSingleEventData?.end_date
      ? new Date(getSingleEventData?.end_date)
      : "";
  });

  // Handling Date and Time changes
  const handleStartDateChange = (date) => {
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

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
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
    const updatedBannerFiles = bannerImageFiles.filter((_, i) => i !== index);

    // Update local state
    setBannnerImage(updatedBannerImages);
    setBannerImageFiles(updatedBannerFiles);

    // Update Formik values
  };

  const handleDeleteImage = (index: number) => {
    const updatedImages = eventImages.filter((_, i) => i !== index);
    const updatedFiles = eventImageFiles.filter((_, i) => i !== index);

    // Update local state
    setEventImages(updatedImages);
    setEventImageFiles(updatedFiles);

    // Update Formik values
  };

  const openFileInput = () => {
    document.getElementById("eventImageInput")?.click();
  };

  const openBannerInput = () => {
    document.getElementById("eventbannerInput")?.click();
  };
  const handleDeleteTicket = (id) => {
    const updatedTickets = formik.values.ticket_details.filter(
      (ticket) => ticket.id !== id
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
      {editEventLoading && <Loader />}
      <div className="w-full">
        <div className="w-full pb-3">
          <span className="text-primaryText font-semibold">
            Event Information
          </span>
        </div>
        <form onSubmit={formik.handleSubmit}>
          {/* event information ------------------------------- */}
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

          {/* add event details--------------------- */}
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

          {/* event date ------------------------- */}
          <div className="w-full flex items-start gap-x-4 pb-5">
            <div className="flex-1">
              <label
                htmlFor="start_date"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Start Date
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
                  e.target.classList.remove("border-primary", "bg-primary");
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
                End Date
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
                  e.target.classList.remove("border-primary", "bg-primary");
                }}
              />

              {formik.touched.end_date && formik.errors.end_date && (
                <div className="text-red-500 text-sm mt-1">
                  {formik.errors.end_date}
                </div>
              )}
            </div>
          </div>

          {/* event address-------------------------- */}
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

          {/* event images----------------------- */}
          <div className="w-full pb-8">
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

          <div className="w-full pb-5">
            <span className="text-sm font-medium">Add Event Tickets</span>
            {formik.values?.ticket_details?.map((ticket, index) => (
              <div
                key={ticket.id}
                className="w-full my-4 p-4 rounded-xl border border-hr relative"
              >
                {/* Ticket Info */}
                <div className="w-full flex items-start gap-x-2 pb-5">
                  <div className="flex-1">
                    <InputFeild
                      labelValue="Ticket Name"
                      color="primary"
                      type="text"
                      name={`ticket_details[${index}].name`}
                      change={formik.handleChange}
                      value={ticket.name}
                      error={
                        formik.touched.ticket_details?.[index]?.name &&
                        formik.errors.ticket_details?.[index]?.name
                      }
                    />
                  </div>
                  <div className="flex-1">
                    <InputFeild
                      labelValue="Ticket Quantity"
                      color="primary"
                      type="text"
                      name={`ticket_details[${index}].quantity`}
                      change={formik.handleChange}
                      value={ticket.quantity}
                      error={
                        formik.touched.ticket_details?.[index]?.quantity &&
                        formik.errors.ticket_details?.[index]?.quantity
                      }
                    />
                  </div>
                  <div className="flex-1">
                    <InputFeild
                      labelValue="Ticket Price"
                      color="primary"
                      type="text"
                      name={`ticket_details[${index}].price`}
                      change={formik.handleChange}
                      value={ticket.price}
                      error={
                        formik.touched.ticket_details?.[index]?.price &&
                        formik.errors.ticket_details?.[index]?.price
                      }
                    />
                  </div>
                </div>

                {/* Ticket Time */}
                <div className="w-full flex items-start gap-x-2 pb-5">
                  <div className="flex-1">
                    <label
                      htmlFor={`ticket_details[${index}].ticket_availble_date`}
                      className="block text-gray-700"
                    >
                      Ticket Availble Date
                    </label>
                    <DatePicker
                      className="block w-full border disabled:cursor-not-allowed disabled:opacity-50 border-primary focus:border-primary focus:outline-none focus:ring-primary bg-transparent p-2.5 text-sm rounded-lg"
                      selected={
                        ticket.ticket_availble_date
                          ? new Date(ticket.ticket_availble_date)
                          : null
                      }
                      onChange={(date) =>
                        handleTicketDateChange(
                          index,
                          "ticket_availble_date",
                          date
                        )
                      }
                      // showTimeSelect
                      dateFormat="yyyy-MM-dd"
                    />
                    {formik.touched.ticket_details?.[index]
                      ?.ticket_availble_date &&
                      formik.errors.ticket_details?.[index]
                        ?.ticket_availble_date && (
                        <div className="text-red-500 text-sm mt-1">
                          {
                            formik.errors.ticket_details[index]
                              .ticket_availble_date
                          }
                        </div>
                      )}
                  </div>

                  <div className="flex-1">
                    <label
                      htmlFor={`ticket_details[${index}].sale_starts_on`}
                      className="block text-gray-700"
                    >
                      Start Date
                    </label>
                    <DatePicker
                      className="block w-full border disabled:cursor-not-allowed disabled:opacity-50 border-primary focus:border-primary focus:outline-none focus:ring-primary bg-transparent p-2.5 text-sm rounded-lg"
                      selected={
                        ticket.sale_starts_on
                          ? new Date(ticket.sale_starts_on)
                          : null
                      }
                      onChange={(date) =>
                        handleTicketDateChange(index, "sale_starts_on", date)
                      }
                      // showTimeSelect
                      dateFormat="yyyy-MM-dd"
                    />

                    {formik.touched.ticket_details?.[index]?.sale_starts_on &&
                      formik.errors.ticket_details?.[index]?.sale_starts_on && (
                        <div className="text-red-500 text-sm mt-1">
                          {formik.errors.ticket_details[index].sale_starts_on}
                        </div>
                      )}
                  </div>
                  <div className="flex-1">
                    <label
                      htmlFor={`ticket_details[${index}].sale_ends_on`}
                      className="block text-gray-700"
                    >
                      End Date
                    </label>
                    <DatePicker
                      className="block w-full border disabled:cursor-not-allowed disabled:opacity-50 border-primary focus:border-primary focus:outline-none focus:ring-primary bg-transparent p-2.5 text-sm rounded-lg"
                      selected={
                        ticket.sale_ends_on
                          ? new Date(ticket.sale_ends_on)
                          : null
                      }
                      onChange={(date) =>
                        handleTicketDateChange(index, "sale_ends_on", date)
                      }
                      // showTimeSelect
                      dateFormat="yyyy-MM-dd "
                    />
                    {formik.touched.ticket_details?.[index]?.sale_ends_on &&
                      formik.errors.ticket_details?.[index]?.sale_ends_on && (
                        <div className="text-red-500 text-sm mt-1">
                          {formik.errors.ticket_details[index].sale_ends_on}
                        </div>
                      )}
                  </div>
                </div>

                {/* Ticket Description */}
                <div className="w-full pb-5">
                  <span className="text-sm font-medium">
                    Ticket Description
                  </span>
                  <div className="w-full mt-1.5">
                    <Textarea
                      id="description"
                      rows={4}
                      name={`ticket_details[${index}].description`}
                      onChange={formik.handleChange}
                      value={ticket.description}
                      error={formik.errors.ticket_details?.[index]?.description}
                    />
                    {formik.touched.ticket_details?.[index]?.description &&
                      formik.errors.ticket_details?.[index]?.description && (
                        <div className="text-red-500 text-sm mt-1">
                          {formik.errors.ticket_details[index].description}
                        </div>
                      )}
                  </div>
                </div>

                {/* Delete Ticket Button */}
                {index !== 0 && (
                  <div
                    className="size-6 absolute -top-[10px] -right-[2px] rounded-full bg-primary flex items-center justify-center text-white cursor-pointer"
                    onClick={() => handleDeleteTicket(ticket?.id)}
                  >
                    <MdDelete />
                  </div>
                )}
              </div>
            ))}

            {/* add more ticket button------------ */}
            <div className="w-full flex">
              <CustomButton
                type="button"
                name="Add More tickets"
                size="sm"
                buttonClass="rounded-md bg-primary text-white border border-primary enabled:hover:bg-primary focus:ring-0 focus:outline-0"
                action={() => {
                  const nextId = formik.values.ticket_details.length + 1;
                  formik.setFieldValue("ticket_details", [
                    ...formik.values.ticket_details,
                    {
                      id: nextId,
                      name: "",
                      quantity: "",
                      price: "",
                      // sale_starts_on: "",
                      sale_starts_on: "",
                      sale_ends_on: "",
                      description: "",
                    },
                  ]);
                }}
              />
            </div>
          </div>

          <div className="w-full flex items-center gap-x-2 ">
            <CustomButton
              type="button"
              name="Back"
              action={() => {
                setShowEditModal(false);
              }}
              size="sm"
              buttonClass="rounded-md bg-transparent text-primaryText border border-primary  enabled:hover:bg-transparent focus:ring-0 focus:outline-0"
            />
            <CustomButton
              type="submit"
              name="Update Event"
              size="sm"
              buttonClass="rounded-md bg-primary text-white border border-primary  enabled:hover:bg-primary focus:ring-0 focus:outline-0"
            />
          </div>
        </form>
      </div>
    </>
  );
};

export default EditEvent;
