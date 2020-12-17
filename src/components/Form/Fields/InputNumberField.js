/** @format */

import React from "react";
import { InputNumber } from "formik-antd";
import { Form } from "antd";

export default React.memo(function InputNumberField(props) {
  const { name, min, max } = props;

  return (
    <Form.Item
      label={name.charAt(0).toUpperCase() + name.slice(1)}
      name={name}
      rules={[{ required: true }]}
    >
      <InputNumber name={name} min={min || 0} max={max} />
    </Form.Item>
  );
});
