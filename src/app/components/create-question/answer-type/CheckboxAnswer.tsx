import { Checkbox } from "antd";
import ChoiceList from "./ChoiceList";

const CheckboxAnswer = () => {
  return (
    <ChoiceList
      ChoiceType={
        <Checkbox style={{ pointerEvents: "none", marginRight: 8 }} />
      }
    />
  );
};

export default CheckboxAnswer;
