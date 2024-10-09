import { Checkbox, Textarea } from "flowbite-react";
import DatePicker from "react-datepicker";
import { MdDelete } from "react-icons/md";
import CustomButton from "../../components/atom/button/CustomButton";
import InputFeild from "../../components/atom/inputFeild/InputFeild";
import { useFormik } from "formik";
import { getToast } from "../../components/atom/toastify/Toastify";
import * as Yup from "yup";
import { ticketService } from "../../services/ticketService/TicketService";
import { format } from "date-fns";

export default function CreateEventTicket(props: any) {
  const { eventId, getDetails, setCreateEvent } = props || {};
  const {
    createTicketCategoriesApi,
    createTicketCategoryLoading,
    createTicketCategoryError,
  }: any = ticketService();

  // const validationSchema = Yup.object().shape({
  //     ticket_details: Yup.array().of(
  //         Yup.object().shape({
  //             name: Yup.string().required("Ticket Name is required"),
  //             quantity: Yup.number()
  //                 .required("Quantity is required")
  //                 .positive("Quantity must be positive")
  //                 .integer("Quantity must be an integer"),
  //             price: Yup.number()
  //                 .required("Price is required")
  //                 .positive("Price must be positive"),
  //             ticket_availble_date: Yup.date()
  //                 .nullable()
  //                 .required("Ticket availble date is required"),

  //             sale_starts_on: Yup.date()
  //                 .nullable()
  //                 .required("Start date &time is required"),
  //             sale_ends_on: Yup.date()
  //                 .nullable()
  //                 .required("End date & time is required"),

  //             description: Yup.string().required("Ticket Description is required"),
  //         })
  //     ),
  // });

  const formik = useFormik({
    initialValues: {
      ticket_details: [
        {
          event_id: eventId,
          name: "",
          description: "",
          quantity: "",
          min_quantity: "",
          max_quantity: "",
          price: "",
          attendees_pay_fee: false,
          sale_starts_on: "",
          sale_ends_on: "",
          event_start_at: "",
          event_end_at: "",
          show_price: false,
          show_quantity: false,
          is_visible: false,
          visible_from: "",
          visible_to: "",
          is_on_sale: false,
          is_paid: false,
          position: "",
        },
      ],
    },
    // validationSchema,
    onSubmit: async (values) => {
      const formatDatesAndTimes = (values) => {
        return values.ticket_details.map((ticket) => ({
          ...ticket,
          sale_starts_on: ticket.sale_starts_on
            ? format(new Date(ticket.sale_starts_on), "yyyy-MM-dd")
            : "",
          sale_ends_on: ticket.sale_ends_on
            ? format(new Date(ticket.sale_ends_on), "yyyy-MM-dd")
            : "",
          event_start_at: ticket.event_start_at
            ? format(new Date(ticket.event_start_at), "HH:mm a")
            : "",
          event_end_at: ticket.event_end_at
            ? format(new Date(ticket.event_end_at), "HH:mm a")
            : "",
          visible_from: ticket.visible_from
            ? format(new Date(ticket.visible_from), "yyyy-MM-dd")
            : "",
          visible_to: ticket.visible_to
            ? format(new Date(ticket.visible_to), "yyyy-MM-dd")
            : "",
        }));
      };

      const formattedValues = {
        ...values,
        ticket_details: formatDatesAndTimes(values),
      };

      try {
        await createTicketCategoriesApi(formattedValues).then((data: any) => {
          if (data?.success) {
            getToast("success", data?.message);
          } else {
            getToast("error", data?.message || "Error Occured");
          }
        });
        await setCreateEvent(false);
        await getDetails();
      } catch (error) {
        console.error("Error creating event:", error);
      }
    },
    validateOnChange: true,
    validateOnBlur: false,
    enableReinitialize: true,
  });

  const handleDeleteTicket = (index) => {
    const updatedTickets = formik.values.ticket_details.filter(
      (_, i) => i != index
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
  const handleCheckboxChange = (index: number, field: string) => {
    formik.setFieldValue(
      `ticket_details[${index}].${field}`,
      !formik.values.ticket_details[index][field]
    );
  };
  return (
    <>
      <form onSubmit={formik.handleSubmit}>
        <div className="w-full pb-5">
          <span className="text-sm font-medium">Add Event Tickets</span>
          {formik.values?.ticket_details?.map((ticket, index) => (
            <div
              key={index}
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

              <div className="w-full flex items-start gap-x-2 pb-5">
                <div className="flex-1">
                  <InputFeild
                    labelValue="Minimum Quantity"
                    color="primary"
                    type="text"
                    name={`ticket_details[${index}].min_quantity`}
                    change={formik.handleChange}
                    value={ticket.min_quantity}
                    error={
                      formik.touched.ticket_details?.[index]?.min_quantity &&
                      formik.errors.ticket_details?.[index]?.min_quantity
                    }
                  />
                </div>
                <div className="flex-1">
                  <InputFeild
                    labelValue="Maximum Quantity"
                    color="primary"
                    type="text"
                    name={`ticket_details[${index}].max_quantity`}
                    change={formik.handleChange}
                    value={ticket.max_quantity}
                    error={
                      formik.touched.ticket_details?.[index]?.max_quantity &&
                      formik.errors.ticket_details?.[index]?.max_quantity
                    }
                  />
                </div>
                <div className="flex-1">
                  <label
                    htmlFor={`ticket_details[${index}].event_start_at`}
                    className="block text-gray-700"
                  >
                    Event Starts at
                  </label>

                  <DatePicker
                    className="block w-full border disabled:cursor-not-allowed disabled:opacity-50 border-primary focus:border-primary focus:outline-none focus:ring-primary bg-transparent p-2.5 text-sm rounded-lg"
                    selected={
                      ticket.event_start_at
                        ? new Date(ticket.event_start_at)
                        : null
                    }
                    onChange={(date) =>
                      handleTicketDateChange(index, "event_start_at", date)
                    }
                    showTimeSelect
                    showTimeSelectOnly
                    timeIntervals={15}
                    timeCaption="Time"
                    dateFormat="h:mm aa"
                  />

                  {formik.touched.ticket_details?.[index]?.event_start_at &&
                    formik.errors.ticket_details?.[index]?.event_start_at && (
                      <div className="text-red-500 text-sm mt-1">
                        {formik.errors.ticket_details[index].event_start_at}
                      </div>
                    )}
                </div>
              </div>

              {/* Ticket Time */}

              <div className="w-full flex items-start gap-x-2 pb-5">
                <div className="flex-1">
                  <Checkbox
                    id={`ticket_details_${index}_is_on_sale`}
                    checked={ticket.is_on_sale}
                    onChange={() => handleCheckboxChange(index, "is_on_sale")}
                  />
                  <label
                    htmlFor={`ticket_details_${index}_is_on_sale`}
                    className="ml-2 text-gray-700"
                  >
                    On Sale
                  </label>
                </div>

                <div className="flex-1">
                  <Checkbox
                    id={`ticket_details_${index}_is_paid`}
                    checked={ticket.is_paid}
                    onChange={() => handleCheckboxChange(index, "is_paid")}
                  />
                  <label
                    htmlFor={`ticket_details_${index}_is_paid`}
                    className="ml-2 text-gray-700"
                  >
                    Paid
                  </label>
                </div>

                <div className="flex-1">
                  <InputFeild
                    labelValue="Ticket Position"
                    color="primary"
                    type="text"
                    name={`ticket_details[${index}].position`}
                    change={formik.handleChange}
                    value={ticket.position}
                    error={
                      formik.touched.ticket_details?.[index]?.position &&
                      formik.errors.ticket_details?.[index]?.position
                    }
                  />
                </div>
              </div>

              <div className="w-full flex items-start gap-x-2 pb-5">
                <div className="flex-1">
                  <Checkbox
                    id={`ticket_details_${index}_is_visible`}
                    checked={ticket.is_visible}
                    onChange={() => handleCheckboxChange(index, "is_visible")}
                  />
                  <label
                    htmlFor={`ticket_details_${index}_is_visible`}
                    className="ml-2 text-gray-700"
                  >
                    Is Visible
                  </label>
                </div>

                {ticket.is_visible && (
                  <div className="w-full flex items-start gap-x-2 pb-5">
                    <div className="flex-1">
                      <label
                        htmlFor={`ticket_details[${index}].visible_from`}
                        className="block text-gray-700"
                      >
                        Visible From
                      </label>
                      <DatePicker
                        className="block w-full border disabled:cursor-not-allowed disabled:opacity-50 border-primary focus:border-primary focus:outline-none focus:ring-primary bg-transparent p-2.5 text-sm rounded-lg"
                        selected={
                          ticket.visible_from
                            ? new Date(ticket.visible_from)
                            : null
                        }
                        onChange={(date) =>
                          handleTicketDateChange(index, "visible_from", date)
                        }
                        dateFormat="yyyy-MM-dd"
                      />
                      {formik.touched.ticket_details?.[index]?.visible_from &&
                        formik.errors.ticket_details?.[index]?.visible_from && (
                          <div className="text-red-500 text-sm mt-1">
                            {formik.errors.ticket_details[index].visible_from}
                          </div>
                        )}
                    </div>
                    <div className="flex-1">
                      <label
                        htmlFor={`ticket_details[${index}].visible_to`}
                        className="block text-gray-700"
                      >
                        Visible To
                      </label>
                      <DatePicker
                        className="block w-full border disabled:cursor-not-allowed disabled:opacity-50 border-primary focus:border-primary focus:outline-none focus:ring-primary bg-transparent p-2.5 text-sm rounded-lg"
                        selected={
                          ticket.visible_to ? new Date(ticket.visible_to) : null
                        }
                        onChange={(date) =>
                          handleTicketDateChange(index, "visible_to", date)
                        }
                        dateFormat="yyyy-MM-dd"
                      />
                      {formik.touched.ticket_details?.[index]?.visible_to &&
                        formik.errors.ticket_details?.[index]?.visible_to && (
                          <div className="text-red-500 text-sm mt-1">
                            {formik.errors.ticket_details[index].visible_to}
                          </div>
                        )}
                    </div>
                  </div>
                )}
              </div>

              <div className="w-full flex items-start gap-x-2 pb-5">
                <div className="flex-1">
                  <label
                    htmlFor={`ticket_details[${index}].event_end_at`}
                    className="block text-gray-700"
                  >
                    Event End At
                  </label>

                  <DatePicker
                    className="block w-full border disabled:cursor-not-allowed disabled:opacity-50 border-primary focus:border-primary focus:outline-none focus:ring-primary bg-transparent p-2.5 text-sm rounded-lg"
                    selected={
                      ticket.event_end_at ? new Date(ticket.event_end_at) : null
                    }
                    onChange={(date) =>
                      handleTicketDateChange(index, "event_end_at", date)
                    }
                    showTimeSelect
                    showTimeSelectOnly
                    timeIntervals={15}
                    timeCaption="Time"
                    dateFormat="h:mm aa"
                  />
                  {formik.touched.ticket_details?.[index]?.event_end_at &&
                    formik.errors.ticket_details?.[index]?.event_end_at && (
                      <div className="text-red-500 text-sm mt-1">
                        {formik.errors.ticket_details[index].event_end_at}
                      </div>
                    )}
                </div>
                <div className="flex-1">
                  <label
                    htmlFor={`ticket_details[${index}].sale_starts_on`}
                    className="block text-gray-700"
                  >
                    Sales Start Date
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
                    Sales End Date
                  </label>
                  <DatePicker
                    className="block w-full border disabled:cursor-not-allowed disabled:opacity-50 border-primary focus:border-primary focus:outline-none focus:ring-primary bg-transparent p-2.5 text-sm rounded-lg"
                    selected={
                      ticket.sale_ends_on ? new Date(ticket.sale_ends_on) : null
                    }
                    onChange={(date) =>
                      handleTicketDateChange(index, "sale_ends_on", date)
                    }
                    dateFormat="yyyy-MM-dd"
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
                <span className="text-sm font-medium">Ticket Description</span>
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
              <div className="w-full flex items-start gap-x-2 pb-5">
                <div className="flex-1">
                  <Checkbox
                    id={`ticket_details_${index}_attendees_pay_fee`}
                    checked={ticket.attendees_pay_fee}
                    onChange={() =>
                      handleCheckboxChange(index, "attendees_pay_fee")
                    }
                  />
                  <label
                    htmlFor={`ticket_details_${index}_attendees_pay_fee`}
                    className="ml-2 text-gray-700"
                  >
                    Attendees Pay Fee
                  </label>
                </div>

                <div className="flex-1">
                  <Checkbox
                    id={`ticket_details_${index}_show_price`}
                    checked={ticket.show_price}
                    onChange={() => handleCheckboxChange(index, "show_price")}
                  />
                  <label
                    htmlFor={`ticket_details_${index}_show_price`}
                    className="ml-2 text-gray-700"
                  >
                    Show Price
                  </label>
                </div>

                <div className="flex-1">
                  <Checkbox
                    id={`ticket_details_${index}_show_quantity`}
                    checked={ticket.show_quantity}
                    onChange={() =>
                      handleCheckboxChange(index, "show_quantity")
                    }
                  />
                  <label
                    htmlFor={`ticket_details_${index}_show_quantity`}
                    className="ml-2 text-gray-700"
                  >
                    Show Quantity
                  </label>
                </div>
              </div>
              {/* Delete Ticket Button */}
              {index !== 0 && (
                <div
                  className="size-6 absolute -top-[10px] -right-[2px] rounded-full bg-primary flex items-center justify-center text-white cursor-pointer"
                  onClick={() => handleDeleteTicket(index)}
                >
                  <MdDelete />
                </div>
              )}
            </div>
          ))}

          {/* Add more ticket button */}
          <div className="w-full flex items-center justify-center gap-5">
            <CustomButton
              type="button"
              name="Add More tickets"
              size="sm"
              buttonClass="rounded-md bg-primary text-white border border-primary enabled:hover:bg-primary focus:ring-0 focus:outline-0"
              action={() => {
                formik.setFieldValue("ticket_details", [
                  ...formik.values.ticket_details,
                  {
                    event_id: "",
                    name: "",
                    description: "",
                    quantity: "",
                    min_quantity: "",
                    max_quantity: "",
                    price: "",
                    attendees_pay_fee: false,
                    sale_starts_on: "",
                    sale_ends_on: "",
                    event_start_at: "",
                    event_end_at: "",
                    show_price: false,
                    show_quantity: false,
                    is_visible: false,
                    visible_from: "",
                    visible_to: "",
                    is_on_sale: false,
                    is_paid: false,
                    position: "",
                  },
                ]);
              }}
            />

            <CustomButton
              type="submit"
              name="Create Tickets"
              size="sm"
              buttonClass="rounded-md bg-primary text-white border border-primary  enabled:hover:bg-primary focus:ring-0 focus:outline-0"
            />
          </div>
        </div>
      </form>
    </>
  );
}
