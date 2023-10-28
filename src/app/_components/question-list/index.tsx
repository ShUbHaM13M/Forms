import { CreateQuestion } from "..";
import { Space } from "antd";
import useCreateFormStore from "@/lib/CreateFormStore";

const QuestionList = () => {
  const questions = useCreateFormStore((state) => state.questions);

  return (
    <Space direction="vertical" style={{ width: "100%" }}>
      {questions.map((question, index) => (
        <CreateQuestion key={question.id} {...question} index={index} />
      ))}
    </Space>
  );
};

export default QuestionList;
