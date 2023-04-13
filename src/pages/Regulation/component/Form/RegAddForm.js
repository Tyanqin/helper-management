import React from 'react';
import { InboxOutlined } from '@ant-design/icons';
import { message, Upload ,Form,Input,Button,Select} from 'antd';
import {ACCESS_ADDRESS} from '../../../../conf/conf'
import './index.css'
const { Dragger } = Upload;
export default class  RegAddForm  extends  React.Component{

    onFinish = (values) => {
        let params = {regName:values.regName,fileInfo:this.state.filesInfo}
        this.props.submit(params)
    };
    onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    state = {
        filesInfo:""

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
                    style = {{marginRight:120,marginTop:240}}
                    label="规章名称"
                    name="regName"
                    rules={[{
                        required: true,
                        message: '请输入名称!'
                    }]}
                >
                    <Input  />
                </Form.Item>
                <div className = "upload_wrap">
                    <Form.Item name="files">
                        <Dragger
                            name="files"
                            multiple = {true}
                            onChange = {this.handelChange}
                            onDrop = {this.handelDrop}
                            beforeUpload={(value) => {console.log("value===>>>>",value)}}
                            action = {`${ACCESS_ADDRESS}/reg/uploadFile`}
                            maxCount={3}
                            style = {{width:470}}
                        >
                            <p className="ant-upload-drag-icon">
                                <InboxOutlined />
                            </p>
                            <p className="ant-upload-text">Click or drag file to this area to upload</p>
                            <p className="ant-upload-hint">
                                Support for a single or bulk upload. Strictly prohibited from uploading company data or other
                                banned files.
                            </p>
                        </Dragger>
                    </Form.Item>
                </div>
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
    values = []
    handelChange=(info)=>{
        const { status } = info.file;
        if (status !== 'uploading') {console.log(info.file, info.fileList);}
        if (status === 'done') {
            console.log("info.file.response.data====>>>>",info.file.response.data[0])
            this.values.push(...info.file.response.data)
        } else if (status === 'error') {
            message.error(`${info.file.name}上传失败`);
        }
        this.setState({filesInfo:[...this.values]},()=>{console.log("this.fileInfo---》》》",this.state.filesInfo)})
    }
    handelDrop=(e)=> {
        console.log('Dropped files', e.dataTransfer.files);
    }
}

