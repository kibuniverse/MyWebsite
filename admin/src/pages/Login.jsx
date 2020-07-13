import React, { useState } from 'react'
import 'antd/dist/antd.css'
import { Button, Input, message, Form, Checkbox, Spin } from 'antd'
import '../styles/login.css'
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import servicePath from '../config/apiUrl.js'
import axios from 'axios'
const Login = props => {
    const [isLoading, setIsLoading] = useState(false)

    const onFinish = values => {
        if (isLoading) {
            return
        }
        setIsLoading(true)
        setTimeout(() => {
            setIsLoading(false)
        }, 1000)
        let userName = values.username
        let password = values.password
        let dataProps = {
            userName: userName,
            password: password
        }
        if (userName.length < 3 || password.length < 6) {
            message.error('用户名或密码格式错误')
            return
        }

        axios({
            method: 'post',
            url: servicePath.checkLogin,
            data: dataProps,
            withCredentials: true
        }).then(res => {
            setIsLoading(false)
            console.log(res.data)
            if(res.data.error === 0) {
                props.history.push('/index')
            } else {
                message.error('用户名或密码错误')
            }
        })
    };


    return (
        <div className='login-box'>
            <Spin spinning={isLoading}>
                <Form
                    name="normal_login"
                    className="login-form"
                    initialValues={{
                        remember: true,
                    }}
                    onFinish={onFinish}
                >
                    <Form.Item
                        name="username"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your Username!',
                            },
                        ]}
                    >
                        <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
                    </Form.Item>
                    <Form.Item
                        name="password"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your Password!',
                            },
                        ]}
                    >
                        <Input
                            prefix={<LockOutlined className="site-form-item-icon" />}
                            type="password"
                            placeholder="Password"
                        />
                    </Form.Item>
                    <Form.Item>
                        <Form.Item name="remember" valuePropName="checked" noStyle>
                            <Checkbox>Remember me</Checkbox>
                        </Form.Item>
                    </Form.Item>

                    <Form.Item>
                        <Button type="primary" htmlType="submit" className="login-form-button">
                            Log in
                </Button>
                    </Form.Item>
                </Form>
            </Spin>
        </div>
    )
}
export default Login