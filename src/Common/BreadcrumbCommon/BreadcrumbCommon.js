import { Breadcrumb } from "antd";
import React from "react";

function BreadcrumbCommon(props) {
  return (
    <Breadcrumb
      style={{
        margin: "16px 0",
      }}
    >
      {props &&
        props.item &&
        props.item.map((i, index) => {
          return <Breadcrumb.Item key={index}>{i}</Breadcrumb.Item>;
        })}
    </Breadcrumb>
  );
}

export default BreadcrumbCommon;
