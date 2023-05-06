import React, {Component} from 'react';
import {Input, DatePicker, Button, Table, Pagination, Tooltip, Divider, message, Modal} from 'antd'
import { SearchOutlined,PlusOutlined,ExclamationCircleOutlined} from '@ant-design/icons';
import TecDrawerComponent from "./component/TecDrawerComponent";
import Auth from '../../utils/auth'
import {technologyPage, disProName, proGetId, proUpdateSubmit, proAdd,proDeleteById,
    getContentById,getMenu,getMenuByNameAndLevel,
} from '../../api/req'
import {SelectComponent,InputComponent,ReSet,ReSetClass,SelectComponentClass} from '../../component/SearchComponent'
/**
 * 标准工艺
 */
export default class Technology extends Component {

    state={
        visible: false,
        isEdit:1,
        pageData:[],    //分页数据
        updData:[],
        detailData:[],
        firstData:[],
        secData:[],
        terData:[],
        total:"",
        firstTitle:"",
        secTitle:"",
        terTitle:"",
        processName:"",
        currentPage:"1",
        pageSize:"10",
    }

    componentDidMount() {
        Auth()
        this.handelSelectData()
        this.getFirstMenu();
        this.getSecMenu();
        this.getTerMenu();
    }

    render() {
        return (
            <div>
                <div style ={{height:10}}/>
                <Input.Group style={{marginLeft:10,marginTop:8}}>
                    <SelectComponent
                       id = "firstTitle"
                       title = "一级目录"
                       data = {this.state.firstData}
                       style={{marginRight:20,width:160}}
                       onChange = {(e)=>{this.setState({firstTitle:e.target.value},this.getMenuByNameAndLevel)}}
                       attr = "proName"
                    />
                    <SelectComponentClass
                        classDec = "menu"
                        id = "secTitle"
                        title = "二级目录"
                        data = {this.state.secData}
                        style={{marginRight:20,width:120}}
                        onChange = {(e)=>{this.setState({secTitle:e.target.value},this.getMenuByNameAndLevel2)}}
                        attr = "proName"
                    />
                    <SelectComponentClass
                        classDec = "menu-ter"
                        id = "terTitle"
                        title = "三级目录"
                        data = {this.state.terData}
                        style={{marginRight:20,width:120}}
                        onChange = {(e)=>{this.setState({terTitle:e.target.value},this.handelSelectData)}}
                        attr = "proName"
                    />
                    <InputComponent
                        title = "工艺名称"
                        id = "processName"
                        placeholder = "请输入名称"
                        onChange = {(e)=>{this.setState({processName:e.target.value})}}
                        style={{marginRight:20,width:140}}
                    />
                    <Button type="primary" style={{marginRight:20}} onClick = {this.handelSelectData}><SearchOutlined/>查询</Button>
                    <Button type="primary" style={{marginRight:20}} onClick = {this.handelReset}>重置</Button>
                    <Button  type="primary" style={{marginRight:20}} onClick = {this.handelShowDrawer}>
                        <PlusOutlined /> 新增
                    </Button>
                </Input.Group>
                <div style ={{height:15}}/>
                <Table columns={this.columns} dataSource={this.state.pageData} pagination = {false} rowKey = {record=>record.proMenuId}/>
                <Pagination
                    className = "pag"
                    showQuickJumper
                    showSizeChanger = "false"
                    pageSizeOptions = {[10]}
                    total={this.state.total}
                    onChange = {(page,pageSize)=>{this.setState({currentPage:page,pageSiz:pageSize}, ()=>{this.handelSelectData()})}}/>
                <TecDrawerComponent
                    firstData = {this.state.firstData}
                    secData = {this.state.secData}
                    terData={this.state.terData}
                    isEdit = {this.state.isEdit}
                    updData = {this.state.updData}
                    detailData={this.state.detailData}
                    visible = {this.state.visible}
                    close = {this.onClose}
                    submit={this.submit}
                    handelSelectData = {this.handelSelectData}
                />
            </div>
        );
    }
    /**
     * 重置
     */
    handelReset=()=>{
        this.setState({firstTitle:"",secTitle:"",terTitle:"",processName:"",currentPage:"1"},()=>{
            this.handelSelectData()
            ReSet()
            ReSetClass("menu")
            ReSetClass("menu-ter")
        })
    }


    getMenuByNameAndLevel=async()=>{
        this.handelSelectData()
        let firstTitle = this.state.firstTitle;
        console.log("firstTitle====>>>>>  ",firstTitle)
        if(firstTitle){
            let params = {proName:firstTitle,levelMenu:1}
            const result = await getMenuByNameAndLevel(params);
            if(result.status){
                this.setState({secData:result.data})
            }
        }
        ReSetClass("menu")
        ReSetClass("menu-ter")

    }

