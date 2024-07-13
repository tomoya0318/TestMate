import { Checkbox } from '@chakra-ui/react';


type CustomCheckboxProps = {
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}
export const CustomCheckbox:React.FC<CustomCheckboxProps> = ({ label, checked, onChange }) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.checked);
  };

  return (
    <Checkbox size='lg' isChecked={checked} onChange={handleChange}>
      {label}
    </Checkbox>
  );
}