import { Col, Collapse, Form, Input, Row } from "antd";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import DatePickerControl from "../../../../../Common/Controls/DatePickerControl";
import RangePickerControl from "../../../../../Common/Controls/RangePickerControl";
import SelectGender from "../../../../../Common/Controls/SelectGender";
import SelectRoleControl from "../../Authorities/Controls/SelectRoleControl";
import SelectUser from "../Controls/SelectUser";
import "./UserSearch.scss";
const { Panel } = Collapse;
const UserSearch = (props) => {
  //----------State start---------------
  const [searchData, setSearchData] = useState({});
  //-------------State end-----------------

  //--------Sate Redux start----------
  const searchSetting = useSelector((state) => {
    if (state.settingDrawer.searchSetting[props.screenName]) {
      return state.settingDrawer.searchSetting[props.screenName];
    }
    return ["userName", "userCode", "address", "gender", "telephone", "role"];
  });
  //Check feild in Search is avai
  const checkSearchFeildAvailble = (key) => {
    //console.log(searchSetting);
    return !!searchSetting.find((item) => item === key);
  };

  //Onchange Input && Select start
  const handleChangeSelect = (value, keyInput) => {
    setSearchData({
      ...searchData,
      [keyInput]: value,
    });
    props.onChange({
      ...searchData,
      [keyInput]: value,
    });
  };

  const handleOnchangeInput = (e, keyInput) => {
    setSearchData({
      ...searchData,
      [keyInput]: e.target.value,
    });
    props.onChange({
      ...searchData,
      [keyInput]: e.target.value,
    });
  };

  const handleOnchangeDate = (value, keyInput) => {
    setSearchData({
      ...searchData,
      [keyInput]: value,
    });
    props.onChange({
      ...searchData,
      [keyInput]: value,
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
                checkSearchFeildAvailble("userName")
                  ? "gutter-row mt-2"
                  : "gutter-row mt-2 input-container"
              }
              span={12}
            >
              <span>Tên người dùng</span>
              <Input
                size={"large"}
                onChange={(e) => handleOnchangeInput(e, "userName")}
                allowClear
              ></Input>
            </Col>
            <Col
              className={
                checkSearchFeildAvailble("displayName")
                  ? "gutter-row mt-2"
                  : "gutter-row mt-2 input-container"
              }
              span={12}
            >
              <span>Tên hiển thị</span>
              <Input
                size="large"
                onChange={(e) => handleOnchangeInput(e, "displayName")}
                allowClear
              />
            </Col>
            <SelectUser
              title="Mã người dùng"
              onChange={handleChangeSelect}
              checkSearchFeildAvailble={checkSearchFeildAvailble}
              keySelect="userCode"
            />
            <Col
              className={
                checkSearchFeildAvailble("telephone")
                  ? "gutter-row mt-2"
                  : "gutter-row mt-2 input-container"
              }
              span={12}
            >
              <span>Số điện thoại</span>
              <Input
                size="large"
                onChange={(e) => handleOnchangeInput(e, "telephone")}
                allowClear
              />
            </Col>

            <Col
              className={
                checkSearchFeildAvailble("address")
                  ? "gutter-row mt-2"
                  : "gutter-row mt-2 input-container"
              }
              span={12}
            >
              <span>Địa chỉ</span>
              <Input
                size="large"
                onChange={(e) => handleOnchangeInput(e, "address")}
                allowClear
              />
            </Col>

            <SelectGender
              onChange={handleChangeSelect}
              keySelect="gender"
              checkSearchFeildAvailble={checkSearchFeildAvailble}
            />

            <SelectRoleControl
              checkSearchFeildAvailble={checkSearchFeildAvailble}
              onChange={handleChangeSelect}
              keySelect="roleCode"
            />
            <SelectUser
              title="Người tạo"
              onChange={handleChangeSelect}
              checkSearchFeildAvailble={checkSearchFeildAvailble}
              keySelect="createdBy"
            />
            <SelectUser
              title="Người cập nhập"
              onChange={handleChangeSelect}
              checkSearchFeildAvailble={checkSearchFeildAvailble}
              keySelect="updatedBy"
            />
            <RangePickerControl
              title="Ngày tạo"
              keySelect="createdAt"
              checkSearchFeildAvailble={checkSearchFeildAvailble}
              onChange={handleOnchangeDate}
            />
            <DatePickerControl
              title="Ngày cập nhập"
              keySelect="updatedAt"
              checkSearchFeildAvailble={checkSearchFeildAvailble}
              onChange={handleOnchangeDate}
            />
          </Row>
        </Form>
      </Panel>
    </Collapse>
  );
};

export default UserSearch;
