import React, {Component} from 'react';
import {Divider, Table} from 'antd';


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
        const columns = [
            {title: '序号', dataIndex: 'regId', key: 'regId'},
            {title: '规章名称', dataIndex: 'regName', key: 'regName'},
            {title: '创建时间', dataIndex: 'creTime', key: 'creTime'},
            {title: '操作', key: 'action', render: (text, record) => (<span>
                    <a onClick={this.handelUpdClick.bind(text, record)}>修改</a>
                    <Divider type="vertical" />
                    <a onClick={this.handelDeleteClick.bind(text, record)}>删除</a></span>),},
        ];
        const data = [
            {key: 1, name: '张三', platform: 'iOS', version: '10.3.4.5654', upgradeNum: 500, creator: 'Jack', createdAt: '2014-12-24 23:12:00',},
            {key: 2, name: '张三', platform: 'iOS', version: '10.3.4.5654', upgradeNum: 500, creator: 'Jack', createdAt: '2014-12-24 23:12:00',},
            {key: 3, name: '张三', platform: 'iOS', version: '10.3.4.5654', upgradeNum: 500, creator: 'Jack', createdAt: '2014-12-24 23:12:00',}

        ];

        return (
            <Table
                className="components-table-demo-nested"
                columns={columns}
                expandedRowRender={this.expandedRowRender}
                dataSource={data}
                onExpand = {this.handelOnClick}
                size="middle"
                scroll={{ x: 'calc(600px + 50%)', y: 520 }}
            />
        );
    }

    //二级数据
    expandedRowRender=(table)=>{
        const columns = [
            { title: 'Date', dataIndex: 'date', key: 'date' },
            { title: 'Name', dataIndex: 'name', key: 'name' },
            { title: 'Status', dataIndex: 'status', key: 'status' },
            { title: 'Upgrade Status', dataIndex: 'upgradeNum', key: 'upgradeNum' },
            {title: '操作', key: 'action', render: (text, record) => (<span>
                    <a onClick={this.handelUpdClick.bind(text, record)}>修改</a>
                    <Divider type="vertical" />
                    <a onClick={this.handelDeleteClick.bind(text, record)}>删除</a></span>),},
        ];
        const data = [
            {key: 1, date: '李四', name: 'This is production name', upgradeNum: 'Upgraded: 56'},
            {key: 2, date: '李四', name: 'This is production name', upgradeNum: 'Upgraded: 56'},
            {key: 3, date: '李四', name: 'This is production name', upgradeNum: 'Upgraded: 56'},
        ];
        return <Table
            className="components-table-demo-nested"
            columns={columns}
            expandedRowRender={this.multilevelData}
            dataSource={data}
            pagination={false}
        />
    };

    //三级目录
    multilevelData=()=>{
        const columns = [
            { title: 'Date', dataIndex: 'date', key: 'date' },
            { title: 'Name', dataIndex: 'name', key: 'name' },
            { title: 'Status', dataIndex: 'status', key: 'status' },
            { title: 'Upgrade Status', dataIndex: 'upgradeNum', key: 'upgradeNum' },
            {title: '操作', key: 'action', render: (text, record) => (<span>
                    <a onClick={this.handelUpdClick.bind(text, record)}>修改</a>
                    <Divider type="vertical" />
                    <a onClick={this.handelDeleteClick.bind(text, record)}>删除</a></span>),},
        ];
        const data = [
            {key: 1, date: '王五', name: 'This is production name', upgradeNum: 'Upgraded: 56'},
            {key: 2, date: '王五', name: 'This is production name', upgradeNum: 'Upgraded: 56'},
            {key: 3, date: '王五', name: 'This is production name', upgradeNum: 'Upgraded: 56'},
        ];
        return <Table columns={columns} dataSource={data} pagination={false} />;
    };


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