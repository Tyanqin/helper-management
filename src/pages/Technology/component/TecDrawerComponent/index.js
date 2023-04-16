import React, {Component} from 'react';
import {Button, Drawer, Input, Select,Form} from "antd";
import { InboxOutlined,UploadOutlined} from '@ant-design/icons';
import {proMenuGetId,disProName} from '../../../../api/req'
import TecUpdForm from '../../component/Form/TecUpdForm'
import TecAddForm from '../../component/Form/TecAddForm'
import './index.css'
const { TextArea } = Input;
const { Option } = Select;

export default class TecDrawerComponent extends Component {


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
        files:[]

    }

    render() {
        let {visible,isEdit,updData,detailData} = this.props
        return (
            <div>
                <Drawer
                    title={isEdit===1?"修改":""||isEdit===2?"新增":""|| isEdit===3?"详情":""}
                    width={720}
                    closable={false}
                    open={visible}
                    bodyStyle={{ paddingBottom: 80 }}
                >
                    {
                        isEdit===1?
                            <div key={1}>
                              <TecUpdForm
                                  updData = {this.props.updData}
                                  submit = {this.props.submit}
                                  close = {this.props.close}
                              />
                        </div>:""||isEdit===2?
                            <div key={2}>
                                <TecAddForm
                                    terData = {this.props.terData}
                                    submit = {this.props.submit}
                                    close = {this.props.close}
                                />
                            </div>:"" || isEdit===3?
                                <div key={3}>

                                        <Form.Item
                                            style = {{marginRight:120,marginTop:30}}
                                            label="工艺名称"
                                            name="processName"
                                        >
                                            <Input key = {detailData.proContentId}
                                                   maxLength = {50}
                                                   readOnly
                                                   defaultValue = {detailData.processName}/>
                                        </Form.Item>

                                        <Form.Item
                                            style = {{marginRight:120,marginTop:30}}
                                            label="工艺内容"
                                            name="processStandard"
                                        >
                                            <Input.TextArea
                                                key={detailData.proContentId}
                                                readOnly
                                                defaultValue = {detailData.processStandard}
                                                maxLength = {500}
                                                allowClear showCount
                                            />
                                        </Form.Item>
                                        <Form.Item
                                            style = {{marginRight:120,marginTop:30}}
                                            label="施工要点"
                                            name="constructionPoints"
                                        >
                                            <Input.TextArea
                                                key={detailData.proContentId}
                                                defaultValue = {detailData.processStandard}
                                                readOnly
                                                maxLength = {500}
                                                allowClear showCount
                                            />
                                        </Form.Item>
                                        <ul>
                                            {
                                                detailData.list.map((item,index)=>{
                                                    return(
                                                        <>
                                                            <li>图片描述：{item.imgDesc}</li>
                                                            <li><img src={item.imgUrl} alt=""/></li>
                                                        </>
                                                    )
                                                })
                                            }
                                        </ul>

                                {/*<Form.Item*/}
                                    {/*style = {{marginRight:120,marginTop:30}}*/}
                                    {/*label="工艺名称"*/}
                                    {/*name="processName"*/}
                                {/*>*/}
                                    {/*<Input key = {detailData.proContentId} maxLength = {50} defaultValue = {detailData.firstTitle}/>*/}
                                {/*</Form.Item>*/}

                                {/*<Form.Item*/}
                                    {/*style = {{marginRight:120,marginTop:30}}*/}
                                    {/*label="工艺名称"*/}
                                    {/*name="processName"*/}
                                {/*>*/}
                                    {/*<Input key = {detailData.proContentId} maxLength = {50} defaultValue = {detailData.secTitle}/>*/}
                                {/*</Form.Item>*/}
                                {/*<Form.Item*/}
                                    {/*style = {{marginRight:120,marginTop:30}}*/}
                                    {/*label="工艺名称"*/}
                                    {/*name="processName"*/}
                                {/*>*/}
                                    {/*<Input key = {detailData.proContentId} maxLength = {50} defaultValue = {detailData.terTitle}/>*/}
                                {/*</Form.Item>*/}
                                <div style={{position: 'absolute', right: 0, bottom: 0, width: '100%', borderTop: '1px solid #e9e9e9', padding: '10px 16px', background: '#fff', textAlign: 'right',}}>
                                        <Button type="primary" onClick={()=>this.props.close()} style={{ marginRight: 8 }}>
                                            退出
                                        </Button>
                                </div>
                            </div>:""
                    }
                </Drawer>
            </div>
        );
    }
}
