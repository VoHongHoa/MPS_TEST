import { Button, Col, Form, Input, Modal, notification, Row } from "antd";
import React, { useEffect, useState } from "react";
import { getPostInsight } from "../../../../../Service/FBManagement";
import "./ModalViewPostDetail.scss";
function ModalViewPostDetail(props) {
  const [api, contextHolder] = notification.useNotification();
  const [isLoading, setIsLoading] = useState(false);
  const openNotification = (type, placement, message) => {
    api[type]({
      message: `Thông báo`,
      description: message,
      placement,
    });
  };
  return (
    <Modal
      title={"Xem chi tiết bài viết"}
      open={props.isOpenModal}
      onCancel={() => props.handleCancel("VIEW")}
      width="90%"
      footer={[
        <Button
          onClick={() => props.handleCancel("VIEW")}
          size={"large"}
          key={"btn-cancel"}
        >
          Hủy
        </Button>,
      ]}
    >
      {contextHolder}
      <div className="view-detail-post-container">
        <div className="overview-container">
          <div className="post-image-container">
            <a href={props.post.link} target="_blank">
              Link bài viết
            </a>
          </div>
          <div className="post-infor">
            <div className="post-information-insight">
              <h3>{props.post?.message}</h3>
              <p> Ngày tạo: {props.post?.created_time}</p>
              <p>ID: {props.post?.id}</p>
            </div>
            <h4>Lượt tương tác</h4>
            <div className="post-reactions-insight">
              <div className="detail-insight">
                <span>{"Lượt bày tỏ cảm xúc: " + props.post?.like}</span>
              </div>
              <div className="detail-insight">
                <span>{"Lượt bình luận: " + props.post?.comment}</span>
              </div>
              <div className="detail-insight">
                <span>{"Lượt chia sẻ: " + props.post?.share_count}</span>
              </div>
            </div>
          </div>
        </div>
        <div className="effect-container">
          <span className="title">Hiệu quả</span>
          <div className="grid-effect-container">
            <div className="grid-content">
              <span className="title">Số người tiếp cận</span>
            </div>
            <div className="grid-content">
              <span className="title">Cảm xúc, bình luận và lượt chia sẻ</span>
            </div>
            <div className="grid-content">
              <span className="title">Kết quả</span>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
}

export default ModalViewPostDetail;
