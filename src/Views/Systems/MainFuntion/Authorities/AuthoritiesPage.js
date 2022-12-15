import { Button, Layout, notification } from "antd";
import { Content } from "antd/es/layout/layout";
import { SettingOutlined } from "@ant-design/icons";
import React, { useEffect, useMemo, useState } from "react";
import { openKeys, systemSiderItems } from "../..";
import BreadcrumbCommon from "../../../../Common/BreadcrumbCommon/BreadcrumbCommon";
import SiderCommon from "../../../../Common/Sider/SiderCommon";
import TableComponent from "../../../../Common/TableComponent/TableComponent";
import { deleteRole, getAllRole } from "../../../../Service/Authorities";
import AuthoritiesAdd from "./AuthoritiesAdd";
import AuthoritiesEdit from "./AuthoritiesEdit";
import "./AuthoritiesPage.scss";
import SettingDrawer from "../../../../Common/SettingDrawer/SettingDrawer";
import { columns } from "./Model/model";
import AuthoritiesSearch from "./AuthoritiesSearch";

const AuthoritiesPage = () => {
  const breadcrumbItem = ["Hệ thống", "Phân quyền"];
  const [isOpenModalAdd, setIsOpenModalAdd] = useState(false);
  const [selectedRows, setSelectedRows] = useState([]);
  const [rolesData, setRolesData] = useState([]);
  const [isOpenModalEdit, setIsOpenModalEdit] = useState(false);
  const [isOpenDrawer, setIsOpenDrawer] = useState(false);
  const [searchModel, setSearchModel] = useState({
    roleName: "",
    roleCode: "",
  });
  const [api, contextHolder] = notification.useNotification();
  const [action, setAction] = useState("");
  const openNotification = (type, placement, message) => {
    api[type]({
      message: `Thông báo`,
      description: message,
      placement,
    });
  };
  const handleChangeSearchModel = (value) => {
    setSearchModel(value);
  };
  const handleCancel = () => {
    setIsOpenModalAdd(false);
  };

  const handleCancelEdit = () => {
    setIsOpenModalEdit(false);
  };

  const handleChooseRow = (rows) => {
    setSelectedRows(rows);
  };
  const handleDeleteData = async () => {
    try {
      if (selectedRows.length === 0) {
        openNotification("warning", "topRight", "Vui lòng chọn dữ liệu để xóa");
        return;
      }
      const roles = selectedRows.map((item) => {
        return item.roleCode;
      });
      const res = await deleteRole({ roles });
      if (res && res.status === 200 && res.data.success === true) {
        openNotification("success", "topRight", res.data.message);
        setSelectedRows([]);
        fetchRoleData();
      } else {
        openNotification("error", "topRight", "Xóa dữ liệu không thành công");
      }
      console.log(res);
    } catch (e) {
      openNotification("error", "topRight", "Lỗi server");
    }
  };
  const handleShowForm = () => {
    setAction("ADD");
    setIsOpenModalAdd(true);
  };
  const fetchRoleData = async () => {
    const res = await getAllRole();
    if (res.status === 200 && res.data.success === true) {
      setRolesData(res.data.data);
    }
  };
  const handleSearch = () => {
    console.log(searchModel);
  };
  const handleShowFormCopy = () => {
    setAction("COPY");
    if (selectedRows.length !== 1) {
      openNotification("warning", "topRight", "Vui lòng chọn 1 dòng dữ liệu!");
      return;
    }
    setIsOpenModalAdd(true);
  };
  const handleShowFormEdit = () => {
    if (selectedRows.length !== 1) {
      openNotification(
        "warning",
        "topRight",
        "Vui lòng chọn 1 dòng dữ liệu để chỉnh sửa!"
      );
      return;
    }
    setIsOpenModalEdit(true);
  };
  const dataProcess = useMemo(() => {
    if (rolesData.length === 0) {
      return [];
    }
    return rolesData.map((item, index) => {
      return {
        key: item._id,
        roleName: item.roleName,
        roleCode: item.roleCode,
      };
    });
  }, [rolesData]);
  const handleOpenDrawer = () => {
    setIsOpenDrawer(true);
  };
  const handleCloseDrawer = () => {
    setIsOpenDrawer(false);
  };
  useEffect(() => {}, []);
  useState(() => {
    fetchRoleData();
  }, [rolesData]);
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
          item={systemSiderItems}
          widthRequest="250"
          openKeys={openKeys}
          keyItem="/dash/he-thong/phan-quyen"
        />
        <Content
          style={{
            padding: "0 24px",
            minHeight: 280,
          }}
        >
          <div className="search-authorities-container">
            <AuthoritiesSearch
              onChange={handleChangeSearchModel}
              seachModel={searchModel}
            />
          </div>
          <div className="btn-authorities-container">
            <div className="btn-container">
              <Button type="primary" size={"large"} onClick={handleSearch}>
                Tìm kiếm
              </Button>
              <AuthoritiesAdd
                isOpenModal={isOpenModalAdd}
                handleCancel={handleCancel}
                fetchRoleData={fetchRoleData}
                selectedRow={selectedRows}
                setSelectedRows={setSelectedRows}
                action={action}
              />
              <Button type="primary" onClick={handleShowForm} size={"large"}>
                Thêm mới
              </Button>
              <Button
                type="primary"
                onClick={handleShowFormCopy}
                size={"large"}
              >
                Sao chép
              </Button>
              <Button
                type="primary"
                onClick={handleShowFormEdit}
                size={"large"}
              >
                Chỉnh sửa
              </Button>
              <AuthoritiesEdit
                isOpenModalEdit={isOpenModalEdit}
                handleCancelEdit={handleCancelEdit}
                fetchRoleData={fetchRoleData}
                selectedRow={selectedRows}
                setSelectedRows={setSelectedRows}
              />
              <Button type="primary" size={"large"}>
                Phân quyền
              </Button>
              <Button type="primary" onClick={handleDeleteData} size={"large"}>
                Xóa
              </Button>
              <Button type="primary" size={"large"}>
                Nhập file
              </Button>
              <Button type="primary" size={"large"}>
                Xuất file
              </Button>
            </div>
            <div className="setting-container">
              <SettingOutlined onClick={handleOpenDrawer} />
              <SettingDrawer
                isOpenDrawer={isOpenDrawer}
                handleCloseDrawer={handleCloseDrawer}
                options={columns}
              />
            </div>
          </div>
          <div className="table-authorities-container">
            <TableComponent
              handleChooseRow={handleChooseRow}
              columns={columns}
              dataSource={dataProcess}
            />
          </div>
        </Content>
      </Layout>
    </Content>
  );
};

export default AuthoritiesPage;
