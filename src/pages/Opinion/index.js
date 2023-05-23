import React, {Component} from 'react';
import {Button, Divider, Input, Select, Tooltip, message, Table, Pagination, Modal} from "antd";
import { SearchOutlined,PlusOutlined,ExclamationCircleOutlined} from '@ant-design/icons';
import {staGetName, volGetName, opinionPage, opinionDel, opinionDownload, regDownload} from '../../api/req'
import {InputComponent,SelectAttrComponent,SelectConstantComponent,ReSet} from '../../component/SearchComponent'

import OpiDrawerComponent from './component/OpiDrawerComponent'
import Auth from '../../utils/auth'
import qs from "querystring";


const {Option} = Select
export default class Opinion extends Component {

    state = {
        isEdit:true,
        visible:false,
        staNameData:[],     //阶段
        volNameData:[],     //电压
        pageData:[],     //问题
        detailData:[],

        title:"",
        stageName:"",
        voltageName:"",
        isComplete:"",
        formId:"",
        total:"",
        currentPage:"1",
        pageSize:"10",
        completeData:[{1:"完成",0:"未完成"}],
    }



    componentDidMount() {
        Auth()
        this.getStaName()
        this.getVolName()
        this.opinionPage()
    }

    render() {
        return (
            <div style={{marginBottom:20}}>
                <div style ={{height:10}}/>
                <Input.Group style={{marginLeft:10,marginTop:8}}>
                    <InputComponent
                        id = "title"
                        title = "评审意见标题"
                        type = "text"
                        placeholder = "请输入评审意见标题"
                        onChange = {e=>this.setState({title:e.target.value})}
                        style={{marginRight:20,width:250}}
                    />
                    <SelectAttrComponent
                        id = "stageName"
                        // key = {1}
                        title = "阶段"
                        data = {this.state.staNameData}
                        onChange = {(e)=>this.setState({stageName:e.target.value},()=>{this.opinionPage()})}
                        style={{marginRight:20,width:185}}
                    />
                    <SelectAttrComponent
                        id = "voltageName"
                        // key = {2}
                        title = "电压"
                        data = {this.state.volNameData}
                        onChange = {(e)=>this.setState({voltageName:e.target.value},()=>{this.opinionPage()})}
                        style={{marginRight:20,width:100}}
                    />
                    {/*<SelectConstantComponent*/}
                        {/*id = "isComplete"*/}
                        {/*// key = "3"*/}
                        {/*title = "是否完成"*/}
                        {/*onChange = {(e)=>this.setState({isComplete:e.target.value})}*/}
                        {/*style={{marginRight:20,width:100}}*/}
                    {/*/>*/}
                    <Button type="primary" onClick={this.opinionPage} style={{marginRight:20}}><SearchOutlined/>查询</Button>
                    <Button type="primary" style={{marginRight:20}} onClick = {this.handelReset}>重置</Button>
                </Input.Group>
                <div style ={{height:15}}/>
                <Table columns={this.columns} dataSource={this.state.pageData} pagination = {false} rowKey = {record=>record.opinionId}/>
                <Pagination
                    className = "pag"
                    showQuickJumper
                    showSizeChanger = "false"
                    pageSizeOptions = {[10]}
                    total={this.state.total}
                    onChange = {(page,pageSize)=>{this.setState({currentPage:page,pageSiz:pageSize}, ()=>{this.opinionPage()})}}/>
                <OpiDrawerComponent
                    isEdit = {this.state.isEdit}
                    detailData = {this.state.detailData}
                    visible = {this.state.visible}
                    close = {this.onClose}
                    submit={this.submit}
                />

            </div>
        );
    }

