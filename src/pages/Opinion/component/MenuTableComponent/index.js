import React, {Component} from 'react';
import {Divider, Table, Tooltip} from 'antd';


/**
 * 层级表格
 */
export default class MenuTableComponent extends Component {

    state = {
        columns: [
            {title: '序号', dataIndex: 'regId', key: 'regId'},
            {title: '规章名称', dataIndex: 'regName', key: 'regName'},
            {title: '创建时间', dataIndex: 'creTime', key: 'creTime'},
            {title: 'Action', key: 'operation', render: () => <a>修改</a>},
        ],
        data: [
            {key: 1, name: 'Screem', platform: 'iOS', version: '10.3.4.5654', upgradeNum: 500, creator: 'Jack', createdAt: '2014-12-24 23:12:00'},
            {key: 2, name: 'Screem', platform: 'iOS', version: '10.3.4.5654', upgradeNum: 500, creator: 'Jack', createdAt: '2014-12-24 23:12:00'},
            {key: 3, name: 'Screem', platform: 'iOS', version: '10.3.4.5654', upgradeNum: 500, creator: 'Jack', createdAt: '2014-12-24 23:12:00'},
            {key: 4, name: 'Screem', platform: 'iOS', version: '10.3.4.5654', upgradeNum: 500, creator: 'Jack', createdAt: '2014-12-24 23:12:00'},
            {key: 5, name: 'Screem', platform: 'iOS', version: '10.3.4.5654', upgradeNum: 500, creator: 'Jack', createdAt: '2014-12-24 23:12:00'},
            {key: 6, name: 'Screem', platform: 'iOS', version: '10.3.4.5654', upgradeNum: 500, creator: 'Jack', createdAt: '2014-12-24 23:12:00'},
            {key: 7, name: 'Screem', platform: 'iOS', version: '10.3.4.5654', upgradeNum: 500, creator: 'Jack', createdAt: '2014-12-24 23:12:00'},
            {key: 8, name: 'Screem', platform: 'iOS', version: '10.3.4.5654', upgradeNum: 500, creator: 'Jack', createdAt: '2014-12-24 23:12:00'},
            {key: 9, name: 'Screem', platform: 'iOS', version: '10.3.4.5654', upgradeNum: 500, creator: 'Jack', createdAt: '2014-12-24 23:12:00'},
            {key: 10, name: 'Screem', platform: 'iOS', version: '10.3.4.5654', upgradeNum: 500, creator: 'Jack', createdAt: '2014-12-24 23:12:00'},
            {key: 11, name: 'Screem', platform: 'iOS', version: '10.3.4.5654', upgradeNum: 500, creator: 'Jack', createdAt: '2014-12-24 23:12:00'},
            {key: 12, name: 'Screem', platform: 'iOS', version: '10.3.4.5654', upgradeNum: 500, creator: 'Jack', createdAt: '2014-12-24 23:12:00'},
            {key: 13, name: 'Screem', platform: 'iOS', version: '10.3.4.5654', upgradeNum: 500, creator: 'Jack', createdAt: '2014-12-24 23:12:00'}
        ]
    }

    render() {
        return (
            <div>
                {this.NestedTable()}
            </div>
        );
    }














    //一级数据
    NestedTable=(table)=>{

        let approvalData = [] //一级数据
        let opinionData = []
        let replyData = []
        let pageData = this.props.pageData
        let length = pageData.length
        for (let i = 0; i < length; i++) {
            console.log("pageData===>>>>  ",pageData[i])
            let {title,stageName,voltageName,introOverview,proOverview,signOff} = pageData[i]
            let approval = {title,stageName,voltageName,introOverview,proOverview,signOff}
            approvalData.push(approval)
        }
        //列表字段
        const columns=[
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
            // {title: '操作', key: 'action', render: (text, record) => (<span>
            //         <a onClick={this.updateDataById.bind(text,record)}>修改</a>
            //         <Divider type="vertical" />
            //         <a onClick = {this.handelDelete.bind(text,record)}>删除</a>
            //  </span>),
            // },
        ]
        return (
            <Table
                className="components-table-demo-nested"
                columns={columns}
                expandedRowRender={this.expandedRowRender}
                dataSource={approvalData}
                onExpand = {this.handelOnClick}
                size="middle"
                scroll={{ x: 'calc(600px + 50%)', y: 520 }}
            />
        );
    }

