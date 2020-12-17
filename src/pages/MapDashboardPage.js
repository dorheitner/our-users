/** @format */

import React, { useEffect, useState } from "react";

import { Typography, Row, Col } from "antd";
import { useRecoilState } from "recoil";
import isEmpty from "lodash.isempty";

import { UsersState } from "../store/atons";

import CardElement from "../components/UI/CardElemets";
import { useFetchingUsers } from "../hooks/FetchingDataHook";
import Map from "../components/Map/Map";
const { Title, Text } = Typography;

export default function MapDashboardPage() {
  const { users } = useFetchingUsers();
  const [totalUsers, setTotalUsers] = useState(0);

  const [, setUsersApiResponse] = useRecoilState(UsersState);

  // Add users from API to UsersState
  // Update total users
  useEffect(() => {
    if (!isEmpty(users)) {
      setUsersApiResponse(users);
      setTotalUsers(() =>
        users.reduce((acc, currentValue) => acc + currentValue.users, 0)
      );
    }
  }, [setUsersApiResponse, users]);

  return (
    <>
      <CardElement>
        <CardElement>
          <Title level={3}>OUR USERS</Title>

          <Row>
            <Col span={12}>
              <Title level={4}>
                <Text type="secondary">Total Users: </Text>
                {totalUsers.toLocaleString()}
              </Title>
            </Col>
            <Col span={12}>
              <Title level={4}>
                <Text type="secondary">Total Countries:</Text> {users.length}
              </Title>
            </Col>
          </Row>
        </CardElement>
        {users && <Map users={users} />}
      </CardElement>
    </>
  );
}
