import { Breadcrumb, Checkbox, Textarea } from "flowbite-react";
import { useLocation, useNavigate } from "react-router-dom";
import InputFeild from "../../components/atom/inputFeild/InputFeild";
import { iconInfo, timeIcon } from "../../assets/Icons";
import CustomButton from "../../components/atom/button/CustomButton";
import { eventManagementService } from "../../services/eventManagementService/EventManagementService";
import { useEffect } from "react";
import { Formik, Field, Form } from "formik";
import FormCheckbox from "../../components/atom/checkbox/Checkbox";
import { SingleSelect } from "../../components/atom/singleSelect/SingleSelect";
import DatePicker from "react-datepicker";

export default function Ticketdetails() {

  const navigate = useNavigate();
  const location = useLocation();
  const ticketId = location?.state?.id;

  console.log(ticketId, "ticketId");
  const { getSingleEventTicketApi, getSingleEventTickLoading, getSingleEventTicketData, updateSingleEventTicketApi }: any = eventManagementService();
  console.log(getSingleEventTicketData?.ticket, "dataaaaa")


  const getTicketDetail = async (ticketId: string) => {
    if (ticketId) {
      const data = {
        id: ticketId
      }
      await getSingleEventTicketApi(data);
    }
  }

  useEffect(() => {
    if (ticketId) {
      getTicketDetail(ticketId);
    }
    else[
      navigate('/events')
    ]

  }, [navigate, ticketId]);

  //   // Set initial values based on API response
  const initialValues = {
    name: getSingleEventTicketData?.ticket?.name || "",
    quantity: getSingleEventTicketData?.ticket?.quantity || "",
    min_quantity: getSingleEventTicketData?.ticket?.min_quantity || "",
    max_quantity: getSingleEventTicketData?.ticket?.max_quantity || "",
    price: getSingleEventTicketData?.ticket?.price || "",
    sale_starts_on: getSingleEventTicketData?.ticket?.sale_starts_on || "",
    sale_ends_on: getSingleEventTicketData?.ticket?.sale_ends_on || "",
    event_starts_at: getSingleEventTicketData?.ticket?.event_starts_at || "",
    event_ends_at: getSingleEventTicketData?.ticket?.event_ends_at || "",
    visible_from: getSingleEventTicketData?.ticket?.visible_from || "",
    show_price: getSingleEventTicketData?.ticket?.show_price || false,
    show_quantity: getSingleEventTicketData?.ticket?.show_quantity || false,
    attendees_pay_fee: getSingleEventTicketData?.ticket?.attendees_pay_fee || false,
    is_visible: getSingleEventTicketData?.ticket?.is_visible || false,
    is_paid: getSingleEventTicketData?.ticket?.is_paid || false,
    description: getSingleEventTicketData?.ticket?.description || ""
  };

  const handleSubmit = async (values: any) => {
    const ticketId = location?.state?.id; // Assuming ticketId is passed through location
    console.log("Form Values", values);

    try {
      // Call the API to update the ticket
      const response = await updateSingleEventTicketApi(ticketId, values);

      if (response) {
        console.log("Ticket Updated Successfully", response);
      } else {
        console.error("Failed to update the ticket");
      }
    } catch (err) {
      console.error("Error during update:", err);
    }
  };
  const countries = [
    { name: "Yes", value: true },
    { name: "No", value: false },
  ];


  return (
    <>
      <div className="w-full min-h-screen p-4">

        {/* breadcrumb start----------------- */}
        <div className="w-full pb-3">
          <Breadcrumb
            aria-label="Default breadcrumb"
            className="cursor-pointer"
          >
            <Breadcrumb.Item
              onClick={() => {
                navigate("/");
              }}
            >
              Dashboard
            </Breadcrumb.Item>
            <Breadcrumb.Item>
              Event
            </Breadcrumb.Item>
            <Breadcrumb.Item onClick={() => { navigate('/events/view-event-customization') }}>
              View Event Customizations
            </Breadcrumb.Item>
            <Breadcrumb.Item >
              <span className="text-secondary">Ticket Deatils</span>
            </Breadcrumb.Item>
          </Breadcrumb>
        </div>
        <Formik initialValues={initialValues} onSubmit={handleSubmit} enableReinitialize>
          {({ values, handleChange, handleBlur }) => (
            <Form>
              <div className="w-full p-6 rounded-12 bg-white flex flex-col gap-y-4">
                <div className="w-full rounded-12 border border-[#EBEBEB] py-6">
                  <div className="w-full">
                    <p className="text-base font-medium pb-3 px-6">Edit Event Details</p>
                    <div className="w-full flex iems-center justify-center flex-wrap px-4 pb-3">
                      <div className="w-full md:w-6/12 px-2">
                        <InputFeild
                          inputClass="focus:bg-transparent"
                          name="name"
                          type="text"
                          blur={handleBlur}
                          placeHolder="Name"
                          value={values.name}
                          change={handleChange}
                          color="primary"
                        />

                      </div>

                      <div className="w-full md:w-3/12 px-2">
                        <InputFeild
                          inputClass="focus:bg-transparent"
                          name="quantity"
                          type="text"
                          blur={handleBlur}
                          placeHolder="Ticket Quantity"
                          value={values.quantity}
                          change={handleChange}
                          color="primary"
                        />
                      </div>
                      <div className="w-full md:w-3/12 px-2">
                        <InputFeild
                          inputClass="focus:bg-transparent"
                          name="price"
                          type="text"
                          blur={handleBlur}
                          placeHolder="Price"
                          value={values.price}
                          change={handleChange}
                          color="primary"
                        />
                      </div>
                    </div>
                    <div className="w-full flex items-center gap-x-3 px-6 pb-3">
                      <Checkbox id="attendees_pay_fee" checked={values.attendees_pay_fee} onChange={handleChange} />
                      <span className="text-[#637381] text-base">Attendees Pay Fee</span>
                      <span>{iconInfo}</span>
                    </div>

                    <div className="w-full flex items-center px-6">
                      <p className="text-xs text-[#637381]">Event Attendee Total: GHS 12.75 | Event Admin Fees: GHS 0.00</p>
                    </div>
                  </div>
                </div>

                <div className="w-full rounded-12 border border-[#EBEBEB] py-6">
                  <div className="w-full">
                    <p className="text-base font-medium pb-3 px-6">Event Schedule</p>
                    <div className="w-full flex iems-center justify-center gap-y-4 flex-wrap px-4 pb-3">
                      <div className="w-full md:w-4/12 px-2">

                        <InputFeild
                          inputClass="focus:bg-transparent"
                          name="visible_from"
                          type="text"
                          blur={handleBlur}
                          placeHolder="When are tickets available?"
                          value={values.visible_from}
                          change={handleChange}
                          color="primary"
                        />
                      </div>

                      <div className="w-full md:w-4/12 px-2">

                        <InputFeild
                          inputClass="focus:bg-transparent"
                          name="sale_starts_on"
                          type="text"
                          blur={handleBlur}
                          placeHolder="Sales Start"
                          value={values.sale_starts_on}
                          change={handleChange}
                          color="primary"
                        />
                      </div>
                      <div className="w-full md:w-4/12 px-2">

                        <InputFeild
                          inputClass="focus:bg-transparent"
                          name="sale_ends_on"
                          type="text"
                          blur={handleBlur}
                          placeHolder="Sales End (Optional)"
                          value={values.sale_ends_on}
                          change={handleChange}
                          color="primary"
                        />

                      </div>

                      <div className="w-full md:w-4/12 px-2">

                        <InputFeild
                          inputClass="focus:bg-transparent"
                          name="event_starts_at"
                          type="text"
                          blur={handleBlur}
                          placeHolder="Event Start Time"
                          value={values.event_starts_at}
                          change={handleChange}
                          color="primary"
                        />
                      </div>

                      <div className="w-full md:w-4/12 px-2">

                        <InputFeild
                          inputClass="focus:bg-transparent"
                          name="event_ends_at"
                          type="text"
                          blur={handleBlur}
                          placeHolder="Event End Time (Optional)"
                          value={values.event_ends_at}
                          change={handleChange}
                          color="primary"
                        />
                         {/* <DatePicker
                          selected={values.event_ends_at}
                          onChange={handleChange}
                          showTimeSelect
                          placeholderText="Event End Time (Optional)"
                          className="w-[354px] border-gray-300 rounded-md shadow-sm px-4 p-2 border-none bg-[#F8F8F8] text-sm min-h-[52px]"
                          showTimeSelectOnly
                          timeIntervals={15}
                          timeCaption="Time"
                          dateFormat="hh:mm a"
                        /> */}
                          <span className="absolute top-[502px] right-[436px]">
                          {timeIcon}
                        </span>
                      </div>
                      <div className="w-full md:w-4/12 px-2">
                        <SingleSelect
                          options={countries}
                          placeholder="Visible"
                          value={values.is_visible} 
                          onChange={(option: any) => {
                            handleChange({
                              target: {
                                name: 'is_visible',
                                value: option.label,
                              },
                            });
                          }}
                        />
                      </div>

                    </div>
                  </div>
                  <div className="w-full">
                    <p className="text-base font-medium pb-3 px-6">Tickets Per Order</p>
                    <div className="w-full flex iems-center justify-start gap-y-4 flex-wrap px-4 pb-3">
                      <div className="w-full md:w-4/12 px-2">

                        <InputFeild
                          inputClass="focus:bg-transparent"
                          name="min_quantity"
                          type="text"
                          blur={handleBlur}
                          placeHolder="Minimum Quantity"
                          value={values.min_quantity}
                          change={handleChange}
                          color="primary"
                        />
                      </div>

                      <div className="w-full md:w-4/12 px-2">

                        <InputFeild
                          inputClass="focus:bg-transparent"
                          name="max_quantity"
                          type="text"
                          blur={handleBlur}
                          placeHolder="Maximum Quantity"
                          value={values.max_quantity}
                          change={handleChange}
                          color="primary"
                        />

                      </div>
                    </div>
                  </div>

                </div>


                <div className="w-full rounded-12 border border-[#EBEBEB] py-6">
                  <Textarea
                    className="resize-none border-transparent focus:ring-0 focus:border-0"
                    id="Description"
                    placeholder="Description"
                    required
                    rows={4}
                    name="description"
                    value={values.description}
                    onChange={handleChange}
                  />
                </div>

                <div className="w-full flex items-center gap-x-8">
                  <div className="w-auto flex items-center gap-x-2">

                    <FormCheckbox
                      id="show_price"
                      label={"Show ticket price on event page"}
                      checkboxClass="text-gray text-base font-regular"
                      name="show_price"
                      checked={values.show_price}
                      onChange={handleChange}
                    />

                  </div>
                  <div className="w-auto flex items-center gap-x-2">

                    <FormCheckbox
                      id="number"
                      label={"Show number of tickets available at checkout"}
                      checkboxClass="text-gray text-base font-regular"
                      name="show_quantity"
                      checked={values.show_quantity}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div className="w-full flex items-center justify-end gap-x-4">
                  <CustomButton type="button" name="Cancel" buttonClass="border rounded-12 border-[#637381] bg-transparent enabled:hover:bg-transparent focus:ring-0 text-[#637381] font-semibold px-6 py-3" size="sm" />
                  <CustomButton type="submit" name="Save" buttonClass="border rounded-12 border-0 bg-gradient-signin enabled:hover:bg-gradient-signin focus:ring-0 text-white px-6 py-3 font-semibold" size="sm" />
                </div>

              </div>
            </Form>
          )}
        </Formik>

      </div>
    </>
  );
}
