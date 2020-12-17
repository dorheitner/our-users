/** @format */

import React, { useState } from "react";

import { Form, Button } from "antd";
import { Formik, Field } from "formik";

import isEmpty from "lodash.isempty";

const formItemLayout = {
  labelCol: {
    xs: { span: 8 },
    sm: { span: 8 },
  },
  wrapperCol: {
    xs: { span: 6 },
    sm: { span: 6 },
  },
};

export default React.memo(function FormComponent(props) {
  const [checkSubmit, setCheckSubmit] = useState(false);

  const { fields, validate, submit } = props;

  if (!isEmpty(fields)) {
    // validation
    const validation = (value) => {
      if (isEmpty(value)) {
        setCheckSubmit(false);
        return false;
      }

      const check = validate(value);
      setCheckSubmit(check);
      return !check && validate.errors[0];
    };

    const validationByField = (fieldName) => {
      if (!isEmpty(validate.errors)) {
        const findReletedError = validate.errors.filter(
          (error) => error.dataPath === `.${fieldName}`
        );
        return !isEmpty(findReletedError[0]) && findReletedError[0].message;
      }
      return;
    };

    const initialValues = () =>
      fields.reduce((acc, currentValue) => {
        acc[currentValue.name] = currentValue.defaultValue || "";
        return acc;
      }, {});

    return (
      <>
        <Formik
          initialValues={initialValues}
          validate={validation}
          onSubmit={(values, { setSubmitting }) => {
            if (checkSubmit) {
              setSubmitting(true);
              submit(values);
            }
          }}
        >
          {(props) => (
            <Form {...formItemLayout} onSubmit={props.handleSubmit}>
              {fields.map((fieldData, indexData) => {
                const InputComponent = fieldData.component;
                return (
                  <Field
                    validate={() =>
                      validationByField(fieldData.name, props.errors)
                    }
                    name={fieldData.name}
                    key={indexData}
                  >
                    {({ field, meta }) => (
                      <div>
                        <Form.Item
                          label={fieldData.label}
                          hasFeedback={meta.touched}
                          validateStatus={
                            meta.touched ? meta.error && "error" : ""
                          }
                          help={meta.touched && props.errors[fieldData.name]}
                        >
                          <InputComponent {...field} {...fieldData} />
                        </Form.Item>
                      </div>
                    )}
                  </Field>
                );
              })}
              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  onClick={() => props.handleSubmit()}
                >
                  Submit
                </Button>
              </Form.Item>
            </Form>
          )}
        </Formik>
      </>
    );
  }
  return null;
});
