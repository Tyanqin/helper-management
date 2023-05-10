import React, {Component} from 'react';
import {Button, Drawer, Input, Select, Form, Divider, message, Modal} from "antd";
import { ExclamationCircleOutlined} from '@ant-design/icons';
import {delImg} from '../../../../api/req'
import TecAddForm from '../../component/Form/TecAddForm'
import ImgUploadForm from '../../component/Form/ImgUploadForm'

import './index.css'
const { TextArea } = Input;
const { Option } = Select;

export default class TecDrawerComponent extends Component {

    delRef = React.createRef()

    state={
        updData:{},
        secData:[],
        firstTitle:"",
        secTitle:"",
        terTitle:"",
        processName:"",
        processStandard:"",
        constructionPoints:"",
        firstMenuCode:"",
        secMenuCode:"",
        terMenuCode:"",
        processCode:"",
        imgDesc:"",
        files:[],
    }

    render() {
        let {visible,isEdit,updData,detailData} = this.props
        return (
            <>
                <Drawer
                    title={isEdit===1?"修改":""||isEdit===2?"新增":""|| isEdit===3?"详情":""}
                    width={isEdit===2?1200:600||isEdit===3?1000:600}
                    closable={false}
                    open={visible}
                    bodyStyle={{ paddingBottom: 80 }}
                >
                    {
                        isEdit===1?
                            <div key={1} style = {{marginLeft:80}}>
                              {/*<TecUpdForm*/}
                                  {/*updData = {detailData}*/}
                                  {/*submit = {this.props.submit}*/}
                                  {/*close = {this.props.close}*/}
                              {/*/>*/}

                                <ImgUploadForm
                                    submit = {this.props.submit}
                                    close = {this.props.close}
                                    detailData = {detailData}
                                    handelSelectData = {this.props.handelSelectData}
                                />

                        </div>:""||isEdit===2?
                            <div key={2} className="add_box">
                                <TecAddForm
                                    firstData = {this.props.firstData}
                                    secData = {this.props.secData}
                                    terData = {this.props.terData}
                                    submit = {this.props.submit}
                                    close = {this.props.close}
                                    handelUploadData = {this.handelUploadData}
                                />
                            </div>:"" || isEdit===3?
                                <div key={3} style = {{marginLeft:80}}>

                                        <Form.Item
                                            style = {{marginRight:120}}
                                            label="工艺名称"
                                            name="processName"
                                        >
                                            <Input key = {detailData.proContentId}
                                                   style = {{width:404}}
                                                   maxLength = {50}
                                                   readOnly
                                                   defaultValue = {detailData.processName}
                                            />
                                        </Form.Item>

                                        <Form.Item
                                            style = {{marginRight:120,marginTop:20}}
                                            label="工艺标准"
                                            name="processStandard"
                                        >
                                            <Input.TextArea
                                                key={detailData.proContentId}
                                                readOnly
                                                defaultValue = {detailData.processStandard}
                                                maxLength = {5000}
                                                style = {{width:404}}
                                                allowClear showCount
                                            />
                                        </Form.Item>
                                        <Form.Item
                                            style = {{marginRight:120,marginTop:20}}
                                            label="施工要点"
                                            name="constructionPoints"
                                        >
                                            <Input.TextArea
                                                key={detailData.proContentId}
                                                defaultValue = {detailData.constructionPoints}
                                                readOnly
                                                style = {{width:404}}
                                                maxLength = {5000}
                                                allowClear showCount
                                            />
                                        </Form.Item>
                                    {
                                        detailData.list==null ||  detailData.list == ""?"":detailData.list.map((item,index)=>{
                                            return(
                                                <>
                                                    <Form.Item
                                                        tyle = {{marginLeft:-120,marginTop:20}}
                                                        label="图片描述"
                                                        name="imgDesc"
                                                    >
                                                        <Input key = {item.imgDesc}
                                                               style = {{width:404,marginBottom:20}}
                                                               maxLength = {50}
                                                               readOnly
                                                               defaultValue = {item.imgDesc}/>
                                                        <div className="img_box"><img src={item.imgUrl} alt=""/></div>
                                                    </Form.Item>
                                                </>
                                            )
                                        })
                                    }
                                <div style={{position: 'absolute', right: 0, bottom: 0, width: '100%', borderTop: '1px solid #e9e9e9', padding: '10px 16px', background: '#fff', textAlign: 'right',}}>
                                        <Button type="primary" onClick={()=>this.props.close()} style={{ marginRight: 8 }}>
                                            退出
                                        </Button>
                                </div>
                            </div>:""
                    }
                </Drawer>
            </>
        );
    }

}
