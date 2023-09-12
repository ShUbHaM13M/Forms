import { CloseOutlined } from "@ant-design/icons";
import { Radio, Space, Input, Row, Col, Table, Button } from "antd";
import { Fragment, useCallback, useState } from "react";

const RadioAnswer = () => {
  const [options, setOptions] = useState<string[]>(["Option 1"]);
  const [otherAdded, setOtherAdded] = useState(false);

  const onOptionLabelChange = useCallback((label: string, index: number) => {
    setOptions((prev) => {
      prev[index] = label;
      return [...prev];
    });
  }, []);

  const onRemoveOption = useCallback((index: number) => {
    setOptions((prev) => prev.filter((_, i) => index != i));
  }, []);

  const onAddOption = useCallback(() => {
    setOptions((prev) => [...prev, `Option ${prev.length + 1}`]);
  }, []);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
      {options.map((label, key) => (
        <Row style={{ alignItems: "center" }} gutter={8} key={key}>
          <Col flex="none">
            <Radio style={{ pointerEvents: "none" }} />
          </Col>
          <Col flex="auto">
            <Input
              onChange={(e) => onOptionLabelChange(e.currentTarget.value, key)}
              value={label}
            />
          </Col>
          {options.length > 1 ? (
            <Col flex="none">
              <Button
                type="text"
                icon={<CloseOutlined />}
                onClick={() => onRemoveOption(key)}
              />
            </Col>
          ) : null}
        </Row>
      ))}

      {otherAdded ? (
        <Row style={{ alignItems: "center" }} gutter={8}>
          <Col flex="none">
            <Radio style={{ pointerEvents: "none" }} />
          </Col>
          <Col flex="auto">
            <Input placeholder="Other..." disabled />
          </Col>
          <Col flex="none">
            <Button
              type="text"
              icon={<CloseOutlined />}
              onClick={() => setOtherAdded(false)}
            />
          </Col>
        </Row>
      ) : null}

      <Row style={{ alignItems: "center" }} gutter={8}>
        <Col flex="none">
          <Radio style={{ pointerEvents: "none" }} />
        </Col>
        <Col flex="auto">
          <Space>
            <Button type="dashed" onClick={onAddOption}>
              Add another option
            </Button>
            {otherAdded ? null : (
              <>
                <span>or</span>
                <Button
                  onClick={() => setOtherAdded(true)}
                  size="small"
                  style={{ paddingInline: 0 }}
                  type="link"
                >
                  add "Other"
                </Button>
              </>
            )}
          </Space>
        </Col>
      </Row>
    </div>
  );
};

export default RadioAnswer;
