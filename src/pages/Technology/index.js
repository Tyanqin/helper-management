import React, {Component} from 'react';
import MultiTableComponent from '../../component/MultiTableComponent'
import MenuTableComponent from '../../component/MenuTableComponent'
import {Input, DatePicker, Button, Table, Pagination, Tooltip, Divider, message} from 'antd'
import { SearchOutlined,PlusOutlined} from '@ant-design/icons';
import TecDrawerComponent from "./component/TecDrawerComponent";
import {technologyPage, disProName, proGetId, proUpdateSubmit, regUpLoad} from '../../api/req'
const {RangePicker } = DatePicker;
/**
 * 标准工艺
 */
export default class Technology extends Component {

    state={
        visible: false,
        isEdit:true,
        pageData:[],    //分页数据
        updData:[],
        total:"",
        firstTitle:"",
        secTitle:"",
        terTitle:"",
        processName:"",
        currentPage:"1",
        pageSize:"10",
    }


    componentDidMount() {
        this.handelSelectData()
    }

    render() {
        return (
            <div>
                <div style ={{height:10}}/>
                <Input.Group style={{marginLeft:10,marginTop:8}}>
                    <Input addonBefore = "一级目录" autoFocus placeholder="请输入名称" style={{marginRight:20,width:250}}
                           onChange = {(e)=>{this.setState({firstTitle:e.target.value})}}/>
                    <Input addonBefore = "二级目录" autoFocus placeholder="请输入名称" style={{marginRight:20,width:250}}
                           onChange = {(e)=>{this.setState({secTitle:e.target.value})}}/>
                    <Input addonBefore = "三级目录" autoFocus placeholder="请输入名称" style={{marginRight:20,width:250}}
                           onChange = {(e)=>{this.setState({terTitle:e.target.value})}}/>
                    <Input addonBefore = "工艺名称" autoFocus placeholder="请输入名称" style={{marginRight:20,width:250}}
                           onChange = {(e)=>{this.setState({processName:e.target.value})}}/>
                    <Button type="primary" style={{marginRight:20}} onClick = {this.handelSelectData}><SearchOutlined/>查询</Button>
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
                    onChange = {(page,pageSize)=>{this.setState({currentPage:page,pageSiz:pageSize}, ()=>{this.handelSelectData()})}}/>
                <TecDrawerComponent
                    isEdit = {this.state.isEdit}
                    updData = {this.state.updData}
                    visible = {this.state.visible}
                    close = {this.onClose}
                    submit={this.submit}
                />
            </div>
        );
    }


    //提交（修改与新增）
    submit = async(params) => {
        let result = null
        console.log("======params=====>>>>123123",params)
        if(this.state.isEdit){
            await proUpdateSubmit(params).then((res)=>{
                this.handelSelectData()
                message.info("修改成功！")
            })
        }else{
            const formData = new window.FormData();
            const size = params.files.length
            for(let i = 0;i<size;i++){formData.append("files",params.files[i])}
            const regName = params.regName
            formData.append("regName",regName);
            await regUpLoad(formData).then((res)=>{
                this.handelSelectData()
                message.info("上传成功！")
            })


        }
        this.setState({visible:false,isEdit:true})


    };


    handelSelectData=async()=>{
        let {firstTitle,secTitle,terTitle,processName,currentPage,pageSize} = this.state
        let params = {firstTitle:firstTitle,secTitle:secTitle,terTitle:terTitle,processName:processName,currentPage:currentPage,pageSize:pageSize}
        const result = await technologyPage(params)
        if(result.status){
            this.setState({pageData:[...result.data.rows],total:result.data.total})
        }
    }


    //打开抽屉
    handelShowDrawer=()=>{
        this.setState({actionMark:1,visible:true})
    }

    //关闭抽屉
    onClose=()=>{
        this.setState({visible: false});
    }


    onOpen=async(text)=>{
        console.log("proContentId---proContentId--->",text.proContentId)
        const result = await proGetId(text.proContentId)
        console.log("onOpen---result--->",result)
        if(result.status === 200){
            this.setState({updData:{...result.data}},()=>{this.setState({visible:true,isEdit:true},()=>{console.log("56789",this.state.updData)})})
        }
    }

    handelDeleteClick=()=>{}


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
        {title: '一级目录', dataIndex: 'firstTitle', key: 'firstTitle'},
        {title: '二级目录', dataIndex: 'secTitle', key: 'secTitle'},
        {title: '三级目录', dataIndex: 'terTitle', key: 'terTitle'},
        {title: '工艺名称', dataIndex: 'processName', key: 'processName'},
        {title: '工艺标准', dataIndex: 'processStandard', key: 'processStandard',
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
            render: firstTitle => (
                <Tooltip placement="topLeft" title={firstTitle}>
                    {firstTitle}
                </Tooltip>
            )
        },
        {title: '施工要点', dataIndex: 'constructionPoints', key: 'constructionPoints\'},\n' +
                '\n' +
                '        {',
            onCell: () => {
                return {
                    style: {
                        maxWidth: 350,
                        overflow: 'hidden',
                        whiteSpace: 'nowrap',
                        textOverflow: 'ellipsis',
                        cursor: 'pointer'
                    }
                }
            },
            render: keyPoint => (
                <Tooltip placement="topLeft"
                         title={keyPoint}
                         overlayClassName = {'newTooltip'}
                >
                    {keyPoint}
                </Tooltip>
            )
        },
        {title: '操作', key: 'action', render: (text, record) => (<span>
                    <a onClick={this.onOpen.bind(text,record)}>修改</a>
                    <Divider type="vertical" />
                    <a onClick={this.handelDeleteClick.bind(text, record)}>删除</a>
        </span>),
        },
    ]




}