import React from "react";
import { Pagination, Table } from "antd";
import { useSelector } from "react-redux";
import "./TableComponent.scss";

const TableComponent = (props) => {
  const columnsSetting = useSelector((state) => {
    if (state.settingDrawer.tableSetting[props.screenName]) {
      return state.settingDrawer.tableSetting[props.screenName];
    }
    return props.columns.map((item) => item.dataIndex);
  });

  const processColumn = props.columns.filter((item) =>
    columnsSetting.includes(item.dataIndex)
  );

  // console.log(processColumn);

  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      props.handleChooseRow(selectedRows);
    },
  };
  const handleOnchangePage = (page, pageSize) => {
    console.log(page, pageSize);
    props.setSearchOption({
      page: page,
      limit: pageSize,
    });
  };
  return (
    <div className="table-common">
      <Table
        rowSelection={{
          ...rowSelection,
        }}
        pagination={false}
        className="table-content-container"
        columns={processColumn}
        dataSource={props.dataSource}
      />
      <Pagination
        defaultCurrent={1}
        total={props.total}
        showSizeChanger
        showQuickJumper
        onChange={handleOnchangePage}
      />
    </div>
  );
};

export default TableComponent;
