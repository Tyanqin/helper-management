import React, {Component} from 'react';
import {Input, DatePicker, Button, Table} from 'antd'
import './index.css'
const {RangePicker } = DatePicker;

/**
 * 标准工艺新增
 */
export default class TechAddComponent extends Component {
    render() {
        return (
            <div id = "add_box">
                <Input.Group style={{marginLeft:10,marginTop:8}}>
                    <Input addonBefore = "主标题" autoFocus placeholder="请输入主标题" style={{marginRight:20,width:480,marginBottom:20}}/>
                    <Input addonBefore = "一级编号" placeholder="请输入一级编号" style={{marginRight:20,width:230,marginBottom:20}}/>
                    <Input addonBefore = "一级标题"  placeholder="请输入一级标题" style={{marginRight:20,width:230,marginBottom:20}}/>

                    <Input addonBefore = "二级编号"  placeholder="请输入二级编号" style={{marginRight:20,width:230,marginBottom:20}}/>
                    <Input addonBefore = "二级标题"  placeholder="请输入二级标题" style={{marginRight:20,width:230,marginBottom:20}}/>

                    <Input addonBefore = "三级编号"  placeholder="请输入三级编号" style={{marginRight:20,width:230,marginBottom:20}}/>
                    <Input addonBefore = "三级标题"  placeholder="请输入三级标题" style={{marginRight:20,width:230,marginBottom:20}}/>
                </Input.Group>
                <div className = "upload_box">
                    {/*<UploadComponent/>*/}
                </div>
            </div>
        );
    }
}
