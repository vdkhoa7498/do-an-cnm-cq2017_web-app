import React, { useEffect, useState } from "react";
import { Divider } from "antd";
import "./styles.scss";
import { getMyConfirmedProjectsService } from "../../services/project.service";
import ProjectList from "./components/ProjectList";

const OrganizationProject = () => {
  const [myConfirmedProjectList, setMyConfirmedProjectList] = useState([]);
  const myAddress = localStorage.getItem("address");

  useEffect(() => {
    getMyConfirmedProjectsService(myAddress)
      .then((res) => {
        setMyConfirmedProjectList(res.data);
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
        <h1 style={{ float: "left" }}>My ConfirmedProject List</h1>
        
      </div>
      <Divider />
      <ProjectList data={myConfirmedProjectList} />
    </div>
  );
};

export default OrganizationProject;
