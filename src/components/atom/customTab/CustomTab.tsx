const     CustomTab = ({ tabs, activeTab, onTabClick,tabBg,tabContainer }:any) => {
  return (
    <div className={`${tabContainer} flex border-b border-grayBorder mt-5 mb-4`}>
      {tabs.map((tab:any) => (
        <div
          key={tab.id}
          className={`px-4 py-2 cursor-pointer rounded-t-xl transition-colors duration-300 ${
            activeTab === tab.id ? "bg-secondaryBlue text-white" : `${tabBg} bg-white text-black`
          }`}
          onClick={() => onTabClick(tab.id)}
        >
          {tab.label}
        </div>
      ))}
    </div>
  );
};

export default CustomTab;
