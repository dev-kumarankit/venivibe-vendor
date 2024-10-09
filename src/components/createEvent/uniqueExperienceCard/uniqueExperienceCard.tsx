import { deleteIcon, grayEyeIcon, pencilIcon } from "../../../assets/Icons"
import CustomButton from "../../atom/button/CustomButton"
import { UniqeStore, UniqueToggle } from "../../store/Toggle";

export default function UniqueExperienceCard() {
  const { uniqueData, setUniqeData } = UniqeStore();
  return (
    <div className="w-[80%] m-auto">
    {/* {getEventCustomizationLoading && <Loader/>} */}
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
    {uniqueData?.map((data:any,customDataIndex:any)=>{
      return(
      <div className="w-full pt-4">
        <div className="bg-[#EFF9FF] px-6 py-4 rounded-t-xl">
            <div className="flex justify-between w-full">
          <p className="text-[#0C0C0C] font-semibold text-base">{data?.buttonLabel}</p>
          <div className="flex gap-2">
          <span className="[&>svg]:w-[24px] [&>svg]:h-[24px] cursor-pointer">
            {pencilIcon}
          </span>
          <span className="[&>svg]:w-[24px] [&>svg]:h-[24px] cursor-pointer">
            {deleteIcon}
          </span>
          </div>
            </div>
            <div className="text-gray text-sm">
            {data?.additionalOptions}
            </div>
        </div>
        <div className="p-6 border border-[#EBEBEB] rounded-b-xl">
          <div className="flex justify-between items-center pb-4 ">
            <p className="text-[#787878] text-sm font-medium">Max. Attendee Capacity<span className="text-black font-semibold ml-2">{data?.maxAttendees}</span></p>
            <p
              className={`text-[#787878] text-sm font-medium`}
            >
              Min. Attendee Capacity<span className="text-black font-semibold ml-2">{data?.minAttendees}</span>
            </p>
          </div>
          
          <div className="flex justify-between py-4 border-t border-[#DFE4EA]">
            <div className="w-full">
              <p className="text-gray font-medium text-xs">
                {data?.label}
              </p>
              <p className="text-[#787878] text-sm font-medium flex justify-between w-full">
              Minimum Purchase Requirement GHS{" "}
              <span className="text-[#00AB9E] text-base font-semibold">{data?.minPurchase}</span>
              </p>
              <p className="text-[#787878] text-sm font-medium flex justify-between w-full">
              Price Per Attendee{" "}
              <span className="text-[#00AB9E] text-base font-semibold">{data?.minPurchase}</span>
              </p>
            </div>
            {/* <div className="flex items-center gap-2 flex-col">
            <span className="text-[#00AB9E] text-base font-semibold">{data?.minPurchase}</span>
            <span className="text-[#00AB9E] text-base font-semibold">{data?.minPurchase}</span>
            </div> */}
          </div>
        </div>
      </div>
        )
      })}
    </div>
    <div className="flex gap-4 py-4 justify-end">
        <CustomButton
          type="submit"
          name="I’m Ready to Publish!"
          color={" "}
          buttonClass="bg-gradient-primary font-semibold text-white text-sm px-7 rounded-xl py-4"
        />
      </div>
  </div>
  )
}
