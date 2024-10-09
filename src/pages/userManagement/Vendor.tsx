import CustomDataTable from "../../components/atom/datatable/CustomDataTable";
import { useEffect, useMemo, useRef, useState } from "react";
import { userService } from "../../services/userService/UserService";
import { useNavigate } from "react-router-dom";
import ImageInitials from "../../components/atom/images/ImageInitials";
import {
  acceptIcon,
  deleteIcon,
  filterIcon,
  pendingIcon,
} from "../../assets/Icons";
import { FilterData, FilterToggle } from "../../components/store/Toggle";
import CustomButton from "../../components/atom/button/CustomButton";
import { IoIosSearch } from "react-icons/io";
import InputFeild from "../../components/atom/inputFeild/InputFeild";

export default function Vendor() {
  const [search, setSearch] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState<any>(false);
  const { filterToggle, setFilterToggle } = FilterToggle();
  const perPageLimit = useRef(10);
  const page = useRef(1);
  const keyword = useRef("");
  const navigate = useNavigate();
  const {
    getAllUsersListingApi,
    getAllUserListingData,
    getAllUsersLoading,
    getAllUserListingMeta,
  }: any = userService();

  const tableLoader = getAllUsersLoading;
  const dropdown = useRef<any>(null);
  const trigger = useRef<any>(null);
  const { setForgotPasswordEmail } = FilterData();

  const getDetails = (type: any) => {
    let params = {
      limit: perPageLimit.current,
      page: page.current,
    };
    if (type === "approved") {
      params = { ...params, status: "approved" };
    }
    if (type === "pending") {
      params = { ...params, status: "pending" };
    }
    if (type === "rejected") {
      params = { ...params, status: "rejected" };
    }
    if (type === "all") {
      params = { ...params };
    }
    const role = {
      role: "1",
      search: search,
    };
    getAllUsersListingApi(params, role);
  };

  useEffect(() => {
    getDetails("all");
  }, []);

  const userColumns = useMemo(
    () => [
      {
        name: "Name",
        selector: (row: any) => (
          <div className="flex items-center">
            <ImageInitials
              imageUrl={row.profile_pic || ""}
              alt={row?.name}
              name={row?.name}
              boxColor={row?.business_color?.toLowerCase() || ""}
              className="w-8 h-8 rounded-full mr-2"
            />
            <span>{row.name || "-"}</span>
          </div>
        ),
      },
      {
        name: "Email Id",
        selector: (row: any) => row.email || "-",
      },
      {
        name: "Status",
        selector: (row: any) => (
          <>
            {row?.approval === "1" ? (
              <div className="flex space-x-2">
                <button className="flex items-center justify-center gap-1 h-fit text-[#05CD99] py-1 px-3 rounded border border-[#05CD99] rounded-full">
                  <span>{acceptIcon}</span> Approved
                </button>
              </div>
            ) : row?.approval === "0" ? (
              <div className="flex space-x-2">
                <button className="flex items-center justify-center gap-1 h-fit text-[#f1ba00] py-1 px-3 rounded border border-[#f1ba00] rounded-full">
                  <span>{pendingIcon}</span> Pending
                </button>
              </div>
            ) : (
              <div className="flex space-x-2">
                <button className="flex items-center justify-center gap-1 h-fit text-[#EB5757] py-1 px-3 rounded border border-[#EB5757] rounded-full">
                  <span>{deleteIcon}</span> Rejected
                </button>
              </div>
            )}
          </>
        ),
      },
    ],
    []
  );

  const handleSearch = async (searchValue: string) => {
    const data = {
      limit: perPageLimit.current,
      page: page.current,
    };
    const payloadData = {
      role: "1", // role for vendor
      search: searchValue,
    };
    await getAllUsersListingApi(data, payloadData);
  };

  const handleInputChange = (e: any) => {
    const searchValue = e.target.value;
    setSearch(searchValue);
    if (searchValue.trim() !== "") {
      handleSearch(searchValue);
    } else {
      perPageLimit.current = 10;
      page.current = 1;
      keyword.current = "";
      handleSearch(""); // Call the API with an empty search query
    }
  };
  const handleEventTypeClick = (type: any) => {
    getDetails(type);
    setForgotPasswordEmail(type);
    setDropdownOpen(false);
    setFilterToggle(false);
  };
  return (
    <>
      <div
        className={`w-full p-4
      ${
        filterToggle == true
          ? "after:flex after:bg-blue-300 after:min-h-screen after:w-full after:fixed after:inset-0 after:bg-overlay after:opacity-80 after:to-black after:z-[9999]"
          : ""
      }`}
      >
        <p className="text-xs font-normal pb-3 cursor-pointer inline-block">
          Dashboard / <span className="text-secondaryBlue ">Vendor</span>
        </p>
        <div className="w-full flex flex-wrap bg-white px-6 py-4 rounded-xl">
          <div className="w-full flex items-center justify-between pb-4">
            <div className="w-full">
              <span className="text-primaryText text-lg font-medium">
                Event Organizer List
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
                        change={handleInputChange}
                        value={search}
                      />
                    </div>
                  </div>
                </div>
                <div className="relative z-[99999]">
                  <CustomButton
                    type="button"
                    name="Filter"
                    ref={trigger}
                    action={() => {
                      setDropdownOpen(!dropdownOpen),
                        setFilterToggle(!filterToggle);
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
                      className="flex items-center justify-center gap-1 h-fit text-[#05CD99] py-1 px-3 rounded border border-[#05CD99] rounded-full"
                      onClick={() => handleEventTypeClick("approved")}
                    >
                      <span>{acceptIcon}</span> Approved
                    </button>
                    <button
                      className="flex items-center justify-center gap-1 h-fit text-[#EB5757] py-1 px-3 rounded border border-[#EB5757] rounded-full"
                      onClick={() => handleEventTypeClick("rejected")}
                    >
                      <span>{deleteIcon}</span>Rejected
                    </button>
                    <button
                      className="flex items-center justify-center gap-1 h-fit text-[#f1ba00] py-1 px-3 rounded border border-[#f1ba00] rounded-full"
                      onClick={() => handleEventTypeClick("pending")}
                    >
                      <span>{pendingIcon}</span>Pending
                    </button>

                    <button
                      className="flex items-center justify-center gap-1 h-fit text-[#7494eb] py-1 px-3 rounded border border-[#7494eb] rounded-full"
                      onClick={() => handleEventTypeClick("all")}
                    >
                      Clear
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="w-full customTable">
            <CustomDataTable
              tableName="Vendor List"
              loading={tableLoader}
              columns={userColumns}
              searchPlaceholder="Search"
              userList={
                Array?.isArray(getAllUserListingData)
                  ? getAllUserListingData
                  : []
              }
              handlePerRowsChange={(data: any) => {
                if (data != perPageLimit.current) {
                  perPageLimit.current = data;
                  getDetails("all");
                }
              }}
              handlePageChange={(data: any) => {
                if (data != page.current) {
                  page.current = data;
                  getDetails("all");
                }
              }}
              totalRows={getAllUserListingMeta?.total_records}
              triggerSearch={() => {
                perPageLimit.current = 10;
                page.current = 1;
                keyword.current = "";
                getDetails("all");
              }}
              TableName="Vendor Listing"
              onRowClicked={(data: any) => {
                navigate(`/management/vendor/${data?.id}`);
              }}
            />
          </div>
        </div>
      </div>
    </>
  );
}