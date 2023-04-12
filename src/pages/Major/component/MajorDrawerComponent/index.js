import React, {Component} from 'react';
import {Button, Drawer, Input, Form} from "antd";
import './index.css'

export default class MajorDrawerComponent extends Component {

    render() {
        let {visible,isEdit,updData} = this.props
        let {majorName,majorId} =  updData
        return (
            <div>
                <Drawer
                    title={isEdit?"修改":"新增"}
                    width={720}
                    closable={false}
                    open={visible}
                    bodyStyle={{ paddingBottom: 80 }}
                >
                    {
                        isEdit===true?
                            <div className="form_box">
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
                                        label="专业"
                                        name="majorName"
                                        // rules={[{ required: false, message: '请输入专业名称!' }]}
                                    >
                                        <Input key={majorId} maxLength = {50} defaultValue = {majorName}/>
                                    </Form.Item>
                                    <div style={{position: 'absolute', right: 0, bottom: 0, width: '100%', borderTop: '1px solid #e9e9e9', padding: '10px 16px', background: '#fff', textAlign: 'right',}}>
                                        <Button onClick={()=>this.props.close()} style={{ marginRight: 8 }}>
                                            退出
                                        </Button>
                                        <Button type="primary" htmlType="submit">
                                            提交
                                        </Button>
                                    </div>
                                </Form>
                            </div>:
                            <div key = {2} className="form_box">

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
                                        label="专业"
                                        name="majorName"
                                        rules={[{ required: true, message: '请输入专业名称!' }]}
                                    >
                                        <Input maxLength = {50}/>
                                    </Form.Item>
                                    <div style={{position: 'absolute', right: 0, bottom: 0, width: '100%', borderTop: '1px solid #e9e9e9', padding: '10px 16px', background: '#fff', textAlign: 'right',}}>
                                        <Button onClick={()=>this.props.close()} style={{ marginRight: 8 }}>
                                            退出
                                        </Button>
                                        <Button type="primary" htmlType="submit">
                                            提交
                                        </Button>
                                    </div>
                                </Form>
                            </div>
                    }

                </Drawer>
            </div>
        );
    }

    onFinish = (values) => {
        console.log('Success:', values.majorName);
        let params = {}
        if(this.props.isEdit){
            params = {
                majorId:this.props.updData.majorId,
                majorName:values.majorName?values.majorName:this.props.updData.majorName
            }
        }else{
            params = {
                majorName:values.majorName
            }
        }
        this.props.submit(params)
    };

    onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };


}
