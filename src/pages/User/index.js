import React from 'react';
import {userGetPage, userUpdateSubmit, majorAll, userGetId, userInsert, userDeleteById,majorNames} from '../../api/req'
import { SearchOutlined,PlusOutlined,ExclamationCircleOutlined} from '@ant-design/icons';
import {Input, Button, Table,message, Tooltip, Divider, Pagination, Modal} from 'antd'
import {InputComponent,SelectComponent,ReSet} from '../../component/SearchComponent'
import {connect} from 'react-redux'
import Auth from '../../utils/auth'
import UserDrawerComponent from './component/UserDrawerComponent'
import './index.css'
import {userInfo} from "./user_action";

export default connect(state=>({
    login:state.login,
    user:state.user
}),{userInfo:userInfo

})(class User extends React.Component {



    componentDidMount() {
        Auth()
        this.init()
        this.handelPage()
        this.majorNames()
    }


    state={
        visible:false, //控制抽屉标识
        isEdit:true,
        pageData:[],
        majorData:[],
        majorNames:[],
        updData:[],
        userName:"",
        majorName:"",
        total:"",
        currentPage:"1",
        pageSize:"10",
        disabled:"disabled"

    }

    render() {
        return (
            <div style={{marginBottom:20}}>
                <div style ={{height:10}}/>
                       <SelectComponent
                           id = "majorName"
                           title = "专业"
                           style={{marginRight:20,width:300}}
                           onChange = {(e)=>this.setState({majorName:e.target.value},this.handelPage)}
                           data = {this.state.majorNames}
                           attr = "majorName"
                      />
                       <InputComponent
                           id = "userName"
                           title = "姓名"
                           type = "text"
                           placeholder = "请输入用户名称"
                           onChange = {e=>this.setState({userName:e.target.value})}
                           style={{marginRight:20,width:300}}
                       />
                    <Button type="primary" style={{marginRight:20}} onClick = {this.handelPage}><SearchOutlined/>查询</Button>
                    <Button type="primary" style={{marginRight:20}} onClick = {this.handelReset}>重置</Button>
                    <Button type="primary" style={{marginLeft:265}} onClick = {this.handelShowDrawer}><PlusOutlined /> 新增</Button>
                <div style ={{height:15}}/>
                <Table columns={this.columns} dataSource={this.state.pageData} pagination = {false} rowKey  = {record=>record.uId}/>
                {/*/!*分页组件*!/*/}
                <Pagination
                    className = "pag"
                    showQuickJumper
                    showSizeChanger = "false"
                    pageSizeOptions = {[10]}
                    total={this.state.total}
                    onChange = {(page,pageSize)=>{this.setState({currentPage:page,pageSiz:pageSize}, ()=>{this.handelPage()})}}/>

                <UserDrawerComponent
                    visible={this.state.visible}
                    isEdit = {this.state.isEdit}
                    updData = {this.state.updData}
                    majorData = {this.state.majorData}
                    userMarkData = {this.state.userMarkData}
                    close = {this.close}
                    submit = {this.updateSubmit}
                    disabled = {this.state.disabled}
                    handelPage = {this.handelPage}
                />
            </div>
        );
    }

    /**
     * 重置
     */
    handelReset=()=>{
        this.setState({majorName:"",userName:"",currentPage:"1"},()=>{
            this.handelPage()
            ReSet()
        })
    }



    /**
     * 获取专业名称
     * @returns {Promise<void>}
     */
    majorNames=async()=>{
        const result = await majorNames()
        if(result.status){
            this.setState({majorNames:result.data})
        }
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
            this.props.userInfo({...result.data.rows,total:result.data.total})

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
            if(result.status){
                if(result.message != "OK"){
                    message.error(result.message)
                }else{
                    this.setState({visible:false,isEdit:true})
                }
            }
        }else{
            let {userName,loginName,password,phone,userMark,majorName} = params
            let paramsValue = {userName,loginName,password,phone,userMark,majorName:majorName.toString()}
            result =  await userInsert(paramsValue)
            if(result.status){
                if(result.message != "OK"){
                    message.error(result.message)
                }else{
                    this.setState({visible:false,isEdit:true})
                }
            }
        }
        if(result.status === 200){
            this.handelPage();
        }

    };


    //修改
    updateDataById=async(text)=>{
        this.handelPage()
        const result = await userGetId({uId:text.uId})
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
            message.info(value.message)
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
        },{title: '联系方式', dataIndex: 'phone', key: 'phone',
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
            render: phone => (
                <Tooltip placement="topLeft" title={phone}>
                    {phone}
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

})
