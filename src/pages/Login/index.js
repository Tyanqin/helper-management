import React from 'react';
import {connect} from 'react-redux'
import { Button, Checkbox, Form, Input,message,} from 'antd';
import {userLogin} from '../../api/req'
import './index.css'
import LoginState from './LoginState'
import Cache from '../../api/cache'
import {login} from './login_action'



export default connect(state=>({
    login:state.login
}),{login:login})(

class  Login  extends  React.Component{

     onFinish = (values) => {
        console.log('Success:', values);
        this.loginHandel(values)
    };
     onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };


    render(){
        return(
            <div id = "login_box">
                <div className="login_img_box"></div>

                <div className="login_form_box">
                  <div>技术监督全过程后台管理系统</div>
                    <div>
                        <div>登录</div>
                        <Form
                            className="login_form"
                            name="basic"
                            labelCol={{
                                span: 8,
                            }}
                            wrapperCol={{
                                span: 16,
                            }}
                            style={{
                                maxWidth: 600,
                            }}
                            initialValues={{
                                remember: true,
                            }}
                            onFinish={this.onFinish}
                            onFinishFailed={this.onFinishFailed}
                            autoComplete="off"
                        >
                            <Form.Item
                                className="login_form_item"
                                label="用户名称"
                                name="loginName"
                                rules={[
                                    {
                                        required: false,
                                        message: '请输入用户名称!',
                                    },
                                ]}
                            >
                                <Input />
                            </Form.Item>

                            <Form.Item
                                className="login_form_item"
                                label="用户密码"
                                name="password"
                                rules={[
                                    {
                                        required: false,
                                        message: '请输入用户密码!',
                                    },
                                ]}
                            >
                                <Input.Password />
                            </Form.Item>

                            {/*<Form.Item*/}
                            {/*className="login_form_item"*/}
                            {/*name="remember"*/}
                            {/*valuePropName="checked"*/}
                            {/*wrapperCol={{*/}
                            {/*offset: 8,*/}
                            {/*span: 16,*/}
                            {/*}}*/}
                            {/*>*/}
                            {/*<Checkbox>记住我</Checkbox>*/}
                            {/*</Form.Item>*/}

                            <Form.Item
                                wrapperCol={{
                                    offset: 8,
                                    span: 16,
                                }}
                            >
                                <Button type="primary" htmlType="submit" className="login_btn">
                                    登录
                                </Button>
                            </Form.Item>
                        </Form>
                    </div>
                </div>
            </div>
        );
    }

    loginHandel=async(params)=>{
       const result = await userLogin(params)
        if (result.status) {
            if (result.data !== null ){
                let {uId,userName,loginName,majorName,userMark,token}= result.data
                let loginState = new LoginState(uId,userName,loginName,majorName,userMark,token)
                Cache.localSet("uId",uId).localSet("userName",userName).localSet("loginName",loginName)
                    .localSet("majorName",majorName).localSet("userMark",userMark).localSet("token",token)
                this.props.login({...loginState})
                window.location.href="/user"


            }else{
                message.error(result.message,1)
            }
        }else {
            message.error(result.message,1)
        }


    }
})

