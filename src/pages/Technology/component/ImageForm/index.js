import React, {Component} from 'react';
import { Upload, Modal,message } from 'antd';
import { PlusOutlined} from '@ant-design/icons';
import {ACCESS_ADDRESS} from '../../../../conf/conf'
import {AddInput,RemoveInput,RemoveAll,GetChildLength} from './imageElement'
import {delByImgName} from '../../../../api/req'
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
        fileList: [
            // {
            //     uid: '-1',
            //     name: 'image.png',
            //     status: 'done',
            //     url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
            // }
        ],
        files:[],
        disabled:false
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
    //fileList
    handleChange = ({ fileList,file }) => {
        let status = file.status
        if (status !== 'uploading') {
            console.log(fileList)
        }
        if (status === 'done') {
            this.values=[...fileList]
            this.setState({files:[...this.values]},()=>{this.props.handelFileInfo(this.state.files)})
            // this.props.handelFileInfo(this.values)
        } else if (status === 'error') {
            message.error(`${fileList.name}上传失败`);
        }else if (status === 'removed') {
            message.info(`${file.name}删除成功`);
        }
        this.setState({ fileList })


    };

    render() {
        const { previewVisible, previewImage, fileList } = this.state;
        const uploadButton = (
            <div>
                <PlusOutlined/>
                <div className="ant-upload-text" >上传</div>
            </div>
        );
        RemoveAll()
        return (
            <div className="clear_fix">
                <Upload
                    name="files"
                    action={`${ACCESS_ADDRESS}/pro-menu/uploadFile`}
                    listType="picture-card"
                    openFileDialogOnClick = "true"
                    beforeUpload = {this.handelBefore}
                    onRemove = {this.handelRemove}
                    multiple = {false}
                    disabled = {this.state.disabled}
                    maxCount={5}
                    fileList={fileList}
                    onPreview={this.handlePreview}
                    onChange={this.handleChange}
                >
                    {fileList.length >= 5 ? null : uploadButton}
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
        let fileArray = this.state.fileList
        if(fileArray!=null && fileArray.length >=5 && fileArray != []){
            this.setState({disabled:true})
        }
        if(GetChildLength()>=5){
            message.info("已上传最大数量！")
        }else{
            AddInput(this.props.handelUploadData)
            // this.props.handelUploadData
        }
    }

    delByImgName=async(params)=>{
        const result = await delByImgName(params)
    }

    handelRemove=(e)=>{
        let params = {newFileName:e.response.data[0].newFileName,fileUrl:e.response.data[0].fileUrl}
        this.delByImgName(params)
        let length = this.state.fileList.length
        let childLength = GetChildLength();
        if(length == childLength && childLength != null && childLength > 0){
            RemoveInput()
        }
        if(length == 1){
          this.setState({fileList:[]})
        }
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