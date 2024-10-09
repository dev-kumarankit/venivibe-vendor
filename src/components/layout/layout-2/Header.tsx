import { CiMenuFries } from "react-icons/ci";
import AsideStore from "../../store/AsideStore";
import DropdownUser from "../DropdownUser";
import { MdClose } from "react-icons/md";
import { close, menuBar, notification } from "../../../assets/Icons";

export default function Header() {
  const isAsideExpanded = AsideStore((state) => state.isAsideExpanded);
  const isDefaultLayout = AsideStore((state) => state.isDefaultLayout);
  const toggleAsideShrink = AsideStore((state) => state.toggleAside);

  return (
    <>
      <header
        className={`fixed z-[1075] top-0 right-0  mb-0 px-6 py-5 h-[68px] bg-[#ffffff] flex items-center justify-start transition-all duration-500 ease-in-out border-b border-[#E4E4E4] backdrop-blur-2xl w-full mx-0
    ${isDefaultLayout
            ? isAsideExpanded
              ? "transition-all duration-500 ease-in-out lg:w-[calc(100%-14rem)] lg:left-[14rem]"
              : "transition-all duration-500 ease-in-out lg:w-[calc(100%-4.375rem)] lg:left-[4.375rem]"
            : isAsideExpanded
              ? "transition-all duration-500 ease-in-out lg:w-[calc(100%-20.75rem)] lg:mx-6  top-4 rounded-xl"
              : "transition-all duration-500 ease-in-out lg:w-[calc(100%-8.875rem)] lg:mx-6 top-4 rounded-xl"
          }`}
      >
        <nav className="basis-full items-center flex justify-between">
          <div className="flex items-center gap-x-6 w-1/4">
            <div
              className="cursor-pointer size-7"
              onClick={toggleAsideShrink}
            >
              {isAsideExpanded ? menuBar : close}
            </div>

          </div>
          <div className="w-3/4 flex items-center justify-end gap-x-9">
            <div className="size-11 bg-[#044B76] rounded-full flex items-center justify-center">
              {notification}
            </div>
            <DropdownUser />
          </div>
        </nav>
      </header>
    </>
  );
}
