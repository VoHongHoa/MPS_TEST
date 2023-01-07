import { Col, DatePicker } from "antd";
import moment from "moment/moment";
import React from "react";

function DatePickerControl(props) {
  const onChange = (date) => {
    if (!date) {
      props.onChange(undefined, props.keySelect);
      return;
    }
    props.onChange(moment(date.$d).format("L"), props.keySelect);
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
      <DatePicker
        style={{
          width: "100%",
        }}
        presets={[
          { label: "Hôm qua", value: moment().add(-1, "d") },
          { label: "Tuần trước", value: moment().add(-7, "d") },
          { label: "Tháng trước", value: moment().add(-1, "month") },
        ]}
        size={"large"}
        allowClear
        onChange={onChange}
      />
    </Col>
  );
}

export default DatePickerControl;
