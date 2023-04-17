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
    opinionDownload,
    importProblem
} from '../../api/req'
import ProbelmDrawerComponent from './component/ProbelmDrawerComponent'
import {nanoid} from 'nanoid'



const {Option} = Select
class Problem extends Component {

    state={
        isEdit:1,
        visible:false,
        majorNames:[],
        pageData:[],
        updData:[],
        majorName:"",
        problemName:"",
        total:"",
        currentPage:"1",
        pageSize:"10"
    }

    componentDidMount() {
        this.majorNames()
        this.handelPage()
    }

    handelPage=async()=>{
        let {problemName,majorName,currentPage,pageSize} = this.state
        let params = {problemName,majorName,currentPage,pageSize}
       const result = await problemQueryPage(params)
        if(result.status){
            this.setState({pageData:result.data.rows})
        }
    }

    render() {
        return (
            <div>
                <div style ={{height:10}}/>
                <Input.Group style={{marginLeft:10,marginTop:8}}>
                    <span   className = "data_span" style = {{width:80}}>专业</span>
                    <Select defaultValue="" style={{marginRight:20,width:250}} onChange = {(value)=>this.setState({majorName:`${value}`})}>
                        <Option  value="">全部</Option>
                        {
                            this.state.majorNames.map((item,index)=>{
                                return (
                                    <Option key={item.problemId} value={item.majorName}>{item.majorName}</Option>
                                )
                            })
                        }
                    </Select>
                    <Input addonBefore = "问题名称"  onChange = {(e)=>{this.setState({problemName:e.target.value})}} style={{marginRight:20,width:400}}/>
                    <Button type="primary" onClick={this.selectPage} style={{marginRight:20}}><SearchOutlined/>查询</Button>
                    <Button type="primary" onClick={this.importProblem} style={{marginRight:20}}>导入</Button>
                    <Button type="primary" onClick={this.HandelExportProblem} style={{marginRight:20}}>导出</Button>
                    <Button type="primary" onClick={this.downloadTemplate} style={{marginRight:20}}>下载模版</Button>
                </Input.Group>
                <div style ={{height:15}}/>

                <Table columns={this.columns} dataSource={this.state.pageData} pagination = {false}/>
                <Pagination
                    style = {{marginLeft:950,marginTop:20}}
                    total={this.state.total}
                    onChange = {(page,pageSize)=>{this.setState({currentPage:page,pageSiz:pageSize}, ()=>{this.opinionPage()})}}/>
                <ProbelmDrawerComponent
                    visible={this.state.visible}
                    isEdit = {this.state.isEdit}
                    updData = {this.state.updData}
                    majorNames = {this.state.majorNames}
                    close = {this.close}
                    submit = {this.updateSubmit}
                    handelPage = {this.handelPage}
                />
            </div>
        );
    }

    importProblem =()=>{
       this.setState({isEdit:2,visible:true})
    }

    /**
     * 导出
     * @returns {Promise<void>}
     * @constructor
     */
    HandelExportProblem=async()=>{
        let fileName = "问题汇总"
        let params = {majorName:this.state.majorName,problemName:this.state.problemName,fileName}
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

        console.log("params====>>>>",params)
        if(this.state.isEdit){
            result =  await problemUpdate(params)
        }
        this.setState({visible:false,isEdit:true})
        if(result.status === 200){
            this.handelPage();
        }

    };

    majorNames=async()=>{
         const result = await majorNames();
         console.log("result=====majorNames====>>>> ",result)
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
        {title: '专业', dataIndex: 'majorName', key: 'majorName',
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



}

export default Problem;
