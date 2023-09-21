import { AnswerType } from "@/app/global";
import { Select, Space } from "antd";
import { answerMap } from "./utils";

const AnswerTypeSelect = ({
  onChange,
  defaultValue,
}: {
  onChange: (answerType: AnswerType) => void;
  defaultValue: AnswerType;
}) => {
  return (
    <Select
      style={{ width: "100%" }}
      defaultValue={defaultValue}
      onChange={onChange}
    >
      {Object.entries(answerMap).map(([value, { label, icon }]) => (
        <Select.Option key={value} value={value} label={label}>
          <Space>
            {icon}
            {label}
          </Space>
        </Select.Option>
      ))}
    </Select>
  );
};

export default AnswerTypeSelect;
