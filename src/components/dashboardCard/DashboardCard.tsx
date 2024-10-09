import { dashboardService } from "../../services/dashboardService/DashboardService";
import Loader from "../atom/loader/Loader";
import { useEffect } from "react";
import {
  dashboardCardTicket,
  eventsIcon,
  revenue,
  totalUsersIcon,
  usericon,
  vendorIcon,
} from "../../assets/Icons";
import { getTodayUTCDate } from "../../utils/Helpers";

export default function DashboardCard() {
  const {
    listDashboardSummaryApi,
    getDashboardSummaryDetails,
    getDashboardSummaryLoading,
    getDashboardSummaryError,
  }: any = dashboardService();

  const getDashboardSummary = () => {
    listDashboardSummaryApi();
  };

  useEffect(() => {
    if (listDashboardSummaryApi) {
      listDashboardSummaryApi();
    }
  }, []);

  console.log(getTodayUTCDate(), "12345678");

  const cardData = [
    {
      cardTitle: "Total Events",
      CardStat: getDashboardSummaryDetails?.totalEvent || "0",
      cardIcon: eventsIcon,
      bg: "#59C4F2",
    },
    {
      cardTitle: "Active Events",
      CardStat: getDashboardSummaryDetails?.totalActiveEvent || "0",
      cardIcon: eventsIcon,
      bg: "#F7BA5F",
    },
    {
      cardTitle: "Total Users",
      CardStat: getDashboardSummaryDetails?.totalUser || "0",
      cardIcon: totalUsersIcon,
      bg: "#A162B0",
    },
    {
      cardTitle: "Revenue",
      CardStat: getDashboardSummaryDetails?.totalUser || "0",
      cardIcon: revenue,
      bg: "#36B6BF",
    },
    {
      cardTitle: "Total Vendor",
      CardStat: getDashboardSummaryDetails?.totalVendor || "0",
      cardIcon: vendorIcon,
      bg: "#FF9075",
    },
  ];

  return (
    <>
      {/* {getDashboardSummaryLoading && <Loader />} */}

      <div className="w-full max-h-screen">
        <div className="w-full flex flex-wrap">
          <div className="w-full lg:w-3/12 mb-4 lg:pr-4 lg:mb-0">
            <div className="w-full rounded-12 p-5 min-h-full bg-gradient-signin text-white">
              <div className="w-full flex items-stretch justify-between pb-[30px]">
                <div className="w-1/2">
                  <div className="w-full">
                    <p className="text-[32px] font-semibold flex items-center gap-2">
                      1385 <span className="text-base font-normal"> pcs</span>
                    </p>
                    <p>Tickets Sales</p>
                  </div>
                </div>

                <div className="w-1/2 flex items-center justify-end">
                  <span>{dashboardCardTicket}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="w-full lg:w-9/12">
            <div className="w-full flex flex-wrap gap-4">
              {cardData.map((data, index) => (
                <div key={index} className="w-full  lg:flex-1">
                  <div className="w-full p-5 rounded-12 bg-white shadow-dashCard">
                    <div className="w-full">
                      <div
                        className="size-11 flex items-center justify-center rounded-12 mb-2"
                        style={{ backgroundColor: data.bg }}
                      >
                        <span>{data?.cardIcon}</span>
                      </div>
                      <div className="w-full">
                        <p className="font-bold text-xl">{data?.CardStat}</p>
                        <span className="text-sm text-[#637381]">
                          {data?.cardTitle}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
