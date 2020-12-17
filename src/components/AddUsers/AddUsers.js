/** @format */

import React, { useEffect } from "react";

import isEmpty from "lodash.isempty";
import { countries } from "countries-list";
import Ajv from "ajv";
import useReactRouter from "use-react-router";
import { notification } from "antd";

import { InputNumberField, SelectField } from "../Form/Fields/index";
import FormComponent from "../Form/FormComponent";
import axios from "../../axios-instance";
//import { useFetchingUsers } from "../../hooks/FetchingDataHook";

const ajv = new Ajv({ allErrors: true });

// Country names
const countryNames = {};

// Select options
const countryOptions = [];

const fields = [
  {
    name: "country",
    component: SelectField,
    rules: { type: "string", minLength: 2 },
    required: true,
    options: countryOptions,
  },
  {
    name: "users",
    component: InputNumberField,
    min: 0,
    rules: { type: "number" },
    required: true,
  },
];

const properties = fields.reduce((acc, currentValue) => {
  acc[currentValue.name] = currentValue.rules;
  return acc;
}, {});

const required = fields.reduce((acc, currentValue) => {
  if (currentValue.required) {
    acc[currentValue.name] = currentValue.name;
  }
  return Object.values(acc);
}, {});

const schema = {
  required,
  properties,
};

const validate = ajv.compile(schema);

export default function AddUsers(props) {
  const { history } = useReactRouter();

  useEffect(() => {
    if (!isEmpty(props.usersApiResponse)) {
      // Add the current countries names for countryNames object
      Object.entries(props.usersApiResponse).map((country) => {
        Object.assign(countryNames, {
          [country[1].country.toLowerCase()]: {
            value: country[1].country.toLowerCase(),
          },
        });
        return countryNames;
      });
    }

    if (!isEmpty(countries)) {
      if (isEmpty(countryOptions) && !isEmpty(countryNames)) {
        // Add all the countries names except the existing countries
        Object.entries(countries).map((country) => {
          if (isEmpty(countryNames[country[1].name.toLowerCase()])) {
            countryOptions.push({
              value: country[1].name,
            });
          }
          return countryNames;
        });
      }
    }
  }, [props]);

  // Submit new user
  const handleSubmit = (values) => {
    if (isEmpty(countryNames[values.country])) {
      axios
        .post("/users", values)
        .then((response) => {
          history.push("/");
          notification["success"]({
            message: "WOW!",
            description: "You add new users to out map!",
          });
        })
        .catch((e) => console.log(e));
    } else {
      notification["warning"]({
        message: "ON!",
        description: "Sorry, but You can't add users from this country.",
      });
    }
  };

  return (
    !isEmpty(props.usersApiResponse) && (
      <FormComponent
        fields={fields}
        validate={validate}
        submit={handleSubmit}
      />
    )
  );
}
