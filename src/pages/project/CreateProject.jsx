import React, {useState} from 'react';
import { Form, Divider, Input, Button, DatePicker } from 'antd';
// import { PlusOutlined } from '@ant-design/icons'
import { useParams } from 'react-router-dom';
import './styles.scss'
import { createNewProjectService } from '../../services/project.service';

const layout = {
    labelCol: {
      span: 8,
    },
    wrapperCol: {
      span: 16,
    },
};
const tailLayout = {
    wrapperCol: {
        offset: 8,
        span: 16,
    },
};

const CreateProject = () => {
    const [form] = Form.useForm();

    const onFinish = (values) => {
        const data = values;
        data.projectDeadline = values.projectDeadline.format("X");
        console.log(data)
        createNewProjectService(data)
        .then((res)=> console.log(res))
        .catch(err => console.log(err))
    };
    
    const onReset = () => {
        form.resetFields();
    };

    return(
        <div style={{ textAlign: "left"}}>
            <h1>Create New Project</h1>
            <Divider/>
            <Form {...layout} form={form} name="control-hooks" onFinish={onFinish}>
                <Form.Item
                    name="projectName"
                    label="Project Name"
                    rules={[
                    {
                        required: true,
                    },
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name="projectDescription"
                    label="Project Description"
                    rules={[
                    {
                        required: true,
                    },
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name="projectBeneficiaryCreateAddress"
                    label="Beneficiary Address"
                    rules={[
                    {
                        required: true,
                        defaultField: localStorage.getItem('address')
                    },
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name="projectDeadline"
                    label="Project Deadline"
                    rules={[
                    {
                        required: true,
                    },
                    ]}
                >
                    <DatePicker />
                </Form.Item>
                <Form.Item {...tailLayout}>
                    <Button type="primary" htmlType="submit" style={{margin: 5}}>
                    Submit
                    </Button>
                    <Button htmlType="button" onClick={onReset} style={{margin: 5}}>
                    Reset
                    </Button>
                </Form.Item>
                </Form>
        </div>
    )
}

export default CreateProject