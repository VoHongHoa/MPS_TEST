import { Button, Layout, notification, Select } from "antd";
import { Content } from "antd/es/layout/layout";
import moment from "moment";

import React, { useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { fbManagementSiderItems, openKeys } from "../../..";
import BreadcrumbCommon from "../../../../../Common/BreadcrumbCommon/BreadcrumbCommon";
import SiderCommon from "../../../../../Common/Sider/SiderCommon";
import TableComponent from "../../../../../Common/TableComponent/TableComponent";
import {
  getAllFeedByPageId,
  getAllPage,
} from "../../../../../Service/FBManagement";
import ModalAddNewBlog from "../ModalAddNewFeed/ModalAddNewBlog";
import ModalAddNewImage from "../ModalAddNewImage/ModalAddNewImage";
import { columns } from "../Model/Model";

//-----------------------------------Component Start---------------------------------------------
function BlogsManagementPage() {
  //-------------State----------------
  const breadcrumbItem = ["Quản lý FB", "Quản lý trang"];

  //-------State end--------

  const { userFbInfor } = useSelector((state) => state.user);
  //Notify
  const [api, contextHolder] = notification.useNotification();
  const [seachModel, setSearchModel] = useState();
  const [selectedPageId, setSelectedPageId] = useState();
  const [isOpenModal, setIsOpenModal] = useState({
    feedModal: false,
    imageModal: false,
  });
  const [searchOption, setSearchOption] = useState();
  const [page, setPage] = useState();
  const [selectedRows, setSelectedRows] = useState();
  const [pagesData, setPagesData] = useState([]);
  const [feedsData, setFeedsData] = useState([]);
  const openNotification = (type, placement, message) => {
    api[type]({
      message: `Thông báo`,
      description: message,
      placement,
    });
  };
  //action search
  const handleSearch = () => {};
  //Onchange selectedRows
  const handleChooseRow = (rows) => {
    setSelectedRows(rows);
  };
  //fetch pages data
  const fetchPagesData = async () => {
    try {
      const access_token = userFbInfor.authResponse.accessToken;
      const res = await getAllPage(access_token);
      if (res && res.status === 200 && res.data) {
        setPagesData(res.data.data);
      }
    } catch (e) {
      console.log(e);
      openNotification("error", "topRight", "Lỗi server");
    }
  };
  //process data select
  const dataSelect = useMemo(() => {
    if (pagesData && pagesData.length === 0) {
      return [];
    }
    return pagesData.map((item) => {
      return {
        label: item.name,
        value: item.id,
        access_token: item.access_token,
      };
    });
  }, [pagesData]);
  useEffect(() => {
    fetchPagesData();
  }, []);

  const handleOnChangePageSelect = (value) => {
    setSelectedPageId(value);
    const page = pagesData.find((item) => item.id === value);
    setPage(page);
  };
  const handleClickViewBtn = async () => {
    if (!selectedPageId) {
      openNotification(
        "warning",
        "topRight",
        "Vui lòng chọn trang để tiếp tục"
      );
      return;
    } else {
      try {
        const res = await getAllFeedByPageId(page.id, page.access_token);
        if (res && res.status === 200 && res.data) {
          setFeedsData(res.data.data);
        }
      } catch (e) {
        console.log(e);
        openNotification("error", "topRight", "Lỗi server");
      }
    }
  };

  const dataBlogsProcess = useMemo(() => {
    if (feedsData.length === 0) {
      return [];
    }
    return feedsData.map((item) => {
      return {
        id: item.id,
        created_time: moment(item.created_time).format("L"),
        message: item.message,
        story: item.story,
      };
    });
  }, [feedsData]);
  const handleOpenModal = (modal) => {
    if (!selectedPageId) {
      openNotification(
        "warning",
        "topRight",
        "Vui lòng chọn trang để đăng bài viết"
      );
      return;
    }
    if (modal === "FEED") {
      setIsOpenModal({
        ...isOpenModal,
        feedModal: true,
      });
    }
    if (modal === "IMAGE") {
      setIsOpenModal({
        ...isOpenModal,
        imageModal: true,
      });
    }
  };
  const handleCancel = (modal) => {
    if (modal === "FEED") {
      setIsOpenModal({
        ...isOpenModal,
        feedModal: false,
      });
    }
    if (modal === "IMAGE") {
      setIsOpenModal({
        ...isOpenModal,
        imageModal: false,
      });
    }
  };
  return (
    <Content
      style={{
        padding: "0 50px",
      }}
    >
      {contextHolder}
      <BreadcrumbCommon item={breadcrumbItem} />
      <Layout className="site-layout-background">
        <SiderCommon
          item={fbManagementSiderItems}
          widthRequest="250"
          openKeys={openKeys}
          keyItem="/dash/facebook-management/blogs"
        />
        <Content
          style={{
            padding: "0 24px",
            minHeight: 280,
          }}
        >
          <div className="choose-page-container">
            <span>Chọn trang</span>
            <Select
              mode={"single"}
              allowClear
              size={"large"}
              style={{ width: "100%" }}
              placeholder={"Nhấp chọn"}
              onChange={handleOnChangePageSelect}
              options={dataSelect}
              value={selectedPageId}
            />
          </div>
          <div className="btn-authorities-container">
            <div className="btn-container">
              <Button
                type="primary"
                size={"large"}
                onClick={() => handleClickViewBtn()}
              >
                Xem
              </Button>
              <Button
                type="primary"
                size={"large"}
                onClick={() => handleOpenModal("FEED")}
              >
                Thêm Bài Feed
              </Button>
              <ModalAddNewBlog
                isOpenModal={isOpenModal.feedModal}
                handleCancel={handleCancel}
                pageId={selectedPageId}
                page={page}
              />
              <Button
                type="primary"
                size={"large"}
                onClick={() => handleOpenModal("IMAGE")}
              >
                Đăng ảnh
              </Button>
              <ModalAddNewImage
                isOpenModal={isOpenModal.imageModal}
                handleCancel={handleCancel}
                pageId={selectedPageId}
                page={page}
              />
              <Button type="primary" size={"large"}>
                Chỉnh sửa
              </Button>
              <Button type="primary" size={"large"}>
                Xóa
              </Button>
            </div>
          </div>
          <h1> Danh sách các bài viết</h1>
          <div className="table-authorities-container">
            <TableComponent
              handleChooseRow={handleChooseRow}
              columns={columns}
              dataSource={dataBlogsProcess}
              total={pagesData.length}
              setSearchOption={setSearchOption}
              searchOption={searchOption}
              screenName="Blogs"
            />
          </div>
        </Content>
      </Layout>
    </Content>
  );
}

export default BlogsManagementPage;
