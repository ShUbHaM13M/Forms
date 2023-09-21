import { Row, Col, Switch } from "antd";
import { SwitchChangeEventHandler } from "antd/es/switch";

interface DropdownOptionProps {
  label: string;
  action: SwitchChangeEventHandler;
  active?: boolean;
}

const AnswerOptionDropdown = ({
  options,
}: {
  options: DropdownOptionProps[];
}) => {
  return (
    <Row>
      {options.map((option) => (
        <Col key={option.label} span={24}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            {option.label}
            <Switch
              defaultChecked={option.active}
              onChange={option.action}
              size="small"
            />
          </div>
        </Col>
      ))}
    </Row>
  );
};

export default AnswerOptionDropdown;
