import React from 'react';
import {reqUserAll} from '../../api/req'
import TableComponent from '../../component/TableComponent'
import DrawerComponent from '../../component/DrawerComponent'
import { SearchOutlined,PlusOutlined} from '@ant-design/icons';
import './index.css'
import {Input, DatePicker, Button, Table} from 'antd'
const {RangePicker } = DatePicker;
export default class User extends React.Component {

    componentWillUnmount() {

    }

    state={
        visible:false, //控制抽屉标识
        actionMark:1,
        pageMark:1

    }

    render() {
        return (
            <div style={{marginBottom:20}}>
                <div style ={{height:10}}/>
                <Input.Group style={{marginLeft:10,marginTop:8}}>
                    <Input addonBefore = "姓名" autoFocus placeholder="请输入名称" style={{marginRight:20,width:200}}/>
                    <Input addonBefore = "专业"  placeholder="Basic usage" style={{marginRight:20,width:200}}/>
                    <Input addonBefore = "部门"  placeholder="Basic usage" style={{marginRight:20,width:200}}/>
                    <span className = "data_span">时间</span>
                     <RangePicker addonBefore = "姓名" onChange={this.handelOnChange.bind(this)}  style={{marginRight:20}}/>
                     <Button type="primary" style={{marginRight:20}}><SearchOutlined/>查询</Button>
                    <Button type="primary" onClick = {this.handelShowDrawer}><PlusOutlined /> 新增</Button>
                </Input.Group>
                <div style ={{height:15}}/>
                <TableComponent
                    handelMark={this.handelMark}
                />
                <DrawerComponent
                    visible={this.state.visible}
                    actionMark={this.state.actionMark}
                    pageMark={this.state.pageMark}
                    handelCloseDrawer = {this.handelCloseDrawer}
                />
            </div>
        );
    }

    // init= async ()=>{
    //     const result = await reqUserAll()
    //     console.log(result.data)
    // }


    // handelOnClick= async ()=>{
    //     window.location.href="/login"
    //     console.log(this)
    //     const result = await reqUserAll()
    //     console.log(result.data)
    // }


    //获取时间
    handelOnChange=(date, dateString)=> {
        console.log(date, dateString);
    }


    //打开抽屉
    handelShowDrawer=()=>{
        this.setState({
            actionMark:1,visible:true
        })
    }
    //关闭抽屉
    handelCloseDrawer=()=>{
        this.setState({
            actionMark:1,visible:false
        })
    }

    //修改Mark
    handelMark=()=>{
        this.setState({actionMark:0,visible:true})
    }

}
