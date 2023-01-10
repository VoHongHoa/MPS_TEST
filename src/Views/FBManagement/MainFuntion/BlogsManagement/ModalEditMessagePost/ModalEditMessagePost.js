import { Button, Col, Form, Input, Modal, notification, Row } from "antd";
import React, { useState } from "react";
import { updateMessageForPost } from "../../../../../Service/FBManagement";
function ModalEditMessagePost(props) {
  const [api, contextHolder] = notification.useNotification();
  const [isLoading, setIsLoading] = useState(false);
  const openNotification = (type, placement, message) => {
    api[type]({
      message: `Thông báo`,
      description: message,
      placement,
    });
  };
  const [dataModal, setDataModal] = useState({
    id: props.post?.id,
    message: props.post?.message,
  });
  const handleOnchangeInput = (e, keyInput) => {
    setDataModal({
      ...dataModal,
      [keyInput]: e.target.value,
    });
  };
  const handleOk = async () => {
    try {
      setIsLoading(true);
      const res = await updateMessageForPost(
        dataModal.id,
        dataModal.message,
        props.page.access_token
      );
      if (res && res.status === 200) {
        setIsLoading(false);
        props.handleCancel("EDIT");
        props.handleClickViewBtn();
        openNotification("success", "topRight", "Cập nhập bài viết thành công");
      } else {
        openNotification(
          "error",
          "topRight",
          "Cập nhập bài viết không thành công"
        );
      }
    } catch (e) {
      console.log(e);
      openNotification("error", "topRight", "Lỗi server");
      setIsLoading(false);
    }
  };
  return (
    <Modal
      title={"Chỉnh sửa bài viết"}
      open={props.isOpenModal}
      onCancel={() => props.handleCancel("EDIT")}
      width="60%"
      footer={[
        <Button
          onClick={() => props.handleCancel("EDIT")}
          size={"large"}
          key={"btn-cancel"}
        >
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
            <span>ID bài viết</span>
            <Input
              value={dataModal.id}
              onChange={(e) => handleOnchangeInput(e, "message")}
              size={"large"}
              readOnly
              disabled
            ></Input>
          </Col>
          <Col className="gutter-row mt-2" span={12}>
            <span>Nội dung</span>
            <Input
              value={dataModal.message}
              onChange={(e) => handleOnchangeInput(e, "message")}
              size={"large"}
            ></Input>
          </Col>
        </Row>
      </Form>
    </Modal>
  );
}

export default ModalEditMessagePost;
