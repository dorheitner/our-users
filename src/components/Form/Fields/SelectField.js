/** @format */

import React from "react";
import { Select } from "formik-antd";
import { Form } from "antd";
import { useRecoilState } from "recoil";
import { UsersState } from "../../../store/atons";
import isEmpty from "lodash.isempty";
const { Option } = Select;

export default React.memo(function SelectField(props) {
  const { name, options, defaultValue } = props;
  const [usersApiResponse] = useRecoilState(UsersState);

  return (
    !isEmpty(usersApiResponse) && (
      <Form.Item
        label={`Add ${name.charAt(0).toUpperCase() + name.slice(1)}`}
        name={name}
        rules={[{ required: true }]}
      >
        <Select
          defaultValue={defaultValue}
          name={name}
          placeholder={`Select ${name}`}
          optionFilterProp="children"
          showSearch
        >
          {options.map((option, index) => (
            <Option key={index} value={option.value}>
              {option.value}
            </Option>
          ))}
        </Select>
      </Form.Item>
    )
  );
});
