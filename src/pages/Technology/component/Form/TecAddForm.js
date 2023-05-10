import React from 'react';
import { InboxOutlined } from '@ant-design/icons';
import { message ,Form,Input,Button,Select} from 'antd';
import ImageForm from '../ImageForm'
import {ACCESS_ADDRESS,IMG_ACCESS_ADDRESS} from '../../../../conf/conf'
import {proGetMaxCode,getMenuByNameAndLevel} from '../../../../api/req'
import {IsHaveValue,RemoveAll} from '../ImageForm/imageElement'
import './index.css'
// const { Dragger } = Upload;
const {Option} = Select
export default class  TecAddForm  extends  React.Component{

    onFinish = (values) => {
        if(IsHaveValue()){
            message.info("请填写图片描述！")
            return
        }

        let params = {
            firstTitle:values.firstTitle,
            secTitle:values.secTitle,
            terTitle:values.terTitle,
            terMenuCode:values.menuCode,
            processName:values.processName,
            processCode:values.processCode,
            imgDesc:this.imgDescs,
            processStandard:values.processStandard,
            constructionPoints:values.constructionPoints,
            fileInfo:this.state.filesInfo

        }

        console.log("params=====>>>>>>  ",params)
        this.props.submit(params)
    };
    onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    state = {
        filesInfo:[],
        firstTitle:"",
        secTitle:"",
        terTitle:"",
        menuCode:"",
        maxMenuCode:"",
        secData:"",
        terData:"",

    };

    render(){
        return(
          <>
            <Form
                name="basic"
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                initialValues={{ remember: true }}
                onFinish={this.onFinish}
                onFinishFailed={this.onFinishFailed}
                autoComplete="off"
                style = {{marginLeft:0,marginTop:-10}}
            >
                <Form.Item
                    label="一级标题"
                    name="firstTitle"
                    rules={[{ required: true, message: '请输入标题!' }]}
                    style={{marginLeft:-300}}
                >
                    <Select
                        key={this.props.firstData.proMenuId}
                        style={{marginTop:0,width:300,textAlign:"left",}}
                        onChange = {(value)=>{this.setState({firstTitle:value},this.getMenuByNameAndLevel)}}
                    >
                        {
                            this.props.firstData.map((item,index)=>{
                                return (
                                    <Option key = {item.proMenuId} value={item.proName}>{item.proName}</Option>
                                )
                            })
                        }
                    </Select>
                </Form.Item>
                <Form.Item
                    style = {{marginTop:20,marginLeft:-300}}
                    label="二级标题"
                    name="secTitle"
                    rules={[{ required: true, message: '请输入标题!' }]}
                >
                    <Select
                        key={this.props.secData.proMenuId}
                        style={{marginTop:0,width:300,textAlign:"left",}}
                        onChange = {(value)=>{this.setState({secTitle:value},this.getMenuByNameAndLevel2)}}
                    >
                        {
                            this.state.secData==null ||this.state.secData.length <= 0 ?"":this.state.secData.map((item,index)=>{
                                return (
                                    <Option key = {item.proMenuId} value={item.proName}>{item.proName}</Option>
                                )
                            })
                        }
                    </Select>
                </Form.Item>
                <Form.Item
                    style = {{marginTop:20,marginLeft:-300}}
                    label="三级标题"
                    name="menuCode"
                    rules={[{ required: true, message: '请输入标题!' }]}
                >
                    <Select
                        key={this.props.terData.proMenuId}
                        style={{marginTop:0,width:300,textAlign:"left",}}
                        onChange = {(value)=>{this.setState({menuCode:value},this.handelOnChange)}}
                    >
                        {
                            this.state.terData==null || this.state.terData.length <= 0?"":this.state.terData.map((item,index)=>{
                                return (
                                    <Option key = {item.proMenuId} value={item.menuCode}>{item.proName}</Option>
                                )
                            })
                        }
                    </Select>
                </Form.Item>
                <Form.Item
                    style = {{marginTop:5,marginLeft:-300}}
                    label="工艺名称"
                    name="processName"
                    rules={[{ required: true, message: '请输入工艺名称!' }]}
                >
                    <Input
                        key={this.props.terData.proMenuId}
                        style={{marginTop:0,width:300,textAlign:"left",}}
                        maxLength = {50}
                    />
                </Form.Item>
                <Form.Item
                    style = {{marginTop:5,marginLeft:-300}}
                    label="工艺编号"
                    name="processCode"
                    rules={[{ required: true, message: '请输入工艺编号!' }]}
                >
                    <Input
                        key={this.props.terData.proMenuId}
                        placeholder = {this.state.maxMenuCode?"当前最大编号是："+this.state.maxMenuCode:"当前编号初始值为："+this.state.menuCode}
                        style={{marginTop:0,width:300,textAlign:"left",}}
                        maxLength = {50}
                    />
                </Form.Item>
                <Form.Item
                    style = {{marginTop:5,marginLeft:-300}}
                    label="工艺标准"
                    name="processStandard"
                    rules={[{ required: true, message: '请用输入工艺内容!' }]}
                >
                    <Input.TextArea
                        key={this.props.terData.proMenuId}
                        maxLength = {5000}
                        style={{marginTop:0,width:300,textAlign:"left"}}
                        allowClear showCount
                    />
                </Form.Item>
                <Form.Item
                    style = {{marginTop:10,marginLeft:-300}}
                    label="施工要点"
                    name="constructionPoints"
                    rules={[{ required: true, message: '请用输入施工要点!' }]}
                >
                    <Input.TextArea
                        key={this.props.terData.proMenuId}
                        maxLength = {5000}
                        style={{marginTop:0,width:300,textAlign:"left"}}
                        allowClear showCount
                    />
                </Form.Item>
                <ImageForm
                    handelUploadData = {this.handelUploadData}
                    handelFileInfo = {this.handelFileInfo}
                />
                <div style={{position: 'absolute', right: 0, bottom: 0, width: '100%', borderTop: '1px solid #e9e9e9', padding: '10px 16px', background: '#fff', textAlign: 'right',}}>
                    <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                        <Button onClick={this.handelClose} style={{ marginRight: 8 }}>
                            退出
                        </Button>
                        <Button type="primary" htmlType="submit">
                            提交
                        </Button>
                    </Form.Item>
                </div>
            </Form>
              <div id = "imageDesc">
                  {/*<h1>hello world</h1>*/}
              </div>
          </>
        );
    }

    getMenuByNameAndLevel=async()=>{
        let params = {proName:this.state.firstTitle,levelMenu:1}
        const result = await getMenuByNameAndLevel(params);
        if(result.status){
            this.setState({secData:result.data})
        }
    }

    getMenuByNameAndLevel2=async()=>{
        let params = {proName:this.state.secTitle,levelMenu:2}
        const result = await getMenuByNameAndLevel(params);
        delete result.data.child
        if(result.status){
            this.setState({terData:result.data})
        }
    }

    handelOnChange=async()=>{
        let params = {menuCode:this.state.menuCode}
        await proGetMaxCode(params).then(res=>{
            this.setState({maxMenuCode:res.data})
        }).catch()
    }

    imgDescs = []
    handelUploadData=(e)=>{
        console.log("e.target.value====>>>>>>  ",e.target.value)
        this.imgDescs.push(e.target.value)
    }

    handelFileInfo=(values)=>{
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

    getBase64 = (file) => new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = (error) => reject(error);
        });

    handelClose=()=>{
        RemoveAll()
        this.props.close()
    }
}

