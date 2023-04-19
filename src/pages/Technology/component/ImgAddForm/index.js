import React, {Component} from 'react';
import { Upload, Modal,message } from 'antd';
import { PlusOutlined} from '@ant-design/icons';
import {ACCESS_ADDRESS} from '../../../../conf/conf'
import {AddInput} from './imageElement'
import './index.css'

function getBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });
}

export default class ImageForm extends Component {


    state = {
        previewVisible: false,
        previewImage: '',
        fileList: [],
        files:[]
    };

    handleCancel = () => this.setState({ previewVisible: false });

    handlePreview = async file => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }

        this.setState({
            previewImage: file.url || file.preview,
            previewVisible: true,
        });
    };

    values = []
    handleChange = ({ fileList }) => {

        let status = fileList[0].status
        if (status !== 'uploading') {
            console.log(fileList)
        }
        if (status === 'done') {
            this.values=[...fileList]
            console.log("this.values=====>>>>. ",this.values)
            this.setState({files:[...this.values]},()=>{this.props.handelFileInfo(this.state.files)})
            // this.props.handelFileInfo(this.values)
        } else if (status === 'error') {
            message.error(`${fileList.name}上传失败`);
        }
        this.setState({ fileList })


    };

    render() {
        const { previewVisible, previewImage, fileList } = this.state;
        const uploadButton = (<a className="update_img">{this.props.title}</a>);
        return (
            <div id = "img_add">
                <Upload
                    name="files"
                    action={`${ACCESS_ADDRESS}/pro-menu/uploadFile`}
                    listType="picture-card"
                    openFileDialogOnClick = "true"
                    beforeUpload = {this.handelBefore}
                    onRemove = {this.handelRemove}
                    maxCount={1}
                    fileList={fileList}
                    onPreview={this.handlePreview}
                    onChange={this.handleChange}
                >
                    {fileList.length >= 8 ? null : uploadButton}
                </Upload>
                <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
                    <img alt="example" style={{ width: '100%' }} src={previewImage} />
                </Modal>
            </div>
        );
    }

    handelBefore=(file,fileList)=>{
        if(!this.isAssetTypeAnImage(file.type.toString())){
            message.info("格式错误，上传失败！")
            return
        }

    }

    handelRemove=()=>{
        this.setState({fileList:[]})
    }


    isAssetTypeAnImage=(ext)=> {
        //获取最后一个.的位置
        let varindex= ext.lastIndexOf("/");
        //获取后缀
        let varext = ext.substring(varindex+1);
        return [
            'png', 'jpg', 'jpeg', 'bmp', 'gif', 'webp', 'psd', 'svg', 'tiff'].
        indexOf(varext.toLowerCase()) !== -1;
    }

}