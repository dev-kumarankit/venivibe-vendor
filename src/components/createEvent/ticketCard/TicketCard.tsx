import { useEffect } from "react";
import { calenderGrey, iconCommision, plusIcon } from "../../../assets/Icons";
import { eventManagementService } from "../../../services/eventManagementService/EventManagementService";
import CustomButton from "../../atom/button/CustomButton";
import { StepForm, TicketToggle } from "../../store/Toggle";

export default function TicketCard() {
  const { showTicket, setShowTicket } = TicketToggle()
  const { getEventTicketApi, getEventTicketData }: any = eventManagementService()
  const eventId = localStorage.getItem("eventId");
  const { setStepper }: any = StepForm();

  useEffect(() => {
    getEventTicketApi(eventId);
  }, [eventId])

  console.log(getEventTicketData?.data?.ticketCategory, "getEventTicketData123")
  return (
    <div>
      <div className="flex flex-wrap gap-4">
        {getEventTicketData?.data?.ticketCategory?.map((data: any, index: any) => {
          return (
            <div key={index} className="flex flex-col  border border-customBorder rounded-lg py-6 px-4 shadow-sm max-w-sm w-full bg-white">
              <div className="flex justify-between items-center mb-2">
                <h2 className="font-medium text-base text-[#0C0C0C]">
                  {data?.name}
                </h2>
                {data?.is_on_sale ? <div className="flex items-center justify-center gap-0.5">
                  <span className="text-green-500 text-[17px]">●</span>
                  <span className="text-[#212121] text-sm ">On Sale</span>
                </div> : ""}
              </div>
              <div className="flex items-center text-sm text-gray-500 border-b border-[#DFE4EA] mb-4 pb-4">
                <span className="pr-1 [&>svg]:w-[18px] [&>svg]:h-[18px]">
                  {calenderGrey}
                </span>
                {data?.sale_ends_on && <span className="text-gray">Ends {data?.sale_ends_on} {data?.event_ends_at && `at ${data?.event_ends_at}`}</span>}
              </div>
              <div className="flex justify-between text-sm text-gray-500">
                <span className="text-[#787878] text-xs">
                  Tickets/Order{" "}
                  <b className="text-[#212121] font-semibold text-sm">{data?.min_quantity}/{data?.max_quantity}</b>
                </span>
                <span className="text-[#787878] text-xs">
                  Price
                  <b className="text-[#00AB9E] text-base font-semibold pl-1">
                    {data?.price}
                  </b>
                </span>
              </div>
            </div>
          )
        })}
      </div>
      <div className="py-4">
        <CustomButton
          type="button"
          name="Add More Tickets"
          action={() => setShowTicket(false)}
          icon={plusIcon}
          iconClass="mr-4"
          color={" "}
          buttonClass="border font-semibold text-secondaryBlue text-secondaryBlue text-sm rounded-xl px-7 py-4"
        />
      </div>
      <div className="flex gap-4 py-4 justify-end">
        <CustomButton
          type="button"
          name="Back"
          action={() => setShowTicket(false)}
          color={" "}
          buttonClass="border font-semibold text-gray text-sm rounded-xl px-7 py-4"
        />
        <CustomButton
          type="submit"
          name="Save and Next"
          color={" "}
          action={() => setStepper("2")}
          buttonClass="bg-gradient-primary font-semibold text-white text-sm px-7 rounded-xl py-4"
        />
      </div>
    </div>
  );
}
