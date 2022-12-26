import { Button, Col, Form, Input, Modal, notification, Row } from "antd";
import React, { useEffect, useState } from "react";
import { createRole } from "../../../../Service/Authorities";

const AuthoritiesAdd = (props) => {
  const [api, contextHolder] = notification.useNotification();
  const [isLoading, setIsLoading] = useState(false);
  const openNotification = (type, placement, message) => {
    api[type]({
      message: `Thông báo`,
      description: message,
      placement,
    });
  };
  const handleOk = async () => {
    try {
      setIsLoading(true);
      const dataSent = {
        roleName: dataModal.roleName.trim(),
        roleCode: dataModal.roleCode.trim(),
        permission: [],
      };
      const res = await createRole(dataSent);
      if (res && res.status === 200 && res.data.success === true) {
        openNotification("success", "topRight", res.data.message);
        setDataModal({
          roleName: "",
          roleCode: "",
          permission: [],
        });
        props.fetchRoleData();
        props.setSelectedRows([]);
        setIsLoading(false);
        props.handleCancel();
      } else {
        openNotification("info", "topRight", res.data.message);
      }
    } catch (e) {
      openNotification("error", "topRight", "Lỗi server");
    }
  };
  const [dataModal, setDataModal] = useState({
    roleName: "",
    roleCode: "",
    permission: [],
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
        roleCode: "",
        roleName: "",
        permission: [],
      });
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

  return (
    <Modal
      title={
        props.action && props.action === "COPY"
          ? "Sao chép vai trò người dùng"
          : "Thêm mới vai trò người dùng"
      }
      open={props.isOpenModal}
      onCancel={props.handleCancel}
      width="60%"
      footer={[
        <Button onClick={props.handleCancel} size={"large"} key={"btn-cancel"}>
          Hủy
        </Button>,
        <Button
          onClick={handleOk}
          type={"primary"}
          size={"large"}
          key={"btn-save"}
          loading={isLoading}
        >
          Lưu
        </Button>,
      ]}
    >
      {contextHolder}
      <Form>
        <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
          <Col className="gutter-row mt-2" span={12}>
            <span>Tên vai trò</span>
            <Input
              value={dataModal.roleName}
              onChange={(e) => handleOnchangeInput(e, "roleName")}
              size={"large"}
            ></Input>
          </Col>
          <Col className="gutter-row mt-2" span={12}>
            <span>Mã vai trò</span>
            <Input
              value={dataModal.roleCode}
              onChange={(e) => handleOnchangeInput(e, "roleCode")}
              size={"large"}
            ></Input>
          </Col>
        </Row>
      </Form>
    </Modal>
  );
};

export default AuthoritiesAdd;
