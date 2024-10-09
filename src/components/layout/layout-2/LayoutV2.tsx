import Header from "./Header";
import Aside from "./Aside";
import { Outlet } from "react-router-dom";
import AsideStore from "../../store/AsideStore";

export default function Layout() {
    const isAsideExpanded = AsideStore((state) => state.isAsideExpanded);
    const isDefaultLayout = AsideStore((state) => state.isDefaultLayout);


    return (
        <>
            <div className="w-full h-full min-h-screen flex flex-auto">
                <div className="w-full min-h-screen">
                    <Aside />
                    <main className={`basis-full  w-full relative z-[11] transition-all duration-500 ml-0 ease-in-out flex-col w-0 min-w-0 max-w-full flex grow-1 shrink-1 basis-auto items-stretch  ${isDefaultLayout ? (isAsideExpanded ? ' lg:ml-[14rem] lg:w-[calc(100%-14rem)] ' : 'lg:ml-[4.375rem] lg:w-[calc(100%-4.375rem)]') : (isAsideExpanded ? 'lg:w-[calc(100%-17.75rem)] lg:ml-[17.75rem]' : 'lg:w-[calc(100%-5.875rem)] lg:ml-[5.875rem] ')}`}>
                      <Header />
                       <div className={`w-full bg-[#EAEFF2] ${isDefaultLayout ? 'mt-16' : 'mt-[80px]'}`}>
                       <Outlet />
                       </div>
                    </main>
                </div>
            </div>
           {!isDefaultLayout && 
           <div className="w-full h-[200px] bg-gradient-primary fixed top-0 right-0 left-0 z-[2]"></div>
           }
        </>
    )
}