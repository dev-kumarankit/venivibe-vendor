import React, { useState, ReactNode } from 'react';
import CustomButton from '../button/CustomButton';

interface TabItem {
    title: string;
    content: ReactNode;
}

interface TabProps {
    tabs: TabItem[];
}

const CustomAppTab: React.FC<TabProps> = ({ tabs }) => {
    const [activeTab, setActiveTab] = useState(0);

    return (
        <div>
            {/* Tab Header */}
           <div className="w-full p-6">
           <div className="flex  px-2 pt-5 bg-[#F8F8F8] rounded-12 ">
                {tabs.map((tab, index) => (
                    <CustomButton key={index} type='button' name={tab.title} action={()=>setActiveTab(index)} buttonClass={`px-5 py-2 mx-4 !rounded-b-none bg-transparent enabled:hover:bg-transparent focus:bg-transparent border-0 enbled:hover:bg-transparent focus:ring-0 rounded-t-12 ${activeTab === index ? 'bg-[#006CAE] text-white  rounded-t-12 ' : 'text-[#637381] bg-transparent'}`} />
                ))}
            </div>
           </div>

            {/* Tab Content */}
            <div className="w-full">
                {tabs[activeTab] && tabs[activeTab].content}
            </div>
        </div>
    );
};

export default CustomAppTab;
