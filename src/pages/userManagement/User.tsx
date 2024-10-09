import CustomDataTable from "../../components/atom/datatable/CustomDataTable";
import { useEffect, useMemo, useRef, useState } from "react";
import { userService } from "../../services/userService/UserService";
import ImageInitials from "../../components/atom/images/ImageInitials";
import { deleteBoxIcon, eyeIcon } from "../../assets/Icons";
import { IoIosSearch } from "react-icons/io";
import InputFeild from "../../components/atom/inputFeild/InputFeild";
import { useNavigate } from "react-router-dom";
import ShowModalEditor from "../../components/atom/modal/ShowModal";
import CustomButton from "../../components/atom/button/CustomButton";
import { getToast } from "../../components/atom/toastify/Toastify";

export default function User() {
  const [filteredUserList, setFilteredUserList] = useState([]);
  const [show, setShow] = useState(false);
  const [search, setSearch] = useState("");
  const [selectedUserId, setSelectedUserId] = useState("");

  const perPageLimit = useRef(10);
  const page = useRef(1);
  const keyword = useRef("");
  const navigate = useNavigate();
  const {
    getAllUsersListingApi,
    getAllUserListingData,
    getAllUsersLoading,
    getAllUserListingMeta,
    removeUserApi,
    removeUserLoading,
  }: any = userService();
  const tableLoader = getAllUsersLoading || removeUserLoading;
  const getDetails = () => {
    const data = {
      limit: perPageLimit.current,
      page: page.current,
    };
    const payloadData = {
      role: "2", //role for user
      search: search,
    };
    getAllUsersListingApi(data, payloadData);
  };

  useEffect(() => {
    getDetails();
  }, []);

  useEffect(() => {
    if (Array.isArray(getAllUserListingData)) {
      // Filter the user list based on the role
      const filteredData = getAllUserListingData.filter(
        (user: any) => user?.role === "2"
      );
      setFilteredUserList(filteredData);
    }
  }, [getAllUserListingData]);

  const handleView = (userId: any) => {
    navigate(`/user/${userId}`, { replace: true });
  };

  const handleRemove = (userId: any) => {
    setShow(true);
    setSelectedUserId(userId); // Save userId for later
  };

  const handleUserRemove = async () => {
    if (selectedUserId) {
      // Perform the API call to remove the user
      await removeUserApi(selectedUserId).then((data:any) => {
        if (data?.data?.success) {
          getToast(
            "success",
            data?.data?.message || "user removed successfully"
          );
        }
      });
    }
    await getDetails(); // Refresh the data after removal
    setShow(false); // Close the modal after successful removal
    setSelectedUserId("");
  };
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
        name: "Action",
        selector: (row: any) => (
          <div className="flex space-x-2">
            <button
              className="flex items-center justify-center gap-1 h-fit text-secondaryBlue  py-1 px-3 border border-1 border-secondaryBlue rounded-full"
              onClick={() => handleView(row?.id)}
            >
              <span>{eyeIcon}</span>{" "}
              <p className="font-semibold text-sm">View</p>
            </button>
            <button
              className="flex items-center justify-center gap-1 h-fit text-[#EB5757] py-1 px-3  border border-1 border-[#EB5757] rounded-full"
              onClick={() => handleRemove(row?.id)}
            >
              <span>{deleteBoxIcon}</span>
              <p className="font-semibold text-sm">Delete</p>
            </button>
          </div>
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
      role: "2", // role for user
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
  return (
    <>
      <div className="w-full p-4">
        <p className="text-xs font-normal pb-3 cursor-pointer inline-block">
          Dashboard / <span className="text-secondaryBlue ">User List</span>
        </p>
        <div className="w-full flex flex-wrap bg-white px-6 py-4 rounded-xl">
          <div className="w-full flex items-center justify-between pb-4">
            <div className="w-full">
              <span className="text-primaryText text-lg font-medium">
                User List
              </span>
            </div>

            <div className="w-full flex  justify-end">
              <div className="flex items-center gap-[20px]">
                <div className="w-full pl-[11px]  bg-[#F8F8F8] rounded-lg">
                  <div className="w-full flex items-center justify-between">
                    <div className="rounded-full flex items-center justify-center">
                      <span className="text-[#6B7280] size-8 flex items-center justify-center text-2xl">
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
              </div>
            </div>
          </div>

          <div className="w-full customTable">
            <CustomDataTable
              baseRoute=""
              loading={tableLoader}
              columns={userColumns}
              userList={
                Array?.isArray(filteredUserList) ? filteredUserList : []
              }
              handlePerRowsChange={(data: any) => {
                if (data != perPageLimit.current) {
                  perPageLimit.current = data;
                  getDetails();
                }
              }}
              handlePageChange={(data: any) => {
                if (data != page.current) {
                  page.current = data;
                  getDetails();
                }
              }}
              totalRows={getAllUserListingMeta?.total_records}
            />
          </div>
        </div>
        <ShowModalEditor
          show={show}
          close={() => setShow(false)}
          modalBody={
            <div className="w-4/5 p-5">
              <div className="text-[#343434] text-base">
                Would you like to delete this user
              </div>
              <div className="flex gap-4 py-4 justify-center">
                <CustomButton
                  type="button"
                  name="No"
                  color={" "}
                  action={() => setShow(false)}
                  buttonClass="border font-semibold text-gray text-sm rounded-xl px-7 py-4"
                />
                <CustomButton
                  type="button"
                  name="Yes"
                  action={() => {
                    handleUserRemove();
                  }}
                  color={" "}
                  buttonClass="bg-gradient-primary font-semibold text-white text-sm px-7 rounded-xl py-4"
                />
              </div>
            </div>
          }
          modalBodyClass="flex items-center justify-center text-center"
        />
      </div>
    </>
  );
}
