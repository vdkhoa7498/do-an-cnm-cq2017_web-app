import React, { useEffect, useState } from "react";
import { Divider, Button } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { useHistory } from "react-router-dom";
import "./styles.scss";
import {
  getConfirmedProjectsService,
} from "../../services/project.service";
import ProjectList from "./components/ProjectList";

const Project = () => {
  const history = useHistory();
  const [confirmedProjectList, setConfirmedProjectList] = useState();
  const role = localStorage.getItem("role");
  const isAuthenticated = localStorage.getItem("isAuthenticated");

  useEffect(() => {
    getConfirmedProjectsService()
      .then((res) => {
        setConfirmedProjectList(res.data);
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
        <h1 style={{ float: "left" }}>Confirm Project List</h1>
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
      <ProjectList data={confirmedProjectList}/>
    </div>
  );
};

export default Project;
