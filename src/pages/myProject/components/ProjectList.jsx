import React from "react";
import { Table, Tag, Input } from "antd";
import { useHistory } from "react-router-dom";
import "../styles.scss";

const {TextArea} = Input
const columns = [
  {
    title: "Project Name",
    dataIndex: "project_name",
    key: "project_name",
  },
  {
    title: "Description",
    dataIndex: "project_description",
    key: "project_description",
    render: text => {return(<TextArea style={{border: "none"}} autoSize={{ minRows: 2, maxRows: 6 }} value={text} />)},
  },
  {
    title: "Start Date",
    dataIndex: "project_create_timestamp",
    key: "project_create_timestamp",
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
    dataIndex: "project_deadline",
    key: "project_deadline",
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
      rowKey="project_id"
      onRow={(record, rowIndex) => {
        return {
          onClick: (event) => {
            console.log(record, rowIndex);
            history.push(`/projects/${record.project_id}`);
          },
        };
      }}
    />
  );
};

export default ProjectList;
