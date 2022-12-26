import { Button, Checkbox, Collapse, Drawer, notification } from "antd";
import React, { useCallback, useEffect, useState } from "react";
import { Modules } from "../../../../../Common/HeaderCommon";
import {
  getRoleById,
  updatePermission,
} from "../../../../../Service/Authorities";
import "./EditPermission.scss";

//Init permission all screen data
const screensLabel = Modules.map((item) => {
  return {
    moduleName: item.label,
    screens: item.screen
      .filter((screenModel) => screenModel.key !== "/user-infor")
      .map((screen) => {
        return screen.children;
      }),
  };
});

screensLabel.forEach((e) => {
  let arr = [];
  e.screens.forEach((element) => {
    arr = arr.concat(element);
  });
  e.screens = arr;
});
//Action in each screen
const action = ["Thêm", "Xem", "Chỉnh sửa", "Xóa", "Tìm kiếm"];
const processOption = action.map((item, index) => {
  return {
    label: item,
    value: index,
  };
});
//----------------------Component Start----------------------------------------------
const EditPermission = (props) => {
  //Notify
  const [api, contextHolder] = notification.useNotification();
  const openNotification = useCallback(
    (type, placement, message) => {
      api[type]({
        message: `Thông báo`,
        description: message,
        placement,
      });
    },
    [api]
  );
  //State
  const [permission, setPermission] = useState({});

  //Onchange Permission
  const onChangePermission = (value, screen) => {
    const copyPermission = permission;
    copyPermission[screen] = value;
    setPermission(copyPermission);
  };
  //Save Edit
  const handleEditSave = async () => {
    try {
      const res = await updatePermission({ permission }, props.value[0].key);
      if (res.status === 200 && res.data.success === true) {
        openNotification("success", "topRight", res.data.message);
        props.handleCloseDrawerPermission();
      }
    } catch (e) {
      openNotification("error", "topRight", "Lỗi server");
    }
  };
  //Get permission data foreach role
  const fetchDataRole = useCallback(async () => {
    try {
      const res = await getRoleById(props.value[0].key);
      if (res.status !== 200 || !res.data) {
        openNotification("error", "topRight", "Không tìm thấy dữ liệu");
        return;
      }
      if (res.data.permission[0]) {
        setPermission(res.data.permission[0]);
      } else {
        setPermission({});
      }
    } catch (e) {
      console.log(e);
      openNotification("error", "topRight", "Không tìm thấy dữ liệu");
    }
  }, [openNotification, props.value]);

  useEffect(() => {
    fetchDataRole();
  }, [props.value, fetchDataRole]);

  return (
    <Drawer
      title="Chỉnh sửa quyền người dùng"
      placement="right"
      onClose={props.handleCloseDrawerPermission}
      open={props.isOpenDrawerPermission}
      size="large"
      footerStyle={{
        display: "flex",
        flexDirection: "row",
        gap: "15px",
        padding: "10px",
      }}
      footer={[
        <Button
          type="primary"
          size="large"
          onClick={handleEditSave}
          key={"btn-save"}
        >
          Lưu
        </Button>,
        <Button
          type="primary"
          size="large"
          onClick={props.handleCloseDrawerPermission}
          key={"btn-cancel"}
        >
          Đóng
        </Button>,
      ]}
    >
      {contextHolder}
      <Collapse
        collapsible="header"
        defaultActiveKey={["1", "2"]}
        expandIconPosition="end"
      >
        {screensLabel.map((module, index) => {
          return (
            <Collapse.Panel header={module.moduleName} key={index}>
              {module.screens.map((screen, index) => {
                return (
                  <div
                    className="screen-permission-edit-checkbox-container"
                    key={`${screen.label}+${index}`}
                  >
                    <h4>{screen.label}</h4>
                    <Checkbox.Group
                      options={processOption}
                      defaultValue={
                        permission[screen.screen]
                          ? permission[screen.screen]
                          : []
                      }
                      onChange={(value) =>
                        onChangePermission(value, screen.screen)
                      }
                    />
                  </div>
                );
              })}
            </Collapse.Panel>
          );
        })}
      </Collapse>
    </Drawer>
  );
};

export default EditPermission;
