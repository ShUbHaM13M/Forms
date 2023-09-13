import { Radio } from "antd";
import ChoiceList from "./ChoiceList";

const RadioAnswer = () => {
  return (
    <ChoiceList ChoiceType={<Radio style={{ pointerEvents: "none" }} />} />
  );
};

export default RadioAnswer;
