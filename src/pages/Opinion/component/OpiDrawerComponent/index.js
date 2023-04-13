import React, {Component} from 'react';
import {Button, Divider, Drawer, Input, Select, Table, Tooltip} from "antd";
import CommentComponent from "../../component/CommentComponent";
const { TextArea } = Input;
const { Option } = Select;

export default class OpiDrawerComponent extends Component {


    state={

    }

    render() {
        let {isEdit,visible} = this.props
        return (
            <div>
                <Drawer
                    title={isEdit?"修改":"详情"}
                    width={720}
                    onClose={()=>this.props.close()}
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
                                <div>签到表</div>
                                <Table columns={this.columns}
                                       dataSource={this.props.detailData[0]?this.props.detailData[0].signIns:[]}
                                       pagination = {false}
                                       style = {{marginBottom:30,marginTop:10}}
                                />
                                <div>内审主要意见</div>
                                <CommentComponent
                                    problemData = {this.props.detailData[0]?this.props.detailData[0].problems:[]}
                                />
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
                    `${text.signId}`//当前页数减1乘以每一页页数再加当前页序号+1
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
