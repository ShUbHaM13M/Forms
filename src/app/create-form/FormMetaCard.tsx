import { Card, Space } from "antd";
import { InputWithToolbar } from "../components";
import { CreateFormActionKind, useCreateFormData } from "./CreateFormContext";

const FormMetaCard = () => {
  const { dispatchFormData, formData } = useCreateFormData();

  return (
    <Card bordered={true}>
      <Space style={{ width: "100%" }} direction="vertical">
        <InputWithToolbar
          inputProps={{
            placeholder: "Enter form title",
            value: formData.title,
            onChange: (e) =>
              dispatchFormData({
                payload: e.currentTarget.value,
                type: CreateFormActionKind.UPDATE_TITLE,
              }),
          }}
        />
        <InputWithToolbar
          inputProps={{ placeholder: "Enter form description" }}
        />
      </Space>
    </Card>
  );
};

export default FormMetaCard;
