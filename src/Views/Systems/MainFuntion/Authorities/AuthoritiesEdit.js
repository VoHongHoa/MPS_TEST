import { Col, Form, Input, Modal, notification, Row } from "antd";
import React, { useCallback, useEffect, useState } from "react";
import { updateRole } from "../../../../Service/Authorities";

const AuthoritiesEdit = (props) => {
  const [api, contextHolder] = notification.useNotification();

  const openNotification = (type, placement, message) => {
    api[type]({
      message: `Thông báo`,
      description: message,
      placement,
    });
  };
  const [dataModal, setDataModal] = useState({
    _id: "",
    roleName: "",
    roleCode: "",
    permission: [],
  });
  //Lưu chỉnh sửa
  const handleOk = async () => {
    try {
      const dataSent = {
        roleName: dataModal.roleName.trim(),
        roleCode: dataModal.roleCode.trim(),
        permission: [],
      };
      const res = await updateRole(dataSent, dataModal._id);
      if (res && res.status === 200 && res.data.success === true) {
        openNotification("success", "topRight", res.data.message);
        setDataModal({
          roleName: "",
          roleCode: "",
          permission: [],
        });
        props.fetchRoleData();
        props.setSelectedRows([]);
        props.handleCancelEdit();
      } else {
        openNotification("info", "topRight", res.data.message);
      }
    } catch (e) {
      openNotification("error", "topRight", "Lỗi server");
    }
  };
  // Khởi tạo model
  const initModel = () => {
    if (props.selectedRow && props.selectedRow.length === 1) {
      setDataModal({
        ...dataModal,
        _id: props.selectedRow[0].key,
        roleName: props.selectedRow[0].roleName,
        roleCode: props.selectedRow[0].roleCode,
      });
    } else {
      setDataModal({
        _id: "",
        roleCode: "",
        roleName: "",
        permission: [],
      });
    }
  };

  // Thay đổi input
  const handleOnchangeInput = (e, keyInput) => {
    setDataModal({
      ...dataModal,
      [keyInput]: e.target.value,
    });
  };
  //Cập nhập-khởi tạo component
  useEffect(() => {
    initModel();
  }, [props.selectedRow, props.action]);

  return (
    <Modal
      title={"Chỉnh sửa vai trò người dùng"}
      open={props.isOpenModalEdit}
      onOk={handleOk}
      cancelText="Hủy"
      onCancel={props.handleCancelEdit}
      width="60%"
    >
      {contextHolder}
      <Form>
        <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
          <Col className="gutter-row mt-2" span={12}>
            <span>Tên vai trò</span>
            <Input
              value={dataModal.roleName}
              size={"large"}
              onChange={(e) => handleOnchangeInput(e, "roleName")}
            ></Input>
          </Col>
          <Col className="gutter-row mt-2" span={12}>
            <span>Mã vai trò</span>
            <Input
              value={dataModal.roleCode}
              size={"large"}
              disabled={true}
            ></Input>
          </Col>
        </Row>
      </Form>
    </Modal>
  );
};

export default AuthoritiesEdit;
