import { useCreateFormData } from "@/app/create-form/CreateFormContext";
import { CreateQuestion } from "..";
import { Space } from "antd";

const QuestionList = () => {
  const { formData } = useCreateFormData();
  return (
    <Space direction="vertical" style={{ width: "100%" }}>
      {formData.questions.map((question, index) => (
        <CreateQuestion key={question.id} index={index} />
      ))}
    </Space>
  );
};

export default QuestionList;
