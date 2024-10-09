import { useEffect, useState } from "react";
import CreatableSelect from "react-select/creatable";

// Define the type for options as just strings
interface CustomLabelSelectProps {
  selectedValue: string[]; // Array of strings
  handleChange: (newValue: string[]) => void;
}

const CustomLabelSelect: React.FC<CustomLabelSelectProps> = ({
  selectedValue,
  handleChange,
}) => {
  const [options, setOptions] = useState<{ value: string; label: string }[]>([]);

  useEffect(() => {
    // Convert the array of strings to the format required by react-select
    if (selectedValue) {
      const formattedOptions = selectedValue.map((tag) => ({
        value: tag,
        label: tag,
      }));
      setOptions(formattedOptions);
    }
  }, [selectedValue]);

  const handleSelectChange = (newValue: any) => {
    // Convert selected options back to array of strings
    const newTags = newValue ? newValue.map((option: any) => option.value) : [];
    handleChange(newTags); // Pass updated array of strings to parent
  };

  return (
    <div className="w-[300px]">
      <CreatableSelect
        isMulti
        options={options} // Options derived from selectedValue
        value={options} // Show currently selected values
        onChange={handleSelectChange} // Handle changes
        placeholder="Search or create tags"
      />
    </div>
  );
};

export default CustomLabelSelect;
