import React from "react";
import { Table, Tag, Input } from "antd";
import { useHistory } from "react-router-dom";
import "../styles.scss";

const {TextArea} = Input
const columns = [
  {
    title: "Project Name",
    dataIndex: "projectName",
    key: "projectName",
  },
  {
    title: "Description",
    dataIndex: "projectDescription",
    key: "projectDescription",
    render: text => {return(<TextArea style={{border: "none"}} autoSize={{ minRows: 2, maxRows: 6 }} value={text} />)},
  },
  {
    title: "Start Date",
    dataIndex: "projectCreateTimestamp",
    key: "projectCreateTimestamp",
    render: (projectCreateTimestamp) => {
      const date_ob = new Date(projectCreateTimestamp);
      const year = date_ob.getFullYear();
      const month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
      const date = ("0" + date_ob.getDate()).slice(-2);
      return (
        <span>
          {year}/{month}/{date}
        </span>
      );
    },
  },
  {
    title: "End Date",
    dataIndex: "projectDeadline",
    key: "projectDeadline",
    render: (projectDeadline) => {
      const date_ob = new Date(projectDeadline);

      const year = date_ob.getFullYear();
      const month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
      const date = ("0" + date_ob.getDate()).slice(-2);
      return (
        <span>
          {year}/{month}/{date}
        </span>
      );
    },
  },
  {
    title: "Status",
    dataIndex: "projectDeadline",
    key: "status",
    render: (deadline) => {
      const deadlineDate = new Date(deadline);
      const isExpired = Date.now() > deadlineDate && 1;
      return (
        <Tag color={isExpired ? "green" : "gold"}>
          {isExpired ? "Success" : "Processing"}
        </Tag>
      );
    },
  },
];

const ProjectList = (props) => {
  const { data } = props;
  const history = useHistory();

  return (
    <Table
      columns={columns}
      dataSource={data}
      rowKey="projectId"
      onRow={(record, rowIndex) => {
        return {
          onClick: (event) => {
            console.log(record, rowIndex);
            history.push(`/projects/${record.projectId}`);
          },
        };
      }}
    />
  );
};

export default ProjectList;
