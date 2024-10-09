import { useEffect, useState } from "react";
import CustomTab from "../../atom/customTab/CustomTab";
import { calenderIcon, timeIcon } from "../../../assets/Icons";
import DatePicker from "react-datepicker";
import FormCheckbox from "../../atom/checkbox/Checkbox";
import { SingleSelect } from "../../atom/singleSelect/SingleSelect";
import InputFeild from "../../atom/inputFeild/InputFeild";
import { Breadcrumb, Textarea } from "flowbite-react";
import CustomButton from "../../atom/button/CustomButton";
import { StepForm, TicketToggle } from "../../store/Toggle";
import * as Yup from "yup";
import { useFormik } from "formik";
import { eventManagementService } from "../../../services/eventManagementService/EventManagementService";
import { getToast } from "../../atom/toastify/Toastify";
import { format } from "date-fns";
import TicketCard from "../ticketCard/TicketCard";
import Loader from "../../atom/loader/Loader";
import { useLocation, useNavigate } from "react-router-dom";

const validationSchema = Yup.object().shape({
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
      ticket_availble_date: Yup.date()
        .nullable()
        .required("Ticket availble date is required"),
      sale_starts_on: Yup.date().nullable().required("Start date is required"),
      sale_ends_on: Yup.date().nullable().required("End date is required"),
      description: Yup.string().required("Ticket Description is required"),
    })
  ),
});

