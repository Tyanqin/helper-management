import React from 'react';
import { Button, Form, Input} from 'antd';
import './index.css'

export default class  RegUpdForm  extends  React.Component{

    onFinish = (values) => {
        console.log('Success:', values);
        let params = {
                ruRegId: this.props.updData.ruRegId,
                regName: values.regName?values.regName:this.props.updData.regName,
                resName: values.resName?values.resName:this.props.updData.resName
            }
        this.props.submit(params)
    };

    onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    render(){
        let {regName, resName, ruRegId} = this.props.updData
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
                    label="规章名称"
                    name="regName"
                    rules={[{
                        // required: false,
                        // message: '请输入名称!'
                    }]}
                >
                    <Input key = {ruRegId} defaultValue ={regName} />
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

