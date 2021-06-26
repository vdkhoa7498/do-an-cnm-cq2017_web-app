import React, { useEffect, useState } from "react";
import { Table, Tag, Divider, Button, Tabs } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { useHistory } from "react-router-dom";
import "./styles.scss";
import { getConfirmedProjectsService, getProjectsService, getUnconfirmedProjectsService } from "../../services/project.service";

const { TabPane } = Tabs;

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
  },
  {
    title: "Start Date",
    dataIndex: "projectCreateTimestamp",
    key: "projectCreateTimestamp",
    render: (projectCreateTimestamp) => {
      const date_ob = new Date(parseInt(projectCreateTimestamp));
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
      const deadlineTimestamp = parseInt(projectDeadline);
      const date_ob = new Date(deadlineTimestamp);

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
      const deadlineDate = new Date(parseInt(deadline));
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
  const isAuthenticated = localStorage.getItem("isAuthenticated")

  useEffect(() => {
	getConfirmedProjectsService()
	.then((res) => {
        setConfirmedProjectList(res.data);
        console.log(res.data);
      })
      .catch((err) => console.log(err));

	getUnconfirmedProjectsService()
	.then((res) => {
        setUncofirmedProjectList(res.data);
        console.log(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div>
      {role !== "organization" ? (
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
			{
				(!isAuthenticated)
				? null
				:<Button
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
			}
            
          </div>
          <Divider />
          <Table
            columns={columns}
            dataSource={confirmedProjectList}
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
        </div>
      ) : (
		<Tabs defaultActiveKey="1" >
		<TabPane tab="Confirmed Projects" key="1">
		<Table
            columns={columns}
            dataSource={confirmedProjectList}
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
		</TabPane>
		<TabPane tab="Unconfirmed Projects" key="2">
		<Table
            columns={[...columns, {
				title: 'Action',
				key: 'action',
				render: (text, record) => (
				  <Button >
					Confirm
				  </Button>
				),
			  },]}
            dataSource={unconfirmedProjectList}
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
		</TabPane>
	  </Tabs>
      )}
    </div>
  );
};

export default Project;
