import React, { useState, useEffect } from "react";
import { Form, Divider, Input, Button, Row, Col, Modal, message } from "antd";
import { useHistory, useParams } from "react-router-dom";
import "../styles.scss";
import { sendBackProjectService } from "../../../services/transaction.service";
import { getProjectByIdService } from "../../../services/project.service";

const layout = {
  labelCol: {
    span: 4,
  },
  wrapperCol: {
    span: 16,
  },
};
const tailLayout = {
  wrapperCol: {
    offset: 4,
    span: 16,
  },
};

const SendBackProject = () => {
  const [form] = Form.useForm();
  const history = useHistory();
  const params = useParams();
  const id = parseInt(params.id);
  const [project, setProject] = useState();

  const onFinish = async (values) => {
    const data = values;
    data.projectId = id;
    console.log(data)
    await sendBackProjectService(data)
      .then((res) => {
        if (res.status === 204) {
          message.error("Send back to project failed! Something is wrong");
        }
        if (res.status === 201) {
          message.success(`Your are sent back ${data.amount} successfull!`);
          history.push("/confirmed-projects");
        }
      })
      .catch((err) => console.log(err));
  };

  const onReset = () => {
    form.resetFields();
  };
  useEffect(() => {
    getProjectByIdService(id)
      .then((res) => {
        setProject(res.data);
      })
      .catch((err) => console.log(err));
  }, []);
  return (
    <div style={{ textAlign: "left" }}>
      <Modal></Modal>
      <h1>Send Back Project</h1>
      <Divider />
      {!project ? null : (
        <div style={{ width: "100%" }}>
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
        </div>
      )}
      <Divider />
      <Form {...layout} form={form} onFinish={onFinish}>
        <Form.Item
          name="amount"
          label="Amount"
          rules={[
            {
              required: true,
              message: "Please input your Amount",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="privateKey"
          label="Private Key"
          rules={[
            {
              required: true,
              message: "Please input your Private key",
            },
          ]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item {...tailLayout}>
          <Button type="primary" htmlType="submit" style={{ margin: 5 }}>
            Submit
          </Button>
          <Button htmlType="button" onClick={onReset} style={{ margin: 5 }}>
            Reset
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default SendBackProject;