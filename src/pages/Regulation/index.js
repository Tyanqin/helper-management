import React, {Component} from 'react';
import { SearchOutlined,PlusOutlined,ExclamationCircleOutlined} from '@ant-design/icons';
import {Input, Button, Table, Select, message, Tooltip, Divider, Pagination, Modal} from 'antd'
import {regPage, distinctRegName, regGetId, regUpdateSubmit, regAdd, regDeleteById, regDownload} from '../../api/req'
import RegDrawerComponent from './component/RegDrawerComponent'
import Auth from '../../utils/auth'
const {Option} = Select

/**
 * 规章制度page
 */
export default class Regulation extends Component {

    state={
        display:'none',   //是否显示PDF（详情）
        visible:false,    //抽屉开关标识
        isEdit:1,     //修改与新增标识
        pageData:[],     // 分页
        updData:[],      //修改
        detailsData:[],  //详情
        regNames:[],
        total:1,
        regName:"",
        resName:"",
        currentPage:"",
        pageSize:""
    }

    //打开页面进行数据初始化
    componentDidMount() {
        Auth()
        this.getRegName()
        this.handelPage()
    }

    render() {
        return (
            <div style={{marginBottom:20}}>
                <div style ={{height:10}}/>
                <Input.Group style={{marginLeft:10,marginTop:8}}>
                    <span   className = "data_span" style = {{width:80}}>规章名称</span>
                    <Select defaultValue="" style={{marginRight:20,width:185}} onChange = {(value)=>this.setState({regName:`${value}`})}>
                        <Option value="">全部</Option>
                        {
                            this.state.regNames.map((item,index)=>{
                                return (
                                    <Option key={index} value={item}>{item}</Option>
                                )
                            })
                        }
                    </Select>
                    <Input addonBefore = "制度名称"  onChange = {(e)=>{this.setState({resName:e.target.value})}} style={{marginRight:20,width:300}}/>
                    <Button type="primary" onClick={this.handelPage} style={{marginRight:20}}><SearchOutlined/>查询</Button>
                    <Button  type="primary" onClick = {this.handelShowDrawer}>
                        <PlusOutlined /> 新增
                    </Button>
                </Input.Group>
                <div style ={{height:15}}/>
                <Table columns={this.columns} dataSource={this.state.pageData} pagination = {false}/>
                {/*分页组件*/}
                <Pagination
                    style = {{marginLeft:950,marginTop:20}}
                    total={this.state.total}
                    onChange = {(page,pageSize)=>{this.setState({currentPage:page,pageSiz:pageSize}, ()=>{this.handelPage()})}}/>
                <RegDrawerComponent
                    isEdit = {this.state.isEdit}
                    updData = {this.state.updData}
                    detailsData = {this.state.detailsData}
                    regNames = {this.state.regNames}
                    visible = {this.state.visible}
                    close = {this.onClose}
                    submit={this.submit}

                />
                {/*<Outlet/>*/}
            </div>
        );
    }

     //获取规章制度下拉列表名称
    getRegName=async()=>{
        const result = await distinctRegName();
        if(result.status){
            this.setState({regNames:result.data})
        }else{
            message.error("获取规章名称失败！")
        }
    }

    //分页
    handelPage =async()=>{
        let {regName,resName,currentPage,pageSize} = this.state
        let params = {regName:regName, resName: resName,currentPage:currentPage,pageSize:pageSize}
        const result =  await regPage(params)
        if(result.status){
            this.setState({pageData:result.data.rows,total:result.data.total})
        }
    }

     //提交（修改与新增）
    submit = async(params) => {
        let result = null
        if(this.state.isEdit === 1){
            await regUpdateSubmit(params).then((res)=>{
                this.handelPage()
                this.getRegName()
            })
        }else if(this.state.isEdit === 2){
            await regAdd(params).then((res)=>{
                this.handelPage()
                this.getRegName()
            })
        }
        this.setState({visible:false,isEdit:1})


    };

    /**
     * 详情
     * @param text
     * @returns {Promise<void>}
     */
    handelGetDetails=async(text)=>{
        const result = await regGetId(text.ruRegId)
        if(result.status === 200){
            this.setState({detailsData:{...result.data}},()=>{this.setState({isEdit:3,visible:true})})
        }
    }

    //点击修改按钮获取数据，更改状态
    updateDataById =async (text)=>{
        this.handelPage()
        const result = await regGetId(text.ruRegId)
        if(result.status === 200){
            this.setState({updData:{...result.data}},()=>{this.setState({visible:true,isEdit:1})})
        }
    }

    //打开抽屉
    handelShowDrawer=()=>{
        this.handelPage()
        this.setState({isEdit:2,visible:true})
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
    handleOk= async (text)=>{
        let params = {ruRegId:text.ruRegId}
        const result = await regDeleteById(params)
        if(result.status === 200){
            this.handelPage()
            message.success("删除成功!")
        }
    };

    //下载
    handelDownLoad= async(text)=> {
        let params = {fileName: text.fileName}
        const result = await regDownload(params, {responseType: 'blob'}); //调用接口
        if (result) {
            const blob = new Blob([result], {type: 'application/pdf'})
            const blobUrl = window.URL.createObjectURL(blob)
            let a = document.createElement('a');
            a.href = blobUrl;
            a.download = text.fileName;
            document.body.appendChild(a);
            a.click();
            a.remove();
        }

    }

    //控制PDF显示
    handelDisplay=()=>{
       this.setState({display:"none"})
    }

    //关闭抽屉
    onClose=()=>{
        this.setState({visible: false});
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
        {title: '规章制度名称', dataIndex: 'resName', key: 'resName',
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
                    <a onClick = {this.handelGetDetails.bind(text,record)}>预览</a>
                    <Divider type="vertical" />
                    <a onClick = {this.handelDownLoad.bind(text,record)}>下载</a>
                    <Divider type="vertical" />
                    <a onClick = {this.handelDelete.bind(text,record)}>删除</a>

        </span>),
        },
    ]

}



