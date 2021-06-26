import React from 'react';
import { Form, Divider, Input, Button, DatePicker } from 'antd';
import { useHistory } from 'react-router-dom';
import './styles.scss'
import { createNewProjectService } from '../../services/project.service';

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

const { TextArea } = Input

const CreateProject = () => {
    const [form] = Form.useForm();
    const address = localStorage.getItem('address');
    const history = useHistory();

    const onFinish = async(values) => {
        const data = values;
        data.projectBeneficiaryCreateAddress = address
        data.projectDeadline = new Date(values.projectDeadline.format("x"));
        console.log(data.projectDeadline)
        await createNewProjectService(data)
        .then((res)=> {
            history.push("/projects");
        })
        .catch(err => console.log(err))
    };
    
    const onReset = () => {
        form.resetFields();
    };

    return(
        <div style={{ textAlign: "left"}}>
            <h1>Create New Project</h1>
            <Divider/>
            <Form {...layout} form={form} onFinish={onFinish}>
                <Form.Item
                    name="projectName"
                    label="Project Name"
                    rules={[
                    {
                        required: true,
                        message: 'Please input your Project name',
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
                        message: 'Please input your Project description',
                    },
                    ]}
                >
                    <TextArea autoSize={{ minRows: 3, maxRows: 6 }} />
                </Form.Item>
                <Form.Item
                    name="projectDeadline"
                    label="Project Deadline"
                    rules={[
                    {
                        required: true,
                        message: 'Please input your Project deadline',
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