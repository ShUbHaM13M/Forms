"use client";

import {
  BoldOutlined,
  ItalicOutlined,
  UnderlineOutlined,
} from "@ant-design/icons";
import { Button, Card, Popover, Space, Typography } from "antd";

const Toolbar = () => {
  return (
    <Space direction="horizontal">
      <Button icon={<BoldOutlined />} />
      <Button icon={<ItalicOutlined />} />
      <Button icon={<UnderlineOutlined />} />
    </Space>
  );
};

const CreateForm = () => {
  return (
    <Space direction="vertical">
      <Card>
        <Popover content={Toolbar}>
          <Typography.Title level={3}>Create a new form</Typography.Title>
        </Popover>
      </Card>
    </Space>
  );
};

export default CreateForm;
