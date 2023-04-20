import React, {Component} from 'react';
import {Button, Drawer, Input, Select} from "antd";
import RuleUpdForm from '../../component/Form/RuleUpdForm'
import RuleAddForm from '../../component/Form/RuleAddForm'
import RuleDetailForm from '../../component/Form/RuleDetailForm'

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

    render() {
        let {visible,isEdit,updData,detailData} = this.props
        return (
            <div>
                <Drawer
                    title={isEdit==1?"修改":""||isEdit==2? "新增":""||isEdit==3?"详情":""}
                    width={720}
                    closable={false}
                    open={visible}
                    bodyStyle={{ paddingBottom: 80 }}
                >
                    {
                        isEdit===1?
                            <div>
                            <RuleUpdForm
                                updData = {this.props.updData}
                                proStaNames = {this.props.proStaNames}
                                close = {this.props.close}
                                submit = {this.props.submit}

                            />
                            </div>
                            :"" || isEdit===2?
                            <div>
                                <RuleAddForm
                                    proStaNames = {this.props.proStaNames}
                                    close = {this.props.close}
                                    submit = {this.props.submit}
                                />
                           </div>:"" || isEdit===3? <div>
                                <RuleDetailForm
                                    detailData = {detailData}
                                    close = {this.props.close}
                                />
                            </div>:""
                    }
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
