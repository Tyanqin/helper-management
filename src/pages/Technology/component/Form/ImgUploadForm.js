import React, {Component} from 'react';
import {Button, Input, Form, message, Modal} from "antd";
import ImgAddForm from "../../component/ImgAddForm";
import UpdImgForm from "../../component/UpdImgForm";


import {delImg,addImg,updImgDesc} from "../../../../api/req";
import {ExclamationCircleOutlined} from '@ant-design/icons';
import {RemoveAllImg} from '../UpdImgForm/imageElement'

import './index.css'

class ImgUploadForm extends Component {


    onFinish = (values) => {

        //        proContentId processCode
//        firstTitle                secTitle
//        terTitle         processName                       processStandard                   constructionPoints
   console.log("values===============>>>>>>values ",values)

        let proContent = {}
        let fileInfo = this.state.filesInfo
        let fileInfoLength =  fileInfo.length
        let imgDescLength = this.imgDescArray.length

        if(fileInfoLength === imgDescLength){
            let proImgs = []
            for (let i = 0; i < fileInfoLength; i++) {
                let item = {
                    proContentId:this.props.detailData.proContentId,
                    imgName:fileInfo[i].fileName,
                    imgNewName:fileInfo[i].newFileName,
                    imgUrl:fileInfo[i].fileUrl,
                    imgDesc:this.imgDescArray[i]
                }
                proImgs.push(item)
            }
            proContent = {
                proContentId:this.props.detailData.proContentId,
                firstTitle:values.firstTitle?values.firstTitle:this.props.detailData.firstTitle,
                secTitle:values.secTitle?values.secTitle:this.props.detailData.secTitle,
                terTitle:values.terTitle?values.terTitle:this.props.detailData.terTitle,
                processName:values.processName?values.processName:this.props.detailData.processName,
                processCode:values.processCode?values.processCode:this.props.detailData.processCode,
                processStandard:values.processStandard?values.processStandard:this.props.detailData.processStandard,
                constructionPoints:values.constructionPoints?values.constructionPoints:this.props.detailData.constructionPoints,
                proMenuId:values.proMenuId?values.proMenuId:this.props.detailData.proMenuId,
                list:proImgs
            }
        }else{
            message.info("请填写图片描述")
            return
        }
        console.log("submit====>proContent>>>>>　　",proContent)
        this.handelAddImg(proContent)
        this.props.handelSelectData()
    };
    onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };


    state = {
        filesInfo:[],
    };

    render() {
        let {detailData} = this.props
        let list = detailData.list
        let imgInfos = []

        if(list !== undefined){
            detailData.list.map(item=>{
                let info = {
                    uid:item.proImgId,
                    name:item.imgNewName,
                    imgDesc:item.imgDesc,
                    url:item.imgUrl,
                    proContentId:item.proContentId,
                    status:'done'
                }
                imgInfos.push(info)
            })
        }
        return (
                <Form
                    name="basic"
                    labelCol={{ span: 8 }}
                    wrapperCol={{ span: 16 }}
                    initialValues={{ remember: true }}
                    onFinish={this.onFinish}
                    onFinishFailed={this.onFinishFailed}
                    autoComplete="off"
                >
                <Form.Item
                    style = {{marginRight:500}}
                    label="工艺名称"
                    name="processName"
                >
                    <Input key = {detailData.proContentId}
                           style = {{width:410}}
                           maxLength = {50}
                           defaultValue = {detailData.processName}
                    />
                </Form.Item>
                    <Form.Item
                        style = {{marginRight:500}}
                        label="工艺编号"
                        name="processCode"
                    >
                        <Input key = {detailData.proContentId}
                               style = {{width:410}}
                               maxLength = {50}
                               defaultValue = {detailData.processCode}
                        />
                    </Form.Item>
                <Form.Item
                    style = {{marginRight:500,marginTop:20}}
                    label="工艺标准"
                    name="processStandard"
                >
                    <Input.TextArea
                        key={detailData.proContentId}
                        defaultValue = {detailData.processStandard}
                        maxLength = {5000}
                        style = {{width:410}}
                        allowClear showCount
                    />
                </Form.Item>
                <Form.Item
                    style = {{marginRight:500,marginTop:20}}
                    label="施工要点"
                    name="constructionPoints"
                >
                    <Input.TextArea
                        key={detailData.proContentId}
                        defaultValue = {detailData.constructionPoints}
                        style = {{width:410}}
                        maxLength = {5000}
                        allowClear showCount
                    />

                </Form.Item>
                <ul id = "img_ul" style={{marginRight:500}}>
                    {
                        detailData.list==null ||  detailData.list == ""?"":detailData.list.map((item,index)=>{
                            return(
                                    <li id = {item.proImgId} style = {{marginTop:20,marginBottom:10}}>
                                        <Form.Item
                                            tyle = {{marginLeft:0,marginTop:20}}
                                            label="图片描述"
                                            name="imgDesc"
                                        >
                                            <Input key = {item.imgDesc}
                                                   onBlur = {(e)=>{
                                                       let params = {proImgId:item.proImgId,imgDesc:e.target.value,proContentId:detailData.proContentId}
                                                       this.updImgDesc(params)
                                                   }}
                                                   style = {{width:410,marginBottom:20}}
                                                   maxLength = {50}
                                                   defaultValue = {item.imgDesc}/>
                                            <div className = "img_box">
                                                <img src={item.imgUrl} alt=""/>
                                                <UpdImgForm
                                                    handelImageFileInfo = {this.handelImageFileInfo}
                                                    title = "修改"
                                                    styleId = "upd_box"
                                                    proContentId = {detailData.proContentId}
                                                    proImgId = {item.proImgId}
                                                    flag = "upd"
                                                    elementId = {item.proImgId}
                                                />
                                                <a ref = {this.delRef} id = "img_del_btn" onClick={this.handelDelImg.bind(this,item.proImgId,detailData.proContentId)}>删除</a>
                                            </div>
                                        </Form.Item>
                                    </li>
                            )
                        })
                    }

                    <div id = "">
                        <div>
                            <UpdImgForm
                                handelImageFileInfo = {this.handelImageFileInfo}
                                handelImgDescFun={this.handelImgDescFun}
                                title = "新增"
                                flag = "add"
                                styleId = "img_add"
                            />
                        </div>
                        <div id = "img_add_desc">

                        </div>
                    </div>
                </ul>
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

    /**
     * 修改图片描述
     * @param e
     */
    updImgDesc=async(params)=>{
        const result = await updImgDesc(params)
        if(result.status){

        }

    }

    handelAddImg=async(params)=>{
        const result = await addImg(params)
        if(result.status){
            this.props.close()
            RemoveAllImg()
        }
    }

    imgDescArray = []
    handelImgDescFun=(e)=>{
        console.log("handelImgDescFun=====>>>>>>   "+e.target.value)
        this.imgDescArray.push(e.target.value)
    }

    handelImageFileInfo=(values)=>{
        console.log("values   length=====>>>>>>",values.length)
        let params = []
        let length = values.length;
        console.log("length=====>>>>>>",length)
        if(length>0) {
            for (let i = 0; i < length; i++) {
                if(values[i].response != undefined && values[i].response !=null){
                    params.push(...values[i].response.data)
                }else{

                }

            }
            console.log("params===>>>>  ",params)
            this.setState({filesInfo: params})
        }
    }




    handelDelImg=async(proMenuId,proContentId)=>{
        Modal.confirm({
            title: '确认删除此条数据?',
            icon: <ExclamationCircleOutlined/>,
            content: '',
            okText: '是',
            okType: 'danger',
            cancelText: '否',
            onOk: () => {
                this.handleOk(proMenuId,proContentId)
            },
            onCancel() {
                message.error("删除失败!")
            },
        });
    }

    handleOk=async(proMenuId,proContentId)=>{
        let params = {proImgId:proMenuId,proContentId:proContentId}
        let result = await delImg(params)
        if(result.status){
            let ul = document.getElementById("img_ul")
            let li = document.getElementById(proMenuId)
            ul.removeChild(li)
            message.info("删除成功")
        }
    }
}

export default ImgUploadForm;