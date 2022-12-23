import { Button, Checkbox, Divider, Drawer } from "antd";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  searchSettingChange,
  tableSettingChange,
} from "../../redux/settingSlice";
import "./SettingDrawer.scss";
const SettingDrawer = (props) => {
  const dispatch = useDispatch();

  const onSearchChange = (checkedValues) => {
    const payload = {
      checkedValues,
      screenName: props.screenName,
    };
    dispatch(searchSettingChange(payload));
  };

  const onTableSettingChange = (checkedValues) => {
    const payload = {
      checkedValues,
      screenName: props.screenName,
    };
    dispatch(tableSettingChange(payload));
  };
  const defaultOption = useSelector((state) => {
    const options = state.settingDrawer.searchSetting[props.screenName];
    if (options) {
      return options;
    }
    return (
      props.options &&
      props.options.map((item) => {
        return item.dataIndex;
      })
    );
  });

  const processOption =
    props.options &&
    props.options.map((item) => {
      return {
        label: item.title,
        value: item.dataIndex,
      };
    });

  return (
    <Drawer
      title="Tùy chọn hiển thị"
      placement="right"
      onClose={props.handleCloseDrawer}
      open={props.isOpenDrawer}
      footer={[
        <Button
          type="primary"
          size="large"
          onClick={props.handleCloseDrawer}
          key={"btn-save"}
        >
          Đóng
        </Button>,
      ]}
    >
      <div className="option-search">
        <span>Tùy chọn tìm kiếm</span>
        <Checkbox.Group
          options={processOption}
          defaultValue={defaultOption}
          onChange={onSearchChange}
          className="ground-checkbox-container"
        />
      </div>
      <Divider></Divider>
      <div className="option-table-result">
        <span>Tùy chọn bảng kết quả</span>
        <Checkbox.Group
          className="ground-checkbox-container"
          options={processOption}
          defaultValue={defaultOption}
          onChange={onTableSettingChange}
        />
      </div>
    </Drawer>
  );
};

export default SettingDrawer;
