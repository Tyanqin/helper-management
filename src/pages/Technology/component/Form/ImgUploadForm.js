import React, {Component} from 'react';
import {Button, Input, Form, message, Modal} from "antd";
import ImgAddForm from "../../component/ImgAddForm";
import UpdImgForm from "../../component/UpdImgForm";

import {delImg} from "../../../../api/req";
import {ExclamationCircleOutlined} from '@ant-design/icons';
import './index.css'

class ImgUploadForm extends Component {


    onFinish = (values) => {


        let params = {
            proContentId:values.proContentId?values.proContentId:this.props.detailData.proContentId,
            processName:values.processName?values.processName:this.props.detailData.processName,
            processStandard:values.processStandard?values.processStandard:this.props.detailData.processStandard,
            constructionPoints:values.constructionPoints?values.constructionPoints:this.props.detailData.constructionPoints,
            processCode:values.processCode?values.processCode:this.props.detailData.processCode,
            imgDesc:this.imgDescs,
            fileInfo:this.state.filesInfo


        }




        // let params = {
        //     firstTitle:values.firstTitle,
        //     secTitle:values.secTitle,
        //     terTitle:values.terTitle,
        //     terMenuCode:values.menuCode,
        //     processName:values.processName,
        //     processCode:values.processCode,
        //     imgDesc:this.imgDescs,
        //     processStandard:values.processStandard,
        //     constructionPoints:values.constructionPoints,
        //     fileInfo:this.state.filesInfo
        //
        // }

        console.log("params====>>>>>>　　",params)
        this.props.submit(params)
    };
    onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };


    state = {
        filesInfo:[],


    };

    render() {

        let {detailData} = this.props
        console.log("detailData======>>>>>  ",detailData)

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
                    style = {{marginRight:500,marginTop:20}}
                    label="工艺内容"
                    name="processStandard"
                >
                    <Input.TextArea
                        key={detailData.proContentId}
                        defaultValue = {detailData.processStandard}
                        maxLength = {500}
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
                        maxLength = {500}
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
                                                   style = {{width:410,marginBottom:20}}
                                                   maxLength = {50}
                                                   defaultValue = {item.imgDesc}/>
                                            <div className = "img_box">
                                                <img src={item.imgUrl} alt=""/>
                                                <UpdImgForm
                                                    handelFileInfo = {this.handelImageFileInfo}
                                                    title = "修改"
                                                    styleId = "upd_box"
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
                                handelFileInfo = {this.handelImageFileInfo}
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



    handelImageFileInfo=(values)=>{
        let params = []
        let length = values.length;
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