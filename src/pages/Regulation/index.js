import React, {Component} from 'react';
import { SearchOutlined,PlusOutlined} from '@ant-design/icons';
import {Input,Button, Table, Select, message, Tooltip, Divider, Pagination} from 'antd'
import {regPage, distinctRegName, reqRuleGetId, regGetId, regUpdateSubmit, reqInsertRule,regUploadSubmit,regUpLoad} from '../../api/req'
import RegDrawerComponent from './component/RegDrawerComponent'
import PdfComponent from './component/PdfComponent'



const {Option} = Select

/**
 * 规章制度
 */
export default class Regulation extends Component {

    state={
        display:'none',   //是否显示PDF（详情）
        visible:false,
        isEdit:true,
        pageData:[], // 分页
        updData:[],  //修改
        detailsData:[],  //详情
        regNames:[],
        total:1,
        regName:"",
        resName:"",
        currentPage:"",
        pageSize:""
    }



    componentDidMount() {
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
                    regNames = {this.state.regNames}
                    visible = {this.state.visible}
                    close = {this.onClose}
                    submit={this.submit}
                />
                <PdfComponent
                    detailsData={this.state.detailsData}
                    handelDisPlay = {this.handelDisplay}
                    display = {this.state.display}
                />
            </div>
        );
    }

    /**
     * 获取规章细则名称
     * @returns {Promise<void>}
     */

    getRegName=async()=>{
        const result = await distinctRegName();
        if(result.status){
            this.setState({regNames:result.data})
        }else{
            message.error("获取规章名称失败！")
        }
    }


    /**
     * 查询page数据
     * @returns {Promise<void>}
     */
    handelPage =async()=>{
        let {regName,resName,currentPage,pageSize} = this.state
        let params = {regName:regName, resName: resName,currentPage:currentPage,pageSize:pageSize}
        const result =  await regPage(params)
        if(result.status){
            this.setState({pageData:result.data.rows,total:result.data.total})
        }
    }



    /**
     * 提交（修改与新增）
     * @returns {Promise<void>}
     */
    submit = async(params) => {
        let result = null
        if(this.state.isEdit){
            result =  await regUpdateSubmit(params)

        }else{
            const formData = new window.FormData();
            const size = params.files.length
            for(let i = 0;i<size;i++){formData.append("files",params.files[i])}
            const regName = params.regName
            formData.append("regName",regName);
            regUpLoad(formData).then(res=>{
                message.info("上传成功")
                this.handelPage();
            },err=>{
                console.log("上传失败")
            })
        }
        this.setState({visible:false,isEdit:true})
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
        console.log("text===>>>",text.ruRegId)
        const result = await regGetId(text.ruRegId)
        if(result.status === 200){
            console.log("result===>>>",result)
            this.setState({updData:{...result.data}},()=>{this.setState({visible:true,isEdit:true})})
        }


    }



    //打开抽屉
    handelShowDrawer=()=>{
        this.setState({isEdit:false,visible:true})
    }
    // //关闭抽屉
    // handelCloseDrawer=()=>{
    //     this.setState({mark:1,visible:false})
    // }

    //修改Mark
    handelMark=()=>{
        this.setState({mark:0,visible:true})
    }


    //查看详情
    handelGetDetails=async(text)=>{
        this.setState({display:'block'})
        console.log("text===>>>",text.ruRegId)
        const result = await regGetId(text.ruRegId)
        if(result.status === 200){
            console.log("result===>>>",result)
            this.setState({detailsData:{...result.data}})
        }
    }

    //控制PDF显示
    handelDisplay=()=>{
       this.setState({display:"none"})
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
                    <a onClick={this.onOpen.bind(text,record)}>修改</a>
                    {/*<Divider type="vertical" />*/}
                    {/*<a >删除</a>*/}
                    <Divider type="vertical" />
                    <a onClick = {this.handelGetDetails.bind(text,record)}>详情</a>
        </span>),
        },
    ]

}



