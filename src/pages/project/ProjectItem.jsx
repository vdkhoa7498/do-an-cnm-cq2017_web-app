import React, { useState, useEffect } from "react";
import { Divider, Form, Input, Row, Col, Button, Modal, message } from "antd";
import {
  WalletOutlined,
  CheckOutlined,
  RetweetOutlined,
} from "@ant-design/icons";
import { useParams, useHistory } from "react-router-dom";
import "./styles.scss";
import { confirmedProjectService, getProjectByIdService } from "../../services/project.service";

const ProjectItem = () => {
  const id = useParams().id;
  const address = localStorage.getItem("publicKey");
  const history = useHistory();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [privateKey, setPrivateKey] = useState(false)

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = async() => {
    
    if (privateKey){
      const data = {
        projectId: parseInt(id),
        projectOrganizationConfirmAddress: address,
        privateKey: privateKey
      }
      console.log(data)
      await confirmedProjectService(data)
      .then(res=>{
        if (res.status === 201){
          message.success("Project confirm successful!")
          history.push(0)
          setIsModalVisible(false);
        }
        if (res.status === 204){
          message.error("Project confirm failed! Something is wrong")
          setIsModalVisible(false);
        }
      })
    }
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const [project, setProject] = useState(null);

  const [isOrganization, setIsOrganization] = useState(false);
  const [isConfirmedProject, setIsConfirmedProject] = useState(false);

  const convertTime = (time) => {
    const date_ob = new Date(time);
    const year = date_ob.getFullYear();
    const month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
    const date = ("0" + date_ob.getDate()).slice(-2);
    return (
      <span>
        {year}/{month}/{date}
      </span>
    );
  };

  useEffect(() => {
    getProjectByIdService(id)
      .then((res) => {
        setProject(res.data);
        console.log(res.data);
        if (res.data.project_organization_confirm_address) {
          setIsConfirmedProject(true);
        } else {
          setIsConfirmedProject(false);
        }
      })
      .catch((err) => console.log(err));

    if (localStorage.getItem("role") === "organization") {
      setIsOrganization(true);
    }
  }, []);

  return (
    <div style={{ textAlign: "left" }}>
      <Modal title="Basic Modal" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
        <p>Private Key</p>
        <Input.Password onChange={e => setPrivateKey(e.target.value)}/>
      </Modal>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h1>Project Information</h1>
        {isOrganization ? (
          <div>
            {isConfirmedProject ? (
              <div>
                {project.project_organization_confirm_address === address ? (
                  <Button
                    type="primary"
                    style={{ marginRight: 20, width: 120 }}
                    onClick={() => {
                      history.push(`/sendback-project/${id}`);
                    }}
                  >
                    <RetweetOutlined /> Send Back
                  </Button>
                ) : null}
              </div>
            ) : (
              <Button
                type="primary"
                style={{ marginRight: 20, width: 120 }}
                onClick={showModal}
              >
                <CheckOutlined /> Confirm
              </Button>
            )}
          </div>
        ) : (
          <div>
            {!isConfirmedProject ? null : (
              <Button
                type="primary"
                onClick={() => {
                  history.push(`/donate-project/${id}`);
                }}
                style={{ marginRight: 20, width: 120 }}
              >
                <WalletOutlined /> Donate
              </Button>
            )}
          </div>
        )}
      </div>
      <Divider />
      {!project ? null : (
        <Row style={{ width: "100%" }}>
          <Row key={1} style={{ width: "100%" }}>
            <Col span={4}>
              <strong style={{ float: "right" }}>Project Name</strong>
            </Col>
            <Col span={19} offset={1}>
              <div>{project.project_name}</div>
            </Col>
          </Row>
          <Row key={2} style={{ width: "100%" }}>
            <Col span={4}>
              <strong style={{ float: "right" }}>Project Description</strong>
            </Col>
            <Col span={19} offset={1}>
              <div>{project.project_description}</div>
            </Col>
          </Row>
          <Row key={3} style={{ width: "100%" }}>
            <Col span={4}>
              <strong style={{ float: "right" }}>Project Deadline</strong>
            </Col>
            <Col span={19} offset={1}>
              {convertTime(project.project_deadline)}
            </Col>
          </Row>
          <Divider />
          <Row key={4} style={{ width: "100%" }}>
            <Col span={4}>
              <strong style={{ float: "right" }}>
                Project Beneficiary Create Address
              </strong>
            </Col>
            <Col span={19} offset={1}>
              <div>{project.project_beneficiary_create_address}</div>
            </Col>
          </Row>
          <Row key={5} style={{ width: "100%" }}>
            <Col span={4}>
              <strong style={{ float: "right" }}>Project Created Time</strong>
            </Col>
            <Col span={19} offset={1}>
              {convertTime(project.project_create_timestamp)}
            </Col>
          </Row>
          <Divider />
          {isConfirmedProject ? (
            <div style={{ width: "100%" }}>
              <Row key={6} style={{ width: "100%" }}>
                <Col span={4}>
                  <strong style={{ float: "right" }}>
                    Project Organization Confirm Address
                  </strong>
                </Col>
                <Col span={19} offset={1}>
                  <div>{project.project_organization_confirm_address}</div>
                </Col>
              </Row>
              <Row key={7} style={{ width: "100%" }}>
                <Col span={4}>
                  <strong style={{ float: "right" }}>
                    Project Confirmed Time
                  </strong>
                </Col>
                <Col span={19} offset={1}>
                  {convertTime(project.project_confirm_timestamp)}
                </Col>
              </Row>
            </div>
          ) : null}
        </Row>
      )}
    </div>
  );
};

export default ProjectItem;
