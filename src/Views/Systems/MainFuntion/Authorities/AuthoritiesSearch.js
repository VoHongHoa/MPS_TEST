import { Col, Collapse, Form, Input, Row, Select } from "antd";
import React, { useEffect, useMemo, useState } from "react";
import { getAllRole } from "../../../../Service/Authorities";
const { Panel } = Collapse;
const AuthoritiesSearch = (props) => {
  const handleChangeSelect = (value) => {
    console.log(`selected ${value}`);
  };
  const [data, setData] = useState([]);
  const [searchData, setSearchData] = useState();
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
            <Col className="gutter-row mt-2" span={12}>
              <span>Tên vai trò</span>
              <Input size={"large"} onChange={handleOnchangeInput}></Input>
            </Col>
            <Col className="gutter-row mt-2" span={12}>
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
