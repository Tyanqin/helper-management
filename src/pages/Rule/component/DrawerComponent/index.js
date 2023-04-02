import React, {Component} from 'react';
import {Button, Drawer, Input, Select} from "antd";
const { TextArea } = Input;
const { Option } = Select;

export default class DrawerComponent extends Component {


    state={
        updData:{},
        ruleName:"",
        staName:"",
        ruleTitle:"",
        ruleTheme:"",
        keyPoint:""

    }


    // static getDerivedStateFromProps(nextProps, prevState) {
    //     if (nextProps.updData!== prevState.updData) {
    //         return {
    //             updData: nextProps.updData
    //         }
    //     }
    //     return null
    // }


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
                            <span className = "data_span" style = {{width:80}}>细则名称</span>
                            <Select defaultValue={updData.ruleName}
                                    style={{marginTop:30,width:220}}
                                    onChange = {(value)=>this.setState({ruleName:`${value}`})}>
                                {
                                    this.props.ruleNames.map((item,index)=>{
                                        return (
                                            <Option key={index} value={item}>{item}</Option>
                                        )
                                    })
                                }
                                <Option value=""></Option>
                            </Select>

                            <span className = "data_span" style = {{width:80}}>项目阶段</span>
                            <Select defaultValue={updData.staName} style={{marginRight:20,width:220}}
                                    onChange = {(value)=>this.setState({staName:`${value}`})}
                            >
                                {
                                    this.props.proStaNames.map((item,index)=>{
                                        return (
                                            <Option key = {index} value={item.staName}>{item.staName}</Option>
                                        )
                                    })
                                }
                                <Option value=""></Option>
                            </Select>
                            <Input key={updData.detailId+1} defaultValue = {updData.ruleTitle}onChange={(e)=>{
                                console.log(e.target.value)
                                this.setState({ruleTitle:e.target.value})}} addonBefore = "细则标题" style={{marginTop:30,width:300}}/>
                            <Input key={updData.detailId+2} defaultValue = {updData.ruleTheme} onChange={(e)=>{
                                console.log(e.target.value)
                                this.setState({ruleTheme:e.target.value})}} addonBefore = "细则主题" style={{marginTop:30,width:300}}/>
                            <TextArea key={updData.detailId+3} defaultValue = {updData.keyPoint} onChange={(e)=>{
                                console.log(e.target.value)
                                this.setState({keyPoint:e.target.value})}} allowClear style={{width:600,marginTop:30,height:300}} />
                        </div>:
                            <div key={2}>
                            <span className = "data_span" style = {{width:80}}>细则名称</span>
                            <Select style={{marginTop:30,width:220}}
                                    onChange = {(value)=>this.setState({ruleName:`${value}`})}>
                                {
                                    this.props.ruleNames.map((item,index)=>{
                                        return (
                                            <Option key={index} value={item}>{item}</Option>
                                        )
                                    })
                                }
                                <Option value=""></Option>
                            </Select>

                            <span className = "data_span" style = {{width:80}}>项目阶段</span>
                            <Select  style={{marginRight:20,width:220}}
                                    onChange = {(value)=>this.setState({staName:`${value}`})}
                            >
                                {
                                    this.props.proStaNames.map((item,index)=>{
                                        return (
                                            <Option key = {index} value={item.staName}>{item.staName}</Option>
                                        )
                                    })
                                }
                                <Option value=""></Option>
                            </Select>
                            <Input key={updData.detailId+1} onChange={(e)=>{
                                console.log(e.target.value)
                                this.setState({ruleTitle:e.target.value})}} addonBefore = "细则标题" style={{marginTop:30,width:300}}/>
                            <Input key={updData.detailId+2}  onChange={(e)=>{
                                console.log(e.target.value)
                                this.setState({ruleTheme:e.target.value})}} addonBefore = "细则主题" style={{marginTop:30,width:300}}/>
                            <TextArea key={updData.detailId+3}  onChange={(e)=>{
                                console.log(e.target.value)
                                this.setState({keyPoint:e.target.value})}} allowClear style={{width:600,marginTop:30,height:300}} />
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
                detailId:this.props.updData.detailId,
                ruleName:this.state.ruleName?this.state.ruleName:this.props.updData.ruleName,
                staName:this.state.staName?this.state.staName:this.props.updData.staName,
                ruleTitle:this.state.ruleTitle?this.state.ruleTitle:this.props.updData.ruleName,
                ruleTheme:this.state.ruleTheme?this.state.ruleTheme:this.props.updData.ruleTheme,
                keyPoint:this.state.keyPoint?this.state.keyPoint:this.props.updData.keyPoint
            }
        }else{
            params = {
                ruleName:this.state.ruleName,
                staName:this.state.staName,
                ruleTitle:this.state.ruleTitle,
                ruleTheme:this.state.ruleTheme,
                keyPoint:this.state.keyPoint
            }
        }
            console.log("params===>>>",params)
        this.props.submit(params)

    }
}
