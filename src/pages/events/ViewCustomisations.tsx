import { iconDelete, iconEdit, iconView } from "../../assets/Icons";

export default function Viewcustomisations() {

    return (

        <>
            <div className="w-full px-4 py-4">
                <div className="w-full flex items-center flex-wrap gap-y-4">
                    <p className="text-[#0C0C0C] text-base mx-auto text-center w-full md:max-w-3xl">Add-on allow customers to personalize their event experience. For example, select drink options, add extra goodies, and more.</p>

                    {/* addon list loop here -------------------------------- */}

                    <div className="w-full md:w-2/4 px-2 cursor-pointer">
                        <div className="w-full">
                            {/* addon hader start---------- */}
                            <div className="w-full rounded-t-12 bg-[#EFF9FF] px-6 py-4 flex items-center justify-between">
                                <span className="font-semibold text-sm text-[#0C0C0C]">Add-Ons 1 </span>
                                <span>{iconEdit}</span>
                            </div>

                            {/* addon body start----------------------- */}
                            <div className="w-full rounded-b-12 border border-[#EBEBEB] px-6 py-4">

                                {/* adon choosed ----------------- */}
                                <div className="w-full pb-4 border-b border-[#DFE4EA] flex items-center justify-between mb-4">
                                    <span className="text-sm font-medium text-[#212121]">Choose Alcohol</span>
                                    <p className="rounded-full py-1 px-3 flex items-center justify-center border border-[#00AB9E] text-[#05CD99]">Mandatory</p>
                                </div>

                                {/* addon choosed veraites--------------- */}
                                <div className="w-full pb-4 border-b border-[#DFE4EA] flex items-center justify-between mb-4">
                                    <div className="flex-auto">
                                        <span className="text-xs font-medium text-[#637381]">Champagne Bottle</span>
                                        <p className="w-full pt-1 flex items-center gap-x-2">
                                            <span className="text-base font-semibold text-[#00AB9E]">
                                                120.00 GHS
                                            </span>

                                            <span className="text-xs text-[#637381]">Small</span>
                                        </p>
                                    </div>

                                    <div className="flex flex-auto items-center justify-end gap-x-2">
                                        <span>{iconView}</span>
                                        <span>{iconDelete}</span>
                                    </div>
                                </div>

                                <div className="w-full pb-4 border-b border-[#DFE4EA] flex items-center justify-between mb-4">
                                    <div className="flex-auto">
                                        <span className="text-xs font-medium text-[#637381]">Champagne Bottle</span>
                                        <p className="w-full pt-1 flex items-center gap-x-2">
                                            <span className="text-base font-semibold text-[#00AB9E]">
                                                120.00 GHS
                                            </span>

                                            <span className="text-xs text-[#637381]">Small</span>
                                        </p>
                                    </div>

                                    <div className="flex flex-auto items-center justify-end gap-x-2">
                                        <span>{iconView}</span>
                                        <span>{iconDelete}</span>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>

                    <div className="w-full md:w-2/4 px-2 cursor-pointer">
                        <div className="w-full">
                            {/* addon hader start---------- */}
                            <div className="w-full rounded-t-12 bg-[#EFF9FF] px-6 py-4 flex items-center justify-between">
                                <span className="font-semibold text-sm text-[#0C0C0C]">Add-Ons 1 </span>
                                <span>{iconEdit}</span>
                            </div>

                            {/* addon body start----------------------- */}
                            <div className="w-full rounded-b-12 border border-[#EBEBEB] px-6 py-4">

                                {/* adon choosed ----------------- */}
                                <div className="w-full pb-4 border-b border-[#DFE4EA] flex items-center justify-between mb-4">
                                    <span className="text-sm font-medium text-[#212121]">Choose Alcohol</span>
                                    <p className="rounded-full py-1 px-3 flex items-center justify-center border border-[#00AB9E] text-[#05CD99]">Mandatory</p>
                                </div>

                                {/* addon choosed veraites--------------- */}
                                <div className="w-full pb-4 border-b border-[#DFE4EA] flex items-center justify-between mb-4">
                                    <div className="flex-auto">
                                        <span className="text-xs font-medium text-[#637381]">Champagne Bottle</span>
                                        <p className="w-full pt-1 flex items-center gap-x-2">
                                            <span className="text-base font-semibold text-[#00AB9E]">
                                                120.00 GHS
                                            </span>

                                            <span className="text-xs text-[#637381]">Small</span>
                                        </p>
                                    </div>

                                    <div className="flex flex-auto items-center justify-end gap-x-2">
                                        <span>{iconView}</span>
                                        <span>{iconDelete}</span>
                                    </div>
                                </div>

                                <div className="w-full pb-4 border-b border-[#DFE4EA] flex items-center justify-between mb-4">
                                    <div className="flex-auto">
                                        <span className="text-xs font-medium text-[#637381]">Champagne Bottle</span>
                                        <p className="w-full pt-1 flex items-center gap-x-2">
                                            <span className="text-base font-semibold text-[#00AB9E]">
                                                120.00 GHS
                                            </span>

                                            <span className="text-xs text-[#637381]">Small</span>
                                        </p>
                                    </div>

                                    <div className="flex flex-auto items-center justify-end gap-x-2">
                                        <span>{iconView}</span>
                                        <span>{iconDelete}</span>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>

                </div>
            </div>

        </>
    )
}