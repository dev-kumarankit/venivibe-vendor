import DashboardCard from "../../components/dashboardCard/DashboardCard";
import { useNavigate } from "react-router-dom";
import { eventManagementService } from "../../services/eventManagementService/EventManagementService";
import { useEffect, useState } from "react";
import {
  calenderGrey,
  dollar,
  locationGrey,
  primaryEventicon,
  ticket,
} from "../../assets/Icons";
import Loader from "../../components/atom/loader/Loader";
import { formatUTCDate, getTodayUTCDate } from "../../utils/Helpers";


export default function DashboardDefault() {
  const navigate = useNavigate();

  const [selectedEventType, setSelectedEventType] =
    useState<string>("upcoming");

  const { listAllEventDetailsApi, getAllEventsData, getAllEventsLoading }: any =
    eventManagementService();

  const getDetails = (type: any) => {
    const date = getTodayUTCDate();
    let params = {
      limit: 2,
      page: 1,
    };
    if (type === "upcoming") {
      params = { ...params, dateFrom: date, type: 1 };
    } else if (type === "past") {
      params = { ...params, dateTo: date, type: 1 };
    } else {
      params = { ...params, type: 2 };
    }
    listAllEventDetailsApi(params);
  };

  useEffect(() => {
    getDetails("upcoming");
  }, []);

  const eventPage = () => {
    navigate("/events");
  };

  const handleEventClick = (data) => {
    navigate(`events/event-detail/${data?.id}`, { state: data, replace: true });
  };

  const handleEventTypeClick = (type) => {
    setSelectedEventType(type);
    getDetails(type);
  };

  return (
    <>
      {getAllEventsLoading && (
        <>
          <Loader />
        </>
      )}
      <div className="w-full min-h-screen p-5">
        <div className="w-full dashcard pb-6">
          <DashboardCard />
        </div>
        <div className="w-full pb-6">
          <div className="flex gap-4">
            <div className="w-[50%]">
            
            </div>
            <div className="w-[50%]">
             
            </div>
          </div>
        </div>
        <div className="w-full pb-6">
          {/* ---------------------------upcomming event list conatiner---------------------*/}

          <div className="w-full rounded-12 bg-white">
            {/* ---------------------------upcomming event list header---------------------*/}

            <div className="w-full px-6 pt-6 pb-4 flex items-center justify-between">
              <div className="w-1/2 flex gap-5">
                <p
                  onClick={() => handleEventTypeClick("upcoming")}
                  className={`text-lg  cursor-pointer ${
                    selectedEventType === "upcoming"
                      ? "font-semibold text-secondaryBlue"
                      : "font-normal text-primary-text"
                  }`}
                >
                  Upcoming Event
                </p>
                <span>|</span>
                <p
                  onClick={() => handleEventTypeClick("past")}
                  className={`text-lg  cursor-pointer ${
                    selectedEventType === "past"
                      ? "font-semibold text-secondaryBlue"
                      : "font-normal text-primary-text"
                  }`}
                >
                  Past Event{" "}
                </p>
                <span>|</span>
                <p
                  onClick={() => handleEventTypeClick("draft")}
                  className={`text-lg  cursor-pointer ${
                    selectedEventType === "draft"
                      ? "font-semibold text-secondaryBlue"
                      : "font-normal text-primary-text"
                  }`}
                >
                  Draft Event{" "}
                </p>
              </div>
              <div className="w-1/2">
                <div
                  onClick={() => {
                    eventPage();
                  }}
                  className="w-full flex items-center justify-end gap-x-1.5"
                >
                  <div className="size-6 text-primary flex items-center justify-center">
                    {primaryEventicon}
                  </div>
                  <p className="text-base text-primary cursor-pointer">
                    View All Events
                  </p>
                </div>
              </div>
            </div>

            {/* /*---------------------------upcomming event single card---------------------*/}

            <div className="w-full px-4 pb-6 flex  flex-wrap gap-y-4">
              {Array.isArray(getAllEventsData) &&
              getAllEventsData.length !== 0 ? (
                getAllEventsData.some((data) => data?.is_approved) ? (
                  getAllEventsData.map((data, index) => {
                    if (data?.is_approved) {
                      return (
                        <div key={index} className="w-full px-2  lg:w-1/2">
                          <div className="p-6 shadow-light rounded-lg w-full">
                            <div className="w-full flex">
                              <div className="w-full md:w-3/12 flex items-stretch">
                                <div className="w-full rounded-lg flex items-stretch">
                                  {data?.main_image !== "null" ? (
                                    <img
                                      src={data?.main_image}
                                      alt={data?.name || "Event image"}
                                      className="w-full rounded-lg object-cover"
                                    />
                                  ) : (
                                    <div className="w-full rounded-lg bg-gray-200 flex items-center justify-center border border-solid">
                                      <p className="text-xs text-gray-500 text-center">
                                        No Image Available
                                      </p>
                                    </div>
                                  )}
                                </div>
                              </div>

                              <div className="w-full md:w-9/12">
                                <div className="w-full pl-3 py-1.5">
                                  <div className="w-full pb-2">
                                    <p className="text-primary-text leading-7 text-base pb-1">
                                      {data?.event_name || "NA"}
                                    </p>
                                    <div className="w-full flex items-center flex-wrap">
                                      <div className="w-1/2 flex items-center  gap-x-1">
                                        <div className="size-2.5 flex items-center justify-center">
                                          {locationGrey}
                                        </div>
                                        <p className="text-xs text-[#757575]">
                                          {data?.address || "NA"}
                                        </p>
                                      </div>
                                      <div className="w-1/2 flex items-center gap-x-1">
                                        <div className="size-2.5 flex items-center justify-center">
                                          {calenderGrey}
                                        </div>
                                        <p className="text-xs text-[#757575]">
                                          {formatUTCDate(data?.start_date) ||
                                            "NA"}
                                        </p>
                                      </div>
                                    </div>
                                  </div>

                                  <div className="w-full pb-3">
                                    <p className="text-xs leading-[18px] text-[#637381]">
                                      {data?.about || "NA"}
                                    </p>
                                  </div>

                                  <div className="w-full flex items-stretch justify-center gap-x-3">
                                    <div className="w-full md:w-1/3">
                                      <div className="w-full rounded-12 bg-primary px-6 py-2.5">
                                        <div className="w-full flex gap-x-2 items-center">
                                          <div className="size-8">{dollar}</div>
                                          <div className="flex-auto">
                                            <p className=" text-white text-xs">
                                              Price
                                            </p>
                                            <span className="text-sm text-white font-normal">
                                              {data?.price
                                                ? `GHS ${data?.price}`
                                                : ""}
                                            </span>
                                          </div>
                                        </div>
                                      </div>
                                    </div>

                                    <div className="w-full md:flex-1">
                                      <div className="w-full rounded-12 bg-primary px-6 py-2.5">
                                        <div className="w-full flex gap-x-2 items-center">
                                          <div className="size-8">{ticket}</div>
                                          <div className="flex-auto">
                                            <p className=" text-white text-xs">
                                              Event Tcket
                                            </p>
                                            <span className="text-xs text-white">
                                              {data?.quantity
                                                ? `${data?.quantity} pcs left`
                                                : ""}
                                            </span>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    }
                    return null;
                  })
                ) : (
                  <p>No upcoming events</p>
                )
              ) : (
                <p>No upcoming events</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