    //二级数据
    expandedRowRender=(table)=>{
        const columns = [
            { title: '专业', dataIndex: 'majorName', key: 'majorName' },
            { title: '问题描述', dataIndex: 'proDesc', key: 'proDesc' },
            { title: '提问人', dataIndex: 'proUserName', key: 'proUserName' },
            { title: '监督细则', dataIndex: 'supContent', key: 'supContent' },
            { title: '问题类型', dataIndex: 'proMark', key: 'proMark' },
            // {title: '操作', key: 'action', render: (text, record) => (<span>
            //         <a onClick={this.handelUpdClick.bind(text, record)}>修改</a>
            //         <Divider type="vertical" />
            //         <a onClick={this.handelDeleteClick.bind(text, record)}>删除</a></span>),},
        ];
        let opinionData = []
        let replyData = []
        let pageData = this.props.pageData
        let length = pageData.length
        for (let i = 0; i < length; i++) {
            let length = pageData[i].problems.length
            for (let j = 0; j < length; j++) {
                let {formId,mainId,majorId,majorName,proDesc,proMark,proUserName,supContent,supId} = pageData[i].problems[j]
                let opinion = {formId,mainId,majorId,majorName,proDesc,proMark,proUserName,supContent,supId}
                opinionData.push(opinion)
            }

        }
        // const data = [
        //     {formId: '1', userName: '艾军', signId: 1, userId: 1},
        //     {formId: '1', userName: '黄光', signId: 2, userId: 2},
        //     {formId: '1', userName: '张蓉蓉', signId: 3, userId: 3},
        //     {formId: '1', userName: '艾军', signId: 4, userId: 1},
        //     {formId: '1', userName: '黄光', signId: 5, userId: 2},
        //     {formId: '1', userName: '张蓉蓉', signId: 6, userId: 3},
        // ];
        return <Table
            className="components-table-demo-nested"
            columns={columns}
            expandedRowRender={this.multilevelData}
            dataSource={opinionData}
            pagination={false}
        />
    };

    //三级目录
    // multilevelData=()=>{
    //     const columns = [
    //         { title: '签到人员', dataIndex: 'userName', key: 'userName' },
    //         { title: 'Name', dataIndex: 'name', key: 'name' },
    //         { title: 'Status', dataIndex: 'status', key: 'status' },
    //         { title: 'Upgrade Status', dataIndex: 'upgradeNum', key: 'upgradeNum' },
    //         {title: '操作', key: 'action', render: (text, record) => (<span>
    //                  <a onClick={this.handelUpdClick.bind(text, record)}>修改</a>
    //                  <Divider type="vertical" />
    //                  <a onClick={this.handelDeleteClick.bind(text, record)}>删除</a></span>),},
    //     ];
    //     const data = [
    //         {formId: '1', userName: '艾军', signId: 1, userId: 1},
    //         {formId: '1', userName: '黄光', signId: 2, userId: 2},
    //         {formId: '1', userName: '张蓉蓉', signId: 3, userId: 3},
    //         // {formId: '2', userName: '艾军', signId: 4, userId: 1},
    //         // {formId: '2', userName: '黄光', signId: 5, userId: 2},
    //         // {formId: '2', userName: '张蓉蓉', signId: 6, userId: 3}
    //
    //
    // ];
    //     return <Table columns={columns} dataSource={data} pagination={false} />;
    // };













    handelUpdClick=(text)=>{
        this.props.handelMark()
    }
    handelDeleteClick=(text)=>{
        console.log(text)
    }
    //点击展开
    handelOnClick=()=>{
        console.log(123456)
    }
}