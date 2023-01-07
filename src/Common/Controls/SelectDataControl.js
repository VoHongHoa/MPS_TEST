import { Col, Select } from "antd";
import React from "react";

function SelectDataControl(props) {
  //   const options = [
  //     {
  //       label: "Nam",
  //       value: "1",
  //     },
  //     {
  //       label: "Nữ",
  //       value: "0",
  //     },
  //   ];
  const handleChangeSelect = (value) => {
    props.onChange(value, props.keySelect);
  };
  return (
    <Col
      className={
        props.checkSearchFeildAvailble &&
        props.checkSearchFeildAvailble(props.keySelect) === false
          ? "gutter-row mt-2 input-container"
          : "gutter-row mt-2"
      }
      span={12}
    >
      <span>{props.title}</span>
      <Select
        mode={props.mode ? props.mode : ""}
        allowClear
        size={"large"}
        style={{ width: "100%" }}
        placeholder={props.placeholder ? props.placeholder : "Nhấp chọn"}
        onChange={handleChangeSelect}
        options={props.options}
        value={props.value}
      />
    </Col>
  );
}

export default SelectDataControl;
