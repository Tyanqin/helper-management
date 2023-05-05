import React, {Component} from 'react';
import { Upload, Modal,message } from 'antd';
import {ACCESS_ADDRESS} from '../../../../conf/conf'
import './index.css'
import {GetChildLengthImg,AddInputImg,RemoveInputImg,RemoveAllImg} from "./imageElement";
import {updImg} from '../../../../api/req'


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
            // },
        ],
        files:[],
        disabled:false
    };

    // static  getDerivedStateFromProps(props,state){
    //     console.log("imgInfos=====>>>>> ",props.imgInfos)
    //     return {fileList: props.imgInfos };
    // }

   // componentDidMount() {
   //      let listImg = []
   //    let list =  this.state.fileList
   //     if(list != ""){
   //         list.forEach(item=>{
   //             listImg.push(item.imgDesc)
   //         })
   //         AddInputImg(this.props.handelImgDescFun,defaultValueList)
   //     }
   //     console.log("listImg=====>>>>> ",listImg)
   //
   // }

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
            this.setState({files:[...this.values]},()=>{
                if(this.props.flag != undefined &&this.props.flag != null && this.props.flag != "" && this.props.flag == "upd"){
                    let {fileName,fileUrl,imgDesc,newFileName} = this.values[0].response.data[0]
                    let params = {
                        proContentId:this.props.proContentId,
                        proImgId: this.props.proImgId,
                        imgName:fileName,
                        imgUrl:fileUrl,
                        imgNewName:newFileName
                    }
                    this.handelUpdImg(params).then(res=>{
                        let elementId = this.props.elementId
                        let element = document.getElementById(elementId);
                        var img = element.getElementsByTagName("img")[0];
                        img.src = fileUrl

                    })

                }else{
                   this.props.handelImageFileInfo(this.values)
                }

            })

        } else if (status === 'error') {
            message.error(`${fileList.name}上传失败`);
        }
        this.setState({ fileList })


    };

    render() {
        const { previewVisible, previewImage, fileList } = this.state;
        const uploadButton = (
            <a className="update_img"
                                 // onClick = {this.handelUpdImg}
            >
            {this.props.title}
            </a>);
        RemoveAllImg()
        return (
            <div id = {this.props.styleId}>
                <Upload
                    name="files"
                    action={`${ACCESS_ADDRESS}/pro-menu/uploadFile`}
                    listType="picture-card"
                    openFileDialogOnClick = "true"
                    beforeUpload = {this.handelBefore}
                    onRemove = {this.handelRemove}
                    maxCount={this.props.flag=="upd"?1:3}
                    // maxCount = {6}
                    disabled = {this.state.disabled}
                    fileList={fileList}
                    onPreview={this.handlePreview}
                    onChange={this.handleChange}
                    showUploadList = {this.props.flag=="upd"?false:true}

                >
                    {fileList.length >= 8 ? null : uploadButton}
                </Upload>
                <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
                    <img alt="example" style={{ width: '100%' }} src={previewImage} />
                </Modal>
            </div>
        );
    }


    handelUpdImg=async(params)=>{
       const result =  await updImg(params)
       if(result.status){
           message.info("修改成功")
       }
    }

    handelBefore=(file,fileList)=>{
        if(!this.isAssetTypeAnImage(file.type.toString())){
            message.info("格式错误，上传失败！")
            return
        }

        let fileArray = this.state.fileList
        if(fileArray!=null && fileArray.length >=2 && fileArray != []){
            this.setState({disabled:true})
        }

        if(GetChildLengthImg()> 6){
            message.info("已上传最大数量！")
        }else{
            if(this.props.flag != undefined
                &&this.props.flag != null
                && this.props.flag != ""
                && this.props.flag == "add"){
                AddInputImg(this.props.handelImgDescFun)
            }

        }

    }

    handelRemove=()=>{
        this.setState({fileList:[]})
        let length = this.state.fileList.length
        let childLength = GetChildLengthImg();
        if(length == childLength && childLength != null && childLength > 0){
            RemoveInputImg()
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