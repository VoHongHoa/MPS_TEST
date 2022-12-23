import { Col, Collapse, Form, Input, Row, Select } from "antd";
import React, { useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { getAllRole } from "../../../../../Service/Authorities";
import "./AuthoritiesSearch.scss";
const { Panel } = Collapse;
const AuthoritiesSearch = (props) => {
  //----------State start---------------
  const [data, setData] = useState([]);
  const [searchData, setSearchData] = useState({
    roleName: "",
    roleCode: [],
  });
  //-------------State end-----------------

  //--------Sate Redux start----------
  const searchSetting = useSelector((state) => {
    if (
      state.settingDrawer.searchSetting &&
      state.settingDrawer.searchSetting[props.screenName]
    ) {
      return state.settingDrawer.searchSetting[props.screenName];
    }
    return ["roleName", "roleCode"];
  });

  //Check feild in Search is avai
  const checkSearchFeildAvailble = (key) => {
    return !!searchSetting.find((item) => item === key);
  };

  //Onchange Input && Select start
  const handleChangeSelect = (value) => {
    setSearchData({
      ...searchData,
      roleCode: value,
    });
    props.onChange({
      ...searchData,
      roleCode: value,
    });
  };

  const handleOnchangeInput = (e) => {
    setSearchData({
      ...searchData,
      roleName: e.target.value,
    });
    props.onChange({
      ...searchData,
      roleName: e.target.value,
    });
  };

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

  return (
    <Collapse
      collapsible="header"
      defaultActiveKey={["1"]}
      expandIconPosition="end"
    >
      <Panel header="Thông tin tìm kiếm" key="1">
        <Form>
          <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
            <Col
              className={
                checkSearchFeildAvailble("roleName")
                  ? "gutter-row mt-2"
                  : "gutter-row mt-2 input-container"
              }
              span={12}
            >
              <span>Tên vai trò</span>
              <Input size={"large"} onChange={handleOnchangeInput}></Input>
            </Col>
            <Col
              className={
                checkSearchFeildAvailble("roleCode")
                  ? "gutter-row mt-2"
                  : "gutter-row mt-2 input-container"
              }
              span={12}
            >
              <span>Mã vai trò</span>
              <Select
                mode="multiple"
                allowClear
                size={"large"}
                style={{ width: "100%" }}
                placeholder="Chọn vai trò"
                onChange={handleChangeSelect}
                options={options}
              />
            </Col>
          </Row>
        </Form>
      </Panel>
    </Collapse>
  );
};

export default AuthoritiesSearch;
