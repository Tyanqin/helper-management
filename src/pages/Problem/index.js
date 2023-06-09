import React, {Component} from 'react';
import {Button, Divider, Input, Select, Tooltip, message, Table, Pagination, Modal} from "antd";
import { SearchOutlined,PlusOutlined,ExclamationCircleOutlined} from '@ant-design/icons';
import {
    majorNames,
    problemQueryPage,
    problemFindById,
    problemUpdate,
    problemDelById,
    proDownload,
    exportProblem,
    importProblem,
    problemAdd,
    staGetName
} from '../../api/req'
import ProbelmDrawerComponent from './component/ProbelmDrawerComponent'
import {SelectAttrComponent, InputComponent, ReSet} from "../../component/SearchComponent";



const {Option} = Select
class Problem extends Component {

    state={
        isEdit:1,
        visible:false,
        majorNames:[],
        staNames:[],
        pageData:[],
        updData:[],
        majorName:"",
        staName:"",
        problemName:"",
        total:"",
        currentPage:"1",
        pageSize:"10"
    }

    componentDidMount() {
        //this.majorNames()
        this.getStaNames()
        this.handelPage()
    }

    handelPage=async()=>{
        let {problemName,staName,currentPage,pageSize} = this.state
        let params = {problemName,staName,currentPage,pageSize}
        const result = await problemQueryPage(params)
        console.log("result=====>>handelPage>>>> ",result)
        if(result.status){
            this.setState({pageData:result.data.rows,total:result.data.total})
        }
    }

    render() {
        return (
            <div>
                <div style ={{height:10}}/>
                <Input.Group style={{marginLeft:10,marginTop:8}}>
                    {/*<span   className = "data_span" style = {{width:80}}>专业</span>*/}
                    {/*<Select defaultValue="" style={{marginRight:20,width:250}} onChange = {(value)=>this.setState({majorName:`${value}`})}>*/}
                        {/*<Option value="">全部</Option>*/}
                        {/*{*/}
                            {/*this.state.majorNames.map((item,index)=>{*/}
                                {/*return (*/}
                                    {/*<Option key={index} value={item.majorName}>{item.majorName}</Option>*/}
                                {/*)*/}
                            {/*})*/}
                        {/*}*/}
                    {/*</Select>*/}
                    {/*<Input addonBefore = "问题名称"  onChange = {(e)=>{this.setState({problemName:e.target.value})}} style={{marginRight:20,width:400}}/>*/}

                    <SelectAttrComponent
                        id = "staName"
                        title = "阶段"
                        style={{marginRight:20,width:250}}
                        onChange = {(e)=>this.setState({staName:e.target.value},this.selectPage)}
                        data = {this.state.staNames}
                    />
                    <InputComponent
                        id = "problemName"
                        title = "问题名称"
                        type = "text"
                        placeholder = "请输入问题名称"
                        onChange = {e=>this.setState({problemName:e.target.value},this.selectPage)}
                        style={{marginRight:20,width:250}}
                    />
                    <Button type="primary" onClick={this.selectPage} style={{marginRight:20}}><SearchOutlined/>查询</Button>
                    <Button type="primary" style={{marginRight:20}} onClick = {this.handelReset}>重置</Button>
                    <Button type="primary" style={{marginRight:20}} onClick = {this.problemAdd}><PlusOutlined /> 新增</Button>
                    <Button type="primary" onClick={this.downloadTemplate} style={{marginRight:20}}>下载模版</Button>
                    <Button type="primary" onClick={this.importProblem} style={{marginRight:20}}>导入</Button>
                    <Button type="primary" onClick={this.HandelExportProblem} style={{marginRight:20}}>导出</Button>
                </Input.Group>
                <div style ={{height:15}}/>
                <Table columns={this.columns} dataSource={this.state.pageData} pagination = {false} rowKey = {record=>record.problemId}/>
                <Pagination
                    className = "pag"
                    showQuickJumper
                    showSizeChanger = "false"
                    pageSizeOptions = {[10]}
                    total={this.state.total}
                    onChange = {(page,pageSize)=>{this.setState({currentPage:page,pageSiz:pageSize}, ()=>{this.handelPage()})}}/>

                    <ProbelmDrawerComponent
                        visible={this.state.visible}
                        isEdit = {this.state.isEdit}
                        updData = {this.state.updData}
                        staNames = {this.state.staNames}
                        close = {this.close}
                        submit = {this.updateSubmit}
                        handelPage = {this.handelPage}
                />
            </div>
        );
    }



