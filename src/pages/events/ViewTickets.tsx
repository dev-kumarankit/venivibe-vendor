import { useNavigate } from "react-router-dom"
import { eventManagementService } from "../../services/eventManagementService/EventManagementService";
import Loader from "../../components/atom/loader/Loader";
import { useEffect } from "react";
import { getToast } from "../../components/atom/toastify/Toastify";
import CustomButton from "../../components/atom/button/CustomButton";
import { plusIcon } from "../../assets/Icons";

export default function Viewtickets(props: any) {

    const eventId = props?.eventId;
    console.log(props, "eventId in viewtickets");

    const { getEventTicketApi, getEventTickLoading, getEventTicketData }: any = eventManagementService();

    const getEventDetails = () => {
        if (eventId) {
            const data = {
                id: eventId,
            };
            getEventTicketApi(data).then((data: any) => {
                if (data?.success) {
                    getToast("success", 'Success');
                } else {
                    getToast("error", data?.message || "Error Occured");
                }
            });
        }
    };

    useEffect(() => {

        if (eventId) {
            getEventDetails();
        }
        else {
            navigate('/events')
        }
    }, [eventId]);




    console.log(getEventTicketData, "ticket_details")

    const navigate = useNavigate();

    return (

        <>
            {getEventTickLoading && <Loader />}

            <div className="w-full px-4 py-4">
                <div className="w-full flex items-center flex-wrap gap-y-4">
                    {
                        // Check if ticketCategory exists and is an array
                        getEventTicketData && Array.isArray(getEventTicketData?.ticketCategory) ? (
                            getEventTicketData?.ticketCategory.length > 0 ? (
                                // Map over the ticketCategory array if there are tickets
                                getEventTicketData.ticketCategory.map((ticketData: any, index: number) => {

                                    // Format the sale_ends_on date
                                    const formattedEndDate = new Date(ticketData?.sale_ends_on).toLocaleDateString('en-US', {
                                        month: 'short', day: 'numeric', year: 'numeric'
                                    });
                                    // Combine with event_starts_at time
                                    const formattedDateTime = `Ends ${formattedEndDate} at ${ticketData?.event_starts_at}`;

                                    return (
                                        <div key={index} className="w-full md:w-1/3 px-2 cursor-pointer">
                                            <div className="w-full py-6 px-4 shadow-light rounded-12" onClick={() => { navigate('/events/ticket-details' , {state : {id : ticketData?.id}}) }}>
                                                <div className="w-full mb-4 border-b border-[#DFE4EA]">
                                                    <div className="w-full flex items-center justify-between pb-1">
                                                        <div className="flex-auto">
                                                            <p className="text-base font-medium leading-[28px]">{ticketData?.name}</p>
                                                        </div>
                                                        <div className="flex flex-auto items-center justify-end gap-x-1.5">
                                                            <div className="size-2 rounded-full bg-[#00AB9E]"></div>
                                                            <p className="text-sm">{ticketData?.is_on_sale ? 'On Sale' : 'Off Sale'}</p>
                                                        </div>
                                                    </div>
                                                    <div className="w-full pb-4">
                                                        <span className="text-[#637381] text-sm">{formattedDateTime}</span>
                                                    </div>
                                                </div>
                                                <div className="w-full flex items-center justify-between">
                                                    <div className="flex-auto flex justify-between items-center">
                                                        <p className="text-[#787878] text-sm">Tickets/Order</p>
                                                        <p className="font-medium text-[#212121]">0/{ticketData?.max_quantity}</p>
                                                    </div>
                                                    <div className="flex-auto flex justify-end gap-x-2 items-center">
                                                        <p className="text-[#787878] text-sm">Price</p>
                                                        <p className="font-medium text-[#00AB9E] text-base">{ticketData?.price} GHS</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })
                            ) : (
                                // Show a message when no tickets are found
                                <p className="text-center text-gray-500 w-full">No tickets found</p>
                            )
                        ) : (
                            // Handle any other case where data might not be in the expected format
                            <p className="text-center text-gray-500 w-full">Unable to load tickets.</p>
                        )
                    }

                    <div className="w-full px-4">
                        <CustomButton
                            type="button"
                            name="Add More Tickets"
                            action={() => { navigate('/events/add-ticket', { state: { eventId } }) }}
                            icon={plusIcon}
                            iconClass="mr-4"
                            color={" "}
                            size="sm"
                            buttonClass="border font-semibold text-secondaryBlue text-secondaryBlue text-sm rounded-xl px-4 py-3"
                        />
                    </div>
                </div>
            </div>
        </>
    )
}