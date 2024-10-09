import { Breadcrumb } from "flowbite-react";
import { useLocation, useNavigate } from "react-router-dom";
import UploadMenu from "./UploadMenu";
import ViewTickets from "./ViewTickets";
import Viewcustomisations from "./ViewCustomisations";
import React from "react";
import CustomAppTab from "../../components/atom/customAppTab/CustomAppTab";

const EventCustomisation: React.FC = () => {

    const navigate = useNavigate();
    const location = useLocation();
    const {eventId} = location?.state||{eventId:null}

    console.log(eventId ,"eventId in view customizations")
    
    const tabs = [
        { title: 'View Tickets', content: <ViewTickets eventId={eventId} /> },
        { title: 'Add-Ons', content: <Viewcustomisations /> },
        { title: 'Upload Menu', content: <UploadMenu /> },
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
                                navigate("/events");
                            }}
                        >
                            Dashboard
                        </Breadcrumb.Item>
                        <Breadcrumb.Item>
                            Event
                        </Breadcrumb.Item>
                        <Breadcrumb.Item>
                            Event Details
                        </Breadcrumb.Item>
                        <Breadcrumb.Item >
                            <span className="text-secondary">View Event Customization </span>
                        </Breadcrumb.Item>
                    </Breadcrumb>
                </div>

                {/* view event customization start---------------------- */}
                <div className="w-full bg-white rounded-12 min-h-[calc(100vh-11vh)]">
                    <CustomAppTab tabs={tabs} />
                </div>


            </div>




        </>
    )
}

export default EventCustomisation