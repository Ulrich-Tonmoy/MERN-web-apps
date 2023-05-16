import "./CustomInput.css";

interface CustomInputType {
  type: string;
  placeholder: string;
  name: string;
  value: any;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required: boolean;
}

const CustomInput = ({ type, placeholder, name, value, onChange, required }: CustomInputType) => {
  return (
    <div className="inputBox">
      <input type={type} name={name} value={value} onChange={onChange} required={required} />
      <span>{placeholder}</span>
    </div>
  );
};

export default CustomInput;
