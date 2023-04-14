import React from 'react';
import { Button, Checkbox, Form, Input,Cascader,Select} from 'antd';
import './index.css'
const {Option} = Select
const { TextArea } = Input;
export default class  TecAddForm  extends  React.Component{

    onFinish = (values) => {
        console.log('Success:', values);
        let params = {
            proContentId:values.proContentId?values.proContentId:this.props.updData.proContentId,
            processName:values.processName?values.processName:this.props.updData.processName,
            processStandard:values.processStandard?values.processStandard:this.props.updData.processStandard,
            constructionPoints:values.constructionPoints?values.constructionPoints:this.props.updData.constructionPoints,
            processCode:values.processCode?values.processCode:this.props.updData.processCode

        }
        this.props.submit(params)
    };

    onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    render(){
        let {visible,isEdit,updData} = this.props
        let {proContentId,firstTitle}  = updData
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
                    label="工艺名称"
                    name="processName"
                >
                    <Input key = {updData.proContentId} maxLength = {50} defaultValue = {updData.processName}/>
                </Form.Item>
                <Form.Item
                    style = {{marginRight:120,marginTop:30}}
                    label="工艺内容"
                    name="processStandard"
                >
                    <Input.TextArea
                        key={updData.proContentId}
                        defaultValue = {updData.processStandard}
                        maxLength = {500}
                        allowClear showCount
                    />
                </Form.Item>
                <Form.Item
                    style = {{marginRight:120,marginTop:30}}
                    label="施工要点"
                    name="constructionPoints"
                >
                    <Input.TextArea
                        key={updData.proContentId}
                        defaultValue = {updData.processStandard}
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
