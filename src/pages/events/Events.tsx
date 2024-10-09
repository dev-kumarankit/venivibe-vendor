import { useRef, useEffect, useState } from "react";
import CustomDataTable from "../../components/atom/datatable/CustomDataTable";
import Loader from "../../components/atom/loader/Loader";
import { eventManagementService } from "../../services/eventManagementService/EventManagementService";
import { Breadcrumb } from "flowbite-react";
import { useNavigate } from "react-router-dom";
import { IoIosSearch } from "react-icons/io";
import InputFeild from "../../components/atom/inputFeild/InputFeild";
import CustomButton from "../../components/atom/button/CustomButton";
import { filterIcon } from "../../assets/Icons";

export default function Events() {
  const [search, setSearch] = useState("");
  const [eventStatus, setEventStatus] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState<any>(false);
  const perPageLimit = useRef(10);
  const page = useRef(1);
  const keyword = useRef("");
  const dropdown = useRef<any>(null);
  const trigger = useRef<any>(null);

  const {
    listAllEventDetailsApi,
    getAllEventsData,
    getAllEventsLoading,
    getAllEventsMeta,
  }: any = eventManagementService();

  const navigate = useNavigate();
  const getDetails = () => {
    listAllEventDetailsApi({
      limit: perPageLimit.current,
      page: page.current,
    });
  };

  useEffect(() => {
    getDetails();
  }, []);

  const handleStatus = (status: string) => {
    setEventStatus(status);
    setDropdownOpen(false);
  };

  const eventColumns = [
    { name: "Event Name", selector: (row: any) => row.event_name || "-" },
    { name: "Event Date", selector: (row: any) => row.created_at || "-" },

    {
      name: "Sponsored Status",
      selector: (row: any) =>
        row.is_sponsored ? "Sponsored" : "Not Sponsored" || "-",
    },
    { name: "Location", selector: (row: any) => row.address || "-" },
    { name: "Venue", selector: (row: any) => row.venue || "-" },
    {
      name: "Approved Status",
      selector: (row: any) =>
        row.is_approved ? "Approved" : "Unapproved" || "-",
    },
  ];
  return (
    <>
      {getAllEventsLoading && <Loader />}

      <div className="w-full min-h-screen p-5">
        <div className="w-full pb-3">
          <Breadcrumb
            aria-label="Default breadcrumb"
            className="cursor-pointer"
          >
            <Breadcrumb.Item
              onClick={() => {
                navigate("/dashboard");
              }}
            >
              Dashboard
            </Breadcrumb.Item>
            <Breadcrumb.Item>
              <span className="text-secondary">Event</span>
            </Breadcrumb.Item>
          </Breadcrumb>
        </div>
        <div className="bg-white rounded-12">
          <div className="w-full flex items-center justify-between px-6 pt-6">
            <div className="w-full">
              <span className="text-primaryText text-lg font-medium">
                Event List
              </span>
            </div>

            <div className="w-full flex  justify-end">
              <div className="flex items-center gap-[20px]">
                <div className="w-full pl-[11px]  bg-[#F8F8F8] rounded-lg">
                  <div className="w-full flex items-center justify-between">
                    <div className="rounded-full flex items-center justify-center">
                      <span className="text-primary size-8 flex items-center justify-center text-2xl">
                        <IoIosSearch />
                      </span>
                    </div>
                    <div className="flex-auto pr-2.5">
                      <InputFeild
                        inputClass="border border-transparent text-xs [&>div>input]:bg-[#F8F8F8]"
                        color="transparent"
                        type="text"
                        placeHolder={"Search"}
                        change={(e: any) => {
                          setSearch(e.target.value);
                          if (e.target.value?.length == 0) {
                            perPageLimit.current = 10;
                            page.current = 1;
                            keyword.current = "";
                            getDetails();
                          }
                        }}
                        value={search}
                      />
                    </div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <CustomButton
                    type="button"
                    name="Create Event"
                    color=""
                    buttonClass="border border-secondaryBlue text-secondaryBlue rounded-xl nowrap w-max flex items-center px-5  font-semibold text-sm"
                    action={() => navigate("/events/create-event")}
                  />
                  <div className="relative z-[99999]">
                    <CustomButton
                      type="button"
                      name="Filter"
                      ref={trigger}
                      action={() => {
                        setDropdownOpen(!dropdownOpen);
                      }}
                      color={""}
                      buttonClass="border border-gray text-gray font-semibold text-base px-4 py-3 rounded-xl"
                      icon={filterIcon}
                      iconClass="mr-1 mt-[2px]"
                    />

                    <div
                      ref={dropdown}
                      onFocus={() => setDropdownOpen(true)}
                      onBlur={() => setDropdownOpen(false)}
                      className={`flex flex-col justify-center  bg-white py-6 px-7 rounded-xl gap-4 absolute z-10 right-0 top-[60px]  ${
                        dropdownOpen === true ? "block" : "hidden"
                      }`}
                    >
                      <button
                        className="balance flex items-center justify-center gap-1 h-fit  py-1 px-3 rounded border rounded-full font-normal text-base text-gray"
                        onClick={() => handleStatus("approved")}
                      >
                        Select Date
                      </button>
                      <button
                        className="flex items-center justify-center gap-1 h-fit  py-1 px-3 rounded border rounded-full font-normal text-base text-gray"
                        onClick={() => handleStatus("delete")}
                      >
                        Price
                      </button>
                      <button
                        className="flex items-center justify-center gap-1 h-fit  py-1 px-3 rounded border rounded-full font-normal text-base text-gray "
                        onClick={() => handleStatus("pending")}
                      >
                        Category
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="w-full bg-white  p-6">
            <CustomDataTable
              baseRoute="event-detail"
              TableName="All Events"
              columns={eventColumns}
              userList={Array.isArray(getAllEventsData) ? getAllEventsData : []}
              handlePerRowsChange={(data: any) => {
                if (data !== perPageLimit.current) {
                  perPageLimit.current = data;
                  getDetails();
                }
              }}
              handlePageChange={(data: any) => {
                if (data !== page.current) {
                  page.current = data;
                  getDetails();
                }
              }}
              totalRows={getAllEventsMeta?.total_records}
              triggerSearch={() => {
                perPageLimit.current = 10;
                page.current = 1;
                keyword.current = "";
                getDetails();
              }}
            />
          </div>
        </div>
      </div>
    </>
  );
}
