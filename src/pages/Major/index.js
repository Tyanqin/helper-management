import React, {Component} from 'react';
import {Button, Divider, Input, message, Modal, Pagination, Table, Tooltip} from "antd";
import MajorDrawerComponent from "./component/MajorDrawerComponent";
import { SearchOutlined,PlusOutlined,ExclamationCircleOutlined} from '@ant-design/icons';
import {majorAll, userDeleteById, userGetId, userGetPage, userInsert, userUpdateSubmit} from "../../api/req";

export default class Major extends Component {
    // componentDidMount() {
    //     this.init()
    //     this.handelPage()
    //
    // }


    state={
        visible:false, //控制抽屉标识
        isEdit:true,
        pageData:[],
        majorData:[],
        updData:[],
        userName:"",
        majorName:"",
        total:"",
        currentPage:"1",
        pageSize:"10"

    }

    render() {
        return (
            <div style={{marginBottom:20}}>
                <div style ={{height:10}}/>
                <Input.Group style={{marginLeft:10,marginTop:8}}>
                    <Input addonBefore = "专业"  placeholder="请输入专业名称" onChange = {e=>this.setState({majorName:e.target.value})} style={{marginRight:20,width:300}}/>
                    <Button type="primary" style={{marginRight:20}} onClick = {this.handelPage}><SearchOutlined/>查询</Button>
                    <Button type="primary" onClick = {this.handelShowDrawer}><PlusOutlined /> 新增</Button>
                </Input.Group>
                <div style ={{height:15}}/>
                <Table columns={this.columns} dataSource={this.state.pageData} pagination = {false}/>
                {/*分页组件*/}
                <Pagination
                    style = {{marginLeft:950,marginTop:20}}
                    total={this.state.total}
                    onChange = {(page,pageSize)=>{this.setState({currentPage:page,pageSiz:pageSize}, ()=>{this.handelPage()})}}/>

                <MajorDrawerComponent
                    visible={this.state.visible}
                    isEdit = {this.state.isEdit}
                    updData = {this.state.updData}
                    majorData = {this.state.majorData}
                    close = {this.close}
                    submit = {this.updateSubmit}
                />
            </div>
        );
    }




    //新增
    handelShowDrawer=()=>{
        this.setState({visible:true,isEdit:false})
    }
    //关闭抽屉
    close=()=>{this.setState({visible:false})}
    //分页
    handelPage =async()=>{
        let {userName,majorName,currentPage,pageSize} = this.state
        let params = {userName:userName, majorName: majorName,currentPage:currentPage,pageSize:pageSize}
        const result =  await userGetPage(params)
        if(result.status){
            this.setState({pageData:result.data.rows,total:result.data.total})
        }else{
            message.useMessage(result.message)
        }
    }
    //删除
    handelDelete=async(text)=>{
        Modal.confirm({
            title: '确认删除此条数据?',
            icon: <ExclamationCircleOutlined/>,
            content: '',
            okText: '是',
            okType: 'danger',
            cancelText: '否',
            onOk: () => {
                this.handleOk(text)
            }
            ,
            onCancel() {
                message.error("删除失败!")
            },
        });

    }
    //删除回调
    handleOk=async (text)=>{
        await userDeleteById({uId:text.uId}).then(res=>{
            this.handelPage()
        }).catch(err=>{
            message.err("删除失败！")
        })
    }


    /**
     * 提交
     * @returns {Promise<void>}
     */
    updateSubmit = async(params) => {
        let result = null
        if(this.state.isEdit){
            result =  await userUpdateSubmit(params)
        }else{
            result =  await userInsert(params)
        }
        this.setState({visible:false,isEdit:true})
        if(result.status === 200){
            this.handelPage();
        }

    };

    //修改
    updateDataById=async(text)=>{

        this.handelPage()
        const result = await userGetId(text.uId)
        console.log("result====>>>>",result.data)
        if(result.status){
            this.setState({updData:result.data})
        }else{
            message.useMessage(result.message)
        }

        const value = await majorAll()
        if(value.status){
            let majorData = []
            value.data.forEach(item=>{majorData.push({label: item.majorName,value:item.majorName})})
            this.setState({majorData:majorData},()=>{this.setState({isEdit:true,visible:true})})
        }else{
            message.useMessage(value.message)
        }
    }

    init=async()=>{
        const value = await majorAll()
        if(value.status){
            let majorData = []
            value.data.forEach(item=>{majorData.push({label: item.majorName,value:item.majorName})})
            this.setState({majorData:majorData})
        }else{
            message.useMessage(value.message)
        }
    }

    //列表字段
    columns=[
        {
            title: '序号',
            align: 'center',
            width: 100,
            render:(text,record,index)=> {
                return(
                    `${(this.state.currentPage-1)*(this.state.pageSize)+(index+1)}`//当前页数减1乘以每一页页数再加当前页序号+1
                )
            }
        },
        {title: '用户名称', dataIndex: 'userName', key: 'userName',
            onCell: () => {
                return {
                    style: {
                        maxWidth: 200,
                        overflow: 'hidden',
                        whiteSpace: 'nowrap',
                        textOverflow: 'ellipsis',
                        cursor: 'pointer'
                    }
                }
            },
            render: resName => (
                <Tooltip placement="topLeft" title={resName}>
                    {resName}
                </Tooltip>
            )
        },
        {title: '专业名称', dataIndex: 'majorName', key: 'majorName',
            onCell: () => {
                return {
                    style: {
                        maxWidth: 200,
                        overflow: 'hidden',
                        whiteSpace: 'nowrap',
                        textOverflow: 'ellipsis',
                        cursor: 'pointer'
                    }
                }
            },
            render: resName => (
                <Tooltip placement="topLeft" title={resName}>
                    {resName}
                </Tooltip>
            )
        },
        {title: '操作', key: 'action', render: (text, record) => (<span>
                    <a onClick={this.updateDataById.bind(text,record)}>修改</a>
                    <Divider type="vertical" />
                    <a onClick = {this.handelDelete.bind(text,record)}>删除</a>
        </span>),
        },
    ]
}