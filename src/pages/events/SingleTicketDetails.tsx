import { Textarea } from "flowbite-react";
import InputFeild from "../../components/atom/inputFeild/InputFeild";
import CustomButton from "../../components/atom/button/CustomButton";

function SingleTicketDetails() {
  const data = {
    name: "GOLD",
    price: 123,
    quantity: 12,
    sale_starts_on: "2024-08-23",
    sale_ends_on: "2024-08-24",
    event_starts_at: "10:51 AM",
    event_ends_at: "11:51 AM",
    description: "This is gold ticket",
    min_quantity: 12,
    max_quantity: 21,
  };

  return (
    <div className="w-full py-8">
      <div className="w-full">
        <p className="text-sm text-primaryText pb-5">Edit Ticket</p>
      </div>
      <div className="w-full p-4 bg-white rounded-xl">
        {/* ticket info------------------------------ */}
        <div className="w-full flex flex-wrap pb-5">
          <div className="w-full lg:w-1/3 px-1">
            <div className="w-full">
              <p className="text-sm text-primaryText p-1">Name</p>
              <p className="border border-hr p-2 rounded-xl">
                Genral Addmission
              </p>
            </div>
          </div>
          <div className="w-full lg:w-1/3 px-1">
            <div className="w-full">
              <p className="text-sm text-primaryText p-1">Available Quantity</p>
              <p className="border border-hr p-2 rounded-xl">20</p>
            </div>
          </div>
          <div className="w-full lg:w-1/3 px-1">
            <div className="w-full">
              <p className="text-sm text-primaryText p-1">Ticket Price</p>
              <p className="border border-hr p-2 rounded-xl">100 GH</p>
            </div>
          </div>
        </div>

        {/* ticket date and time--------------------------- */}
        <div className="w-full flex flex-wrap pb-5">
          <div className="w-full lg:w-1/3 px-1">
            <div className="w-full">
              <p className="text-sm text-primaryText p-1">
                When are tickets available?
              </p>
              <InputFeild type="date" />
            </div>
          </div>
          <div className="w-full lg:w-1/3 px-1">
            <div className="w-full">
              <p className="text-sm text-primaryText p-1">Sales Start</p>
              <InputFeild type="date" />
            </div>
          </div>
          <div className="w-full lg:w-1/3 px-1">
            <div className="w-full">
              <p className="text-sm text-primaryText p-1">
                Sales End (Optional)
              </p>
              <InputFeild type="date" />
            </div>
          </div>
        </div>

        {/* minimum no of tickets---------------- */}
        <div className="w-full flex flex-wrap pb-5">
          <div className="w-full lg:w-1/3 px-1">
            <div className="w-full">
              <p className="text-sm text-primaryText p-1">
                Minimum Ticket Quantity
              </p>
              <InputFeild type="text" />
            </div>
          </div>
          <div className="w-full lg:w-1/3 px-1">
            <div className="w-full">
              <p className="text-sm text-primaryText p-1">
                Sales End (Optional)
              </p>
              <InputFeild type="date" />
            </div>
          </div>

          <div className="w-full lg:w-1/3 px-1">
            <div className="w-full">
              <p className="text-sm text-primaryText p-1">Visibilty</p>
              <InputFeild type="text" />
            </div>
          </div>
        </div>

        {/* ticket description------------------------ */}

        <div className="w-full flex flex-wrap pb-5">
          <div className="w-full  px-1">
            <div className="w-full">
              <p className="text-sm text-primaryText p-1">
                Minimum Ticket Quantity
              </p>
              <Textarea
                id="eventDetails"
                rows={4}
                name="about"
                placeholder="ticket description"
              />
            </div>
          </div>
        </div>

        {/* ticket edit & update button ---------------------- */}

        <div className="w-full flex flex-wrap justify-end pb-5">
          <CustomButton
            type="submit"
            name="Edit Ticket"
            buttonClass="bg-primary enabled:hover:bg-primary focus:ring-0"
          />
        </div>
      </div>
    </div>
  );
}
export default SingleTicketDetails;
