import {
  Button,
  Col,
  Form,
  Input,
  Modal,
  notification,
  Row,
  Upload,
} from "antd";
import React, { useEffect, useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
import { createPostWithImage } from "../../../../../Service/FBManagement";
import { useSelector } from "react-redux";
function ModalAddNewImage(props) {
  const [api, contextHolder] = notification.useNotification();
  const [isLoading, setIsLoading] = useState(false);

  const { userFbInfor } = useSelector((state) => state.user);

  const openNotification = (type, placement, message) => {
    api[type]({
      message: `Thông báo`,
      description: message,
      placement,
    });
  };
  const [dataModal, setDataModal] = useState({
    message: "",
    url: "",
  });
  const handleOnchangeInput = (e, keyInput) => {
    setDataModal({
      ...dataModal,
      [keyInput]: e.target.value,
    });
  };
  const handleOk = async () => {
    //setIsLoading(true);
    try {
      const res = await createPostWithImage(
        props.pageId,
        props.page.access_token,
        dataModal
      );
      if (res && res.status === 200) {
        setIsLoading(false);
        setDataModal({
          url: "",
          message: "",
        });
        openNotification("success", "topRight", "Đăng bài viết thành công");
        props.handleClickViewBtn();
        props.handleCancel("IMAGE");
      }
    } catch (e) {
      console.log(e);
      openNotification("error", "topRight", "Hiện không thể đăng bài viết");
    }
  };
  const uploadButton = (
    <div>
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

  const handlePreview = () => {};

  // const handleOnchangeImage = async ({ fileList }) => {
  //   setFileList(fileList);
  //   console.log("check file", fileList);
  //   const appId = process.env.REACT_APP_FB_ID || "667792575026311";
  //   const res = await uploadFileToFBApp(
  //     appId,
  //     fileList[0],
  //     userFbInfor.authResponse.accessToken
  //   );
  //   console.log("check response", res);

  //   // fileList.forEach((file) => {
  //   //   const storageRef = ref(storage, `/MPS_FB_Image/${file.name}`);
  //   //   const uploadTask = uploadBytesResumable(storageRef, file.originFileObj);
  //   //   uploadTask.on(
  //   //     "state_changed",
  //   //     (snapshot) => {},
  //   //     (err) => {
  //   //       console.log(err);
  //   //     },
  //   //     () => {
  //   //       getDownloadURL(uploadTask.snapshot.ref).then(async (url) => {
  //   //         const dataBlog = {
  //   //           message: dataModal.message,
  //   //           link: dataModal.link,
  //   //           image: url,
  //   //         };
  //   //         setDataModal(dataBlog);
  //   //       });
  //   //     }
  //   //   );
  //   // });
  // };
  return (
    <Modal
      title={"Thêm ảnh mới"}
      open={props.isOpenModal}
      onCancel={() => props.handleCancel("IMAGE")}
      width="60%"
      footer={[
        <Button
          onClick={() => props.handleCancel("IMAGE")}
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
            <span>Link của hình ảnh</span>
            <Input
              value={dataModal.url}
              onChange={(e) => handleOnchangeInput(e, "url")}
              size={"large"}
            ></Input>
          </Col>
          {/* <Col className="gutter-row mt-2" span={12}>
            <span>Hình ảnh</span>
            <Upload
              action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
              listType="picture-card"
              fileList={fileList}
              onPreview={handlePreview}
              onChange={handleOnchangeImage}
            >
              {fileList.length >= 4 ? null : uploadButton}
            </Upload>
          </Col> */}
        </Row>
      </Form>
    </Modal>
  );
}

export default ModalAddNewImage;
