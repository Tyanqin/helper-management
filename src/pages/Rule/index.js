import React, {Component} from 'react';
import {distinctRuleName,proAll,page,updateSubmit,reqRuleGetId,reqInsertRule,reqRuleDelId} from '../../api/req'
import { SearchOutlined,PlusOutlined,ExclamationCircleOutlined} from '@ant-design/icons';
import {Input, DatePicker, Button, Table, Divider, Select, Tooltip, Pagination,Modal,message,Popover } from 'antd'
import DrawerComponent from './component/DrawerComponent'
import {InputComponent,SelectAttrComponent,SelectComponent,ReSet} from '../../component/SearchComponent'
import Auth from '../../utils/auth'
import './index.css'
const { Option } = Select;

/**
 * 监督细则
 */
export default class Rule extends Component {

    state={
        visible: false,
        isEdit:1,
        total:1,
        ruleNames:[],
        proStaNames:[],
        pageData:[],
        updData:{},
        addData:{},
        detailData:[],
        detailId:"",
        ruleName:"",
        staName:"",
        ruleTitle:"",
        keyPoint:"",
        startTime:"",
        endTime:"",
        currentPage:"",
        pageSize:"",
    }
    componentDidMount() {
        Auth()
      this.init()


    }
    render() {
        return (
            <div style={{marginBottom:20}}>
                <div style ={{height:10}}/>
                <Input.Group style={{marginLeft:10,marginTop:8}}>
                    {/*<span className = "data_span" style = {{width:80}}>细则名称</span>*/}
                    {/*<Select defaultValue=""*/}
                            {/*style={{marginRight:20,width:200}}*/}
                            {/*onChange = {(value)=>this.setState({ruleName:`${value}`})}>*/}
                        {/*<Option value="">全部</Option>*/}
                        {/*{*/}
                            {/*this.state.ruleNames.map((item,index)=>{*/}
                                {/*return (*/}
                                    {/*<Option key={index} value={item}>{item}</Option>*/}
                                {/*)*/}
                            {/*})*/}
                        {/*}*/}
                    {/*</Select>*/}
                    <SelectAttrComponent
                        id = "ruleName"
                        title = "细则名称"
                        style={{marginRight:20,width:180}}
                        onChange = {(e)=>this.setState({ruleName:e.target.value})}
                        data = {this.state.ruleNames}
                        attr = "ruleName"
                    />
                    <SelectComponent
                        id = "staName"
                        title = "选择阶段"
                        style={{marginRight:20,width:180}}
                        onChange = {(e)=>this.setState({staName:e.target.value})}
                        data = {this.state.proStaNames}
                        attr = "staName"
                    />
                    <InputComponent
                        id = "ruleTitle"
                        title = "细则名称"
                        type = "text"
                        placeholder = "请输入制度名称"
                        onChange = {e=>this.setState({ruleTitle:e.target.value})}
                        style={{marginRight:20,width:180}}
                    />
                    {/*<span className = "data_span" style = {{width:80}}>项目阶段</span>*/}
                    {/*<Select defaultValue="项目可研阶段" style={{marginRight:20,width:200}}*/}
                            {/*onChange = {(value)=>this.setState({staName:`${value}`})}*/}
                    {/*>*/}
                        {/*<Option value="">全部</Option>*/}
                        {/*{*/}

                            {/*this.state.proStaNames.map((item,index)=>{*/}
                                {/*return (*/}
                                    {/*<Option key = {index} value={item.staName}>{item.staName}</Option>*/}
                                {/*)*/}
                            {/*})*/}
                        {/*}*/}

                    {/*</Select>*/}
                    {/*<Input addonBefore = "细则标题"  style={{marginRight:20,width:300}} onChange = {e=>this.setState({ruleTitle:e.target.value})}/>*/}
                    <Button type="primary" style={{marginRight:20}} onClick = {this.handelSelectData}><SearchOutlined/>查询</Button>
                    <Button type="primary" style={{marginRight:20}} onClick = {this.handelAddData}><PlusOutlined/>新增</Button>
                    <Button type="primary" style={{marginRight:20}} onClick = {this.handelReset}>重置</Button>
                    <Popover placement="bottom" title={this.text} content={this.content} trigger="click">
                        <Button type="primary">批量导入</Button>
                    </Popover>
                </Input.Group>
                <div style ={{height:15}}/>
                {/*表格组件*/}
                <Table columns={this.columns} dataSource={this.state.pageData} pagination = {false}/>
                {/*分页组件*/}
                <Pagination
                    style = {{marginLeft:950,marginTop:20}}
                    total={this.state.total}
                    onChange = {(page,pageSize)=>{this.setState({currentPage:page,pageSiz:pageSize}, ()=>{this.handelSelectData()})}}/>
                 <DrawerComponent
                     isEdit = {this.state.isEdit}
                     updData = {this.state.updData}
                     detailData = {this.state.detailData}
                     ruleNames = {this.state.ruleNames}
                     proStaNames={this.state.proStaNames}
                     visible = {this.state.visible}
                     close = {this.onClose}
                     submit={this.updateSubmit}
                 />
            </div>
        );
    }

