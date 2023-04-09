import React, {Component} from 'react';
import {Button, Drawer, Input, Select} from "antd";
import { InboxOutlined,UploadOutlined} from '@ant-design/icons';
import {proMenuGetId,disProName} from '../../../../api/req'
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
        let {visible,isEdit,updData} = this.props
        let {proContentId,firstTitle}  = updData
        console.log("proNames---->>>>",this.props.proNames)
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

                            <Input
                                key={updData.proContentId+1}
                                   defaultValue = {updData.firstTitle}
                                   onChange={(e)=>{
                                console.log(e.target.value)
                                this.setState({firstTitle:e.target.value})}} addonBefore = "一级标题" style={{marginTop:30,width:300}}/>
                            <Input
                                key={updData.proContentId+2}
                                   defaultValue = {updData.secTitle}
                                   onChange={(e)=>{
                                console.log(e.target.value)
                                this.setState({secTitle:e.target.value})}} addonBefore = "二级主题" style={{marginTop:30,width:300}}/>
                                <Input
                                    key={updData.proContentId+3}
                                       defaultValue = {updData.terTitle}
                                       onChange={(e)=>{
                                    console.log(e.target.value)
                                    this.setState({terTitle:e.target.value})}} addonBefore = "三级主题" style={{marginTop:30,width:300}}/>
                                <Input
                                    key={updData.proContentId+4}
                                       defaultValue = {updData.processName}
                                       onChange={(e)=>{
                                    console.log(e.target.value)
                                    this.setState({processName:e.target.value})}} addonBefore = "工艺名称" style={{marginTop:30,width:300}}/>

                                    <TextArea
                                        key={updData.proContentId+5}
                                              defaultValue = {updData.processStandard}
                                              onChange={(e)=>{
                                console.log(e.target.value)
                                this.setState({processStandard:e.target.value})}} allowClear style={{width:600,marginTop:30,height:200}} />

                                <TextArea
                                    key={updData.proContentId+6}
                                          defaultValue = {updData.constructionPoints}
                                          onChange={(e)=>{
                                    console.log(e.target.value)
                                    this.setState({constructionPoints:e.target.value})}} allowClear style={{width:600,marginTop:30,height:200}} />
                        </div>:
                            <div key={2}>
                                <span className = "data_span" style = {{width:80}}>一级目录</span>
                                <Select style={{marginTop:10,width:220}} onChange = {(value)=>this.setState({firstTitle:`${value}`})}>
                                    {
                                        this.props.firstData.map((item,index)=>{
                                            return (
                                                <Option key={item.proMenuId+1} value={item.proName}>{item.proName}</Option>
                                            )
                                        })
                                    }
                                    <Option value=""></Option>
                                </Select>
                                <span className = "data_span" style = {{width:80}}>目录编码</span>
                                <Select
                                    style={{marginTop:10,width:220}} onChange = {(value)=>this.setState({firstMenuCode:`${value}`})}>
                                    {
                                        this.props.firstData.map((item,index)=>{
                                            return (
                                                <Option key={item.proMenuId+1} value={item.menucode}>{item.menucode}</Option>
                                            )
                                        })
                                    }
                                    <Option value=""></Option>
                                </Select>

                                <span className = "data_span" style = {{width:80}}>二级目录</span>
                                <Select
                                    style={{marginTop:10,width:220}}
                                    onChange = {(value)=>this.setState({secTitle:`${value}`})}>
                                    {
                                        this.props.secData.map((item,index)=>{
                                            return (
                                                <Option key={item.proMenuId+1} value={item.proName}>{item.proName}</Option>
                                            )
                                        })
                                    }
                                    <Option value=""></Option>
                                </Select>
                                <span className = "data_span" style = {{width:80}}>目录编码</span>
                                <Select
                                    style={{marginTop:10,width:220}}
                                    onChange = {(value)=>this.setState({secMenuCode:`${value}`})}>
                                    {
                                        this.props.secData.map((item,index)=>{
                                            return (
                                                <Option key={item.proMenuId+1} value={item.menucode}>{item.menucode}</Option>
                                            )
                                        })
                                    }
                                    <Option value=""></Option>
                                </Select>



                                {/*<Input*/}
                                    {/*key={updData.proContentId+9}*/}
                                    {/*onChange={(e)=>{*/}
                                        {/*console.log(e.target.value)*/}
                                        {/*this.setState({secTitle:e.target.value})}} addonBefore = "二级目录" style={{marginTop:10,width:300}}/>*/}
                                {/*<Input*/}
                                    {/*key={updData.proContentId+10}*/}
                                    {/*onChange={(e)=>{*/}
                                        {/*console.log(e.target.value)*/}
                                        {/*this.setState({secMenuCode:e.target.value})}} addonBefore = "目录编码" style={{marginTop:10,width:300}}/>*/}

                                {/*<Input*/}
                                    {/*key={updData.proContentId+11}*/}
                                    {/*onChange={(e)=>{*/}
                                        {/*console.log(e.target.value)*/}
                                        {/*this.setState({terTitle:e.target.value})}} addonBefore = "三级目录" style={{marginTop:10,width:300}}/>*/}
                                {/*<Input*/}
                                    {/*key={updData.proContentId+12}*/}
                                    {/*onChange={(e)=>{*/}
                                        {/*console.log(e.target.value)*/}
                                        {/*this.setState({terMenuCode:e.target.value})}} addonBefore = "目录编码" style={{marginTop:10,width:300}}/>*/}

                                <span className = "data_span" style = {{width:80}}>二级目录</span>
                                <Select
                                    style={{marginTop:10,width:220}}
                                    onChange = {(value)=>this.setState({terTitle:`${value}`})}>
                                    {
                                        this.props.terData.map((item,index)=>{
                                            return (
                                                <Option key={item.proMenuId+1} value={item.proName}>{item.proName}</Option>
                                            )
                                        })
                                    }
                                    <Option value=""></Option>
                                </Select>
                                <span className = "data_span" style = {{width:80}}>目录编码</span>
                                <Select
                                    style={{marginTop:10,width:220}}
                                    onChange = {(value)=>this.setState({terMenuCode:`${value}`})}>
                                    {
                                        this.props.terData.map((item,index)=>{
                                            return (
                                                <Option key={item.proMenuId+1} value={item.menucode}>{item.menucode}</Option>
                                            )
                                        })
                                    }
                                    <Option value=""></Option>
                                </Select>


                                <Input
                                    key={updData.proContentId+13}
                                    onChange={(e)=>{
                                        console.log(e.target.value)
                                        this.setState({processName:e.target.value})}} addonBefore = "工艺名称" style={{marginTop:10,width:300}}/>
                                <Input
                                    key={updData.proContentId+14}
                                    onChange={(e)=>{
                                        console.log(e.target.value)
                                        this.setState({processCode:e.target.value})}} addonBefore = "目录编码" style={{marginTop:10,width:300}}/>

                                <TextArea
                                    key={updData.proContentId+15}
                                    onChange={(e)=>{
                                        console.log(e.target.value)
                                        this.setState({processStandard:e.target.value})}} allowClear style={{width:600,marginTop:10,height:100}} />
                                <TextArea
                                    key={updData.proContentId+16}
                                    onChange={(e)=>{
                                        console.log(e.target.value)
                                        this.setState({constructionPoints:e.target.value})}} allowClear style={{width:600,marginTop:10,height:100}} />
                                <Input
                                    key={updData.proContentId+17}
                                    onChange={(e)=>{
                                        console.log(e.target.value)
                                        this.setState({imgDesc:e.target.value})}} addonBefore = "图片描述" style={{marginTop:10,width:600}}/>

                                <div id = "upload_wrap">
                                         <Button type="primary" icon={<UploadOutlined />} className = "upLoad_btn">
                                             请选择图片
                                         </Button>
                                         <input key={9}
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
    submit=()=>{
        let params = {}
        if(this.props.isEdit){
            params = {
                proContentId:this.props.updData.proContentId,
                processCode:this.props.updData.processCode,
                firstTitle:this.state.firstTitle?this.state.firstTitle:this.props.updData.firstTitle,
                secTitle:this.state.secTitle?this.state.secTitle:this.props.updData.secTitle,
                terTitle:this.state.terTitle?this.state.terTitle:this.props.updData.terTitle,
                processName:this.state.processName?this.state.processName:this.props.updData.processName,
                processStandard:this.state.processStandard?this.state.processStandard:this.props.updData.processStandard,
                constructionPoints:this.state.constructionPoints?this.state.constructionPoints:this.props.updData.constructionPoints
            }
        }else{
            params = {
                firstTitle:this.state.firstTitle,
                firstMenuCode:this.state.firstMenuCode,
                secTitle:this.state.secTitle,
                secMenuCode:this.state.secMenuCode,
                terTitle:this.state.terTitle,
                terMenuCode:this.state.terMenuCode,
                processName:this.state.processName,
                processCode:this.state.processCode,
                processStandard:this.state.processStandard,
                constructionPoints:this.state.constructionPoints,
                imgDesc:this.state.imgDesc,
                files:this.state.files
            }
        }
            console.log("params===>>>",params)
        this.props.submit(params)

    }


    handelSelectByMenuId=async()=>{
        let params ={levelMenu:'2',proName:this.state.firstTitle,menuCode:this.state.firstMenuCode}
        await disProName(params).then(res=>{this.setState({secData:res.data})})

    }
}
