import React, {useState, useEffect} from 'react';
import { Form, Input, Button, message } from 'antd';
import { UserOutlined, LockOutlined, UserAddOutlined } from '@ant-design/icons';
import './styles.scss';
import { Redirect, Link, useHistory } from 'react-router-dom'
import { registerService } from '../../services/user.service';

const Register = (props) =>{

    let [form] = Form.useForm();
    const history = useHistory();
    const [isSuccess, setIsSuccess] = useState(false);

    const onFinish = (values) => {
        console.log(values)
        registerService(values)
        .then((res) =>{
            console.log(res)
                message.success(`Hi ${res.data.name}! You can login now`)
                history.push('/');
        })
        .catch((err)=>{console.log(err)})
    };

    return(
        <div className="register-page snap-padding">
            {
                (!isSuccess) ? (
                    <Form onFinish={onFinish} className="register-form" form={form}>
                        <Link to="/">
                            <h1>Logo</h1>
                            {/* <img src={Logo} className="register-form__image" alt="Online Learning" /> */}
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
                          Đăng kí
                        </Button>
                      </Form.Item>
                    </Form>
                  ) : (
                    <Redirect to="/login" />
                  )
              
            }
        </div>

    )
}
export default Register;