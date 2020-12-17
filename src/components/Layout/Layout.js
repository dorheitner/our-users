/** @format */

import React from "react";

import { Layout as LayoutsComponent, Menu } from "antd";

import styled from "styled-components";
import useReactRouter from "use-react-router";

const { Header, Content } = LayoutsComponent;

const Wrapper = styled.div`
  padding: 4em;
  margin: 0;
  height: 100vh;
  width: 100%;
  justify-content: center;
  @media (min-width: 1000px) {
    margin: 0;
  }
`;

const MenuHeader = styled(Header)({
  position: "fixed",
  zIndex: 1,
  width: "100%",
});

export default function Layout(props) {
  const { history } = useReactRouter();

  return (
    <LayoutsComponent>
      <MenuHeader className="header">
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={
            history.location.pathname === "/add" ? ["add"] : ["word-map"]
          }
        >
          <Menu.Item key="word-map" onClick={() => history.push("/")}>
            Our Users Map
          </Menu.Item>

          <Menu.Item key="add" onClick={() => history.push("/add")}>
            Add Users
          </Menu.Item>
        </Menu>
      </MenuHeader>
      <Content>
        <Wrapper> {props.children}</Wrapper>
      </Content>
    </LayoutsComponent>
  );
}
