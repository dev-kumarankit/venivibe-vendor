import { useRef, useState } from "react";
import CustomButton from "../../components/atom/button/CustomButton";
import { iconPdf, iconRemove } from "../../assets/Icons";

export default function UploadMenu() {

    const menuUploadRef = useRef<HTMLInputElement | null>(null);
    const venueUploadRef = useRef<HTMLInputElement | null>(null);

    const [menuData, setMenuData] = useState<string[]>([]);
    const [venueData, setVenueData] = useState<string[]>([]);


    const handleUploadMenuPdf = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files ? Array.from(e.target.files) : [];
        const newFiles = files.map((file) => URL.createObjectURL(file)); // Convert to blob URL for preview
        setMenuData((prev) => [...prev, ...newFiles]); // Add new files to the state
    };

    const handleUploadVenuePdf = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files ? Array.from(e.target.files) : [];
        const newFiles = files.map((file) => URL.createObjectURL(file)); // Convert to blob URL for preview
        setVenueData((prev) => [...prev, ...newFiles]); // Add new files to the state
    };

    const triggerMenuUploadInput = () => {
        if (menuUploadRef.current) {
            menuUploadRef.current.click(); // Trigger the file input click
        }
    }

    const triggerVenueUploadInput = () => {
        if (venueUploadRef.current) {
            venueUploadRef.current.click(); // Trigger the file input click
        }
    }

    return (
        <>
            <div className="w-full px-6 flex flex-col gap-y-4">
                <div className="w-full rounded-12 border border-[#EBEBEB] py-6">
                    <div className="w-full">
                        <p className="text-base font-medium pb-3 px-6">Upload Menu PDF (Optional)</p>
                        <div className="w-full flex iems-center justify-start flex-wrap gap-y-4 px-4 pb-3">
                            {menuData.map((file, index) => (
                                <div key={index} className="relative w-full md:w-1/3 px-2">
                                    <div className="relative rounded-12 bg-black bg-opacity-50 min-h-[168px] rounded-12 w-full">
                                        <img src={file} className="w-full rounded-12 h-full object-cover" style={{ maxHeight: '168px', objectFit: 'cover' }} />
                                        <div className="absolute rounded-12 top-[16px] right-[16px]  flex items-center justify-center">
                                            <span>
                                                {iconRemove}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                            <div className="relative w-full md:w-1/3 px-2">
                                <div className="w-full border-dashed border-2 rounded-12 border-[#637381] flex items-center justify-center min-h-[168px] cursor-pointer" onClick={triggerMenuUploadInput}>
                                    <div className="w-auto flex items-center justify-center flex-col gap-y-3">
                                        <span>{iconPdf}</span>
                                        <div className="w-auto text-center">
                                            <p className="text-[#212121] text-base font-medium leading-[28px]">Add a Menu PDF</p>
                                            <span className="text-xs text-[#637381]">Maxium of 6 fies</span>
                                            <input
                                                ref={menuUploadRef}
                                                id="file-upload"
                                                type="file"
                                                accept="application/pdf, image/*"
                                                multiple
                                                className="hidden"
                                                onChange={handleUploadMenuPdf}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>

                <div className="w-full rounded-12 border border-[#EBEBEB] py-6">
                    <div className="w-full">
                        <p className="text-base font-medium pb-3 px-6">Upload Venue PDF (optional)</p>
                        <div className="w-full flex iems-center justify-start flex-wrap gap-y-4 px-4 pb-3">
                            {venueData.map((file, index) => (
                                <div key={index} className="relative w-full md:w-1/3 px-2">
                                    <div className="relative rounded-12 bg-black bg-opacity-50 min-h-[168px] rounded-12 w-full">
                                        <img src={file} className="w-full rounded-12 h-full object-cover" style={{ maxHeight: '168px', objectFit: 'cover' }} />
                                        <div className="absolute rounded-12 top-[16px] right-[16px]  flex items-center justify-center">
                                            <span>
                                                {iconRemove}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                            <div className="relative w-full md:w-1/3 px-2">
                                <div className="w-full border-dashed border-2 rounded-12 border-[#637381] flex items-center justify-center min-h-[168px] cursor-pointer" onClick={triggerVenueUploadInput}>
                                    <div className="w-auto flex items-center justify-center flex-col gap-y-3">
                                        <span>{iconPdf}</span>
                                        <div className="w-auto text-center">
                                            <p className="text-[#212121] text-base font-medium leading-[28px]">Add a Venue PDF</p>
                                            <span className="text-xs text-[#637381]">Maximum of 6 files</span>
                                            <input
                                                ref={venueUploadRef}
                                                id="file-upload"
                                                type="file"
                                                accept="application/pdf, image/*"
                                                multiple
                                                className="hidden"
                                                onChange={handleUploadVenuePdf}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>

                <div className="w-full flex items-center justify-end gap-x-4 pb-6">
                    <CustomButton type="button" name="Cancel" buttonClass="border rounded-12 border-[#637381] bg-transparent enabled:hover:bg-transparent focus:ring-0 text-[#637381] font-semibold px-6 py-3" size="sm" />
                    <CustomButton type="button" name="Save" buttonClass="border rounded-12 border-0 bg-gradient-signin enabled:hover:bg-gradient-signin focus:ring-0 text-white px-6 py-3 font-semibold" size="sm" />
                </div>

            </div>
        </>
    )
}