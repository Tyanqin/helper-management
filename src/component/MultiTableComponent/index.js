import React, {Component} from 'react';
import {Divider, Table} from 'antd';

export default class multiTableComponent extends Component {


    state={
        columns:[
            {
                title: 'Name',
                dataIndex: 'name',
                key: 'name',
            },
            {
                title: 'Age',
                dataIndex: 'age',
                key: 'age',
                width: '12%',
            },
            {
                title: 'Address',
                dataIndex: 'address',
                width: '30%',
                key: 'address',
            },
            {title: '操作', key: 'action', render: (text, record) => (<span>
                    <a onClick={this.handelUpdClick.bind(text, record)}>修改</a>
                    <Divider type="vertical" />
                    <a style={{color:'red'}} onClick={this.handelDeleteClick.bind(text, record)}>删除</a>
                    <Divider type="vertical" />
                    <a onClick={this.handelDeleteClick.bind(text, record)}>详情</a>
            </span>),}
        ],
        data:[
            {
                key: 1,
                name: 'John Brown sr.',
                age: 60,
                address: 'New York No. 1 Lake Park',
                items: [
                    {
                        key: 11,
                        name: 'John Brown',
                        age: 42,
                        address: 'New York No. 2 Lake Park',
                    },
                    {
                        key: 12,
                        name: 'John Brown jr.',
                        age: 30,
                        address: 'New York No. 3 Lake Park',
                        items: [
                            {
                                key: 121,
                                name: 'Jimmy Brown',
                                age: 16,
                                address: 'New York No. 3 Lake Park',
                            },
                        ],
                    },
                    {
                        key: 13,
                        name: 'Jim Green sr.',
                        age: 72,
                        address: 'London No. 1 Lake Park',
                        items: [
                            {
                                key: 131,
                                name: 'Jim Green',
                                age: 42,
                                address: 'London No. 2 Lake Park',
                                items: [
                                    {
                                        key: 1311,
                                        name: 'Jim Green jr.',
                                        age: 25,
                                        address: 'London No. 3 Lake Park',
                                    },
                                    {
                                        key: 1312,
                                        name: 'Jimmy Green sr.',
                                        age: 18,
                                        address: 'London No. 4 Lake Park',
                                    },
                                ],
                            },
                        ],
                    },
                ],
            },
            {
                key: 2,
                name: 'Joe Black',
                age: 32,
                address: 'Sidney No. 1 Lake Park',
            },
            {
                key: 3,
                name: 'Joe Black',
                age: 32,
                address: 'Sidney No. 1 Lake Park',
            },
            {
                key: 4,
                name: 'Joe Black',
                age: 32,
                address: 'Sidney No. 1 Lake Park',
            },
            {
                key: 5,
                name: 'Joe Black',
                age: 32,
                address: 'Sidney No. 1 Lake Park',
            },
            {
                key: 6,
                name: 'Joe Black',
                age: 32,
                address: 'Sidney No. 1 Lake Park',
            },
            {
                key: 7,
                name: 'Joe Black',
                age: 32,
                address: 'Sidney No. 1 Lake Park',
            },
            {
                key: 8,
                name: 'Joe Black',
                age: 32,
                address: 'Sidney No. 1 Lake Park',
            },
            {
                key: 9,
                name: 'Joe Black',
                age: 32,
                address: 'Sidney No. 1 Lake Park',
            },
            {
                key: 10,
                name: 'Joe Black',
                age: 32,
                address: 'Sidney No. 1 Lake Park',
            },
            {
                key: 11,
                name: 'Joe Black',
                age: 32,
                address: 'Sidney No. 1 Lake Park',
            },
            {
                key: 12,
                name: 'Joe Black',
                age: 32,
                address: 'Sidney No. 1 Lake Park',
            },
        ]

    }
    render() {
        return (
            <div>
                <Table
                    columns={this.state.columns}
                    dataSource={this.state.data}
                    columnWidth="40px"
                    onExpand = {this.handelOnClick}
                    onExpandedRowsChange={this.handelOnExpandedRowsChange}
                    size="middle"
                    scroll={{ x: 'calc(600px + 50%)', y: 520 }}

                />
            </div>
        );
    }


    handelOnClick=(a,b)=>{

        //展开时
        console.log(a,b)
    }

    handelUpdClick=(a,b)=>{
        this.props.handelMark()
    }

    handelDeleteClick=(a,b)=>{
        console.log(a,b)
    }


    handelOnExpandedRowsChange=(a,b)=>{
        console.log(a,b)
    }




    onOpenChange = openKeys => {
        const latestOpenKey = openKeys.find(key => this.state.openKeys.indexOf(key) === -1);
        if (this.rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
            this.setState({ openKeys });
        } else {
            this.setState({
                openKeys: latestOpenKey ? [latestOpenKey] : [],
            });
        }
    };


}
