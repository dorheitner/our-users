/** @format */

import React, { useEffect } from "react";

import { Typography } from "antd";
import isEmpty from "lodash.isempty";

import CardElement from "../components/UI/CardElemets";
import AddUsers from "../components/AddUsers/AddUsers";
import { useRecoilState } from "recoil";
import { UsersState } from "../store/atons";
import { useFetchingUsers } from "../hooks/FetchingDataHook";

const { Title } = Typography;

export default function MapFormPage() {
  const [usersApiResponse, setUsersApiResponse] = useRecoilState(UsersState);

  const { users } = useFetchingUsers();

  // Update data from users API if need it
  useEffect(() => {
    isEmpty(usersApiResponse) && setUsersApiResponse(() => users);
  }, [usersApiResponse, users, setUsersApiResponse]);

  return (
    <CardElement>
      <Title level={3}>ADD USERS</Title>

      {!isEmpty(usersApiResponse) && (
        <AddUsers usersApiResponse={usersApiResponse} />
      )}
    </CardElement>
  );
}
