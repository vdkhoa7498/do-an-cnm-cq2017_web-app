import React, {useState} from 'react';
import { Divider, Form, Input, Row, Col, Button, Modal, message } from 'antd';
import { WalletOutlined } from '@ant-design/icons'
import { useParams } from 'react-router-dom';
import './styles.scss'
import { donateProjectService } from '../../services/project.service';

const { TextArea } = Input;

const data = 
    {
      "projectId": 0,
      "projectName": "Ung ho nguoi tan tat5",
      "projectBeneficiaryCreateAddress": "04c5f5d991997ea260a52b9af3d0798056614082e2ad00a1f2797b51438ea6afc30c9a47e0eeb69cf13e6d9c81700f489f01c72423920ca71d34c429b4cd6b6b12",
      "projectOrganizationConfirmAddress": null,
      "projectDescription": "ung ho nguoi tan tat kho khan, vo gia cu",
      "projectCreateTimestamp": 1624028149403,
      "projectConfirmTimestamp": null,
      "projectDeadline": 1623870000000
    }

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
    const [project, setProject] = useState(data)
    const [isModalVisible, setIsModalVisible] = useState(false);

    const donate = (values) => {
        const data = {
            projectId: id,
            fromAddress: address,
            ...values,
        }
        donateProjectService(data)
        .then(res=>{
            console.log(res)
            message.success("")
        })
        .catch(err=>console.log(err))

        setIsModalVisible(false);
    };

    return(
        <div style={{ textAlign: "left" }}>
            <Modal 
                title="Donate" 
                footer={[
                    <Button form="myForm" type="primary" htmlType="submit">
                        Donate 
                    </Button>,
                    <Button onClick={()=>{form.resetFields(); setIsModalVisible(false);}}>
                        Cancel 
                    </Button>
                ]} 
                visible={isModalVisible} 
            >
                <Form
                    {...layout}
                    form={form}
                    id="myForm"
                    onFinish={donate}
                    >
                    <Form.Item
                        label="Amount Donated"
                        name="amount"
                        rules={[
                        {
                            required: true,
                            message: 'Please input your Amount donated!',
                        },
                        ]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Private Key"
                        name="privateKey"
                        rules={[
                        {
                            required: true,
                            message: 'Please input your Private key!',
                        },
                        ]}
                    >
                        <TextArea autoSize={{ minRows: 2, maxRows: 6 }} />
                    </Form.Item>
                </Form>
            </Modal>
            <div style={{display: "flex", justifyContent: "space-between", alignItems: "center"}}>
                <h1>Project Information</h1>
                <Button type="primary" onClick={()=>{setIsModalVisible(true)}}  style={{marginRight: 20, width: 120}} ><WalletOutlined /> Donate</Button>
            </div>
            <Divider/>
            <Row style={{margin: 5}}>
                <Col span={4} style={{textAlign: "right", marginRight: 15}}>
                    <span className="label"> Project Name </span>
                </Col>
                <Col span={12}>
                    <Input value={project.projectName} />
                </Col>
            </Row>
            <Row style={{margin: 5}}>
                <Col span={4} style={{textAlign: "right", marginRight: 15}}>
                    <span className="label"> Project Description </span>
                </Col>
                <Col span={12}>
                    <TextArea autoSize={{ minRows: 2, maxRows: 6 }} value={project.projectDescription} />
                </Col>
            </Row>
            <Row style={{margin: 5}}>
                <Col span={4} style={{textAlign: "right", marginRight: 15}}>
                    <span className="label"> Beneficiary Address: </span>
                </Col>
                <Col span={12}>
                    <TextArea autoSize={{ minRows: 2, maxRows: 6 }} value={project.projectBeneficiaryCreateAddress} />
                </Col>
            </Row>
            <Row style={{margin: 5}}>
                <Col span={4} style={{textAlign: "right", marginRight: 15}}>
                    <span className="label"> Project Description: </span>
                </Col>
                <Col span={12}>
                    <Input value={project.projectBeneficiaryCreateAddress} />
                </Col>
            </Row>

        </div>
    )
}

export default ProjectItem