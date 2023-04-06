import React, {Component} from 'react';
import {Button, Drawer, Input, Select} from "antd";
const { TextArea } = Input;
const { Option } = Select;

export default class TecDrawerComponent extends Component {


    state={
        updData:{},
        processCode:"",
        firstTitle:"",
        secTitle:"",
        terTitle:"",
        processName:"",
        processStandard:"",
        constructionPoints:""

    }

    render() {
        let {visible,isEdit,updData} = this.props
        let {proContentId,firstTitle}  = updData
        console.log("proContentId====>>>>>123123",proContentId)
        console.log("firstTitle====>>>>>123123",firstTitle)
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
                                key={updData.proContentId}
                                   defaultValue = {updData.firstTitle}
                                   onChange={(e)=>{
                                console.log(e.target.value)
                                this.setState({firstTitle:e.target.value})}} addonBefore = "一级标题" style={{marginTop:30,width:300}}/>
                            <Input
                                key={updData.proContentId}
                                   defaultValue = {updData.secTitle}
                                   onChange={(e)=>{
                                console.log(e.target.value)
                                this.setState({secTitle:e.target.value})}} addonBefore = "二级主题" style={{marginTop:30,width:300}}/>
                                <Input
                                    key={updData.proContentId}
                                       defaultValue = {updData.terTitle}
                                       onChange={(e)=>{
                                    console.log(e.target.value)
                                    this.setState({terTitle:e.target.value})}} addonBefore = "三级主题" style={{marginTop:30,width:300}}/>
                                <Input
                                    key={updData.proContentId}
                                       defaultValue = {updData.processName}
                                       onChange={(e)=>{
                                    console.log(e.target.value)
                                    this.setState({processName:e.target.value})}} addonBefore = "工艺名称" style={{marginTop:30,width:300}}/>

                                    <TextArea
                                        key={updData.proContentId}
                                              defaultValue = {updData.processStandard}
                                              onChange={(e)=>{
                                console.log(e.target.value)
                                this.setState({processStandard:e.target.value})}} allowClear style={{width:600,marginTop:30,height:200}} />

                                <TextArea
                                    key={updData.proContentId}
                                          defaultValue = {updData.constructionPoints}
                                          onChange={(e)=>{
                                    console.log(e.target.value)
                                    this.setState({constructionPoints:e.target.value})}} allowClear style={{width:600,marginTop:30,height:200}} />
                        </div>:
                            <div key={2}>
                                {/*<Input key={updData.proContentId} defaultValue = {updData.firstTitle}onChange={(e)=>{*/}
                                    {/*console.log(e.target.value)*/}
                                    {/*this.setState({firstTitle:e.target.value})}} addonBefore = "一级标题" style={{marginTop:30,width:300}}/>*/}
                                {/*<Input key={updData.proContentId} defaultValue = {updData.secTitle} onChange={(e)=>{*/}
                                    {/*console.log(e.target.value)*/}
                                    {/*this.setState({secTitle:e.target.value})}} addonBefore = "二级主题" style={{marginTop:30,width:300}}/>*/}
                                {/*<Input key={updData.proContentId} defaultValue = {updData.terTitle} onChange={(e)=>{*/}
                                    {/*console.log(e.target.value)*/}
                                    {/*this.setState({terTitle:e.target.value})}} addonBefore = "三级主题" style={{marginTop:30,width:300}}/>*/}
                                {/*<Input key={updData.proContentId} defaultValue = {updData.processName} onChange={(e)=>{*/}
                                    {/*console.log(e.target.value)*/}
                                    {/*this.setState({processName:e.target.value})}} addonBefore = "工艺名称" style={{marginTop:30,width:300}}/>*/}

                                {/*<TextArea key={updData.proContentId} defaultValue = {updData.processStandard} onChange={(e)=>{*/}
                                    {/*console.log(e.target.value)*/}
                                    {/*this.setState({processStandard:e.target.value})}} allowClear style={{width:600,marginTop:30,height:300}} />*/}

                                {/*<TextArea key={updData.proContentId} defaultValue = {updData.constructionPoints} onChange={(e)=>{*/}
                                    {/*console.log(e.target.value)*/}
                                    {/*this.setState({constructionPoints:e.target.value})}} allowClear style={{width:600,marginTop:30,height:300}} />*/}
                                    {/*<h1>新增</h1>*/}
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
                secTitle:this.state.secTitle,
                terTitle:this.state.terTitle,
                processName:this.state.processName,
                processStandard:this.state.processStandard,
                constructionPoints:this.state.constructionPoints
            }
        }
            console.log("params===>>>",params)
        this.props.submit(params)

    }
}
