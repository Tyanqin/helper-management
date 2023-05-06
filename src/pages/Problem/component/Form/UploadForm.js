import React from 'react';
import { InboxOutlined } from '@ant-design/icons';
import { message, Upload ,Form,Input,Button} from 'antd';
import {ACCESS_ADDRESS} from '../../../../conf/conf'

const { Dragger } = Upload;

export default class  UploadForm  extends  React.Component{

    onFinish = (values) => {

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
                <div className = "upload_wrap">
                    <Form.Item name="file">
                        <Dragger
                            name="file"
                            multiple = "false"
                            onChange = {this.handelChange}
                            beforeUpload = {this.handelBefore}
                            onDrop = {this.handelDrop}
                            action = {`${ACCESS_ADDRESS}/problem/importProblem`}
                            maxCount={1}
                            style = {{width:470}}
                        >
                            <p className="ant-upload-text">请上传模版文件</p>
                        </Dragger>
                    </Form.Item>
                </div>
                <div style={{position: 'absolute', right: 0, bottom: 0, width: '100%', borderTop: '1px solid #e9e9e9', padding: '10px 16px', background: '#fff', textAlign: 'right',}}>
                    <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                        <Button onClick={()=>this.props.close()} style={{ marginRight: 8 }}>
                            退出
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
            this.props.handelPage()
            this.props.close()
            this.setState({fileList:[]})
        } else if (status === 'error') {
            message.error(`${info.file.name}上传失败`);
        }
    }
    handelDrop=(e)=> {
        console.log('Dropped files', e.dataTransfer.files);
    }

    handelBefore=(file,fileList)=>{
        console.log("file.type.toString()===>>>> ",file.type.toString())
        if(!this.isAssetTypeAnImage(file.type.toString())){
            message.info("格式错误，上传失败！")
            return
        }

    }

    isAssetTypeAnImage=(ext)=> {
        //获取最后一个.的位置
        let varindex= ext.lastIndexOf("/");
        //获取后缀
        let varext = ext.substring(varindex+1);
        console.log("varext==>",varext)
        return ['vnd.ms-excel'].indexOf(varext.toLowerCase()) !== -1;
    }
}
