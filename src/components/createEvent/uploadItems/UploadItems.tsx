import { useState } from "react";
import { addOns, closeIcon, pdfIcon } from "../../../assets/Icons";
import { StepForm } from "../../store/Toggle";
import CustomButton from "../../atom/button/CustomButton";
import ShowModalEditor from "../../atom/modal/ShowModal";
import { eventManagementService } from "../../../services/eventManagementService/EventManagementService";
import { getToast } from "../../atom/toastify/Toastify";
import Loader from "../../atom/loader/Loader";

export default function UploadItems() {
  const [photos, setPhotos] = useState<any>([]);
  const [show, setShow] = useState(false);
  const [venuePhotos, setVenuePhoto] = useState<any>([]);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [menuPdf, setMenuPdf] = useState<any>([]);
  const [VenuePdf, setVenuePdf] = useState<any>([]);
  const { stepper, setStepper }: any = StepForm();
  const { uploadEventPdfApi, uploadEventPdfLoading }: any =
    eventManagementService();

  const eventId = localStorage.getItem("eventId");

  const handleRemovePhoto = (index: number) => {
    setPhotos((prevPhotos: any[]) => prevPhotos.filter((_, i) => i !== index));
  };

  const handleRemoveVenuePhoto = (index: number) => {
    setVenuePhoto((prevPhotos: any[]) =>
      prevPhotos.filter((_, i) => i !== index)
    );
  };

  const handleAddPhoto = (event: any) => {
    if (event.target.files[0]) {
      const files = Array.from(event.target.files);
      const newPhoto = URL.createObjectURL(event.target.files[0]);
      setPhotos((prevPhotos: any) => [...prevPhotos, newPhoto]);
      setMenuPdf((prevFiles: any) => [...prevFiles, ...files]);
    }
  };

  const handleVenuePhoto = (event: any) => {
    if (event.target.files[0]) {
      const files = Array.from(event.target.files);
      const newPhoto = URL.createObjectURL(event.target.files[0]);
      setVenuePhoto((prevPhotos: any) => [...prevPhotos, newPhoto]);
      setVenuePdf((prevFiles: any) => [...prevFiles, ...files]);
    }
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const formData = new FormData();
    menuPdf.forEach((file: any) => {
      console.log(file, "filefile");
      formData.append("menu_pdfs", file);
    });
    VenuePdf.forEach((file: any) => {
      formData.append("venue_pdfs", file);
    });
    try {
      await uploadEventPdfApi({ data: formData, id: eventId }).then(
        (data: any) => {
          if (data?.success) {
            getToast("success", data?.message);
            setShow(true);
          } else {
            getToast("error", data?.message || "Error Occured");
          }
        }
      );
    } catch (error) {
      console.error("Error creating event:", error);
    }
  };

  return (
    <div>
      {uploadEventPdfLoading && <Loader />}
      <form onSubmit={handleSubmit}>
        <div className="p-6 border border-grayBorder rounded-xl my-4">
          <p className="pb-3">Upload Menu PDF (Optional)</p>
          <div>
            <div className="flex gap-4 flex-wrap">
              {photos.map((photo: any, index: any) => (
                <div
                  key={index}
                  className="h-[168px] min-w-[350px] relative rounded-xl hover:bg-black"
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                >
                  <img
                    src={photo}
                    alt={`uploaded ${index}`}
                    className="w-full h-full object-cover rounded-xl hover:opacity-60 group-hover:hover:opacity-60"
                    width="100"
                    height="100"
                  />
                  {hoveredIndex === index && (
                    <span
                      className="group"
                      onClick={() => handleRemovePhoto(index)}
                      style={{
                        position: "absolute",
                        top: "5px",
                        right: "5px",
                        cursor: "pointer",
                        backgroundColor: "rgba(255, 255, 255, 0.7)",
                        borderRadius: "50%",
                      }}
                    >
                      {closeIcon}
                    </span>
                  )}
                </div>
              ))}
              {photos.length < 6 && (
                <label className="add-photo-button">
                  <input
                    type="file"
                    accept="image/*"
                    style={{ display: "none" }}
                    onChange={handleAddPhoto}
                  />
                  <div className="rounded-xl cursor-pointer border-dashed border border-gray rounded py-4 px-6 flex  items-center flex-col gap-3 text-center  justify-center pb-4 h-[168px] min-w-[350px]">
                    <span role="img" aria-label="add photo">
                      {pdfIcon}
                    </span>
                    <p className="flex flex-col">
                      Add a Menu PDF{" "}
                      <span className="text-xs text-gray">
                        Maxium of 6 fies
                      </span>
                    </p>
                  </div>
                </label>
              )}
            </div>
          </div>
        </div>

        <div className="p-6 border border-grayBorder rounded-xl">
          <p className="pb-3">Upload Venue PDF (optional)</p>
          <div className="flex gap-4 flex-wrap">
            {venuePhotos.map((photo: any, index: any) => (
              <div
                key={index}
                className="h-[168px] min-w-[350px] relative rounded-xl hover:bg-black"
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                <img
                  src={photo}
                  alt={`uploaded ${index}`}
                  className="w-full h-full object-cover rounded-xl hover:opacity-60 group-hover:hover:opacity-60"
                  width="100"
                  height="100"
                />
                {hoveredIndex === index && (
                  <span
                    className="group"
                    onClick={() => handleRemoveVenuePhoto(index)}
                    style={{
                      position: "absolute",
                      top: "5px",
                      right: "5px",
                      cursor: "pointer",
                      backgroundColor: "rgba(255, 255, 255, 0.7)",
                      borderRadius: "50%",
                    }}
                  >
                    {closeIcon}
                  </span>
                )}
              </div>
            ))}
            {photos.length < 6 && (
              <label className="add-photo-button">
                <input
                  type="file"
                  accept="image/*"
                  style={{ display: "none" }}
                  onChange={handleVenuePhoto}
                />
                <div className="rounded-xl cursor-pointer border-dashed border border-gray rounded py-4 px-6 flex  items-center flex-col gap-3 text-center  justify-center pb-4 h-[168px] min-w-[350px]">
                  <span role="img" aria-label="add photo">
                    {pdfIcon}
                  </span>
                  <p className="flex flex-col">
                    Add a Menu PDF{" "}
                    <span className="text-xs text-gray">Maxium of 6 fies</span>
                  </p>
                </div>
              </label>
            )}
          </div>
        </div>
        <div className="flex gap-4 py-4 justify-end">
          <CustomButton
            type="button"
            name="Back"
            color={" "}
            buttonClass="border font-semibold text-gray text-sm rounded-xl px-7 py-4"
          />
          <CustomButton
            type="submit"
            name="Create Event"
            color={" "}
            buttonClass="bg-gradient-primary font-semibold text-white text-sm px-7 rounded-xl py-4"
          />
        </div>
      </form>
      <ShowModalEditor
        show={show}
        close={() => setShow(false)}
        modalBody={
          <div className="w-3/5">
            <div>
              <span className="flex justify-center pb-4">{addOns}</span>
              <p className="pb-4 text-[#212121] font-medium text-2xl">
                Add-Ons
              </p>
            </div>
            <div className="text-[#343434] text-base">
              Would you like to Offer extra items or services, like refreshments
              and merchandise, to enhance your event experience
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
                action={()=>setStepper("3")}
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
