import React, {Component} from 'react';
import {Button, Divider, Drawer, Input, Select, Table, Tooltip} from "antd";
import CommentComponent from "../../component/CommentComponent";
import moment from 'moment'
import './style.css'
const { TextArea } = Input;
const { Option } = Select;

export default class OpiDrawerComponent extends Component {


    state={

    }

    render() {
        let {isEdit,visible,detailData} = this.props

        return (
            <div>
                <Drawer
                    title={isEdit?"修改":"详情"}
                    width={isEdit?720:850}
                    // onClose={()=>this.props.close()}
                    closable={false}
                    open={visible}
                    bodyStyle={{ paddingBottom: 80 }}
                >
                    {
                        isEdit===true?
                            <div>
                                修改
                            </div>
                            :
                            <div>
                                <div className="title">评审意见主题</div>
                                <div className="content">{detailData[0].title}</div>
                                <div className="title">阶段</div>
                                <div className="content">{detailData[0].stageName}</div>
                                <div className="title">电压等级</div>
                                <div className="content">{detailData[0].voltageName}</div>
                                <div className="title">签到表</div>
                                <Table columns={this.columns}
                                       dataSource={this.props.detailData[0]?this.props.detailData[0].signIns:[]}
                                       pagination = {false}
                                       style = {{marginBottom:30,marginTop:10}}
                                />
                                <div className="title">前言概述</div>
                                <div className="content">{detailData[0].introOverview}</div>
                                <div className="title">工程概述</div>
                                <div className="content">{detailData[0].proOverview}</div>
                                <div className="title">内审主要意见</div>
                                <CommentComponent
                                    problemData = {this.props.detailData[0]?this.props.detailData[0].problems:[]}
                                />
                                {/*<div className="title">落款</div>*/}
                                {/*<div className="content">{detailData[0].signOff}</div>*/}
                                {/*<div className="moment">{moment(detailData[0].creTime).format('YYYY年MM月DD')}</div>*/}
                                <div style={{position: 'absolute', right: 0, bottom: 0, width: '100%', borderTop: '1px solid #e9e9e9', padding: '10px 16px', background: '#fff', textAlign: 'right',}}>
                                    <Button type="primary" onClick={()=>this.props.close()} style={{ marginRight: 8 }}>
                                        退出
                                    </Button>
                                </div>
                            </div>
                    }
                </Drawer>
            </div>
        );
    }


    columns = [
        {
            title: '序号',
            align: 'center',
            width: 100,
            render:(text,record,index)=> {
                return(
                    `${index+1}`//当前页数减1乘以每一页页数再加当前页序号+1
                )
            }

        },
        {title: '签到人', dataIndex: 'userName', key: 'userName',
            // onCell: () => {
            //     return {
            //         style: {
            //             maxWidth: 200,
            //             overflow: 'hidden',
            //             whiteSpace: 'nowrap',
            //             textOverflow: 'ellipsis',
            //             cursor: 'pointer',
            //             height:10
            //         }
            //     }
            // },
            // render: title => (
            //     <Tooltip placement="topLeft" title={title}>
            //         {title}
            //     </Tooltip>
            // )
        },{title: '专业', dataIndex: 'majorName', key: 'majorName',
            // onCell: () => {
            //     return {
            //         style: {
            //             maxWidth: 200,
            //             overflow: 'hidden',
            //             whiteSpace: 'nowrap',
            //             textOverflow: 'ellipsis',
            //             cursor: 'pointer',
            //             height:10
            //         }
            //     }
            // },
            // render: title => (
            //     <Tooltip placement="topLeft" title={title}>
            //         {title}
            //     </Tooltip>
            // )
        },{title: '签到时间', dataIndex: 'creTime', key: 'creTime',
            // // onCell: () => {
            // //     return {
            // //         style: {
            // //             maxWidth: 200,
            // //             overflow: 'hidden',
            // //             whiteSpace: 'nowrap',
            // //             textOverflow: 'ellipsis',
            // //             cursor: 'pointer',
            // //             height:10
            // //         }
            // //     }
            // // },
            // render: stageName => (
            //     <Tooltip placement="topLeft" title={stageName}>
            //         {stageName}
            //     </Tooltip>
            // )
        }

        // ,
        // {title: '操作', key: 'action', render: (text, record) => (<span>
        //         <a onClick={this.updateDataById.bind(text,record)}>修改</a>
        //         <Divider type="vertical" />
        //         <a onClick = {this.handelReader.bind(text,record)}>查看</a>
        //          <Divider type="vertical" />
        //         <a onClick = {this.handelDownLoad.bind(text,record)}>下载</a>
        //         <Divider type="vertical" />
        //         <a onClick = {this.handelDelete.bind(text,record)}>删除</a>
        //  </span>),
        // },
    ]
}
