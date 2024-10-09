import {
  blueUploadIcon,
  GreenCircleIcon,
  LightGreenCircleIcon,
  OrganizerIcon,
  OrganizerUnfillIcon,
  PayoutIconUnfill,
  PayoutwhiteIcon,
  PersonalInfoIconUnfill,
  ticketBlue,
  ticketBlueFill,
  uploadIconFill,
} from "../../assets/Icons";

import { StepForm } from "../store/Toggle";

interface GroupProgressProps {
  isStep1: boolean;
  isStep2: boolean;
  isStep3: boolean;
}

export default function EventProgress({
  isStep1,
  isStep2,
  isStep3,
}: GroupProgressProps) {
  const { stepper }: any = StepForm();

  return (
    <div className="flex justify-center ">
      <div className="flex items-center justify-center w-full  font-medium text-xs w-[60%]">
        <div
          className={`flex items-center flex-col w-[30%] relative  before:border
             before:w-[71%] before:absolute before:top-[24px] before:right-[-36%] ${
               stepper == "1" ||
               stepper == "2" ||
               stepper == "3" ||
               stepper == "4"
                 ? "before:border-secondaryBlue"
                 : "before:border-[#E7EBEF]"
             } `}
        >
          <span className="relative inline-block">
            {GreenCircleIcon}
            <span className="absolute inset-0 flex justify-center items-center">
              {PersonalInfoIconUnfill}
            </span>
          </span>

          <p
            className={`font-semibold  text-base pt-2 ${
              !isStep1 ? "text-secondary" : " text-gray"
            }`}
          >
            Personal
          </p>
        </div>
        <div
          className={`flex items-center flex-col w-[30%] relative  
            before:border before:w-[71%] before:absolute before:top-[24px] 
            before:right-[-36%] ${
              stepper == "2" || stepper == "3" || stepper == "4"
                ? "before:border-secondaryBlue"
                : "before:border-[#E7EBEF]"
            }`}
        >
          {stepper == "1" ? (
            <span className="relative inline-block">
              {GreenCircleIcon}
              <span className="absolute inset-0 flex justify-center items-center">
                {OrganizerIcon}
              </span>
            </span>
          ) : stepper == "2" || stepper == "3" || stepper == "4" ? (
            <span>{ticketBlueFill}</span>
          ) : (
            <span className="relative inline-block">
              {LightGreenCircleIcon}
              <span className="absolute inset-0 flex justify-center items-center">
                {OrganizerUnfillIcon}
              </span>
            </span>
          )}
          <p
            className={`font-semibold text-base pt-2 ${
              stepper == 1 || stepper == "2" || stepper == "3" || stepper == "4"
                ? "text-secondary"
                : " text-gray"
            }`}
          >
            Organizer
          </p>
        </div>

        <div
          className={
            stepper == "3" || stepper == "4"
              ? ` ${"flex items-center flex-col w-[30%] relative  before:border before:w-[71%] before:absolute before:top-[24px] before:right-[-36%]"} ${
                  stepper == "2" || stepper == "3" || stepper == "4"
                    ? "before:border-secondaryBlue"
                    : "before:border-[#E7EBEF]"
                }`
              : "flex items-center flex-col w-[30%]"
          }
        >
          {stepper == "2" ? (
            <span className="relative inline-block">
              {GreenCircleIcon}
              <span className="absolute inset-0 flex justify-center items-center">
                {PayoutwhiteIcon}
              </span>
            </span>
          ) : stepper == "3" || stepper == "4" ? (
            <span>{uploadIconFill}</span>
          ) : (
            <span className="relative inline-block">
              {LightGreenCircleIcon}
              <span className="absolute inset-0 flex justify-center items-center">
                {PayoutIconUnfill}
              </span>
            </span>
          )}
          <p
            className={`font-semibold  text-base pt-2 ${
              stepper == "2" || stepper == "3" || stepper == "4"
                ? "text-secondary"
                : " text-gray"
            }`}
          >
            Payout
          </p>
        </div>
      </div>
    </div>
  );
}
