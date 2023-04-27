import React from 'react';
import { InboxOutlined } from '@ant-design/icons';
import { message, Upload ,Form,Input,Button,Select} from 'antd';
import {ACCESS_ADDRESS} from '../../../../conf/conf'
import {ossRemove} from '../../../../api/req'
import './index.css'
const { Dragger } = Upload;
const {Option} = Select
export default class  RegAddForm  extends  React.Component{

    onFinish = (values) => {
        let params = {regName:values.regName,fileInfo:this.state.filesInfo}
        this.props.submit(params)
        this.setState({filesInfo:[]})
    };
    onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    state = {
        filesInfo:[],
        disabled:false

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
                // className = "form"
            >
                <Form.Item
                    style = {{marginRight:205,marginTop:180}}
                    label="规章"
                    name="regName"
                    rules={[{
                        required: true,
                        message: '请输入名称!'
                    }]}
                >
                    <Select defaultValue="" style={{marginRight:70,width:280,textAlign:"left"}}>
                        {
                            this.props.regNames.map((item,index)=>{
                                return (
                                    <Option key={index} value={item}>{item}</Option>
                                )
                            })
                        }
                    </Select>
                </Form.Item>
                <div className = "upload_wrap">
                    <Form.Item name="files">
                        <Dragger
                            name="files"
                            multiple = {true}
                            onChange = {this.handelChange}
                            onDrop = {this.handelDrop}
                            beforeUpload = {this.handelBefore}
                            action = {`${ACCESS_ADDRESS}/reg/uploadFile`}
                            onRemove = {this.handelOnRemove}
                            maxCount={3}
                            disabled = {this.state.disabled}
                            style = {{width:330}}
                        >
                            {
                               this.state.filesInfo=="" || this.state.filesInfo== []?<div >
                                   <p className="ant-upload-drag-icon">
                                       <InboxOutlined />
                                   </p>
                                   <p className="ant-upload-text">点击此处进行上传</p>
                               </div>:<span><InboxOutlined /></span>
                            }
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

    handelOnRemove=(file)=>{
        console.log("values====>>>>>",this.values)
        console.log("file====>>>>>",file)
        // this.values

        let length = this.values.length
        if(length > 0){
            for (let i = 0; i < length; i++) {
                if(this.values[i] != null && file.response.data!=null){
                    if(this.values[i].newFileName === file.response.data[0].newFileName){
                        delete this.values[i]
                    }
                }
            }
            let params = {fileName:file.response.data[0].newFileName}
            this.ossRemove(params)
        }

    }
    /**
     * 删除文件
     * @param params
     * @returns {Promise<void>}
     */
    ossRemove=async(params)=>{
        const result = await ossRemove(params)
        if(result.status){

        }
    }

    values = []
    handelChange=(info)=>{
        const { status } = info.file;
        if (status !== 'uploading') {console.log(info.file, info.fileList);}
        if (status === 'done') {
            // console.log("info.file.response.data====>>>>",info.file.response.data[0])
            this.values.push(...info.file.response.data)
        } else if (status === 'error') {
            message.error(`${info.file.name}上传失败`);
        }
        this.setState({filesInfo:[...this.values]},()=>{console.log("this.fileInfo---》》》",this.state.filesInfo)})
    }


    handelDrop=(e)=> {
        console.log('Dropped files', e.dataTransfer.files);
    }

    isAssetTypeAnImage=(ext)=> {
        //获取最后一个.的位置
        let varindex= ext.lastIndexOf("/");
        //获取后缀
        let varext = ext.substring(varindex+1);
        return [
            'pdf'].
        indexOf(varext.toLowerCase()) !== -1;
    }

    handelBefore=(file)=>{
        if(!this.isAssetTypeAnImage(file.type.toString())){
            message.info("格式错误，上传失败！")
            return
        }
        if(this.values!=null && this.values.length >=0 && this.values != []){
            this.setState({disabled:true})
        }
    }

}

{/*<p className="ant-upload-hint">*/}
{/*Support for a single or bulk upload. Strictly prohibited from uploading company data or other*/}
{/*banned files.*/}
{/*</p>*/}


