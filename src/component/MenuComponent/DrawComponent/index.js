import React from "react";
import { useState } from 'react';
import {Button, Cascader, Drawer, Form, Input, Select, theme,message} from 'antd';
import {updPassword} from '../../../api/req'
import {Cache} from '../../../api/cache'

const HomeDrawComponent = (props) => {


    const onFinish = async(values) => {
        console.log('Success:', values);
        if(password == "" || password == null){
            message.error("用户密码不能为空！")
            return
        }
        if(newPassword == "" || newPassword == null){
            message.error("用户新密码不能为空！")
            return

        }
        if(repPassword == "" || repPassword == null){
            message.error("用户确认密码不能为空！")
            return
        }
        let params = {uId:Cache.localGet("uId"), password, newPassword,repPassword}
        const result = await updPassword(params)
        if(result.status){
            if(result.message != "OK"){
                message.error(result.message)
            }else{
                message.info(result.message)
                props.handelClose()
            }
        }


    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    const [password,setPassWord] = useState();
    const [newPassword,setNewPassword] = useState();
    const [repPassword,setRepPassword] = useState();

    return (
        <div style={{
            position: 'absolute',
            right:0,
            width:"100%",
            height: 800,
            padding: 48,
            overflow: 'hidden',
            textAlign: 'center',
        }}>
            <Drawer
                title="修改密码"
                placement="right"
                closable={false}
                open={props.close}
                getContainer={false}
            >
                <Form
                    name="basic"
                    labelCol={{ span: 8 }}
                    wrapperCol={{ span: 16 }}
                    initialValues={{ remember: true }}
                    // onFinish={onFinish}
                    // onFinishFailed={onFinishFailed}
                    autoComplete="off"
                    className = "form"
                >
                    <Form.Item
                        style = {{marginRight:120,marginTop:130,width:300}}
                        label="用户密码"
                        name="password"
                        rules={[{
                            required: false,
                            message: '请输入用户密码!'
                        }]}
                    >
                        <Input type = "password" onBlur={(e)=>setPassWord(e.target.value)}/>
                    </Form.Item>
                    <Form.Item
                        style = {{marginRight:120,marginTop:30,width:300}}
                        label="新密码"
                        name="newPassword"
                        rules={[{
                            required: false,
                            message: '请输入用户新密码!'
                        }]}
                    >
                        <Input type = "password" onBlur={(e)=>setNewPassword(e.target.value)}/>
                    </Form.Item>
                    <Form.Item
                        style = {{marginRight:120,marginTop:30,width:300}}
                        label="确认密码"
                        name="repPassword"
                        rules={[{
                            required: false,
                            message: '请输入确认密码!'
                        }]}
                    >
                        <Input  type = "password" onBlur={(e)=>setRepPassword(e.target.value)}/>
                    </Form.Item>
                    <div style={{
                        position: 'absolute', right: 0, bottom: 0, width: '100%', borderTop: '1px solid #e9e9e9',
                        padding: '10px 16px', background: '#fff', textAlign: 'right',}}>
                        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                            <Button  onClick={()=>props.handelClose()} style={{ marginRight: 8 }}>
                                退出
                            </Button>
                            <Button type="primary" onClick = {onFinish} style={{ marginRight: 8 }}>
                                提交
                            </Button>
                        </Form.Item>
                    </div>
                </Form>
            </Drawer>
        </div>
    );



};
export default HomeDrawComponent;