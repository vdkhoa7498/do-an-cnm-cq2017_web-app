import React, { useState, useEffect } from "react";
import { Divider, Form, Input, Row, Col, Button, Modal, message } from "antd";
import { WalletOutlined, CheckOutlined } from "@ant-design/icons";
import { useParams } from "react-router-dom";
import "./styles.scss";
import {
  donateProjectService,
  getProjectByIdService,
} from "../../services/project.service";

const { TextArea } = Input;

const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};

const ProjectItem = () => {
  const id = useParams().id;
  const address = localStorage.getItem("address");
  const [form] = Form.useForm();
  const [confrimForm] = Form.useForm();
  const [project, setProject] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isConfirmModalVisible, setIsConfirmModalVisible] = useState(false);

  const [isOrganization, setIsOrganization] = useState(false);
  const [isConfirmedProject, setIsConfirmedProject] = useState(false);

  const donate = (values) => {
    const data = {
      projectId: id,
      fromAddress: address,
      ...values,
    };
    donateProjectService(data)
      .then((res) => {
        if (res.status === 204) {
          message.error("Donation failed! Wrong private key!");
          form.resetFields();
        }
        if (res.status === 201) {
          message.success(`You donated ${data.amount} to the project`);
          form.resetFields();
        }
        console.log(res);
      })
      .catch((err) => console.log(err));

    setIsModalVisible(false);
  };

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
        console.log(res.data)
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

  const DonateModal = () => {
    return (
      <Modal
        title="Donate"
        footer={[
          <Button key={"donate"} form="myForm" type="primary" htmlType="submit">
            Donate
          </Button>,
          <Button
            key={"cancel"}
            onClick={() => {
              form.resetFields();
              setIsModalVisible(false);
            }}
          >
            Cancel
          </Button>,
        ]}
        visible={isModalVisible}
      >
        <Form {...layout} form={form} id="myForm" onFinish={donate}>
          <Form.Item
            key={0}
            label="Amount Donated"
            name="amount"
            rules={[
              {
                required: true,
                message: "Please input your Amount donated!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            key={-1}
            label="Private Key"
            name="privateKey"
            rules={[
              {
                required: true,
                message: "Please input your Private key!",
              },
            ]}
          >
            <TextArea autoSize={{ minRows: 2, maxRows: 6 }} />
          </Form.Item>
        </Form>
      </Modal>
    );
  };

  const ConfirmProjectModal = () => {
    return (
      <Modal
        title="Confirm project"
        footer={[
          <Button key={"confirm"} form="myForm" type="primary" htmlType="submit">
            Confirm
          </Button>,
          <Button
            key={"c_cancel"}
            onClick={() => {
              confrimForm.resetFields();
              setIsConfirmModalVisible(false);
            }}
          >
            Cancel
          </Button>,
        ]}
        visible={isConfirmModalVisible}
      >
        <Form {...layout} form={confrimForm} id="myForm" onFinish={donate}>
          <Form.Item key={0} label="Project Name">
            {project ? <div>{project.project_name}</div> : null}
          </Form.Item>

          <Form.Item
            key={-1}
            label="Private Key"
            name="privateKey"
            rules={[
              {
                required: true,
                message: "Please input your Private key!",
              },
            ]}
          >
            <TextArea autoSize={{ minRows: 2, maxRows: 6 }} />
          </Form.Item>
        </Form>
      </Modal>
    );
  };

  return (
    <div style={{ textAlign: "left" }}>
      <DonateModal />
      <ConfirmProjectModal />
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
            {isConfirmedProject ? null : (
              <Button
                type="primary"
                style={{ marginRight: 20, width: 120 }}
                onClick={() => {
                  setIsConfirmModalVisible(true);
                }}
              >
                <CheckOutlined /> Confirm
              </Button>
            )}
          </div>
        ) : (
          <Button
            type="primary"
            onClick={() => {
              setIsModalVisible(true);
            }}
            style={{ marginRight: 20, width: 120 }}
          >
            <WalletOutlined /> Donate
          </Button>
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
            <div>
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
