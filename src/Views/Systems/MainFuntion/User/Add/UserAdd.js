import { Button, Col, Form, Input, Modal, notification, Row } from "antd";
import React, { useEffect, useState } from "react";
import SelectGender from "../../../../../Common/Controls/SelectGender";
import SelectGenderControl from "../../../../../Common/Controls/SelectGender";
import { signUp } from "../../../../../Service/User";
import SelectRoleControl from "../../Authorities/Controls/SelectRoleControl";

const UserAdd = (props) => {
  const [api, contextHolder] = notification.useNotification();

  const openNotification = (type, placement, message) => {
    api[type]({
      message: `Thông báo`,
      description: message,
      placement,
    });
  };

  const [dataModal, setDataModal] = useState({
    userName: "",
    userCode: "",
    role: "",
    address: "",
    telephone: "",
    gender: "",
    password: "",
    repeat_pass: "",
  });
  const initModel = () => {
    if (
      props.action &&
      props.action === "COPY" &&
      props.selectedRow &&
      props.selectedRow.length === 1
    ) {
      setDataModal({
        ...dataModal,
        roleName: props.selectedRow[0].roleName,
      });
    } else {
      setDataModal({
        userName: "",
        userCode: "",
        role: "",
        address: "",
        telephone: "",
        gender: "",
        password: "",
        repeat_pass: "",
      });
    }
  };
  const handleOk = async () => {
    try {
      const dataObj = {
        userName: dataModal.userName.trim(),
        displayName: dataModal.displayName.trim(),
        userCode: dataModal.userCode.trim(),
        address: dataModal.address.trim(),
        telephone: dataModal.telephone.trim(),
        gender: dataModal.gender,
        role: dataModal.role,
        password: dataModal.password.trim(),
      };
      const res = await signUp(dataObj);
      if (res.status !== 200 || res.data.success !== true) {
        openNotification("error", "topRight", "Thêm mới không thành công");
      }
      openNotification("success", "topRight", "Thêm mới thành công");
      handleCloseModal();
      props.fetchUserData();
    } catch (e) {
      openNotification("error", "topRight", "Lỗi server");
    }
  };
  useEffect(() => {
    initModel();
  }, [props.selectedRow, props.action]);
  const handleOnchangeInput = (e, keyInput) => {
    setDataModal({
      ...dataModal,
      [keyInput]: e.target.value,
    });
  };
  const handleOnchangeSelect = (value, keyInput) => {
    setDataModal({
      ...dataModal,
      [keyInput]: value,
    });
  };
  const handleCloseModal = () => {
    setDataModal({
      userName: "",
      displayName: "",
      userCode: "",
      role: "",
      address: "",
      telephone: "",
      gender: "",
      password: "",
      repeat_pass: "",
    });
    props.handleCancel();
  };

  return (
    <Modal
      title={
        props.action && props.action === "COPY"
          ? "Sao chép người dùng"
          : "Thêm mới người dùng"
      }
      open={props.isOpenModal}
      onCancel={handleCloseModal}
      width="60%"
      footer={[
        <Button onClick={handleCloseModal} size={"large"} key={"btn-cancel"}>
          Hủy
        </Button>,
        <Button
          onClick={handleOk}
          type={"primary"}
          size={"large"}
          key={"btn-save"}
        >
          Lưu
        </Button>,
      ]}
    >
      {contextHolder}
      <Form>
        <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
          <Col className="gutter-row mt-2" span={12}>
            <span>Tên đăng nhập</span>
            <Input
              value={dataModal.userName}
              onChange={(e) => handleOnchangeInput(e, "userName")}
              size={"large"}
            ></Input>
          </Col>
          <Col className="gutter-row mt-2" span={12}>
            <span>Tên hiển thị</span>
            <Input
              value={dataModal.displayName}
              onChange={(e) => handleOnchangeInput(e, "displayName")}
              size={"large"}
            ></Input>
          </Col>
          <Col className="gutter-row mt-2" span={12}>
            <span>Mã người dùng</span>
            <Input
              value={dataModal.userCode}
              onChange={(e) => handleOnchangeInput(e, "userCode")}
              size={"large"}
            ></Input>
          </Col>
          <SelectRoleControl
            onChange={(value) => handleOnchangeSelect(value, "role")}
            value={dataModal.role}
          />
          <Col className="gutter-row mt-2" span={12}>
            <span>Số điện thoại</span>
            <Input
              value={dataModal.telephone}
              onChange={(e) => handleOnchangeInput(e, "telephone")}
              size={"large"}
            ></Input>
          </Col>
          <SelectGender
            onChange={(value) => handleOnchangeSelect(value, "gender")}
            value={dataModal.gender}
          />

          <Col className="gutter-row mt-2" span={12}>
            <span>Địa chỉ</span>
            <Input
              value={dataModal.address}
              onChange={(e) => handleOnchangeInput(e, "address")}
              size={"large"}
            ></Input>
          </Col>
          <Col className="gutter-row mt-2" span={12}>
            <span>Mật khẩu</span>
            <Input.Password
              value={dataModal.password}
              onChange={(e) => handleOnchangeInput(e, "password")}
              size={"large"}
            ></Input.Password>
          </Col>
          <Col className="gutter-row mt-2" span={12}>
            <span>Nhập lại mật khẩu</span>
            <Input.Password
              value={dataModal.repeat_pass}
              onChange={(e) => handleOnchangeInput(e, "repeat_pass")}
              size={"large"}
            ></Input.Password>
          </Col>
        </Row>
      </Form>
    </Modal>
  );
};

export default UserAdd;
