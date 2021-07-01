import React, { useEffect, useState } from "react";
import { Table, Tag, Divider, Button, Tabs } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { useHistory } from "react-router-dom";
import "./styles.scss";
import {
  getConfirmedProjectsService,
  getUnconfirmedProjectsService,
} from "../../services/project.service";

const { TabPane } = Tabs;

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
    dataIndex: "project_deadline",
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

const Project = () => {
  const history = useHistory();
  const [confirmedProjectList, setConfirmedProjectList] = useState();
  const [unconfirmedProjectList, setUncofirmedProjectList] = useState();
  const role = localStorage.getItem("role");
  const isAuthenticated = localStorage.getItem("isAuthenticated");

  useEffect(() => {
    getConfirmedProjectsService()
      .then((res) => {
        setConfirmedProjectList(res.data);
      })
      .catch((err) => console.log(err));

    getUnconfirmedProjectsService()
      .then((res) => {
        setUncofirmedProjectList(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          width: "100%",
        }}
      >
        <h1 style={{ float: "left" }}>Projects</h1>
        {!isAuthenticated ? null : (
          <div>
            {role !== "organization" ? (
              <Button
                onClick={() => {
                  history.push("/create-new-project");
                }}
                type="primary"
                htmlType="submit"
                className="register-form-button"
                icon={<PlusOutlined />}
              >
                Create New Project
              </Button>
            ) : null}
          </div>
        )}
      </div>
      <Divider />
      <Tabs defaultActiveKey="1">
        <TabPane tab="Confirmed Projects" key="1">
          <Table
            columns={columns}
            dataSource={confirmedProjectList}
            rowKey="projectId"
            onRow={(record, rowIndex) => {
              return {
                onClick: (event) => {
                  console.log(record, rowIndex);
                  history.push(`/projects/${record.project_id}`);
                },
              };
            }}
          />
        </TabPane>
        <TabPane tab="Unconfirmed Projects" key="2">
          <Table
            columns={columns}
            dataSource={unconfirmedProjectList}
            rowKey="projectId"
            onRow={(record, rowIndex) => {
              return {
                onClick: (event) => {
                  console.log(record, rowIndex);
                  history.push(`/projects/${record.project_id}`);
                },
              };
            }}
          />
        </TabPane>
      </Tabs>
    </div>
  );
};

export default Project;
