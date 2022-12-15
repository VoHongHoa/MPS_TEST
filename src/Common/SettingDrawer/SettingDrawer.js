import { Checkbox, Divider, Drawer } from "antd";
import React from "react";
import { useDispatch } from "react-redux";
import {
  searchSettingChange,
  tableSettingChange,
} from "../../redux/settingSlice";
import "./SettingDrawer.scss";
const SettingDrawer = (props) => {
  const onSearchChange = (checkedValues) => {
    dispatch(searchSettingChange(checkedValues));
  };
  const onTableSettingChange = (checkedValues) => {
    dispatch(tableSettingChange(checkedValues));
  };

  const dispatch = useDispatch();
  const processOption =
    props.options &&
    props.options.map((item) => {
      return {
        label: item.title,
        value: item.dataIndex,
      };
    });

  const defaultOption =
    props.options &&
    props.options.map((item) => {
      return item.dataIndex;
    });

  return (
    <Drawer
      title="Tùy chọn hiển thị"
      placement="right"
      onClose={props.handleCloseDrawer}
      open={props.isOpenDrawer}
    >
      <div className="option-search">
        <span>Tùy chọn tìm kiếm</span>
        <Checkbox.Group
          options={processOption}
          defaultValue={defaultOption}
          onChange={onSearchChange}
        />
      </div>
      <Divider></Divider>
      <div className="option-table-result">
        <span>Tùy chọn bảng kết quả</span>
        <Checkbox.Group
          options={processOption}
          defaultValue={defaultOption}
          onChange={onTableSettingChange}
        />
      </div>
    </Drawer>
  );
};

export default SettingDrawer;
