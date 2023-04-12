import React from 'react';
import { Button, Checkbox, Form, Input,Cascader,Select} from 'antd';
import './index.css'
const {Option} = Select
export default class  UserAddForm  extends  React.Component{

    onFinish = (values) => {
        console.log('Success:', values);
        this.props.submit(values)
    };

    onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    render(){
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
                    rules={[{ required: true, message: '请输入名称!' }]}
                >
                    <Input maxLength = {50}/>
                </Form.Item>
                <Form.Item
                    style = {{marginRight:120,marginTop:30}}
                    label="密码"
                    name="password"
                    rules={[{ required: true, message: '请输入密码!' }]}
                >
                    <Input.Password maxLength = {50}/>
                </Form.Item>
                <Form.Item
                    style = {{marginRight:120,marginTop:30}}
                    name="majorName"
                    label="专业"
                    rules={[
                        {
                            type: 'array',
                            required: true,
                            message: '请选择专业!',
                        },
                    ]}
                >
                    <Cascader
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
                            required: true,
                            message: '请选择用户标识!',
                        },
                    ]}
                >
                    <Select  style = {{textAlign:"left"}}>
                        <Option key = {12} value={"1"}>{"专家"}</Option>
                        <Option key = {13} value={"2"}>{"管理员"}</Option>
                    </Select>
                </Form.Item>
                <Form.Item
                    style = {{marginRight:120,marginTop:30}}
                    label="电话"
                    name="phone"
                    rules={[{ required: false, message: '请输入联系方式!' }]}
                >
                    <Input maxLength = {50}/>
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

