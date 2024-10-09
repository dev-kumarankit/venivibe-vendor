import { useEffect, useState } from "react";
import {
  addExperienceIcon,
  deleteIcon,
  grayEyeIcon,
  pencilIcon,
} from "../../../assets/Icons";
import CustomButton from "../../atom/button/CustomButton";
import ShowModalEditor from "../../atom/modal/ShowModal";
import { customStore, StepForm } from "../../store/Toggle";
import { eventManagementService } from "../../../services/eventManagementService/EventManagementService";
import Loader from "../../atom/loader/Loader";

export default function AddOnsCard() {
  const [show, setShow] = useState(false);
  const { setStepper }: any = StepForm();
  const {getEventCustomization,getEventCustomizationLoading,getEventCustomizationData,viewCustomization,getCustomizationData,editCustomization}:any = eventManagementService();
  const {customData,setCustomData}=customStore();
  const { addCustomizationApi }: any = eventManagementService();
  const eventId = localStorage.getItem("eventId");

  useEffect(()=>{
    getEventCustomization(eventId)
  },[eventId])

  const handleSave=async()=>{
await addCustomizationApi(customData).then((data)=>{
  if (data?.success) {
    setShow(true)
  }
}).catch((err)=>{
console.log(err)
})
  }
  
  const handleView=(id:any)=>{
    viewCustomization(id)
  }
  
  const handleEdit=async()=>{
    await editCustomization()
  }

  
  return (
    <div>
      {getEventCustomizationLoading && <Loader/>}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {customData?.map((data:any,customDataIndex:any)=>{
        console.log(data,"sssssssssss")
        return(
        <div className="w-full pt-4">
          <div className="bg-[#EFF9FF] flex justify-between px-6 py-4 rounded-t-xl">
            <p className="text-[#0C0C0C] font-semibold text-base">Add-Ons</p>
            <span className="[&>svg]:w-[24px] [&>svg]:h-[24px] cursor-pointer" onClick={handleEdit}>
              {pencilIcon}
            </span>
          </div>
          <div className="p-6 border border-[#EBEBEB] rounded-b-xl">
            <div className="flex justify-between items-center pb-4 ">
              <p className="text-black text-sm font-medium">{data?.title}</p>
              {data?.is_mandatory?<p
                className={`text-[#00AB9E] border border-[#00AB9E] bg-[#EFFEFB] rounded-xl text-xs px-3 py-1`}
              >
                Mandatory
              </p>:<p
                className={`text-gray border border-gray bg-[#F8F8F8] rounded-xl text-xs px-3 py-1`}
              >
                Optional
              </p>}
            </div>
            {data?.list?.map((listData:any)=>{
              console.log(listData,"listData123")
              return(
            <div className="flex justify-between py-4 border-t border-[#DFE4EA]">
              <div>
                <p className="text-gray font-medium text-xs">
                  {listData?.label}
                </p>
                <p className="text-[#00AB9E] text-base font-semibold">
                  {listData?.price} GHS{" "}
                  <span className="text-gray font-medium text-xs">{listData?.quantity}</span>
                </p>
              </div>
              <div className="flex items-center gap-2">
                <CustomButton
                  type="button"
                  icon={grayEyeIcon}
                  action={()=>handleView(data?.id)}
                  color={""}
                  iconClass="[&>svg]:w-[14px] [&>svg]:h-[14px]"
                  buttonClass="border border-gray rounded-full"
                />
                <CustomButton
                  type="button"
                  icon={deleteIcon}
                  color={""}
                  // action={()=>handleDelete(index,customDataIndex)}
                  iconClass="[&>svg]:w-[14px] [&>svg]:h-[14px]"
                  buttonClass="border border-[#EB5757] rounded-full"
                />
              </div>
            </div>
              )
            })}
            {/* <div className="flex justify-between pt-4 border-t border-[#DFE4EA]">
              <div>
                <p className="text-gray font-medium text-xs">
                  Champagne Bottle
                </p>
                <p className="text-[#00AB9E] text-base font-semibold">
                  120.00 GHS{" "}
                  <span className="text-gray font-medium text-xs">Small</span>
                </p>
              </div>
              <div className="flex items-center gap-2">
                <CustomButton
                  type="button"
                  icon={grayEyeIcon}
                  color={""}
                  iconClass="[&>svg]:w-[14px] [&>svg]:h-[14px]"
                  buttonClass="border border-gray rounded-full"
                />
                <CustomButton
                  type="button"
                  icon={deleteIcon}
                  color={""}
                  iconClass="[&>svg]:w-[14px] [&>svg]:h-[14px]"
                  buttonClass="border border-[#EB5757] rounded-full"
                />
              </div>
            </div> */}
          </div>
        </div>
          )
        })}
      </div>
      <div className="flex gap-4 py-4 justify-end">
          <CustomButton
            type="button"
            name="Back"
            // action={() => setShowTicket(false)}
            color={" "}
            buttonClass="border font-semibold text-gray text-sm rounded-xl px-7 py-4"
          />
          <CustomButton
            type="submit"
            name="Save and Next"
            color={" "}
            action={handleSave}
            buttonClass="bg-gradient-primary font-semibold text-white text-sm px-7 rounded-xl py-4"
          />
        </div>

        <ShowModalEditor
        show={true}
        close={() => setShow(false)}
        modalBody={
          <div className="w-3/5">
            <div>
              <span className="flex justify-center pb-4">{addExperienceIcon}</span>
              <p className="pb-4 text-[#212121] font-medium text-2xl">
              Add-Unique Experience
              </p>
            </div>
            <div className="text-[#343434] text-base">
             Would you like to offer a unique experience?
            </div>
            <div className="flex gap-4 py-4 justify-center">
              <CustomButton
                type="button"
                name="No"
                color={" "}
                buttonClass="border font-semibold text-gray text-sm rounded-xl px-7 py-4"
              />
              <CustomButton
                type="button"
                name="Yes"
                color={" "}
                action={()=>setStepper("4")}
                buttonClass="bg-gradient-primary font-semibold text-white text-sm px-7 rounded-xl py-4"
              />
            </div>
          </div>
        }
        modalBodyClass="flex items-center justify-center text-center"
      />
    </div>
  );
}
