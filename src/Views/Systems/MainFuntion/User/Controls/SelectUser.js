import { Col, Select } from "antd";
import React, { useEffect, useMemo, useState } from "react";
import { getAllUser } from "../../../../../Service/User";

function SelectUser(props) {
  const [data, setData] = useState([]);
  //Fetch data
  const fetchRoleData = async () => {
    const res = await getAllUser();
    if (res.status === 200 && res.data.success === true) {
      setData(res.data.users);
    }
  };
  const options = useMemo(() => {
    if (data && data.length === 0) {
      return [];
    }
    return data.map((item, index) => {
      return {
        label: item.userName.toString(),
        value: item._id.toString(),
      };
    });
  }, [data]);

  useEffect(() => {
    fetchRoleData();
  }, []);
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
        placeholder="Người dùng"
        onChange={handleChangeSelect}
        options={options}
        value={props.value}
      />
    </Col>
  );
}

export default SelectUser;