    handelReset=()=>{
        ReSet()
        this.setState({
            ruleName:"",
            staName:"",
            ruleTitle:"",})


    }
    /**
     * 删除
     * @param text
     */
    handelDeleteClick=(text)=>{
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

    handleOk= async (text)=>{
        let params = {detailId:text.detailId}
        const result = await reqRuleDelId(params)
        if(result.status === 200){
            this.handelSelectData()
            message.success("删除成功!")
        }
    };


    /**
     * 初始化方法
     * @returns {Promise<void>}
     */
    init=async ()=>{
        const ruleNameResult = await distinctRuleName()
        const proStageResult = await proAll()
        if(ruleNameResult.status === 200){
            this.setState({ruleNames:[...ruleNameResult.data]})
         }
         if(proStageResult.status === 200){
             this.setState({proStaNames:[...proStageResult.data]})
         }
        this.handelSelectData()

    }

    //分页
    handelSelectData=async()=>{
        let {ruleName,staName,ruleTitle,startTime,endTime,currentPage,pageSize} = this.state
        let params = {ruleName:ruleName, staName: staName,ruleTitle:ruleTitle,startTime:startTime,endTime:endTime,currentPage:currentPage,pageSize:pageSize}
        const result = await page(params)
        if(result.status === 200){
            this.setState({pageData:[...result.data.rows],total:result.data.total},()=>console.log({...this.state.pageData}))
        }
    }
     //新增
    handelAddData=async()=>{
        this.setState({visible:true,isEdit:2})
    }



    /**
     * 修改提交
     * @returns {Promise<void>}
     */
    updateSubmit = async(params) => {
        let result = null
        if(this.state.isEdit == 1){
            result =  await updateSubmit(params)

        }else if(this.state.isEdit == 2){
            result =  await reqInsertRule(params)
        }
        this.setState({visible:false,isEdit:1})
        if(result.status === 200){
            this.handelSelectData();
        }

    };

    /**
     * 关闭抽屉
     */
    onClose=()=>{
        this.setState({visible: false});
    }

    onOpen =async (text)=>{
        const result = await reqRuleGetId(text.detailId)
        if(result.status === 200){
            this.setState({updData:{...result.data}},()=>{this.setState({visible:true,isEdit:1})})
        }
    }

    hadelReader=async (text)=>{
       const result = await reqRuleGetId(text.detailId)
       if(result.status){
           this.setState({detailData:result.data},()=>{this.setState({visible:true,isEdit:3})})
       }
    }

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
        {title: '细则名称', dataIndex: 'ruleName', key: 'ruleName',
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
            render: ruleName => (
                <Tooltip placement="topLeft" title={ruleName}>
                    {ruleName}
                </Tooltip>
            )
        },
        {title: '阶段', dataIndex: 'staName', key: 'staName',onCell: () => {
                return {
                    style: {
                        maxWidth: 250,
                        overflow: 'hidden',
                        whiteSpace: 'nowrap',
                        textOverflow: 'ellipsis',
                        cursor: 'pointer'
                    }
                }
            },
            render: staName => (
                <Tooltip placement="topLeft"
                         title={staName}
                         overlayClassName = {'newTooltip'}
                >
                    {staName}
                </Tooltip>
            )},
        {title: '专业', dataIndex: 'ruleTheme', key: 'ruleTheme',onCell: () => {
                return {
                    style: {
                        maxWidth: 250,
                        overflow: 'hidden',
                        whiteSpace: 'nowrap',
                        textOverflow: 'ellipsis',
                        cursor: 'pointer'
                    }
                }
            },
            render: ruleTheme => (
                <Tooltip placement="topLeft"
                         title={ruleTheme}
                         overlayClassName = {'newTooltip'}
                >
                    {ruleTheme}
                </Tooltip>
            )},
        {title: '设备', dataIndex: 'ruleTitle', key: 'ruleTitle',onCell: () => {
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
            render: ruleTitle => (
                <Tooltip placement="topLeft"
                         title={ruleTitle}
                         overlayClassName = {'newTooltip'}
                >
                    {ruleTitle}
                </Tooltip>
            )},
        {title: '监督要点', dataIndex: 'keyPoint', key: 'keyPoint',
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
                    <a onClick={this.hadelReader.bind(text,record)}>详情</a>
                    <Divider type="vertical" />
                    <a onClick={this.onOpen.bind(text,record)}>修改</a>
                    <Divider type="vertical" />
                    <a onClick={this.handelDeleteClick.bind(text, record)}>删除</a>
        </span>),
        },
    ]

     // text = <span>批量导入</span>;
     content = (
        <div style = {{textAlign:"center"}}>
            <p><a>下载模版</a></p>
            <p><a>上传</a></p>
        </div>
    );

     buttonWidth = 70;

}

