import { useCreateFormData } from "@/app/create-form/CreateFormContext";
import { CreateQuestion } from "..";
import { Space } from "antd";

const QuestionList = () => {
  const { dispatchFormData, formData } = useCreateFormData();
  return (
    <Space direction="vertical" style={{ width: "100%" }}>
      {formData.questions.map((question) => (
        <CreateQuestion key={question.id} {...question} />
      ))}
    </Space>
  );
};

export default QuestionList;
