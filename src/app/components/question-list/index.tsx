import { CreateQuestion } from "..";
import { Space } from "antd";
import useCreateFormStore from "@/app/create-form/CreateFormStore";

const QuestionList = () => {
  const questions = useCreateFormStore((state) => state.questions);

  return (
    <Space direction="vertical" style={{ width: "100%" }}>
      {questions.map((question) => (
        <CreateQuestion key={question.id} {...question} />
      ))}
    </Space>
  );
};

export default QuestionList;
