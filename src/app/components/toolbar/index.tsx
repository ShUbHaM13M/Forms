import {
  CreateFormActionKind,
  useCreateFormData,
} from "@/app/create-form/CreateFormContext";
import { PlusOutlined } from "@ant-design/icons";
import { FloatButton } from "antd";
import { uuidv4 } from "../sortable-list/utils";

const ToolBar = () => {
  const { dispatchFormData, formData } = useCreateFormData();
  // TODO: Ability to export and import the form data to a json file ?
  return (
    <FloatButton.Group shape="square">
      <FloatButton
        type="primary"
        tooltip="Add question"
        icon={<PlusOutlined />}
        onClick={() =>
          dispatchFormData({
            type: CreateFormActionKind.ADD_QUESTION,
            payload: {
              id: uuidv4(),
              answerType: "short-answer",
              title: `Question ${formData.questions.length || 0}`,
            },
          })
        }
      />
    </FloatButton.Group>
  );
};

export default ToolBar;
