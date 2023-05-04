import React, {Component} from 'react';
import { InboxOutlined } from '@ant-design/icons';
import {Button, Form, message, Upload} from 'antd';
import {ACCESS_ADDRESS} from '../../../../conf/conf'
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
            <div>
                <Dragger
                    name="file"
                    action={`${ACCESS_ADDRESS}/supervisionRules/importRule`}
                    // openFileDialogOnClick = "true"
                    beforeUpload = {this.handelBefore}
                    onRemove = {this.handelRemove}
                    maxCount={1}
                    fileList={this.state.fileList}
                    onPreview={this.handlePreview}
                    onChange={this.handleChange}
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

    handelRemove=()=>{

    }

    values = []
    handleChange = ({ fileList }) => {

        let status = fileList[0].status
        if (status !== 'uploading') {
            console.log(fileList)
        }
        if (status === 'done') {
            this.values=[...fileList]
            console.log("this.values=====>>>>. ",this.values)
            this.setState({files:[...this.values]})
            // this.props.handelFileInfo(this.values)
        } else if (status === 'error') {
            message.error(`${fileList.name}上传失败`);
        }
        this.setState({ fileList })


    };

    handelBefore=(file,fileList)=>{
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
}

export default RuleImport;