import React, { useEffect, useState } from "react";
import { Divider } from "antd";
import "./styles.scss";
import { getMyCreatedProjectsService } from "../../services/project.service";
import ProjectList from "../project/components/ProjectList";

const UserProject = () => {
  const [myCreatedProjectList, setMyCreatedProjectList] = useState();
  const myAddress = localStorage.getItem("address");

  useEffect(() => {
    getMyCreatedProjectsService(myAddress)
      .then((res) => {
        setMyCreatedProjectList(res.data);
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
        <h1 style={{ float: "left" }}>My Project List</h1>
        
      </div>
      <Divider />
      <ProjectList data={myCreatedProjectList} />
    </div>
  );
};

export default UserProject;
