import React, {useEffect} from 'react';
import { Form, Input, Button, message } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import './styles.scss';
import { Link, useHistory } from 'react-router-dom'
import { loginService } from '../../services/user.service';

const Login = (props) =>{
    const history = useHistory();

    const onFinish = (values) =>{
        loginService(values)
        .then((res) =>{
            console.log(res)
            if (res.data.name) {
                localStorage.setItem('name', res.data.name);
                localStorage.setItem('address', res.data.address);
                localStorage.setItem('isAuthenticated', true);
                message.success(`Wellcome ${res.data.name}!`)
                history.push('/');
            }
            else {
                message.warning(res.data.status)
            }
        })
        .catch((err)=>{console.log(err)})
    }

    return(
        <div className="login-page snap-padding">
            <Form
                onFinish={onFinish} 
                className="login-form"
            >
                <Link to="/">
                    <h1>Logo</h1>
                    {/* <img src={Logo} className="login-form__image" alt="Online Learning" /> */}
                </Link>
                <Form.Item
                    name="publicKey"
                    rules={[
                        {
                        required: true,
                        message: 'Please input your email!',
                        },
                    ]}
                >
                    <Input 
                        autoComplete="publicKey"
                        prefix={<UserOutlined style={{ color: 'rgba(0,0,0,.25)' }} />}
                        placeholder="publicKey"
                    />
                </Form.Item>

                <Form.Item
                    name="privateKey"
                    rules={[
                        {
                        required: true,
                        message: 'Please input your email!',
                        },
                    ]}
                >
                    <Input 
                        prefix={<UserOutlined style={{ color: 'rgba(0,0,0,.25)' }} />}
                        placeholder="privateKey"
                    />
                </Form.Item>

                <Form.Item className="login-form__link">
                    <Link to="/register">Register</Link>
                </Form.Item>
                <div style={{color: 'red', marginBottom: 15}}>{props.message}</div>
                <Form.Item>
                    <Button className="btn-submit" type="primary" htmlType="submit">
                        Login
                    </Button>
                </Form.Item>
            </Form>

        </div>

    )
}

export default Login