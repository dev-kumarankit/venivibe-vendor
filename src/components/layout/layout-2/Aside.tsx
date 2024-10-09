import { MdAddHome, MdOutlineEmojiEvents } from "react-icons/md";
import { RiArrowDropDownLine } from "react-icons/ri";
import { ReactElement, useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import AsideStore from "../../store/AsideStore";
import { IoTicketSharp } from "react-icons/io5";
import { AiFillDollarCircle } from "react-icons/ai";
import { FaUserCircle, FaUserCog, FaUserTie } from "react-icons/fa";
import logo from "../../../assets/vinevibelogo.svg";
import {
  dashboardIcon,
  eventOrganiserIcon,
  eventsIcon,
  usericon,
  vendorIcon,
  venivibeLogo,
} from "../../../assets/Icons";

export default function Aside() {
  const location = useLocation();
  const navigate = useNavigate();

  const isAsideExpanded = AsideStore((state) => state.isAsideExpanded);
  const isDefaultLayout = AsideStore((state) => state.isDefaultLayout);
  const [isExpandedDropDown, setIsExpandedDropDown] = useState(null);
  const expandDropdownMenu = (index: any, data: any) => {
    if (data && data.subMenu.length > 0) {
      setIsExpandedDropDown(isExpandedDropDown === index ? null : index);
    } else {
      navigate(data.routePath);
    }
  };

  interface SubMenu {
    subHeading: string;
    subrouteLocation: string;
    subMenu: any;
    subIcon?: ReactElement;
  }

  interface AppRoute {
    routeHeading: string;
    routeName: string;
    routePath: string;
    routeIcon: any;
    subMenu: SubMenu[];
  }

  const appRoutes: AppRoute[] = [
    {
      routeHeading: "Dashboard",
      routeName: "Dashboard",
      routePath: "/",
      routeIcon: dashboardIcon,
      subMenu: [],
    },
    {
      routeHeading: "User",
      routeName: "User",
      routePath: "user-listing",
      routeIcon: usericon,
      subMenu: [],
    },

    {
      routeHeading: "Event",
      routeName: "Event Organiser",
      routePath: "/vendor-listing",
      routeIcon: eventOrganiserIcon,
      subMenu: [],
    },
    {
      routeHeading: "Events",
      routeName: "Events",
      routePath: "events",
      routeIcon: eventsIcon,
      subMenu: [],
    },
    // {
    //     routeHeading: "Tickets",
    //     routeName: "Tickets",
    //     routePath: 'tickets',
    //     routeIcon: eventsIcon,
    //     subMenu: [],
    // },
    // {
    //     routeHeading: "Revenue",
    //     routeName: "Revenue",
    //     routePath: 'revenue',
    //     routeIcon: <AiFillDollarCircle />,
    //     subMenu: [],
    // },
  ];

  return (
    <>
      <aside
        className={`group fixed z-11 transition-all ease-im-out duration-500  flex-1 min-h-px  overflow-hidden flex flex-col bg-[#02253D] text-[#DEE4EE] border-r border-[#dee2e6] -ml-[14rem]  ${
          isDefaultLayout
            ? isAsideExpanded
              ? "w-aside lg:ml-0 lg:top-0 lg:bottom-0 lg:left-0 lg:mr-0 lg:rounded-[0px]"
              : "lg:w-[4.375rem] lg:ml-0 lg:top-0 lg:bottom-0 lg:left-0 lg:mr-0 lg:rounded-[0px] lg:hover:w-aside"
            : isAsideExpanded
            ? "lg:ml-6 lg:my-4 lg:rounded-xl lg:top-0 lg:bottom-0 lg:w-aside"
            : "lg:w-[4.375rem] lg:ml-6 lg:my-4 lg:top-0 lg:bottom-0 lg:left-0 lg:mr-0 lg:rounded-xl lg:hover:w-aside"
        }`}
      >
        {/* aside header---------------------------------------------------------------------------------------- */}
        <div
          className={`min-h-[90px] transition-all ease-in-out duration-500 flex overflow-hidden min-h-px items-center justify-center leading-none grow-0 shrink-0  bg-[#02253D] border-b border-[#044B76] text-center ${
            isAsideExpanded
              ? "w-aside px-6 py-[30px]"
              : "w-[4.375rem] group-hover:w-aside px-6 py-[30px]"
          }`}
        >
          <div className="w-full text-center">
            <span>{venivibeLogo}</span>
          </div>
        </div>

        {/* aside nav menu ------------------------------------------------------------------------------------------- */}
        <div className="w-full px-4 py-9 min-h-full">
          <ul className="flex flex-col items-start justify-start m-0 p-0 h-full py-1 relative  list-none ">
            {appRoutes.map((data, index) => (
              <>
                {/* asidse main menu link ------------------------------------------------------------------------ */}
                <li
                  key={index}
                  className={`cursor-pointer basis-auto grow-0 shrink-0 transition-all ease-im-out duration-500 ${
                    isAsideExpanded
                      ? "w-full"
                      : "w-[4.375rem] group-hover:w-aside"
                  }`}
                >
                  <a
                    className={`rounded-[0.375rem] text-sm min-h-[44px]  relative flex items-center hover:bg-primary hover:text-white pl-[15px] pr-5 py-2 mb-3  ${
                      location.pathname === data.routePath
                        ? " bg-gradient-signin hover:bg-gradient-signin text-white"
                        : location.pathname?.includes(
                            data.routeName.toLocaleLowerCase()
                          )
                        ? "bg-gradient-signin  hover:bg-gradient-signin text-white"
                        : "bg-transparent text-[#ffffff]"
                    }`}
                    onClick={() => expandDropdownMenu(index, data)}
                  >
                    <span className="grow-0 shrink-0 mr-3 ">
                      {data.routeIcon}
                    </span>
                    <div className="whitespace-nowrap overflow-hidden text-clip  leading-[1.467] flex-auto">
                      {data.routeName}
                    </div>
                    {data.subMenu.length > 0 && (
                      <span
                        className={`grow-0 shrink-0 mr-[0.5rem]  text-[1.575rem] w-[1.575rem] ${
                          isAsideExpanded
                            ? "opacity-100 "
                            : "opacity-0 group-hover:opacity-100"
                        }`}
                      >
                        <RiArrowDropDownLine />
                      </span>
                    )}
                  </a>

                  {data.subMenu.length > 0 && (
                    // aside main menu > submenu------------------------------------------------
                    <ul
                      className={`sub-menu flex flex-col m-0 p-0 list-none overflow-hidden transition-[max-height] ease-smooth duration-500 ${
                        isExpandedDropDown === index
                          ? "max-h-screen"
                          : "max-h-0"
                      } `}
                    >
                      {data.subMenu.map((subData, subIndex) => (
                        <li
                          key={subIndex}
                          className={`mt-[0.375rem] w-aside basis-auto grow-0 shrink-0 ${
                            isAsideExpanded
                              ? "w-aside"
                              : "hidden  group-hover:w-aside group-hover:flex"
                          } `}
                        >
                          <NavLink
                            to={subData.subrouteLocation}
                            className={({ isActive }) =>
                              `rounded-[0.375rem] block capitalize  mx-[0.75rem]  py-[0.5rem] text-[0.9375rem]  px-[0.75rem] flex items-center pr-[calc(0.75rem+0.66em)] ${
                                isActive
                                  ? "font-semibold text-primary shoadow-light hover:text-primary font-semibold"
                                  : "bg-transparent text-black hover:text-primary font-normal"
                              } `
                            }
                          >
                            <span
                              className={`grow-0 shrink-0   w-[1.575rem] ${
                                isAsideExpanded
                                  ? "opacity-100 "
                                  : "opacity-0 group-hover:opacity-100"
                              }`}
                            >
                              {subData.subIcon}
                            </span>
                            <div>{subData.subHeading}</div>
                          </NavLink>
                        </li>
                      ))}
                      {/* */}
                    </ul>
                  )}
                </li>
              </>
            ))}
          </ul>
        </div>
      </aside>
    </>
  );
}
