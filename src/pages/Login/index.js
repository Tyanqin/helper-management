import React, {Component} from 'react';
import { Form,  Input, Button, Checkbox,message } from 'antd';
import { UserOutlined,LockOutlined} from '@ant-design/icons';


import './index.css'

export default class Login extends Component {
    render() {
        return (
            <div id = "login_box">
                <Form className="login-form">
                    <Form.Item>
                        <Input prefix={<UserOutlined/>} autoFocus placeholder="Username"/>
                    </Form.Item>
                    <Form.Item>
                        <Input prefix={<LockOutlined />} type="password" placeholder="Password"/>
                    </Form.Item>
                    <Form.Item>
                     <Checkbox style={{marginRight:119}}>记住我</Checkbox>
                        <Button type="primary" onClick = {this.handelLogin} className="login-form-button">
                            登录
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        );

    }

    handelLogin=()=>{
        message.error("用户名不能为空！",1);
    }
}


