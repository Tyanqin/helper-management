import React from 'react';
import {Button, Form, Input, Select} from 'antd';
import './index.css'
const {Option} = Select
export default class  UserUpdForm  extends  React.Component{

    onFinish = (values) => {
        console.log('Success:', values);
        let params = {
            detailId:this.props.updData.detailId,
            ruleName:values.ruleName?values.ruleName:this.props.updData.ruleName,
            staName:values.staName?values.staName:this.props.updData.staName,
            ruleTheme:values.ruleTheme?values.ruleTheme:this.props.updData.ruleTheme,
            ruleTitle:values.ruleTitle?values.ruleTitle:this.props.updData.ruleTitle,
            keyPoint:values.keyPoint?values.keyPoint:this.props.updData.keyPoint
        }
        console.log('params:', params);
        this.props.submit(params)
    };

    onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    render(){
        let {updData} = this.props
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
                        // required: false,
                        // message: '请输入名称!'
                    }]}
                >
                    <Input
                        key = {updData.detailId}
                        defaultValue ={updData.ruleName}
                    />
                </Form.Item>

                <Form.Item
                    style = {{marginRight:120,marginTop:30}}
                    label="项目阶段"
                    name="staName"
                >
                    <Select
                        key = {updData.detailId}
                        style={{marginTop:0,width:400,textAlign:"left"}}
                        defaultValue ={updData.staName}
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
                    label="细则主题"
                    name="ruleTheme"
                    rules={[{
                        // required: false,
                        // message: '请输入名称!'
                    }]}
                >
                    <Input
                        key = {updData.detailId}
                        defaultValue ={updData.ruleTheme}
                    />
                </Form.Item>
                <Form.Item
                    style = {{marginRight:120,marginTop:30}}
                    label="细则标题"
                    name="ruleTitle"
                    rules={[{
                        // required: false,
                        // message: '请输入名称!'
                    }]}
                >
                    <Input
                        key = {updData.detailId}
                        defaultValue ={updData.ruleTitle} />
                </Form.Item>
                <Form.Item
                    style = {{marginRight:120,marginTop:30}}
                    label="监督要点"
                    name="keyPoint"
                >
                    <Input.TextArea
                        key={updData.detailId}
                        defaultValue  = {updData.keyPoint}
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

    onClose=()=>{
        this.setState({visible: false,isEdit:true});
    }
}

