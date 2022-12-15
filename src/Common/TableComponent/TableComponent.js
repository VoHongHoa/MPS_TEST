import React from "react";
import { Pagination, Table } from "antd";
import { useSelector } from "react-redux";
import "./TableComponent.scss";
// const data = [
//   {
//     key: "1",
//     name: "John Brown",
//     age: 32,
//     address: "New York No. 1 Lake Park",
//   },
//   {
//     key: "2",
//     name: "Jim Green",
//     age: 42,
//     address: "London No. 1 Lake Park",
//   },
//   {
//     key: "3",
//     name: "Joe Black",
//     age: 32,
//     address: "Sidney No. 1 Lake Park",
//   },
//   {
//     key: "4",
//     name: "Disabled User",
//     age: 99,
//     address: "Sidney No. 1 Lake Park",
//   },
// ];

// rowSelection object indicates the need for row selection

const TableComponent = (props) => {
  const columnsSetting = useSelector(
    (state) => state.settingDrawer.tableSetting
  );
  const processColumns = props.columns.filter((item) =>
    columnsSetting.includes(item.dataIndex)
  );

  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      props.handleChooseRow(selectedRows);
    },
  };
  return (
    <div className="table-common">
      <Table
        rowSelection={{
          ...rowSelection,
        }}
        pagination={false}
        columns={
          columnsSetting && columnsSetting.length > 0
            ? processColumns
            : props.columns
        }
        dataSource={props.dataSource}
      />
      <Pagination defaultCurrent={6} total={91} />
    </div>
  );
};

export default TableComponent;
