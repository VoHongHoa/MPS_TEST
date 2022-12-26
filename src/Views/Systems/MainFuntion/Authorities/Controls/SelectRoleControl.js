import { Col, Select } from "antd";
import React, { useEffect, useMemo, useState } from "react";
import { getAllRole } from "../../../../../Service/Authorities";

const SelectRoleControl = (props) => {
  const [data, setData] = useState([]);
  //Fetch data
  const fetchRoleData = async () => {
    const res = await getAllRole();
    if (res.status === 200 && res.data.success === true) {
      setData(res.data.data);
    }
  };
  const options = useMemo(() => {
    if (data && data.length === 0) {
      return [];
    }
    return data.map((item, index) => {
      return {
        label: item.roleName.toString(),
        value: item.roleCode.toString(),
      };
    });
  }, [data]);

  useEffect(() => {
    fetchRoleData();
  }, []);
  const handleChangeSelect = (value) => {
    props.onChange(value);
  };
  return (
    <Col
      className={
        props.checkSearchFeildAvailble &&
        props.checkSearchFeildAvailble("roleCode") === false
          ? "gutter-row mt-2 input-container"
          : "gutter-row mt-2"
      }
      span={12}
    >
      <span>Mã vai trò</span>
      <Select
        mode={props.mode ? props.mode : ""}
        allowClear
        size={"large"}
        style={{ width: "100%" }}
        placeholder="Chọn vai trò"
        onChange={handleChangeSelect}
        options={options}
        value={props.value}
      />
    </Col>
  );
};

export default SelectRoleControl;
