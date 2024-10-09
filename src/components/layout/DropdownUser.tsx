import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getUserdetails } from "../../router/ProtectedRoute";
import { dropDownDark } from "../../assets/Icons";
import dummyImg from "../../assets/dummy.jpg";

const DropdownUser = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const trigger = useRef<HTMLAnchorElement>(null);
  const dropdown = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const handleLogout = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    localStorage.clear();
    navigate("/authentication/sign-in");
  };
  // close on click outside
  useEffect(() => {
    const clickHandler = ({ target }: MouseEvent) => {
      if (!dropdown.current) return;
      if (
        !dropdownOpen ||
        dropdown?.current?.contains(target as Node) ||
        trigger?.current?.contains(target as Node)
      )
        return;
      setDropdownOpen(false);
    };
    document.addEventListener("click", clickHandler);
    return () => document.removeEventListener("click", clickHandler);
  });

  // close if the esc key is pressed
  useEffect(() => {
    const keyHandler = ({ keyCode }: KeyboardEvent) => {
      if (!dropdownOpen || keyCode !== 27) return;
      setDropdownOpen(false);
    };
    document.addEventListener("keydown", keyHandler);
    return () => document.removeEventListener("keydown", keyHandler);
  });

  const { photo_url, name } = getUserdetails()
  const handleChangePassword = () => {
    navigate("authentication/change-password")
  }
  return (
    <>
      {/* {!logoutLoading && <Loader/>} */}
      <div className="relative rounded-full bg-[#FaFaFa] px-4 py-2.5">
        <Link ref={trigger} onClick={() => setDropdownOpen(!dropdownOpen)} className="flex items-center gap-2" to="#" >
          <span className="text-lg"> <img src={photo_url || dummyImg} alt="Profile-img" width={"30px"} height={"30px"} className="rounded-full" /></span>
          <span className="whitespace-nowrap text-sm">{name}</span>
          <span className="size-5 flex items-center justify-center">
            {dropDownDark}
          </span>
        </Link>

        {/* <!-- Dropdown Start --> */}
        <div
          ref={dropdown}
          onFocus={() => setDropdownOpen(true)}
          onBlur={() => setDropdownOpen(false)}
          className={`absolute right-0 mt-4 flex w-52 px-6 py-4 bg-white shadow-card-shadow flex-col rounded-xl  ${
            dropdownOpen === true ? "block" : "hidden"
          }`}
        >
          <ul className="flex flex-col gap-y-3">
            <li>
              <span>{name || ""}</span>
            </li>
            {/* <li className="cursor-pointer"  onClick={()=>{
              handleChangePassword()
            }}>
              <span>Change Password</span>
            </li> */}
          </ul>
          <button
            onClick={handleLogout}
            className="flex items-center pt-3 text-sm  duration-500 ease-in-out hover:text-text-primary lg:text-base"
          >
            Logout
          </button>
        </div>
        {/* <!-- Dropdown End --> */}
      </div>
    </>
  );
};

export default DropdownUser;
