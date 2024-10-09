import { Checkbox, Label } from "flowbite-react";

interface CheckboxProps {
  id?: string;
  label: React.ReactNode;
  defaultChecked?: boolean;
  checkboxClass?: any;
  checked?: any;
  onChange?: any;
  name?: any;
}

const FormCheckbox: React.FC<CheckboxProps> = ({
  id,
  label,
  checked,
  onChange,
  name,
  defaultChecked = false,
  checkboxClass,
}) => {
  return (
    <div className="flex items-center gap-2">
      <Checkbox
        id={id}
        defaultChecked={defaultChecked}
        name={name}
        checked={checked}
        onChange={onChange}
      />
      <Label htmlFor={id} className={`flex ${checkboxClass}`}>
        {label}
      </Label>
    </div>
  );
};

export default FormCheckbox;
