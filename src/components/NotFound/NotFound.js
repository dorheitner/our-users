/** @format */

import React from "react";
import { Card } from "antd";

export default function NotFound() {
  const { Meta } = Card;

  return (
    <>
      <Card>
        <Meta title=" 404 " description="Page Not Found :(" />
      </Card>
    </>
  );
}
