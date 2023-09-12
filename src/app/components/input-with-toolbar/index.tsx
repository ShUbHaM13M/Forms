import {
  BoldOutlined,
  ItalicOutlined,
  UnderlineOutlined,
} from "@ant-design/icons";
import { Button, Input, InputProps, Popover, Space } from "antd";

const Toolbar = () => {
  return (
    <Space.Compact block direction="horizontal">
      <Button icon={<BoldOutlined />} />
      <Button icon={<ItalicOutlined />} />
      <Button icon={<UnderlineOutlined />} />
    </Space.Compact>
  );
};

type InputWithToolbarProps = {
  inputProps?: InputProps;
};

const InputWithToolbar = ({ inputProps }: InputWithToolbarProps) => {
  return (
    <Popover trigger="focus" content={<Toolbar />}>
      <Input {...inputProps} />
    </Popover>
  );
};

export default InputWithToolbar;
