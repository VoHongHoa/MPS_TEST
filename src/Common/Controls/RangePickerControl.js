import { Col, DatePicker } from "antd";
import moment from "moment";
import React from "react";

const RangePickerControl = (props) => {
  const rangePresets = [
    { label: "Last 7 Days", value: [moment().add(-7, "d"), moment()] },
    { label: "Last 14 Days", value: [moment().add(-14, "d"), moment()] },
    { label: "Last 30 Days", value: [moment().add(-30, "d"), moment()] },
    { label: "Last 90 Days", value: [moment().add(-90, "d"), moment()] },
  ];

  const onRangeChange = (dates, dateStrings) => {
    if (dates) {
      const rangeCreatedAt = dateStrings.map((item) => {
        return moment(item).format("L");
      });
      props.onChange(rangeCreatedAt, props.keySelect);
    } else {
      props.onChange(undefined, props.keySelect);
    }
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
      <DatePicker.RangePicker
        style={{
          width: "100%",
        }}
        presets={rangePresets}
        size={"large"}
        allowClear
        onChange={onRangeChange}
      />
    </Col>
  );
};

export default RangePickerControl;
