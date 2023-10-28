import { Radio } from "antd";
import ChoiceList from "./ChoiceList";

const RadioAnswer = ({ questionIndex }: { questionIndex: number }) => {
  return (
    <ChoiceList
      questionIndex={questionIndex}
      ChoiceType={<Radio style={{ pointerEvents: "none" }} />}
    />
  );
};

export default RadioAnswer;