    //新增
    problemAdd=()=>{
        this.setState({visible:true,isEdit:2})
    }
    /**
     * 重置
     */
    handelReset=()=>{
        this.setState({ staName:"", problemName:"",currentPage:"1"},()=>{
            this.handelPage()
            ReSet()
        })
    }

    importProblem =()=>{
       this.setState({isEdit:3,visible:true})
    }

    /**
     * 导出
     * @returns {Promise<void>}
     * @constructor
     */
    HandelExportProblem=async()=>{
        let fileName = "问题汇总"
        let params = {staName:this.state.staName,problemName:this.state.problemName,fileName}
        const result = await exportProblem(params,{responseType: 'blob'})
        if(result){
            const blob = new Blob([result], {type: 'application/msexcel'})
            const blobUrl = window.URL.createObjectURL(blob)
            let a = document.createElement('a');
            a.href = blobUrl;
            a.download = fileName+'.xls';
            document.body.appendChild(a);
            a.click();
            a.remove();
        }
    }

    /**
     * 下载模版
     * @returns {Promise<void>}
     */
    downloadTemplate=async()=>{
        let fileName = "问题汇总"
        let params = {fileName}
        const result = await proDownload(params,{responseType: 'blob'})
        if (result) {
            const blob = new Blob([result], {type: 'application/msexcel'})
            const blobUrl = window.URL.createObjectURL(blob)
            let a = document.createElement('a');
            a.href = blobUrl;
            a.download = fileName+'.xls';
            document.body.appendChild(a);
            a.click();
            a.remove();
        }
    }



    close=()=>{this.setState({visible:false})}
    /**
     * 提交
     * @returns {Promise<void>}
     */
    updateSubmit = async(params) => {
        let result = null
        if(this.state.isEdit==1){
            result =  await problemUpdate(params)
        }else if(this.state.isEdit==2){
            result =  await problemAdd(params)
        }
        this.setState({visible:false,isEdit:1})
        if(result.status === 200){
            this.handelPage();
        }

    };

    majorNames=async()=>{
         const result = await majorNames();
         if(result.status){
             this.setState({majorNames:result.data})
         }
    }
    /**
     * 查询
     * @returns {Promise<void>}
     */
    selectPage=async()=>{
        this.handelPage()
    }


    columns = [
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
        {title: '阶段', dataIndex: 'staName', key: 'staName',
            onCell: () => {
                return {
                    style: {
                        maxWidth: 200,
                        overflow: 'hidden',
                        whiteSpace: 'nowrap',
                        textOverflow: 'ellipsis',
                        cursor: 'pointer',
                        height:10
                    }
                }
            },
            render: title => (
                <Tooltip placement="topLeft" title={title}>
                    {title}
                </Tooltip>
            )
        },{title: '问题描述', dataIndex: 'problemName', key: 'problemName',
            onCell: () => {
                return {
                    style: {
                        maxWidth: 200,
                        overflow: 'hidden',
                        whiteSpace: 'nowrap',
                        textOverflow: 'ellipsis',
                        cursor: 'pointer',
                        height:10
                    }
                }
            },
            render: stageName => (
                <Tooltip placement="topLeft" title={stageName}>
                    {stageName}
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


    /**
     * 修改获取数据
     * @param text
     * @returns {Promise<void>}
     */
    updateDataById=async(text)=>{
        let params = {problemId:text.problemId}
       const result =  await problemFindById(params)
        console.log("result=====>>>>56756765>>",result)
        if(result.status===200){
            this.setState({updData:result.data,isEdit:1,visible:true},()=>{console.log("updData===>>>",this.state.updData)})
        }
    }

    /**
     * 删除
     * @returns {Promise<void>}
     */
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
            },
            onCancel() {
                message.error("删除失败!")
            },
        });

    }
    handleOk=async(text)=>{
        let params = {problemId:text.problemId}
        const result =  await problemDelById(params)
        if(result.status === 200){
            this.handelPage()
            message.success("删除成功!")
        }


    }


    getStaNames =async()=>{
        const result = await staGetName();
        console.log("result=====》》》》》》123123   ",result)
        if(result.status){
            this.setState({staNames:result.data})
        }else{
            message.error("获取阶段信息失败！")
        }
    }



}

export default Problem;
