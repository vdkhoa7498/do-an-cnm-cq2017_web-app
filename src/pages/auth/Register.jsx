import React from 'react';
import Logo from '../../assets/img/logo_128.png';
import { Form, Input, Button, message, Modal } from 'antd';
import { UserOutlined, UserAddOutlined } from '@ant-design/icons';
import './styles.scss';
import { Link, useHistory } from 'react-router-dom'
import { registerService } from '../../services/user.service';

const Register = (props) =>{

    let [form] = Form.useForm();
    const history = useHistory();

    const onFinish = (values) => {
        registerService(values)
        .then((res) =>{
          console.log(res)
          message.success(`Hi ${res.data.name}! You can login now`)
          Modal.info({
            title: 'Please save your private information',
            content: (
              <div>
                <strong>Your address:</strong>
                <p>{res.data.address}</p>
                <strong>Your private key:</strong>
                <p>{res.data.privateKey}</p>
              </div>
            ),
            onOk() {
              history.push('/');
            },
          });
        })
        .catch((err)=>{console.log(err)})
    };

    return(
        <div className="register-page snap-padding">
          <Form onFinish={onFinish} className="register-form" form={form}>
            <Link to="/">
                <img src={Logo} className="register-form__image" alt="Online Learning" />
            </Link>
            <Form.Item
            name="email"
            rules={[
              {
                required: true,
                message: 'Please input your email!',
                whitespace: false
              }
            ]}
          >
            <Input
              prefix={
                <UserOutlined
                  style={{
                    color: 'rgba(0,0,0,.25)'
                  }}
                />
              }
              placeholder="Email"
              type="email"
            />
          </Form.Item>
          <Form.Item
            name="name"
            rules={[
              {
                required: true,
                message: 'Please input your name!',
                whitespace: true
              }
            ]}
          >
            <Input
              prefix={
                <UserOutlined
                  style={{
                    color: 'rgba(0,0,0,.25)'
                  }}
                />
              }
              placeholder="Tên của bạn"
              maxLength="45"
            />
          </Form.Item>
          
          <Form.Item className="register-form__link">
              <span>Bạn đã có tài khoản? </span>
              <Link to="/login">Login</Link>
          </Form.Item>
          <div style={{color: 'red', marginBottom: 15}}>{props.message}</div>
          <Form.Item>
            <Button type="primary" htmlType="submit" className="register-form-button" icon={<UserAddOutlined/>}>
              Register
            </Button>
          </Form.Item>
        </Form>
        </div>

    )
}
export default Register;