/** @format */

import React, { useEffect, useState } from "react";
import { Chart } from "react-google-charts";
import isEmpty from "lodash.isempty";
import { Skeleton } from "antd";

const headerData = [["Country", "Users"]];

export default React.memo(function Map(props) {
  const users = props.users;

  const [data, setData] = useState([]);

  useEffect(() => {
    if (!isEmpty(props.users)) {
      const countriesArr = headerData.concat(users);

      setData(() =>
        countriesArr.map((data, index) => {
          if (Array.isArray(data)) {
            return data;
          }
          return [data?.country, data?.users];
        })
      );
    }
  }, [props.users, users]);

  return !isEmpty(props.users) ? (
    <Chart
      width={"100%"}
      height={"60vh"}
      chartType="GeoChart"
      data={data}
      mapsApiKey={process.env.REACT_APP_API_KEY}
      options={{
        colorAxis: { colors: ["#00853f", "black", "#e31b23"] },
        backgroundColor: "#81d4fa",
        datalessRegionColor: "#f8bbd0",
        defaultColor: "#f5f5f5",
      }}
    />
  ) : (
    <Skeleton />
  );
});
