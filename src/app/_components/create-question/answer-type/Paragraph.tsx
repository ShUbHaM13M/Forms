import { Input } from "antd";

const Paragraph = () => {
  return (
    <Input.TextArea
      placeholder="Long paragraph"
      disabled
      style={{ resize: "none" }}
      allowClear
    />
  );
};

export default Paragraph;
