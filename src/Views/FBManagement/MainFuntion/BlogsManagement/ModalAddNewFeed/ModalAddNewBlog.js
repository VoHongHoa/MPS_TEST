import { Button, Col, Form, Input, Modal, notification, Row } from "antd";
import React, { useState } from "react";
import { createBlog } from "../../../../../Service/FBManagement";
function ModalAddNewBlog(props) {
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
    message: "",
    link: "",
  });
  const handleOnchangeInput = (e, keyInput) => {
    setDataModal({
      ...dataModal,
      [keyInput]: e.target.value,
    });
  };
  const handleOk = async () => {
    setIsLoading(true);
    try {
      const res = await createBlog(
        props.pageId,
        props.page.access_token,
        dataModal
      );
      if (res && res.status === 200) {
        setIsLoading(false);
        setDataModal({
          link: "",
          message: "",
        });
        openNotification("success", "topRight", "Đăng bài viết thành công");
        props.handleCancel("FEED");
      }
    } catch (e) {
      console.log(e);
      openNotification("error", "topRight", "Lỗi server");
      setIsLoading(false);
    }
  };
  return (
    <Modal
      title={"Thêm mới bài viết"}
      open={props.isOpenModal}
      onCancel={() => props.handleCancel("FEED")}
      width="60%"
      footer={[
        <Button
          onClick={() => props.handleCancel("FEED")}
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
            <span>Nội dung</span>
            <Input
              value={dataModal.message}
              onChange={(e) => handleOnchangeInput(e, "message")}
              size={"large"}
            ></Input>
          </Col>
          <Col className="gutter-row mt-2" span={12}>
            <span>Link đính kèm</span>
            <Input
              value={dataModal.link}
              onChange={(e) => handleOnchangeInput(e, "link")}
              size={"large"}
            ></Input>
          </Col>
        </Row>
      </Form>
    </Modal>
  );
}

export default ModalAddNewBlog;
