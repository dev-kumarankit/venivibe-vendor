import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import "react-datepicker/dist/react-datepicker.css";
import "tailwindcss/tailwind.css";
// import { eventManagementService } from "../../services/eventManagementService/EventManagementService";
import { Breadcrumb, Textarea } from "flowbite-react";
import "react-datepicker/dist/react-datepicker.css";

import { useAdvancedMarkerRef } from "@vis.gl/react-google-maps";
import { format } from "date-fns";

import { useNavigate } from "react-router-dom";
import LoginBackground from "../../../components/atom/login/LoginBackground";
import { StepForm } from "../../../components/store/Toggle";
import { getToast } from "../../../components/atom/toastify/Toastify";
import Loader from "../../../components/atom/loader/Loader";
import AddInfo from "../../../components/createEvent/addInfo/AddInfo";
import EventProgress from "../../../components/eventProgress/EventProgress";
import Ticket from "../../../components/createEvent/ticket/Ticket";
import UploadItems from "../../../components/createEvent/uploadItems/UploadItems";
import AddOns from "../../../components/createEvent/addOns/AddOns";
import UniqueExperience from "../../../components/createEvent/uniqueExperience/UniqueExperience";
import { eventManagementService } from "../../../services/eventManagementService/EventManagementService";
import PersonalInfo from "../../../components/personalInfo/PersonalInfo";
import OrganizerInfo from "../../../components/organiserInfo/OrganiserInfo";
import PayoutInfo from "../../../components/payoutInfo/PayoutInfo";

const validationSchema = Yup.object().shape({
  name: Yup.string().required("Event Title is required"),
  organizer_name: Yup.string().required("Organizer Name is required"),
  venue: Yup.string().required("Venue is required"),
  address: Yup.string().required("Address is required"),
  start_date: Yup.date().required("Start Date is required").nullable(),
  end_date: Yup.date()
    .required("End Date is required")
    .min(Yup.ref("start_date"), "End Date must be after Start Date")
    .nullable(),
  about: Yup.string().required("Event Details are required"),
});

const SignUp = (props: any) => {
  const {
    createEventApi,
    createEventLoading,
    refundPolicy,
    eventCategory,
    eventCategoryData,
    refundData,
  }: any = eventManagementService();
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const [eventId, setEventId] = useState("");
  const [eventImages, setEventImages] = useState<string[]>([]);
  const [bannerImage, setBannnerImage] = useState<string[]>([]);
  const [bannerImageFiles, setBannerImageFiles] = useState<File[]>([]);
  const [eventImageFiles, setEventImageFiles] = useState<File[]>([]);
  const [selectedPlace, setSelectedPlace] =
    useState<google.maps.places.PlaceResult | null>(null);
  const [markerRef, marker] = useAdvancedMarkerRef();
  const [eventCreatedSuccessfully, setEventCreatedSuccessfully] =
    useState(false);
  const { stepper, setStepper }: any = StepForm();
  const navigate = useNavigate();
  console.log(eventCategoryData?.data?.eventCategories, "stepper234");

  const formik = useFormik({
    initialValues: {
      organizer_name: "",
      name: "",
      venue: "",
      address: "",
      start_date: "",
      end_date: "",
      start_time: "",
      end_time: "",
      about: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      const formData = new FormData();

      // Append each field from values individually
      for (const key in values) {
        if (values[key] && !(values[key] instanceof File)) {
          // If the value is an array (e.g., ticket_details), serialize it
          if (Array.isArray(values[key])) {
            formData.append(key, JSON.stringify(values[key]));
          } else {
            formData.append(key, values[key]);
          }
        }
      }
      // Append images separately

      eventImageFiles.forEach((file) => {
        formData.append("images", file);
      });

      bannerImageFiles.forEach((file) => {
        formData.append("main_image", file);
      });

      try {
        await createEventApi(formData).then((data: any) => {
          setEventId(data?.data?.event?.id);

          if (data?.success) {
            getToast("success", data?.message);
            setEventCreatedSuccessfully(true);
          } else {
            getToast("error", data?.message || "Error Occured");
            setEventCreatedSuccessfully(false);
          }
        });
        // await setCreateEvent(false);
        // await getDetails();
      } catch (error) {
        console.error("Error creating event:", error);
      }
    },
    validateOnChange: true,
    validateOnBlur: false,
    enableReinitialize: true,
  });



  return (
    <LoginBackground>
      {createEventLoading && <Loader />}

      <div className="flex flex-col gap-[52px]">
        <EventProgress isStep1={false} isStep2={false} isStep3={false} />
        {stepper=="0" && <PayoutInfo formik={undefined}/>}  
          {stepper=="1" && <OrganizerInfo formik={undefined}/>}  
         {/* {stepper=="2"&& <UploadItems/>}
         {stepper=="3" && <AddOns/>}
         {stepper=="4" && <UniqueExperience/>}  */}
      </div>
    </LoginBackground>
  );
};

export default SignUp;