    getMenuByNameAndLevel2=async()=>{
        this.handelSelectData()
        let secTitle = this.state.secTitle;
        if(secTitle) {
            let params = {proName: secTitle, levelMenu: 2}
            const result = await getMenuByNameAndLevel(params);
            delete result.data.child
            if (result.status) {
                this.setState({terData: result.data})
            }
        }
        ReSetClass("menu-ter")
    }

    getFirstMenu =async ()=>{
        let params = {levelMenu:1}
        const result = await getMenu(params)
        if(result.status){
            this.setState({firstData:result.data})
        }
    }
    getSecMenu =async ()=>{
        let params = {levelMenu:2}
        const result = await getMenu(params)
        if(result.status){
            this.setState({secData:result.data})
        }
    }
    getTerMenu =async ()=>{
        let params = {levelMenu:3}
        const result = await getMenu(params)
        if(result.status){
            this.setState({terData:result.data})
        }
    }

    //提交（修改与新增）
    submit = async(params) => {
        console.log("params====>>>>  ",params)

        let result = null
        if(this.state.isEdit===1){
            await proUpdateSubmit(params).then((res)=>{
                this.handelSelectData()
                message.info("修改成功！")
            })
        }else if(this.state.isEdit===2){
            await proAdd(params).then((res)=>{
                this.handelSelectData()
                message.info("上传成功！")
            })
        }
        this.setState({visible:false,isEdit:1})


    };

      //分页
    handelSelectData=async()=>{
        let {firstTitle,secTitle,terTitle,processName,currentPage,pageSize} = this.state
        let params = {firstTitle:firstTitle,secTitle:secTitle,terTitle:terTitle,processName:processName,currentPage:currentPage,pageSize:pageSize}
        const result = await technologyPage(params)
        if(result.status){
            this.setState({pageData:[...result.data.rows],total:result.data.total})
        }
    }

    //打开抽屉
    handelShowDrawer=async ()=>{
        let terParams = {levelMenu:"3",proName:"",menuCode:""}
        await disProName(terParams).then(res=>{this.setState({terData:res.data},()=>{this.setState({isEdit:2,visible:true})})})
    }

    //关闭抽屉
    onClose=()=>{
        this.setState({visible: false});
    }
     //修改打开抽屉
    onOpen=async(text)=>{
        let params = {proContentId:text.proContentId}
        const result = await getContentById(params)
        if(result.status === 200){
            this.setState({detailData:{...result.data}},()=>{this.setState({visible:true,isEdit:1})})
        }
    }
    /**
     * 详情
     * @returns {Promise<void>}
     */
    handelGetDetails=async(text)=>{
        let params = {proContentId:text.proContentId}
        const result = await getContentById(params)
        if(result.status === 200){
            this.setState({detailData:{...result.data}},()=>{this.setState({visible:true,isEdit:3})})
        }
    }
     //删除
    handelDeleteClick=async (text)=>{
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
        let params = {proContentId:text.proContentId}
        await proDeleteById(params).then(res=>{
            this.handelSelectData()
            message.info("删除成功！")
        }).catch(err=>{
            message.err("删除失败！")
        })
    }
     //字段
    columns=[
        {
            title: '序号',
            align: 'center',
            width: 80,
            render:(text,record,index)=> {
                return(
                    `${(this.state.currentPage-1)*(this.state.pageSize)+(index+1)}`//当前页数减1乘以每一页页数再加当前页序号+1
                )
            }
        },
        {title: '一级目录', dataIndex: 'firstTitle', key: 'firstTitle',onCell: () => {
                return {
                    style: {
                        maxWidth: 100,
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
            )},
        {title: '二级目录', dataIndex: 'secTitle', key: 'secTitle',onCell: () => {
                return {
                    style: {
                        maxWidth: 120,
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
            )},
        {title: '三级目录', dataIndex: 'terTitle', key: 'terTitle',onCell: () => {
                return {
                    style: {
                        maxWidth: 120,
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
            )},
        {title: '工艺名称', dataIndex: 'processName', key: 'processName',
            onCell: () => {
                return {
                    style: {
                        maxWidth: 120,
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
            )},
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
                        maxWidth: 200,
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
                    <a onClick={this.handelGetDetails.bind(text,record)}>详情</a>
                    <Divider type="vertical" />
                    <a onClick={this.onOpen.bind(text,record)}>修改</a>
                    <Divider type="vertical" />
                    <a onClick={this.handelDeleteClick.bind(text, record)}>删除</a>
        </span>),
        },
    ]




}