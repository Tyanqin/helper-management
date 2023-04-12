import React from 'react';
import { InboxOutlined } from '@ant-design/icons';
import { message, Upload ,Form,Input,Button,Select} from 'antd';
import {ACCESS_ADDRESS} from '../../../../conf/conf'
import {proGetMaxCode} from '../../../../api/req'
import './index.css'
const { Dragger } = Upload;
const {Option} = Select
export default class  TecAddForm  extends  React.Component{

    onFinish = (values) => {
        let imgDescs = values.imgDesc.split("，")
        let params = {
            terMenuCode:values.menucode,
            processName:values.processName,
            processCode:values.processCode,
            imgDesc:imgDescs,
            processStandard:values.processStandard,
            constructionPoints:values.constructionPoints,
            fileInfo:this.state.filesInfo
        }
        this.props.submit(params)
    };
    onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    state = {
        filesInfo:"",
        menuCode:"",
        maxMenuCode:""

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
                    style = {{marginRight:120,marginTop:70}}
                    label="三级标题"
                    name="menucode"
                    rules={[{ required: true, message: '请用输入标题!' }]}
                >
                    <Select
                        key={this.props.terData.proMenuId}
                        style={{marginTop:0,width:400,textAlign:"left"}}
                        onChange = {(value)=>{this.setState({menuCode:value},this.handelOnChange)}}
                    >
                        {
                            this.props.terData.map((item,index)=>{
                                return (
                                    <Option value={item.menucode}>{item.proName}</Option>
                                )
                            })
                        }
                    </Select>
                </Form.Item>
                <Form.Item
                    style = {{marginRight:120,marginTop:10}}
                    label="工艺名称"
                    name="processName"
                    rules={[{ required: true, message: '请用输入工艺名称!' }]}
                >
                    <Input
                        key={this.props.terData.proMenuId}
                        maxLength = {50}
                    />
                </Form.Item>
                <Form.Item
                    style = {{marginRight:120,marginTop:10}}
                    label="工艺编号"
                    name="processCode"
                    rules={[{ required: true, message: '请用输入工艺编号!' }]}
                >
                    <Input
                        key={this.props.terData.proMenuId}
                        placeholder = {this.state.maxMenuCode?"当前最大编号是："+this.state.maxMenuCode:""}
                        maxLength = {50}
                    />
                </Form.Item>
                <Form.Item
                    style = {{marginRight:120,marginTop:10}}
                    label="工艺内容"
                    name="processStandard"
                    rules={[{ required: true, message: '请用输入工艺内容!' }]}
                >
                    <Input.TextArea
                        key={this.props.terData.proMenuId}
                        maxLength = {500}
                        allowClear showCount
                    />
                </Form.Item>
                <Form.Item
                    style = {{marginRight:120,marginTop:10}}
                    label="施工要点"
                    name="constructionPoints"
                    rules={[{ required: true, message: '请用输入施工要点!' }]}
                >
                    <Input.TextArea
                        key={this.props.terData.proMenuId}
                        maxLength = {500}
                        allowClear showCount
                    />
                </Form.Item>
                <Form.Item
                    style = {{marginRight:120,marginTop:10}}
                    label="图片描述"
                    name="imgDesc"
                    rules={[{ required: true, message: '请用输入图片描述!' }]}
                >
                    <Input.TextArea
                        key={this.props.terData.proMenuId}
                        maxLength = {500}
                        allowClear showCount
                    />
                </Form.Item>
                <div className = "upload_box">
                    <Form.Item name="files">
                        <Dragger
                            name="files"
                            multiple = {true}
                            onChange = {this.handelChange}
                            onDrop = {this.handelDrop}
                            beforeUpload={(value) => {console.log("value===>>>>",value)}}
                            action = {`${ACCESS_ADDRESS}/pro-menu/uploadFile`}
                            maxCount={3}
                            style = {{width:400,height:50,marginLeft:70}}
                        >
                            <div>
                                <p className="ant-upload-drag-icon">
                                    <InboxOutlined />
                                </p>
                                <p className="ant-upload-text">Click or drag file to this area to upload</p>
                                <p className="ant-upload-hint">
                                    Support for a single or bulk upload. Strictly prohibited from uploading company data or other
                                    banned files.
                                </p>
                            </div>
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

    handelOnChange=async()=>{
        await proGetMaxCode({menuCode:this.state.menuCode}).then(res=>{
            this.setState({maxMenuCode:res.data},()=>{console.log("====>>>>>>   "+this.state.maxMenuCode)})
        }).catch()
    }

    values = []
    handelChange=(info)=>{
        const { status } = info.file;
        if (status !== 'uploading') {console.log(info.file, info.fileList);}
        if (status === 'done') {
            this.values.push(...info.file.response.data)
        } else if (status === 'error') {
            message.error(`${info.file.name}上传失败`);
        }
        this.setState({filesInfo:[...this.values]})
    }
    handelDrop=(e)=> {
        console.log('Dropped files', e.dataTransfer.files);
    }
}

