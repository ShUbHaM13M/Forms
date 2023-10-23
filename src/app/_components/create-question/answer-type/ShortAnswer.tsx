import { Input, InputProps } from "antd";

const ShortAnswer = ({ validationProps }: { validationProps: InputProps }) => {
  return <Input placeholder="Short answer" disabled {...validationProps} />;
};

export default ShortAnswer;
