import eventBanner from "../../assets/eventBanner.png";
import CustomButton from "../../components/atom/button/CustomButton";

export default function OrganizerDetail(props: any) {
  const { setOnShowOrganizer } = props || {};
  const handleBackClick = async () => {
    await setOnShowOrganizer(false);
  };
  return (
    <>
      <div className="w-full">
        <div className="w-full pb-5">
          <img
            src={eventBanner}
            alt="event banner"
            className="w-full h-44 rounded-xl object-cover"
          />
        </div>

        <div className="w-full pb-5">
          <p className="font-semibold text-lg text-primaryText">
            Beers and Brews
          </p>
          <span className="text-sm text-textSlate"> Event Hosted : 10</span>
        </div>

        <div className="w-full pb-5">
          <p className="font-semibold text-lg text-primaryText pb-4">
            Organizers Contact Information
          </p>
          <div className="w-full flex items-start justify-center gap-x-2">
            <div className="flex-1">
              <div className="w-full">
                <p className="text-sm  pb-2">Organizer Name</p>
                <p className="text-xs text-textSlate border border-hr rounded-xl p-2">
                  John Doe
                </p>
              </div>
            </div>
            <div className="flex-1">
              <div className="w-full ">
                <p className="text-sm  pb-2">Organizer Email</p>
                <p className="text-xs text-textSlate border border-hr rounded-xl p-2">
                  Johndoe@gmail.com
                </p>
              </div>
            </div>
            <div className="flex-1">
              <div className="w-full">
                <p className="text-sm pb-2">Organizer Contact</p>
                <p className="text-xs text-textSlate border border-hr rounded-xl p-2">
                  +918947840003
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full flex items-center gap-x-2 ">
          <CustomButton
            type="button"
            name="Back"
            action={handleBackClick}
            size="sm"
            buttonClass="rounded-md bg-transparent text-primaryText border border-primary  enabled:hover:bg-transparent focus:ring-0 focus:outline-0"
          />
          <CustomButton
            type="submit"
            name="Edit"
            size="sm"
            buttonClass="rounded-md bg-primary text-white border border-primary  enabled:hover:bg-primary focus:ring-0 focus:outline-0"
          />
        </div>
      </div>
    </>
  );
}
