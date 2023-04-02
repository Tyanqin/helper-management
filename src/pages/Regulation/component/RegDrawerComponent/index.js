import React, {Component} from 'react';
import {Button, Drawer, Input} from "antd";
import './index.css'
import { InboxOutlined,UploadOutlined} from '@ant-design/icons';




export default class RegDrawerComponent extends Component {


    state={
        updData:{},
        regName:"",
        resName:"",
        files:[

        ]

    }

    render() {
        let {visible,isEdit,updData} = this.props
        return (
            <div>
                <Drawer
                    title={isEdit?"修改":"新增"}
                    width={720}
                    onClose={()=>this.props.close()}
                    open={visible}
                    bodyStyle={{ paddingBottom: 80 }}
                >
                    {
                        isEdit===true?
                            <div key={1}>
                                <Input key={updData.ruRegId+4} defaultValue = {updData.regName}onChange={(e)=>{
                                    console.log(e.target.value)
                                    this.setState({regName:e.target.value})}} addonBefore = "规章名称" style={{marginTop:30,width:300}}/>
                                <Input key={updData.ruRegId+5} defaultValue = {updData.resName}onChange={(e)=>{
                                   console.log(e.target.value)
                                    this.setState({resName:e.target.value})}} addonBefore = "规章名称" style={{marginTop:30,width:300}}/>
                                {/*<Dragger {...this.props} style = {{width:600,height:400,marginTop:30}}>*/}
                                    {/*<p className="ant-upload-drag-icon">*/}
                                        {/*<InboxOutlined />*/}
                                    {/*</p>*/}
                                    {/*<p className="ant-upload-text">Click or drag file to this area to upload</p>*/}
                                    {/*<p className="ant-upload-hint">*/}
                                        {/*Support for a single or bulk upload. Strictly prohibit from uploading company data or other*/}
                                        {/*band files*/}
                                    {/*</p>*/}
                                {/*</Dragger>*/}
                        </div>:
                            <div key={2} className = "upLoad_box">
                                    <Input key={8}
                                           type = "text"
                                           name = "regName"
                                           onChange = {e=>this.setState({regName:e.target.value})}
                                           addonBefore = "规章名称"
                                           style={{marginTop:30,width:'100%'}}/>
                                    <div className="upLoad_input">
                                        <Button type="primary" icon={<UploadOutlined />} className = "upLoad_btn">
                                            请选择文件
                                        </Button>
                                        <Input key={9}
                                               type = "file"
                                               name = "files"
                                               multiple="multiple"
                                               onChange = {e=>this.setState({files:e.target.files})}
                                        />

                                        <ul>
                                            <li><p style = {{color:"#000"}}>请上传PDF文件</p></li>
                                            <li><p style={{color:"red"}}>文件大小不能超过200M</p></li>
                                        </ul>
                                    </div>

                            </div>
                    }

                    <div style={{position: 'absolute', right: 0, bottom: 0, width: '100%', borderTop: '1px solid #e9e9e9', padding: '10px 16px', background: '#fff', textAlign: 'right',}}>
                        <Button onClick={()=>this.props.close()} style={{ marginRight: 8 }}>
                            退出
                        </Button>
                        <Button onClick={this.submit} type="primary">
                            提交
                        </Button>
                    </div>
                </Drawer>
            </div>
        );
    }
    submit=(e)=>{
        let params = {}
        if(this.props.isEdit){
            params = {
                ruRegId:this.props.updData.ruRegId,
                regName:this.state.regName?this.state.regName:this.props.updData.regName,
                resName:this.state.resName?this.state.resName:this.props.updData.resName
            }
        }else{
            params = {
                regName:this.state.regName,
                files:this.state.files
            }
        }
        this.props.submit(params)

    }

}