export default function Ticket() {
  const [activeTab, setActiveTab] = useState("Tab1");
  const [startDate, setStartDate] = useState<any>();
  const [endDate, setEndDate] = useState<any>();
  const [startTime, setStartTime] = useState<any>();
  const [endTime, setEndTime] = useState<any>();
  const [ticketAvailble, setTicketAvailble] = useState<any>();
  const { setStepper }: any = StepForm();
  const { createEventTicketApi, createEventTicketLoading }: any =
    eventManagementService();
  const { showTicket, setShowTicket } = TicketToggle();

  const location = useLocation();
  const path = location?.pathname;
  const stateEventId = location?.state?.eventId;
  const checkIsTicketRoute = path === '/events/add-ticket';

  console.log(stateEventId, "stateEventId")

  const countries = [
    { name: "Yes", value: true },
    { name: "No", value: false },
  ];

  const tabData = [
    { id: "Tab1", label: "Paid" },
    { id: "Tab2", label: "Free" },
  ];

  const checkPaid = activeTab == "Tab1" ? true : false;
  const eventIdFromStorage = localStorage.getItem("eventId");
  const eventId = checkIsTicketRoute && stateEventId ? stateEventId : eventIdFromStorage;
  const navigate = useNavigate()

  useEffect(() => {
    // If the user manually navigates to '/events/add-tickets' but no event ID is found in state or storage, navigate to tickets
    if (checkIsTicketRoute && !eventId) {
      navigate('events/view-event-customization');
    }
    else {
      setShowTicket(false)
    }
  }, [checkIsTicketRoute, eventId, navigate, setShowTicket]);


  const formik = useFormik({
    initialValues: {
      event_id: eventId,
      name: "",
      quantity: "",
      price: "",
      attendees_pay_fee: false,
      is_visible: false,
      sale_starts_on: "",
      sale_ends_on: "",
      event_starts_at: "",
      event_ends_at: "",
      visible_from: "",
      description: "",
      ticket_availble_date: "",
      max_quantity: "",
      min_quantity: "",
      show_price: false,
      show_quantity: false,
      is_paid: checkPaid,
    },
    validationSchema,
    onSubmit: async (values: any, { resetForm }) => {
      const filteredValues = Object.fromEntries(
        Object.entries(values).filter(
          ([_, value]) => value !== undefined && value !== null && value !== ""
        )
      );
      try {

        if (stateEventId && checkIsTicketRoute) {
          console.log("true",stateEventId);
          const response = await createEventTicketApi(filteredValues);
          if (response?.success) {
            getToast("success", response?.message);
            navigate('/events/view-event-customization', {
              state: {
                eventId: stateEventId
              }
            });
            resetForm();
            resetAllFields();
          }
          else {
            getToast("error", response?.message || "Error Occurred");
          }
        }
        else {
          const response = await createEventTicketApi(filteredValues);
          if (response?.success) {
            getToast("success", response?.message);
            setShowTicket(true);
            resetForm();
            resetAllFields();
          }
          else {
            getToast("error", response?.message || "Error Occurred");
          }
        }
      } catch (error) {
        console.error("Error creating event:", error);
      }
    },
    validateOnChange: true,
    validateOnBlur: false,
    enableReinitialize: true,
  });

  console.log(formik,"formik123")
  const resetAllFields = () => {
    setStartDate(null);
    setEndDate(null);
    setStartTime(null);
    setEndTime(null);
    setTicketAvailble(null);
  };

  const handleTabClick = (tab: React.SetStateAction<string>) => {
    setActiveTab(tab);
  };

  const handleStartDateChange = (date: any) => {
    setStartDate(date);
    const formattedDate = format(date, "yyyy-MM-dd");
    formik.setFieldValue("sale_starts_on", formattedDate);
    setStartDate(date);
  };

  const handleStartTimeChange = (time: any) => {
    const formattedTime = format(time, "hh:mm a");
    formik.setFieldValue("event_starts_at", formattedTime);
    setStartTime(time);
  };

  const handleEndDateChange = (date: any) => {
    const formattedDate = format(date, "yyyy-MM-dd");
    formik.setFieldValue("sale_ends_on", formattedDate);
    setEndDate(date);
  };

  const handleEndTimeChange = (time: any) => {
    const formattedTime = format(time, "hh:mm a");
    formik.setFieldValue("event_ends_at", formattedTime);
    setEndTime(time);
  };

  const handleTicketDate = (date: any) => {
    const formattedDate = format(date, "yyyy-MM-dd");
    formik.setFieldValue("visible_from", formattedDate);
    setTicketAvailble(date);
  };

  const handleSelect = (value: any) => {
    const visible = value == "Yes" ? true : false;
    formik.setFieldValue("is_visible", visible);
  };

  return (
    <>
      {createEventTicketLoading && <Loader />}
      {!showTicket ? (
        <div className={`w-full ${checkIsTicketRoute ? 'p-4' : 'p-0'} `}>

          {checkIsTicketRoute
            &&
            <div className="w-full">
              <div className="w-full pb-3">
                <Breadcrumb
                  aria-label="Default breadcrumb"
                  className="cursor-pointer"
                >
                  <Breadcrumb.Item
                    onClick={() => {
                      navigate("/events");
                    }}
                  >
                    Dashboard
                  </Breadcrumb.Item>
                  <Breadcrumb.Item>
                    Event
                  </Breadcrumb.Item>
                  <Breadcrumb.Item>
                    View event customizations
                  </Breadcrumb.Item>
                  <Breadcrumb.Item >
                    <span className="text-secondary"> Add Ticket</span>
                  </Breadcrumb.Item>
                </Breadcrumb>
              </div>
            </div>
          }
          <div className="w-full bg-white rounded-12 p-6">
            <form onSubmit={formik.handleSubmit}>
              <div className="bg-secondaryGray flex gap-3 px-6 pt-5 rounded-xl">
                <CustomTab
                  tabs={tabData}
                  activeTab={activeTab}
                  onTabClick={handleTabClick}
                  tabContainer="border-none gap-3 !m-0"
                  tabBg="!bg-secondaryGray"
                />
              </div>
              <div className="p-6 border border-grayBorder rounded-xl my-4">
                <div className="pb-3">
                  <p>Event Ticket</p>
                </div>
                <div className="flex justify-between w-full gap-4">
                  <div className="w-full">
                    <InputFeild
                      placeHolder="Name"
                      name="name"
                      change={formik.handleChange}
                      value={formik.values.name}
                      error={formik.errors.name}
                      color="primary"
                      inputClass="!p-0 "
                      type="text"
                    />
                  </div>
                  <div className="flex gap-4">
                    <InputFeild
                      placeHolder="Available Quantity"
                      name="quantity"
                      change={formik.handleChange}
                      value={formik.values.quantity}
                      error={formik.errors.quantity}
                      color="primary"
                      inputClass="!p-0 "
                      type="text"
                    />
                    {activeTab == "Tab1" && (
                      <InputFeild
                        placeHolder="Price"
                        name="price"
                        change={formik.handleChange}
                        value={formik.values.price}
                        error={formik.errors.price}
                        color="primary"
                        inputClass="!p-0 "
                        type="text"
                      />
                    )}
                  </div>
                </div>
                <div className="py-3">
                  <FormCheckbox
                    id="Fee"
                    label="Attendees Pay Fee"
                    name="attendees_pay_fee"
                    checked={formik.values.attendees_pay_fee}
                    onChange={formik.handleChange}
                  />
                </div>
                <div className="flex flex-row text-gray gap-4 text-xs font-normal">
                  <span>Event Attendee Total: GHS 12.75</span>|
                  <span>Event Admin Fees: GHS 0.00</span>
                </div>
              </div>
              <div className="p-6 border border-grayBorder rounded-xl my-4">
                <div className="pb-3">
                  <p>Event Schedule</p>
                </div>
                <div>
                  <div className="flex flex-wrap gap-4">
                    <div className="flex justify-between w-full gap-4">
                      <div className="relative w-full [&>div]:w-full">
                        <DatePicker
                          selected={ticketAvailble}
                          onChange={handleTicketDate}
                          minDate={new Date()}
                          placeholderText="When are tickets Visible?"
                          className="w-full border-gray-300 rounded-md shadow-sm px-4 p-2 border-none bg-[#F8F8F8] text-sm min-h-[52px]"
                          dateFormat="MM/dd/yyyy"
                        />
                        <span className="absolute top-[18px] right-[21px]">
                          {calenderIcon}
                        </span>
                      </div>

                      <div className="relative w-full [&>div]:w-full">
                        <DatePicker
                          selected={startDate}
                          onChange={handleStartDateChange}
                          minDate={new Date()}
                          placeholderText="Sale Start"
                          className="w-full border-gray-300 rounded-md shadow-sm px-4 p-2 border-none bg-[#F8F8F8] text-sm min-h-[52px]"
                          dateFormat="MM/dd/yyyy"
                        />
                        <span className="absolute top-[18px] right-[21px]">
                          {calenderIcon}
                        </span>
                      </div>

                      <div className="relative w-full [&>div]:w-full">
                        <DatePicker
                          selected={endDate}
                          onChange={handleEndDateChange}
                          minDate={new Date()}
                          placeholderText="Sales End (Optional)"
                          className="w-full border-gray-300 rounded-md shadow-sm px-4 p-2 border-none bg-[#F8F8F8] text-sm min-h-[52px]"
                          dateFormat="MM/dd/yyyy"
                        />
                        <span className="absolute top-[18px] right-[21px]">
                          {calenderIcon}
                        </span>
                      </div>
                    </div>

                    <div className="flex justify-between w-full gap-4">
                      <div className="relative w-full [&>div]:w-full">
                        <DatePicker
                          selected={startTime}
                          onChange={handleStartTimeChange}
                          showTimeSelect
                          placeholderText="Event Start Time"
                          className="w-full border-gray-300 rounded-md shadow-sm px-4 p-2 border-none bg-[#F8F8F8] text-sm min-h-[52px]"
                          showTimeSelectOnly
                          timeIntervals={15}
                          timeCaption="Time"
                          dateFormat="h:mm aa"
                        />
                        <span className="absolute top-[18px] right-[21px]">
                          {timeIcon}
                        </span>
                      </div>

                      <div className="relative w-full [&>div]:w-full">
                        <DatePicker
                          selected={endTime}
                          onChange={handleEndTimeChange}
                          showTimeSelect
                          placeholderText="Event End Time (Optional)"
                          className="w-full border-gray-300 rounded-md shadow-sm px-4 p-2 border-none bg-[#F8F8F8] text-sm min-h-[52px]"
                          showTimeSelectOnly
                          timeIntervals={15}
                          timeCaption="Time"
                          dateFormat="h:mm aa"
                        />
                        <span className="absolute top-[18px] right-[21px]">
                          {timeIcon}
                        </span>
                      </div>

                      <div className="w-full">
                        <SingleSelect
                          options={countries}
                          placeholder="Visible"
                          onChange={handleSelect}
                        />
                      </div>
                    </div>

                    <div className="w-full">
                      <p className="pb-3">Tickets Per Order</p>
                      <div className="w-full flex gap-4">
                        <div className="w-full">
                          <InputFeild
                            name="min_quantity"
                            placeHolder="Minimum Quantity"
                            value={formik.values.min_quantity}
                            change={(data)=>{
                              const value = data.target.value;
                              // console.log(data.target.value,"datadata")
                              if (!isNaN(value) && value.trim() !== "") {
                                formik.setFieldValue("min_quantity", value);
                            } else {
                                // Optionally handle invalid input (e.g., reset the value, show an error, etc.)
                                formik.setFieldValue("min_quantity", ""); // Resetting to empty or handle as needed
                            }
                            }}
                            color="primary"
                            inputClass="!p-0 w-full"
                            type="text"
                          />
                        </div>
                        <div className="w-full">
                          <InputFeild
                            name="max_quantity"
                            placeHolder="Maximum Quantity"
                            value={formik.values.max_quantity}
                            change={(data)=>{
                              const value = data.target.value;
                              // console.log(data.target.value,"datadata")
                              if (!isNaN(value) && value.trim() !== "") {
                                formik.setFieldValue("max_quantity", value);
                            } else {
                                // Optionally handle invalid input (e.g., reset the value, show an error, etc.)
                                formik.setFieldValue("max_quantity", ""); // Resetting to empty or handle as needed
                            }
                            }}
                            color="primary"
                            inputClass="!p-0 w-full"
                            type="text"
                          />
                        </div>
                        <div className="w-full"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <Textarea
                  id="description"
                  rows={4}
                  name="description"
                  value={formik.values.description}
                  onChange={formik.handleChange}
                  placeholder="Description"
                  className="p-6 border border-grayBorder rounded-xl resize-none textAreaShadow"
                />
              </div>

              <div className="flex gap-4 py-4">
                {activeTab !== "Tab2" && (
                  <div>
                    <FormCheckbox
                      id="price"
                      label={"Show ticket price on event page"}
                      checkboxClass="text-gray text-base font-regular"
                      name="show_price"
                      checked={formik.values.show_price}
                      onChange={formik.handleChange}
                    />
                  </div>
                )}
                <div>
                  <FormCheckbox
                    id="number"
                    label={"Show number of tickets available at checkout"}
                    checkboxClass="text-gray text-base font-regular"
                    name="show_quantity"
                    checked={formik.values.show_quantity}
                    onChange={formik.handleChange}
                  />
                </div>
              </div>

              <div className="flex gap-4 py-4 justify-end">
                <CustomButton
                  type="button"
                  name="Back"
                  action={() => setStepper("0")}
                  color={" "}
                  buttonClass="border font-semibold text-gray text-sm rounded-xl px-7 py-4"
                />
                <CustomButton
                  type="submit"
                  name="Add Tickets"
                  color={" "}
                  buttonClass="bg-gradient-primary font-semibold text-white text-sm px-7 rounded-xl py-4"
                />
              </div>
            </form>
          </div>
        </div>
      ) : (
        <TicketCard />
      )}
    </>
  );
}
