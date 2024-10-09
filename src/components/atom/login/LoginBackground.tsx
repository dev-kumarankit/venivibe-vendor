import rectangleBackground from "../../../assets/RectangleBackground.png";
import groupedImages from "../../../assets/ImagesGrouped.png";
import vectorIcon from "../../../assets/Vectorbackground.svg";
import venivibeIconLogo from "../../../assets/venivibeIconLogo.png";

export default function LoginBackground({ children }: any) {
  return (
    <>
      <div className="mx-auto overflow-hidden  flex items-center justify-center ">
        <div className="relative">
          <div >
            <img
              className="h-full  w-[93vh]"
              src={rectangleBackground}
              alt=""
            />
          </div>
          <div className="absolute top-0 z-50 h-[50rem]  flex items-center justify-center w-full">
            <img className="h-[40rem]" src={groupedImages} alt="" />
          </div>
          <div className="absolute top-0">
            <img className="h-[20rem]" src={vectorIcon} alt="" />
          </div>
        </div>

        <div className="w-full lg:w-1/2 lg:px-[50px] lg:py-[56px]">
        <div className="">

          <img className="absolute top-0 mt-4 ml-[-38px] h-10  w-auto" src={venivibeIconLogo} alt="" />
        </div>
          <div>

          {children}
          </div>
          
        </div>
      </div>
    </>
  );
}
