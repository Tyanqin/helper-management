import React from 'react';
import {Button, Form, Input, Select} from 'antd';
import './index.css'
const {Option} = Select

export default class  RegUpdForm  extends  React.Component{

    onFinish = (values) => {
        console.log('Success:', values);
        let params = {
                ruRegId: this.props.updData.ruRegId,
                regId:this.props.updData.regId,
                regName: values.regName?values.regName:this.props.updData.regName,
                resName: values.resName?values.resName:this.props.updData.resName
            }
            console.log("params===>>>>>>>   ",params)
        this.props.submit(params)
    };

    onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    render(){
        let {regName, resName, ruRegId} = this.props.updData
        return(
            <Form
                key = {ruRegId}
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
                    label="规章"
                    name="regName"
                    rules={[{
                        // required: false,
                        // message: '请输入名称!'
                    }]}
                >
                    <Select defaultValue ={regName} style={{width:400,textAlign:"Left"}} onChange = {(value)=>this.setState({regName:`${value}`})}>
                        <Option value="">全部</Option>
                        {
                            this.props.regNames.map((item,index)=>{
                                return (
                                    <Option key={index} value={item}>{item}</Option>
                                )
                            })
                        }
                    </Select>
                </Form.Item>
                <Form.Item
                    style = {{marginRight:120,marginTop:30}}
                    label="制度名称"
                    name="resName"
                    rules={[{
                        // required: false,
                        // message: '请输入名称!'
                    }]}
                >
                    <Input key = {ruRegId} defaultValue ={resName} />
                </Form.Item>
                <div style={{position: 'absolute', right: 0, bottom: 0, width: '100%', borderTop: '1px solid #e9e9e9', padding: '10px 16px', background: '#fff', textAlign: 'right',}}>
                    <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                        <Button onClick={()=>{this.props.close()}} style={{ marginRight: 8 }}>
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

