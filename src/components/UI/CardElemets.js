/** @format */

import React from "react";

import { Card } from "antd";
export default function CardElemets(props) {
  return (
    <Card className="site-card-border-less-wrapper">{props.children}</Card>
  );
}
