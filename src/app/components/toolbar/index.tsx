import { PlusOutlined } from "@ant-design/icons";
import { FloatButton } from "antd";
import { uuidv4 } from "../sortable-list/utils";
import useCreateFormStore from "@/app/create-form/CreateFormStore";
import { useCallback } from "react";

const ToolBar = () => {
  const totalQuestions = useCreateFormStore((state) => state.questions.length);
  const addQuestion = useCreateFormStore((state) => state.addQuestion);

  const handleAddQuestion = useCallback(() => {
    addQuestion({
      id: uuidv4(),
      title: `Question ${totalQuestions}`,
      answerType: "short-answer",
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [totalQuestions]);

  // TODO: Ability to export and import the form data to a json file ?
  return (
    <FloatButton.Group shape="square">
      <FloatButton
        type="primary"
        tooltip="Add question"
        icon={<PlusOutlined />}
        onClick={handleAddQuestion}
      />
    </FloatButton.Group>
  );
};

export default ToolBar;
