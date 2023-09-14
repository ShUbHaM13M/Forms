import { Card, Input, Space } from "antd";
import { CreateFormActionKind, useCreateFormData } from "./CreateFormContext";

const FormMetaCard = () => {
  const { dispatchFormData, formData } = useCreateFormData();

  return (
    <Card bordered={true}>
      <Space style={{ width: "100%" }} direction="vertical">
        <Input
          placeholder="Enter form title"
          value={formData.title}
          allowClear
          showCount
          maxLength={50}
          onChange={(e) =>
            dispatchFormData({
              payload: e.currentTarget.value,
              type: CreateFormActionKind.UPDATE_TITLE,
            })
          }
        />
        <Input.TextArea
          placeholder="Enter form description"
          value={formData.description}
          showCount
          allowClear
          maxLength={200}
          onChange={(e) =>
            dispatchFormData({
              type: CreateFormActionKind.UPDATE_DESCRIPTION,
              payload: e.currentTarget.value,
            })
          }
          autoSize={{ minRows: 2, maxRows: 5 }}
        />
      </Space>
    </Card>
  );
};

export default FormMetaCard;
