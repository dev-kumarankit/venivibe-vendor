import { Breadcrumb } from "flowbite-react";
import CustomButton from "../../components/atom/button/CustomButton";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { eventManagementService } from "../../services/eventManagementService/EventManagementService";
import Loader from "../../components/atom/loader/Loader";
import { useFormik } from "formik";
import * as Yup from "yup";
import eventbanner from "../../assets/banner1.jpg";
import userImage from "../../assets/team.jpg";
import { getToast } from "../../components/atom/toastify/Toastify";
import { calenderPrimary, close, dollarPrimary, fav, iconBackShadow, iconClose, iconCommision, insta, locArrow, locationPriary, ratingStar, shareIcon, startWhite, ticketPrimary, tiktok, time, X, youtube } from "../../assets/Icons";
import { IoIosArrowRoundBack } from "react-icons/io";

export default function EventDetails() {
  const {
    listSingleEventDetailsApi,
    getSingleEventLoading,
    getSingleEventData,
  }: any = eventManagementService();

  const [ShowOrganizerDetail, setShowOrganizerDetail] = useState(false);
  const [viewEventGallery, setViewEventGallery] = useState(false)

  const ShowwOrganizerComponent = () => {
    setShowOrganizerDetail(true)
  }


  const { id } = useParams();

  const getEventDetails = () => {
    if (id) {
      const data = {
        id: id,
      };
      listSingleEventDetailsApi(data).then((data: any) => {
        if (data?.success) {
          getToast("success", data?.message);
        } else {
          getToast("error", data?.message || "Error Occured");
        }
      });
    }
  };

  useEffect(() => {
    getEventDetails();
  }, [id]);


  const navigate = useNavigate();



  const formik = useFormik({
    initialValues: {
      name: getSingleEventData?.name || "",
      venue: getSingleEventData?.venue || "",
      address: getSingleEventData?.address || "",
      latitude: getSingleEventData?.latitude || "",
      longitude: getSingleEventData?.longitude || "",
      refund_policy: getSingleEventData?.refund_policy || "",
      about: getSingleEventData?.about || "",
      type: getSingleEventData?.type || "",
      x_url: getSingleEventData?.x_url || "",
      insta_url: getSingleEventData?.insta_url || "",
      tiktok_url: getSingleEventData?.tiktok_url || "",
      youtube_url: getSingleEventData?.youtube_url || "",
      start_date: getSingleEventData?.start_date || "",
      end_date: getSingleEventData?.end_date || "",
      start_time: getSingleEventData?.start_time || "",
      end_time: getSingleEventData?.end_time || "",
      is_sponsored: getSingleEventData?.is_sponsored || false,
      is_approved: getSingleEventData?.is_approved || "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Event Name is required"),
      venue: Yup.string().required("Venue is required"),
      address: Yup.string().required("Address is required"),
      latitude: Yup.string().required("Latitude is required"),
      longitude: Yup.string().required("Longitude is required"),
      refund_policy: Yup.string().required("Refund Policy is required"),
      about: Yup.string().required("About is required"),
      type: Yup.string().required("Type is required"),
      x_url: Yup.string().url("Invalid URL"),
      insta_url: Yup.string().url("Invalid URL"),
      tiktok_url: Yup.string().url("Invalid URL"),
      youtube_url: Yup.string().url("Invalid URL"),
      start_date: Yup.date().required("Start Date is required"),
      end_date: Yup.date()
        .required("End Date is required")
        .min(Yup.ref("start_date"), "End Date can't be before Start Date"),
      start_time: Yup.string().required("Start Time is required"),
      end_time: Yup.string().required("End Time is required"),
      is_sponsored: Yup.boolean(),
      is_approved: Yup.string().oneOf(["0", "1"], "Invalid approval status"),
    }),

    onSubmit: async (values) => { },
    validateOnMount: false,
    validateOnBlur: false,
    enableReinitialize: true,
    validateOnChange: true,
  });


  const eventDate = new Date(getSingleEventData?.start_date);
  const formattedDate = eventDate.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });

  if (getSingleEventLoading) {
    return <Loader />;
  }

  return (
    <>

      {/* event details section --------------------- */}
      <div className="w-full min-h-screen p-4">
        <div className="w-full pb-3">
          <Breadcrumb
            aria-label="Default breadcrumb"
            className="cursor-pointer"
          >
            <Breadcrumb.Item
              onClick={() => {
                navigate("/events");
              }}
            >
              Dashboard
            </Breadcrumb.Item>
            <Breadcrumb.Item>
              Event
            </Breadcrumb.Item>
            <Breadcrumb.Item >
              <span className="text-secondary"> Event Details</span>
            </Breadcrumb.Item>
          </Breadcrumb>
        </div>
        <div className="w-full bg-white rounded-12 min-h-screen">

          {!viewEventGallery && <div className="w-full">
            <div className="w-full flex items-center justify-between flex-wrap p-6 pb-5">
              {/* event details heading----------------- */}
              <div className="w-full md:w-1/4">
                <span className="font-medium text-primary-text text-base">Event Details</span>
              </div>

              {/* event buttons ---- edit / view organizer detail & view event customizations---------- */}
              <div className="w-full md:w-3/4">
                <div className="w-full flex items-center justify-end gap-4">
                  {/* vew event customizations--------------------------------- */}
                  <CustomButton type="button" name='View Event Customization' size='sm' buttonClass="rounded-12 border border-[#637381] bg-transparent text-[#637381] enabled:hover:bg-transparent focus:ring-0 px-4 py-3" action={() => { navigate('/events/view-event-customization',{
                    state : {
                      eventId : getSingleEventData?.id 
                    }
                  }) }} />

                  {/* view event organiser details--------------------------------- */}
                  <CustomButton type="button" name='View Organizer Info' size='sm' buttonClass="rounded-12 border border-secondary-700 bg-transparent text-secondary-700 enabled:hover:bg-transparent focus:ring-0 px-4 py-3" action={ShowwOrganizerComponent} />

                  {/* edit event details button---------------------------------- */}
                  <CustomButton type="button" name='Edit Event' size='sm' buttonClass="rounded-12 border-0 border-transparent bg-gradient-primary text-white enabled:hover:bg-gradient-primary focus:ring-0 px-4 py-3" />
                </div>
              </div>
            </div>

            {/* event detail block ------------------ */}

            <div className="w-full flex flex-wrap px-4 pb-5">

              {/* event basic info--------------------- */}
              <div className="w-full lg:w-9/12 px-2">

                {/* event banner---------------------------------------------- */}

                <div className="w-full border-0 rounded-12  mb-5 relative" style={{ backgroundImage: `url(${getSingleEventData?.main_image})`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }}>
                  {/* Event gradient overlay */}
                  <div className="absolute  inset-0 bg-gradient-to-r from-[#1A2980] to-[#26D0CE] opacity-80 rounded-12"></div>

                  {/* Event rating on banner */}
                  <div className="relative w-full rating p-5 flex items-center justify-end z-10">
                    <div className="py-1 px-2 bg-[#FFBF2C] text-white flex items-center gap-x-1.5 rounded-[4px]">
                      <span>{startWhite}</span>
                      <span className="text-sm">5.0</span>
                    </div>
                  </div>

                  {/* Event text */}
                  <div className="relative w-full px-10 text-white z-10">
                    <div className="w-full">
                      <p className="w-full text-base font-medium leading-7 max-w-[370px]">{getSingleEventData?.name || ""}</p>
                      <p className="w-full text-xs leading-5  max-w-[500px]">{getSingleEventData?.about || "Event description goes here..."}</p>
                    </div>
                  </div>

                  {/* Event share and add to fav */}
                  <div className="relative w-full p-5 flex items-center justify-end gap-x-2 z-10">
                    <div className="size-6 rounded-full bg-white flex items-center justify-center">
                      <span>{shareIcon}</span>
                    </div>
                    <div className="size-6 rounded-full bg-white flex items-center justify-center">
                      <span>{fav}</span>
                    </div>
                  </div>
                </div>



                {/* event details location , time , ticket sales--------------------------- */}
                <div className="w-full flex items-stretch  justify-center gap-x-4 mb-5">

                  <div className="w-full md:w-1/3 p-5 shadow-light bg-white rounded-12">
                    <div className="w-full flex items-start">
                      <div className="size-11 flex items-center justify-center border border-primary rounded-12">
                        {locationPriary}
                      </div>

                      <div className="flex-auto pl-4">
                        <div className="w-full">
                          <span className="text-[#637381] text-xs">Venue</span>
                          <p className="font-medium text-sm text-primary-text">Hook Hall</p>
                          <p className="flex items-center gap-x-1.5 text-xs">
                            <span>{locArrow}</span>
                            <span className="block w-40 truncate pt-1"> {getSingleEventData?.address}</span>
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="w-full md:w-1/3 p-5 shadow-light bg-white rounded-12">
                    <div className="w-full flex items-start">
                      <div className="size-11 flex items-center justify-center border rounded-12 border-primary">
                        {calenderPrimary}
                      </div>

                      <div className="flex-auto pl-4">
                        <div className="w-full">
                          <span className="text-[#637381] text-xs">Event Date and Time</span>
                          <p className="font-medium text-sm text-primary-text pb-1">{getSingleEventData?.start_day}, {formattedDate}</p>
                          <span className="flex items-center gap-x-1.5 text-xs">
                            <span>{time}</span>
                            <span> {getSingleEventData?.start_time} - {getSingleEventData?.end_time}</span>
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="w-full md:w-1/3 p-5 shadow-light bg-white rounded-12">
                    <div className="w-full flex items-start">
                      <div className="size-11 flex items-center rounded-12 border justify-center border-primary">
                        {ticketPrimary}
                      </div>

                      <div className="flex-auto pl-4">
                        <div className="w-full">
                          <span className="text-[#637381] text-xs">Total Ticket Sale</span>
                          <p className="font-medium text-sm text-primary-text">98</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* event details total amount earned , total admin commision ----------------- */}

                <div className="w-full flex items-stretch gap-x-4 justify-center mb-5">
                  <div className="flex-auto p-5 shadow-light bg-white rounded-12">
                    <div className="w-full flex items-center">
                      <div className="size-11 flex items-center justify-center border border-primary rounded-12">
                        {dollarPrimary}
                      </div>

                      <div className="flex-auto pl-4">
                        <div className="w-full flex justify-between items-center">
                          <p className="font-medium text-sm text-primary-text py-1">Amount Earned</p>
                          <p className="text-primary font-semibold ">1334.45 <span className="text-primary font-normal">GHS</span></p>

                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex-auto p-5 shadow-light bg-white rounded-12">
                    <div className="w-full flex items-center">
                      <div className="size-11 flex items-center justify-center border border-primary rounded-12">
                        {iconCommision}
                      </div>

                      <div className="flex-auto pl-4">
                        <div className="w-full flex justify-between items-center">
                          <p className="font-medium text-sm text-primary-text py-1">Total Admin Comission</p>
                          <p className="text-primary font-semibold ">332.45<span className="text-primary font-normal">GHS</span></p>

                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* event reviews & total attendees ------------------------------ */}
                <div className="w-full flex items-stretch gap-x-4 justify-center mb-5">

                  {/* event attendees ---------------------------------------------------------------- */}
                  <div className="flex-1 p-5 bg-[#F0F4F6] rounded-12 max-h-[450px] overflow-y-scroll cursor-pointer">
                    <div className="w-full pb-3">
                      <p className="font-medium text-primary-text">Attendees (06)</p>
                    </div>

                    <div className="w-full px-1.5 py-2 border-b border-[#DFE4EA] mb-3">
                      <div className="w-full">
                        <div className="w-full flex items-center gap-x-2 mb-2">
                          <div className="size-7 flex items-center justify-center rounded-full">
                            <img src={userImage} alt="userimage" className="object-cover rounded-full" />
                          </div>
                          <div className="flex-auto">
                            <p className="text-primary-text">John Dow</p>
                          </div>
                        </div>
                        <span className="text-xs text-[#637381]">John Dow@gmail.com</span>
                      </div>
                    </div>
                    <div className="w-full px-1.5 py-2 border-b border-[#DFE4EA] mb-3">
                      <div className="w-full">
                        <div className="w-full flex items-center gap-x-2 mb-2">
                          <div className="size-7 flex items-center justify-center rounded-full">
                            <img src={userImage} alt="userimage" className="object-cover rounded-full" />
                          </div>
                          <div className="flex-auto">
                            <p className="text-primary-text">John Dow</p>
                          </div>
                        </div>
                        <span className="text-xs text-[#637381]">John Dow@gmail.com</span>
                      </div>
                    </div>
                    <div className="w-full px-1.5 py-2 border-b border-[#DFE4EA] mb-3">
                      <div className="w-full">
                        <div className="w-full flex items-center gap-x-2 mb-2">
                          <div className="size-7 flex items-center justify-center rounded-full">
                            <img src={userImage} alt="userimage" className="object-cover rounded-full" />
                          </div>
                          <div className="flex-auto">
                            <p className="text-primary-text">John Dow</p>
                          </div>
                        </div>
                        <span className="text-xs text-[#637381]">John Dow@gmail.com</span>
                      </div>
                    </div>
                    <div className="w-full px-1.5 py-2 border-b border-[#DFE4EA] mb-3">
                      <div className="w-full">
                        <div className="w-full flex items-center gap-x-2 mb-2">
                          <div className="size-7 flex items-center justify-center rounded-full">
                            <img src={userImage} alt="userimage" className="object-cover rounded-full" />
                          </div>
                          <div className="flex-auto">
                            <p className="text-primary-text">John Dow</p>
                          </div>
                        </div>
                        <span className="text-xs text-[#637381]">John Dow@gmail.com</span>
                      </div>
                    </div>
                    <div className="w-full px-1.5 py-2 border-b border-[#DFE4EA] mb-3">
                      <div className="w-full">
                        <div className="w-full flex items-center gap-x-2 mb-2">
                          <div className="size-7 flex items-center justify-center rounded-full">
                            <img src={userImage} alt="userimage" className="object-cover rounded-full" />
                          </div>
                          <div className="flex-auto">
                            <p className="text-primary-text">John Dow</p>
                          </div>
                        </div>
                        <span className="text-xs text-[#637381]">John Dow@gmail.com</span>
                      </div>
                    </div>
                  </div>

                  {/* event reviews----------------------------------------------------------- */}
                  <div className="flex-1 p-5 bg-[#F0F4F6] rounded-12 max-h-[450px] overflow-y-scroll cursor-pointer">
                    <div className="w-full pb-3 ">
                      <p className="font-medium text-primary-text">Event Review</p>
                    </div>

                    <div className="w-full bg-[#F8F8F8] rounded-12 p-6 mb-3">
                      <div className="w-full">
                        <div className="w-full flex items-center justify-between  mb-2">
                          <div className="w-full lg:w-1/2">
                            <div className="w-full flex items-center justify-center gap-x-3">
                              <div className="size-9 flex items-center justify-center rounded-full">
                                <img src={userImage} alt="userimage" className="object-cover rounded-full" />
                              </div>
                              <div className="flex-auto">
                                <p className="text-primary-text">John Dow</p>
                              </div>
                            </div>
                          </div>

                          <div className="w-full lg:w-1/2">
                            <div className="w-full flex items-center justify-end gap-x-2">
                              <span> 5.0</span>
                              <div className="w-auto flex items-center justify-center gap-x-1">
                                <span>{ratingStar}</span>
                                <span>{ratingStar}</span>
                                <span>{ratingStar}</span>
                                <span>{ratingStar}</span>
                                <span>{ratingStar}</span>

                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="w-full pb-2.5">
                          <p className="text-xs text-[#637381]">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since</p>
                        </div>

                        <div className="w-full">
                          <span className="text-sm text-[#637381]"> 14 Hours Ago</span>
                        </div>

                      </div>
                    </div>
                    <div className="w-full bg-[#F8F8F8] rounded-12 p-6 mb-3">
                      <div className="w-full">
                        <div className="w-full flex items-center justify-between  mb-2">
                          <div className="w-full lg:w-1/2">
                            <div className="w-full flex items-center justify-center gap-x-3">
                              <div className="size-9 flex items-center justify-center rounded-full">
                                <img src={userImage} alt="userimage" className="object-cover rounded-full" />
                              </div>
                              <div className="flex-auto">
                                <p className="text-primary-text">John Dow</p>
                              </div>
                            </div>
                          </div>

                          <div className="w-full lg:w-1/2">
                            <div className="w-full flex items-center justify-end gap-x-2">
                              <span> 5.0</span>
                              <div className="w-auto flex items-center justify-center gap-x-1">
                                <span>{ratingStar}</span>
                                <span>{ratingStar}</span>
                                <span>{ratingStar}</span>
                                <span>{ratingStar}</span>
                                <span>{ratingStar}</span>

                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="w-full pb-2.5">
                          <p className="text-xs text-[#637381]">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since</p>
                        </div>

                        <div className="w-full">
                          <span className="text-sm text-[#637381]"> 14 Hours Ago</span>
                        </div>

                      </div>
                    </div>

                    <div className="w-full bg-[#F8F8F8] rounded-12 p-6 mb-3">
                      <div className="w-full">
                        <div className="w-full flex items-center justify-between  mb-2">
                          <div className="w-full lg:w-1/2">
                            <div className="w-full flex items-center justify-center gap-x-3">
                              <div className="size-9 flex items-center justify-center rounded-full">
                                <img src={userImage} alt="userimage" className="object-cover rounded-full" />
                              </div>
                              <div className="flex-auto">
                                <p className="text-primary-text">John Dow</p>
                              </div>
                            </div>
                          </div>

                          <div className="w-full lg:w-1/2">
                            <div className="w-full flex items-center justify-end gap-x-2">
                              <span> 5.0</span>
                              <div className="w-auto flex items-center justify-center gap-x-1">
                                <span>{ratingStar}</span>
                                <span>{ratingStar}</span>
                                <span>{ratingStar}</span>
                                <span>{ratingStar}</span>
                                <span>{ratingStar}</span>

                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="w-full pb-2.5">
                          <p className="text-xs text-[#637381]">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since</p>
                        </div>

                        <div className="w-full">
                          <span className="text-sm text-[#637381]"> 14 Hours Ago</span>
                        </div>

                      </div>
                    </div>

                  </div>

                </div>

              </div>

              {/* event location & event gallery ---------------- */}
              <div className="w-full lg:w-3/12 px-2">
                <div className="w-full">

                  {/* event details ( about event ---------------- ) */}
                  <div className="w-full rounded-12 bg-[#F0F4F6] p-5 mb-4">
                    <div className="w-full pb-3 border-b border-[#DFE4EA]">
                      <p className="w-full pb-2 text-primary-text font-semibold">About Event</p>
                      <span className="text-[#637381] text-xs">
                        {getSingleEventData?.about}
                      </span>
                    </div>

                    <div className="w-full pt-4 px-6">
                      <div className="w-full flex items-center justify-between">
                        <div className="size-4 flex items-center justify-between">
                          <span>{X}</span>
                        </div>
                        <div className="size-4 flex items-center justify-between">
                          <span>{insta}</span>
                        </div>

                        <div className="size-4 flex items-center justify-between">
                          <span>{tiktok}</span>
                        </div>

                        <div className="size-4 flex items-center justify-between">
                          <span>{youtube}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* event gallery ------------------------------ */}
                  <div className="w-full rounded-12 bg-[#F0F4F6] p-5 mb-4 cursor-pointer" onClick={()=>{setViewEventGallery(true)}}>
                    <div className="w-full flex items-center justify-between pb-3">
                      <p className="flex-auto pb-2 text-primary-text font-semibold">Event Gallary</p>
                      <span className="text-secondary font-semibold" onClick={()=>{setViewEventGallery(true)}}>View All</span>
                    </div>

                    <div className="w-full rounded-12">
                      <img src={eventbanner} alt="event banner" className="rounded-12" />
                    </div>
                  </div>

                </div>
              </div>

            </div>
          </div>}


          {/* event gallery section -------------------------- */}
          {viewEventGallery && <div className="w-full">
            <div className="w-full flex items-center justify-between p-6">
              <span onClick={()=>{setViewEventGallery(false)}} className="cursor-pointer size-[50px] text-2xl flex items-center justify-center shadow-light rounded-[16px]"><IoIosArrowRoundBack /></span>
              <span className="text-[#212121] font-semibold text-base"> Event Gallary</span>
              <span onClick={()=>{setViewEventGallery(false)}}>{iconClose} </span>
            </div>
            <div className="w-full">
              <div className="w-full flex items-center justify-start flex-wrap gap-y-4 px-4">
                {getSingleEventData && Array.isArray(getSingleEventData?.images) && getSingleEventData.images.map((image : string, index:number) => (
                  <div key={index} className="w-full md:w-1/3 px-2">
                    <div className="w-full rounded-12 min-h-[230px]">
                      <img src={image} alt="" className="rounded-12 object-cover" />
                    </div>
                  </div>
                ))}

              </div>
            </div>
          </div>}

        </div>
      </div>



      {/* event details block end---------------------------- */}

      {/* event organiser details------------------------------------ */}
      <div className={`w-full fixed  organizer-detail bg-[#0000009c] inset-x-0 inset-y-0  flex transition-opacity duration-500 ease-smooth items-stretch justfy-end z-[1080] overflow-hidden flex-row-reverse ${ShowOrganizerDetail ? 'opacity-100 visible' : 'opacity-0 invisible'}`}>
        <div className={` w-full max-w-[480px] overflow-hidden flex transition-transform duration-500 ease-smooth items-start min-h-full bg-white shadow-light overflow-y-scroll ${ShowOrganizerDetail ? 'translate-x-0' : 'translate-x-[500px]'}`}>
          <div className="w-full">
            <div className="w-full p-6  max-w-[480px] flex items-center justify-between pb-5 sticky bg-white top-0">
              <span className="font-medium text-primary-text">Event Organizer Details</span>
              <span className="cursor-pointer" onClick={() => { setShowOrganizerDetail(false) }}>{close}</span>
            </div>

            <div className="w-full bg-white p-6">
              <div className="w-full max-w-[480] rounded-12 pb-5">
                <img src={getSingleEventData?.main_image} alt="eventbanner" className="rounded-12" />
              </div>

              <div className="w-full pb-6 cursor-pointer flex flex-col">
                <span className="font-medium text-primary-text text-sm mb-1">{getSingleEventData?.name || ''}</span>
                <span className="text-[#637381] text-xs">Event Hosted 10</span>
              </div>

              <div className="w-full">
                <div className="w-full px-5 py-3 bg-[#F8F8F8] rounded-[8px] mb-4">
                  <span>{getSingleEventData?.organizer_details?.name}</span>
                </div>
                <div className="w-full px-5 py-3 bg-[#F8F8F8] rounded-[8px] mb-4">
                  <span>{getSingleEventData?.organizer_details?.email}</span>
                </div>
                <div className="w-full px-5 py-3 bg-[#F8F8F8] rounded-[8px] mb4">
                  <span>{getSingleEventData?.organizer_details?.phone}</span>
                </div>

              </div>
            </div>

            {/* edit organiser info----------------------------- */}
            <div className="w-full sticky bottom-0 bg-white p-6">
              <div className="w-full flex items-center justify-center gap-x-4">
                {/* back button-------------------------------------- */}
                <CustomButton type="button" name="Back" size="lg" buttonClass="flex-auto px-6 py-3 border border-[#637381] text-[#637381] bg-transparent enabled:hover:bg-transparent focus:ring-0 " action={() => { setShowOrganizerDetail(false) }} />

                {/* edit organiser info ------------------------------------------ */}
                <CustomButton type="button" name="Edit" size="lg" buttonClass="flex-auto px-6 py-3 border-0 border-transparent text-white bg-gradient-primary enabled:hover:bg-gradient-primary focus:ring-0 " />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
