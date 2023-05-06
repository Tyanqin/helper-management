import React, {Component} from 'react';
import { InboxOutlined } from '@ant-design/icons';
import {Button, Form, message, Upload} from 'antd';
import {ACCESS_ADDRESS} from '../../../../conf/conf'
import './index.css'
const { Dragger } = Upload;



class RuleImport extends Component {


    state = {
        previewVisible: false,
        previewImage: '',
        fileList: [],
        files:[]
    };

    render() {
        return (
            <div className="upload_rule_box">
                <Dragger
                    name="file"
                    multiple = "false"
                    onChange = {this.handelChange}
                    beforeUpload = {this.handelBefore}
                    onDrop = {this.handelDrop}
                    action={`${ACCESS_ADDRESS}/supervisionRules/importRule`}
                    maxCount={1}
                    style = {{width:470}}
                >
                    <p className="ant-upload-text">请上传模版文件</p>

                </Dragger>
                <div style={{position: 'absolute', right: 0, bottom: 0, width: '100%', borderTop: '1px solid #e9e9e9', padding: '10px 16px', background: '#fff', textAlign: 'right',}}>
                    <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                        <Button type="primary" onClick={()=>{
                            this.props.handelPage()
                            this.props.close()
                        }} style={{ marginRight: 8 }}>
                            退出
                        </Button>
                    </Form.Item>
                </div>
            </div>
        );
    }


    handleCancel = () => this.setState({ previewVisible: false });

    handlePreview = async file => {
        if (!file.url && !file.preview) {

        }

        this.setState({
            previewImage: file.url || file.preview,
            previewVisible: true,
        });
    };

    handelRemove=()=>{}



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
    handelBefore=(file)=>{
        console.log("file.type.toString()====>>>>",file.type.toString())
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
        return [
            'vnd.ms-excel'].
        indexOf(varext.toLowerCase()) !== -1;
    }

//     name="file"
//     // className = "upload_wrap"
//     multiple = "false"
//     action={`${ACCESS_ADDRESS}/supervisionRules/importRule`}
// // openFileDialogOnClick = "true"
// beforeUpload = {this.handelBefore}
// onRemove = {this.handelRemove}
// maxCount={1}
// fileList={this.state.fileList}
// onPreview={this.handlePreview}
// onChange={this.handelChange}
// style = {{width:470}}

}

export default RuleImport;