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
  deletePosts,
  getAllFeedByPageId,
  getAllPage,
  getCommentPost,
  getPost,
  getPostInsight,
} from "../../../../../Service/FBManagement";
import ModalAddNewBlog from "../ModalAddNewFeed/ModalAddNewBlog";
import ModalAddNewImage from "../ModalAddNewImage/ModalAddNewImage";
import ModalEditMessagePost from "../ModalEditMessagePost/ModalEditMessagePost";
import ModalViewPostDetail from "../ModalViewPostDetail/ModalViewPostDetail";
import { columns } from "../Model/Model";

//-----------------------------------Component Start---------------------------------------------
function BlogsManagementPage() {
  const breadcrumbItem = ["Quản lý FB", "Quản lý trang"];
  //-------------State----------------
  const [searchOption, setSearchOption] = useState();
  const [page, setPage] = useState();
  const [selectedRows, setSelectedRows] = useState([]);
  const [pagesData, setPagesData] = useState([]);
  const [feedsData, setFeedsData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [seachModel, setSearchModel] = useState();
  const [selectedPageId, setSelectedPageId] = useState();
  const [detailPost, setDetailPost] = useState([]);
  const [isOpenModal, setIsOpenModal] = useState({
    feedModal: false,
    imageModal: false,
    editModal: false,
    viewModal: false,
  });
  //State Redux--------
  const { userFbInfor } = useSelector((state) => state.user);
  //Notify
  const [api, contextHolder] = notification.useNotification();
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
    setSelectedRows([]);
    if (!selectedPageId) {
      openNotification(
        "warning",
        "topRight",
        "Vui lòng chọn trang để tiếp tục"
      );
      return;
    } else {
      setIsLoading(true);
      try {
        const res = await getAllFeedByPageId(page.id, page.access_token);
        if (res && res.status === 200 && res.data) {
          setFeedsData(res.data.data);
          setIsLoading(false);
        }
      } catch (e) {
        console.log(e);
        openNotification("error", "topRight", "Lỗi server");
        setIsLoading(false);
      }
    }
  };

  const dataBlogsProcess = useMemo(() => {
    if (feedsData.length === 0) {
      return [];
    }
    return feedsData.map((item) => {
      return {
        key: item.id,
        id: item.id,
        icon: item.icon,
        created_time: moment(item.created_time).format("L"),
        like: item.likes.summary.total_count,
        comment: item.comments.summary.total_count,
        link: item.actions[0].link,
        message: item.message,
        story: item.story,
        share_count: item.shares ? item.shares.count : 0,
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
    if (modal === "EDIT") {
      setIsOpenModal({
        ...isOpenModal,
        editModal: true,
      });
    }
    if (modal === "VIEW") {
      setIsOpenModal({
        ...isOpenModal,
        viewModal: true,
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
    if (modal === "EDIT") {
      setIsOpenModal({
        ...isOpenModal,
        editModal: false,
      });
    }
    if (modal === "VIEW") {
      setIsOpenModal({
        ...isOpenModal,
        viewModal: false,
      });
    }
  };

  const handleDeletePosts = async () => {
    if (selectedRows && selectedRows.length === 0) {
      openNotification("warning", "topRight", "Vui lòng chọn dữ liệu để xóa");
      return;
    }
    try {
      setIsLoading(true);
      const result = await Promise.all(
        selectedRows.map(async (post) => {
          const res = await deletePosts(post.id, page.access_token);
          if (res || res.status !== 200 || res.data.success !== true) {
            return {
              id: post.id,
              success: false,
            };
          }
          return {
            id: post.id,
            success: true,
          };
        })
      );
      const postDeleteErr = result.find((item) => item.success === false);
      if (postDeleteErr.length > 0) {
        let message = "";
        postDeleteErr.forEach((post) => {
          message =
            "Không thể xóa những bài viết có id sau : " +
            message.toString() +
            " " +
            post.id.toString();
        });
        openNotification("warning", "topRight", message);
        return;
      }
      openNotification("success", "topRight", "Xóa bài viết thành công");
      handleClickViewBtn();
    } catch (e) {
      console.log(e);
      openNotification("error", "topRight", "Không thể xóa bài viết");
    }
  };

  const handleEditPost = () => {
    if (selectedRows.length !== 1) {
      openNotification(
        "warning",
        "topRight",
        "Vui lòng chọn 1 dòng dữ liệu để chỉnh sửa"
      );
      return;
    }
    handleOpenModal("EDIT");
    try {
    } catch (e) {
      console.log(e);
      openNotification(
        "error",
        "topRight",
        "Hiện tại không thể chỉnh sửa bài viết này"
      );
    }
  };
  const handleClickViewDetailBtn = async () => {
    if (selectedRows.length !== 1) {
      openNotification(
        "warning",
        "topRight",
        "Vui lòng chọn 1 dòng dữ liệu để chỉnh sửa"
      );
      return;
    }

    try {
      // const resInsight = await getPostInsight(
      //   selectedRows[0].id,
      //   page.access_token
      // );
      // const resComment = await getCommentPost(
      //   selectedRows[0].id,
      //   page.access_token
      // );
      // if (
      //   resInsight &&
      //   resInsight.status === 200 &&
      //   resComment.status === 200
      // ) {
      //   let reactTotal = 0;
      //   resInsight.data.data.forEach((item) => {
      //     reactTotal += item.values[0].value;
      //   });
      //   const dataInsight = [
      //     { title: "Lượt bày tỏ cảm xúc", value: reactTotal },
      //     { title: "Lượt bình luận", value: resComment.data.data.length },
      //   ];
      //   setDetailPost(dataInsight);
      // }
      handleOpenModal("VIEW");
    } catch (e) {
      console.log(e);
      openNotification(
        "error",
        "topRight",
        "Hiện tại không thể xem chi tiết! Vui lòng thử lại sau"
      );
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
                loading={isLoading}
                onClick={() => handleClickViewBtn()}
              >
                Tìm kiếm
              </Button>
              <Button
                type="primary"
                size={"large"}
                onClick={() => handleClickViewDetailBtn()}
              >
                Xem
              </Button>
              {selectedRows && selectedRows.length === 1 && (
                <ModalViewPostDetail
                  isOpenModal={isOpenModal.viewModal}
                  handleCancel={handleCancel}
                  pageId={selectedPageId}
                  post={selectedRows[0]}
                  // detailPost={detailPost}
                  handleClickViewBtn={handleClickViewBtn}
                  page={page}
                />
              )}

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
                handleClickViewBtn={handleClickViewBtn}
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
                Thêm Video
              </Button>

              <Button type="primary" size={"large"} onClick={handleEditPost}>
                Chỉnh sửa
              </Button>
              {selectedRows && selectedRows.length === 1 && (
                <ModalEditMessagePost
                  isOpenModal={isOpenModal.editModal}
                  handleCancel={handleCancel}
                  pageId={selectedPageId}
                  post={selectedRows[0]}
                  handleClickViewBtn={handleClickViewBtn}
                  page={page}
                />
              )}

              <Button
                type="primary"
                size={"large"}
                onClick={handleDeletePosts}
                loading={isLoading}
              >
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
