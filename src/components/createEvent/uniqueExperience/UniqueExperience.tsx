import { Textarea } from "flowbite-react";
import CustomButton from "../../atom/button/CustomButton";
import InputFeild from "../../atom/inputFeild/InputFeild";
import { minusIcon, plusIcon } from "../../../assets/Icons";
import { SingleSelect } from "../../atom/singleSelect/SingleSelect";
import { useState } from "react";
import { UniqeStore, UniqueToggle } from "../../store/Toggle";
import UniqueExperienceCard from "../uniqueExperienceCard/uniqueExperienceCard";

export default function UniqueExperience() {
  const [showInfo, setShowInfo] = useState(0);
  const { uniqueData, setUniqeData } = UniqeStore();
  const {showUnique,setShowUnique} = UniqueToggle();
  
  const [formData, setFormData] = useState({
    buttonLabel: "",
    experienceName: "",
    description: "",
    maxAttendees: "",
    minAttendees: "",
    minPurchase: "",
    priceSetting: "",
    additionalOptions: "",
  });

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleNext = () => {
    if (showInfo < 6) {
      setShowInfo(showInfo + 1);
    }
    // Store the current form data to global store
    if(showInfo==6){
      setUniqeData(formData);
      setShowUnique(true)
    }
  };

  const handleAdd=()=>{
    if (showInfo < 6) {
      setShowInfo(showInfo + 1);
    }
    // Store the current form data to global store
    if(showInfo==6){
      setUniqeData(formData);
      setShowUnique(true)
      setShowInfo(0);
    }
  }
  const handleBack = () => {
    if (showInfo <= 6 && showInfo > 0) {
      setShowInfo(showInfo - 1);
    }
  };

  return (
    <>
    
    <div className="w-full flex justify-center items-center flex-col">
      {showInfo === 0 && (
        <div className="bg-[#EFF9FF] p-12 w-[80%] rounded-xl">
          <p className="text-black font-medium text-lg pb-2">
            Create a Unique Experience
          </p>
          <InputFeild
            name="buttonLabel"
            value={formData.buttonLabel}
            change={handleInputChange}
            placeHolder="Book a Private Tour"
            labelClass="text-gray text-sm"
            color="primary"
            inputClass="!p-0 "
            type="text"
            labelValue="What should the button say that guests will click to book this experience?"
          />
        </div>
      )}

      <div className="w-[80%]">
        {showInfo > 0 && <p className="w-full text-end text-gray text-sm pb-2">0{showInfo}/06</p>}

        {showInfo === 1 && (
          <div className="border border-[#EBEBEB] p-12 rounded-xl">
            <p className="text-black font-medium text-lg pb-2">Info Details</p>
            <InputFeild
              name="experienceName"
              value={formData.experienceName}
              change={handleInputChange}
              placeHolder="Example: ‘Backstage Meet & Greet"
              labelClass="text-gray text-sm"
              color="primary"
              inputClass="!p-0 "
              type="text"
              labelValue="What is the name of the experience you want to offer?"
            />
          </div>
        )}

        {showInfo === 2 && (
          <div className="border border-[#EBEBEB] p-12 rounded-xl">
            <p className="text-black font-medium text-lg pb-2">Info Details</p>
            <p className="text-gray text-sm pb-2">
              What is the name of the experience you want to offer?
            </p>
            <Textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              id="description"
              rows={4}
              placeholder="Please provide a brief description of this experience"
              className="p-6 border border-grayBorder rounded-xl resize-none textAreaShadow bg-[#F8F8F8]"
            />
          </div>
        )}

        {showInfo === 3 && (
          <div className="border border-[#EBEBEB] p-12 rounded-xl">
            <p className="text-black font-medium text-lg pb-2">Info Details</p>
            <p className="text-gray text-sm pb-2">
              How many attendees can this experience accommodate?
            </p>
            <div className="flex gap-4">
              <InputFeild
                name="maxAttendees"
                value={formData.maxAttendees}
                change={handleInputChange}
                placeHolder="Max. Attendee Capacity"
                color="primary"
                classIconRight="[&>svg]:w-[24px] [&>svg]:h-[24px]"
                classIconLeft="cursor-pointer"
                iconLeft={minusIcon}
                iconRight={plusIcon}
                inputClass="!p-0 "
                type="text"
              />
              <InputFeild
                name="minAttendees"
                value={formData.minAttendees}
                change={handleInputChange}
                placeHolder="Min. Attendee Capacity"
                color="primary"
                classIconRight="[&>svg]:w-[24px] [&>svg]:h-[24px]"
                classIconLeft="cursor-pointer"
                iconLeft={minusIcon}
                iconRight={plusIcon}
                inputClass="!p-0 "
                type="text"
              />
            </div>
          </div>
        )}

        {showInfo === 4 && (
          <div className="border border-[#EBEBEB] p-12 rounded-xl">
            <p className="text-black font-medium text-lg pb-2">Info Details</p>
            <InputFeild
              name="minPurchase"
              value={formData.minPurchase}
              change={handleInputChange}
              placeHolder="Minimum 200 GHS"
              labelClass="text-gray text-sm"
              color="primary"
              inputClass="!p-0 "
              type="text"
              labelValue="Is there a minimum purchase requirement for booking this experience?"
            />
          </div>
        )}

        {showInfo === 5 && (
          <div className="border border-[#EBEBEB] p-12 rounded-xl">
            <p className="text-black font-medium text-lg pb-2">Info Details</p>
            <p className="text-gray text-sm pb-2">
              How would you like to set the price for this experience?
            </p>
            <SingleSelect
              name="priceSetting"
              value={formData.priceSetting}
              onChange={(val) => setFormData({ ...formData, priceSetting: val })}
              placeholder="Select"
            />
          </div>
        )}

        {showInfo === 6 && (
          <div className="border border-[#EBEBEB] p-12 rounded-xl">
            <p className="text-black font-medium text-lg pb-2">Info Details</p>
            <p className="text-gray text-sm pb-2">
              Would you like to offer any additional options for this experience?
            </p>
            <Textarea
              name="additionalOptions"
              value={formData.additionalOptions}
              onChange={handleInputChange}
              id="description"
              rows={4}
              placeholder="Include an exclusive event t-shirt or a signed event poster"
              className="p-6 border border-grayBorder rounded-xl resize-none textAreaShadow bg-[#F8F8F8]"
            />
          </div>
        )}
      </div>

      {uniqueData?.length ? <div className="w-[80%] flex justify-end pt-4"><CustomButton
          type="button"
          name="Add"
          action={handleAdd}
          color={""}
          icon={plusIcon}
          iconClass="mr-2"
          buttonClass="border font-semibold text-[#006CAE] text-sm rounded-full px-7 py-2"
        /></div>:<div className="flex gap-4 py-4 justify-end ">
        <CustomButton
          type="button"
          name="Back"
          action={handleBack}
          color={""}
          buttonClass="border font-semibold text-gray text-sm rounded-xl px-7 py-4"
        />
        <CustomButton
          type="submit"
          name="Save and Next"
          color={""}
          action={handleNext}
          buttonClass="bg-gradient-primary font-semibold text-white text-sm px-7 rounded-xl py-4"
        />
      </div>}
    </div>
    {uniqueData?.length && <div className="w-full"><UniqueExperienceCard/></div> }
    
    </>
  );
}
