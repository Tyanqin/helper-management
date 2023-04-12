import React from 'react';
import {Button, Form, Input, Select} from 'antd';
import './index.css'
const {Option} = Select
export default class  RuleAddForm  extends  React.Component{

    onFinish = (values) => {
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
                    label="细则名称"
                    name="ruleName"
                    rules={[{
                        required: true,
                        message: '请输入细则名称!'
                    }]}
                >
                    <Input
                    />
                </Form.Item>
                <Form.Item
                    style = {{marginRight:120,marginTop:30}}
                    label="细则主题"
                    name="ruleTheme"
                    rules={[{
                        required: true,
                        message: '请输入细则主题!'
                    }]}
                >
                    <Input/>
                </Form.Item>
                <Form.Item
                    style = {{marginRight:120,marginTop:30}}
                    label="项目阶段"
                    name="staName"
                    rules={[{ required: true, message: '请用输入项目阶段!' }]}
                >
                    <Select
                        style={{marginTop:0,width:400,textAlign:"left"}}
                    >
                        {
                            this.props.proStaNames.map((item,index)=>{
                                return (
                                    <Option value={item.staName}>{item.staName}</Option>
                                )
                            })
                        }
                    </Select>
                </Form.Item>
                <Form.Item
                    style = {{marginRight:120,marginTop:30}}
                    label="细则标题"
                    name="ruleTitle"
                    rules={[{
                        required: true,
                        message: '请输入细则标题!'
                    }]}
                >
                    <Input
                        />
                </Form.Item>
                <Form.Item
                    style = {{marginRight:120,marginTop:30}}
                    label="监督要点"
                    name="keyPoint"
                    rules={[{
                        required: true,
                        message: '请输入监督要点!'
                    }]}
                >
                    <Input.TextArea
                        maxLength = {500}
                        allowClear showCount
                    />
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

