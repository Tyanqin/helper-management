import React, {Component} from 'react';
import {Button, Drawer, Input, Cascader } from "antd";
import './index.css'
import { InboxOutlined,UploadOutlined} from '@ant-design/icons';

export default class UserDrawerComponent extends Component {


    state={
        updData:{},
        userName:"",
        majorName:"",
        phone:"",
        password:"",
    }

    render() {
        let {visible,isEdit,updData,majorData} = this.props
        let {userName,uid,majorName} =  updData
        return (
            <div>
                <Drawer
                    title={isEdit?"修改":"新增"}
                    width={720}
                    onClose={()=>{this.props.close()}}
                    open={visible}
                    bodyStyle={{ paddingBottom: 80 }}
                >
                    {
                        isEdit===true?
                            <div key={uid}>
                                <Input key={uid}
                                       defaultValue = {userName}
                                       onChange={(e)=>{this.setState({userName:e.target.value})}}
                                       addonBefore = "用户名称" style={{marginTop:30,width:500}}/>
                            <div className="cascader_wrap">
                                <span className = "major_span" style = {{width:80}}>专业名称</span>
                                <Cascader
                                    defaultValue = {majorName}
                                    style={{ width: 420,marginTop:30,marginLeft:80}}
                                    options={majorData}
                                    onChange={value=>this.setState({majorName:value.toString()},()=>{console.log(console.log("this.state.majorName===>>>",this.state.majorName))})}
                                    multiple
                                />
                            </div>

                            </div>:
                            <div key = {2}>
                                <Input
                                       type = "text"
                                       name = "userName"
                                       onChange = {e=>this.setState({userName:e.target.value})}
                                       addonBefore = "用户名称"
                                       style={{marginTop:30,width:500}}/>
                                <div className="cascader_wrap">
                                    <span className = "major_span" style = {{width:80}}>专业名称</span>
                                    <Cascader
                                        style={{ width: 420,marginTop:30,marginLeft:80}}
                                        options={majorData}
                                        onChange={value=>this.setState({majorName:value.toString()})}
                                        multiple
                                        maxTagCount={1}
                                    />
                                </div>
                                <Input
                                    type = "password"
                                    name = "password"
                                    onChange = {e=>this.setState({password:e.target.value})}
                                    addonBefore = "用户密码"
                                    style={{marginTop:30,width:500}}/>
                                <Input
                                    type = "phone"
                                    name = "phone"
                                    onChange = {e=>this.setState({phone:e.target.value})}
                                    addonBefore = "联系电话"
                                    style={{marginTop:30,width:500}}/>
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
                uid:this.props.updData.uid,
                userName:this.state.userName?this.state.userName:this.props.updData.userName,
                majorName:this.state.majorName?this.state.majorName:this.props.updData.majorName
            }
        }else{
            params = {
                userName:this.state.userName,
                majorName:this.state.majorName
            }
        }
        this.props.submit(params)

    }

}
