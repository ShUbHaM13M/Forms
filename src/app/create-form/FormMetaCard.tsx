import { Card, Input, Space } from "antd";
import useCreateFormStore from "./CreateFormStore";

const FormMetaCard = () => {
  const title = useCreateFormStore((state) => state.title);
  const setTitle = useCreateFormStore((state) => state.setTitle);

  const description = useCreateFormStore((state) => state.description);
  const setDescription = useCreateFormStore((state) => state.setDescription);

  return (
    <Card bordered={true}>
      <Space style={{ width: "100%" }} direction="vertical">
        <Input
          placeholder="Enter form title"
          value={title}
          allowClear
          showCount
          maxLength={50}
          onChange={(e) => setTitle(e.currentTarget.value)}
        />
        <Input.TextArea
          placeholder="Enter form description"
          value={description}
          showCount
          allowClear
          maxLength={200}
          onChange={(e) => setDescription(e.currentTarget.value)}
          autoSize={{ minRows: 2, maxRows: 5 }}
        />
      </Space>
    </Card>
  );
};

export default FormMetaCard;