    /**
     * 重置
     */
    handelReset=()=>{
        this.setState({title:"",stageName:"",voltageName:"",isComplete:"",currentPage:"1"},()=>{
            this.opinionPage()
            ReSet()
        })
    }
    opinionPage=async()=>{
        let {title,stageName,voltageName,isComplete,currentPage,pageSize} = this.state
        let params = {title,stageName,voltageName,isComplete,currentPage,pageSize}
        const result =  await opinionPage(params)
          if(result.status){
             this.setState({pageData:result.data.rows})
          }else{
            message.info("分页数据获取失败！")
          }
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
        {title: '评审意见标题', dataIndex: 'title', key: 'title',
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
        },{title: '阶段', dataIndex: 'stageName', key: 'stageName',
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
        },{title: '电压', dataIndex: 'voltageName', key: 'voltageName',
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
            render: voltageName => (
                <Tooltip placement="topLeft" title={voltageName}>
                    {voltageName}
                </Tooltip>
            )
        },{title: '前言概述', dataIndex: 'introOverview', key: 'introOverview',
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
            render: introOverview => (
                <Tooltip placement="topLeft" title={introOverview}>
                    {introOverview}
                </Tooltip>
            )
        },{title: '工程概述', dataIndex: 'proOverview', key: 'proOverview',
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
            render: proOverview => (
                <Tooltip placement="topLeft" title={proOverview}>
                    {proOverview}
                </Tooltip>
            )
        },{title: '落款', dataIndex: 'signOff', key: 'signOff',
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
            render: signOff => (
                <Tooltip placement="topLeft" title={signOff}>
                    {signOff}
                </Tooltip>
            )
        },
        {title: '操作', key: 'action', render: (text, record) => (<span>
                {/*<a onClick={this.updateDataById.bind(text,record)}>修改</a>*/}
                {/*<Divider type="vertical" />*/}
                <a onClick = {this.handelReader.bind(text,record)}>详情</a>
                 <Divider type="vertical" />
                <a onClick = {this.handelDownLoad.bind(text,record)}>下载</a>
                <Divider type="vertical" />
                <a onClick = {this.handelDelete.bind(text,record)}>删除</a>
         </span>),
        },
    ]

    handelDownLoad=async(text)=>{
        let params = {formId: text.formId}
        const result = await opinionDownload(params,{responseType: 'blob'})
        if (result) {
            const blob = new Blob([result], {type: 'application/msword'})
            const blobUrl = window.URL.createObjectURL(blob)
            let a = document.createElement('a');
            a.href = blobUrl;
            a.download = text.title;
            document.body.appendChild(a);
            a.click();
            a.remove();
        }

    }


    // let params = {fileName: text.fileName}
    // const result = await regDownload(params, {responseType: 'blob'}); //调用接口
    // if (result) {
    //     const blob = new Blob([result], {type: 'application/pdf'})
    //     const blobUrl = window.URL.createObjectURL(blob)
    //     let a = document.createElement('a');
    //     a.href = blobUrl;
    //     a.download = text.fileName;
    //     document.body.appendChild(a);
    //     a.click();
    //     a.remove();
    // }

    updateDataById=async(text)=>{


    }

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
                message.error("取消删除!")
            },
        });

    }

    handleOk=async(text)=>{
        let params = {formId:text.formId}
        let result = await opinionDel(params)
        if(result.status === 200){
            this.opinionPage()
            message.success("删除成功!")
        }
    }

    handelReader=async(text)=>{
        let params = {formId:text.formId}
        let result = await opinionPage(params)
        if(result.status == 200){
            this.setState({detailData:result.data.rows,isEdit:false,visible:true})
        }
    }





    /**
     * 获取阶段信息
     * @returns {Promise<void>}
     */
    getStaName=async()=>{
        const result = await staGetName()
        if(result.status){
            this.setState({staNameData:result.data})
        }else{
            message.info("阶段信息获取失败！")
        }
    }
    /**
     * 获取电压信息
     * @returns {Promise<void>}
     */
    getVolName=async()=>{
        const result = await volGetName()
        if(result.status){
            this.setState({volNameData:result.data})
        }else{
            message.info("电压信息获取失败！")
        }
    }

    //关闭抽屉
    onClose=()=>{
        this.setState({visible: false});
    }
}

