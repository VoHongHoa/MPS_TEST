import { Col, Collapse, Form, Input, Row } from "antd";
import React, { useState } from "react";
import { useSelector } from "react-redux";

import SelectRoleControl from "../Controls/SelectRoleControl";
import "./AuthoritiesSearch.scss";
const { Panel } = Collapse;
const AuthoritiesSearch = (props) => {
  //----------State start---------------
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
            <SelectRoleControl
              checkSearchFeildAvailble={checkSearchFeildAvailble}
              onChange={handleChangeSelect}
              mode={"tags"}
              value={searchData.roleCode}
            />
          </Row>
        </Form>
      </Panel>
    </Collapse>
  );
};

export default AuthoritiesSearch;
