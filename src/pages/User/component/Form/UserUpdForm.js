import React from 'react';
import { Button, Checkbox, Form, Input,Cascader,Select} from 'antd';
import './index.css'
const {Option} = Select
export default class  UserUpdForm  extends  React.Component{

    onFinish = (values) => {
        console.log('Success:', values);
        let params = {
            uId:this.props.updData.uId,
            userName:values.userName?values.userName:this.props.updData.userName,
            loginName:values.loginName?values.loginName:this.props.updData.loginName,
            majorName:values.majorName?values.majorName.toString():this.props.updData.majorName.toString(),
            phone:values.phone?values.phone:this.props.updData.phone,
            userMark:values.userMark?values.userMark.toString():this.props.updData.userMark
        }
        this.props.submit(params)
    };

    onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    render(){
        let {userName, loginName,majorName, phone, password, userMark,uId} = this.props.updData
        return(
            <Form
                name="basic"
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                initialValues={{ remember: true }}
                onFinish={this.onFinish}
                onFinishFailed={this.onFinishFailed}
                autoComplete="off"
                className = "form"
            >
                <Form.Item
                    style = {{marginRight:120,marginTop:130}}
                    label="姓名"
                    name="userName"
                    rules={[{
                        // required: false,
                        // message: '请输入名称!'
                    }]}
                >
                    <Input defaultValue ={userName} key = {uId}/>
                </Form.Item>
                <Form.Item
                    style = {{marginRight:120,marginTop:30}}
                    label="昵称"
                    name="loginName"
                    rules={[{
                        // required: false,
                        // message: '请输入名称!'
                    }]}
                >
                    <Input defaultValue ={loginName} key = {uId}/>
                </Form.Item>
                <Form.Item
                    style = {{marginRight:120,marginTop:30}}
                    name="majorName"
                    label="专业"
                    rules={[
                        {
                            type: 'Array',
                            // required: false,
                            // message: '请选择专业!',
                        },
                    ]}
                >
                    <Cascader
                        key = {uId}
                        defaultValue ={majorName}
                        options={this.props.majorData}
                        multiple
                        maxTagCount={1}
                    />
                </Form.Item>
                <Form.Item
                    style = {{marginRight:120,marginTop:30}}
                    name="userMark"
                    label="标识"
                    rules={[
                        {
                            // required: false,
                            // message: '请选择用户标识!',
                        },
                    ]}
                >
                    <Select defaultValue = {userMark} key = {uId} style = {{textAlign:"left"}}>
                        <Option value={"1"}>{"专家"}</Option>
                        <Option value={"2"}>{"管理员"}</Option>
                    </Select>
                </Form.Item>
                <Form.Item
                    style = {{marginRight:120,marginTop:30}}
                    label="电话"
                    name="phone"
                    rules={[{
                        // required: false,
                        // message: '请输入名称!'
                    }]}
                >
                    <Input defaultValue ={phone} key = {uId}/>
                </Form.Item>
                <div style={{position: 'absolute', right: 0, bottom: 0, width: '100%', borderTop: '1px solid #e9e9e9', padding: '10px 16px', background: '#fff', textAlign: 'right',}}>
                    <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                        <Button onClick={()=>this.props.close()} style={{ marginRight: 8 }}>
                            退出
                        </Button>
                        <Button type="primary" htmlType="submit">
                            提交
                        </Button>
                    </Form.Item>
                </div>
            </Form>
        );
    }
}

