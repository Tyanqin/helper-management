import React, {Component} from 'react';
import {Table, Divider, Tag} from 'antd';
import './style.css'
export default class TableComponent extends Component {


    state = {
        list:[
            {key: '1', name: 'John Brown', age: 32, address: 'New York No. 1 Lake Park',},
            {key: '2', name: 'Jim Green', age: 42, address: 'London No. 1 Lake Park',},
            {key: '3', name: 'Joe Black', age: 32, address: 'Sidney No. 1 Lake Park',},
            {key: '4', name: 'Disabled User', age: 99, address: 'Sidney No. 1 Lake Park',},
            {key: '5', name: 'John Brown', age: 32, address: 'New York No. 1 Lake Park',},
            {key: '6', name: 'Jim Green', age: 42, address: 'London No. 1 Lake Park',},
            {key: '7', name: 'Joe Black', age: 32, address: 'Sidney No. 1 Lake Park',},
            {key: '8', name: 'Disabled User', age: 99, address: 'Sidney No. 1 Lake Park',},
            {key: '9', name: 'John Brown', age: 32, address: 'New York No. 1 Lake Park',},
            {key: '10', name: 'Jim Green', age: 42, address: 'London No. 1 Lake Park',},
            {key: '11', name: 'Joe Black', age: 32, address: 'Sidney No. 1 Lake Park',},
            {key: '12', name: 'Disabled User', age: 99, address: 'Sidney No. 1 Lake Park',},
            {key: '13', name: 'John Brown', age: 32, address: 'New York No. 1 Lake Park',},
            {key: '14', name: 'Jim Green', age: 42, address: 'London No. 1 Lake Park',},
            {key: '15', name: 'Joe Black', age: 32, address: 'Sidney No. 1 Lake Park',},
            {key: '16', name: 'Disabled User', age: 99, address: 'Sidney No. 1 Lake Park',},
            {key: '17', name: 'John Brown', age: 32, address: 'New York No. 1 Lake Park',},
            {key: '18', name: 'Jim Green', age: 42, address: 'London No. 1 Lake Park',},
            {key: '19', name: 'Joe Black', age: 32, address: 'Sidney No. 1 Lake Park',},
            {key: '20', name: 'Disabled User', age: 99, address: 'Sidney No. 1 Lake Park',},
            {key: '21', name: 'John Brown', age: 32, address: 'New York No. 1 Lake Park',},
            {key: '22', name: 'Jim Green', age: 42, address: 'London No. 1 Lake Park',},
            {key: '23', name: 'Joe Black', age: 32, address: 'Sidney No. 1 Lake Park',},
            {key: '24', name: 'Disabled User', age: 99, address: 'Sidney No. 1 Lake Park',}
        ],
        columns:[
            {title: '细则名称', dataIndex: 'ruleName', key: 'ruleName'},
            {title: '项目阶段', dataIndex: 'staName', key: 'staName'},
            {title: '细则标题', dataIndex: 'ruleTitle', key: 'ruleTitle'},
            {title: '细则主题', dataIndex: 'ruleTheme', key: 'ruleTheme'},
            {title: '监督要点', dataIndex: 'keyPoint', key: 'keyPoint',},
            {title: '操作', key: 'action', render: (text, record) => (<span>
                    <a onClick={this.handelUpdClick.bind(text, record)}>修改</a>
                    <Divider type="vertical" />
                    <a onClick={this.handelDeleteClick.bind(text, record)}>删除</a></span>),},
        ]
    }




    render() {

        // const rowSelection = {
        //     // onChange: (selectedRowKeys, selectedRows) => {
        //     //     console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
        //     // },
        //     getCheckboxProps: record => ({
        //         disabled: record.name === 'Disabled User', // Column configuration not to be checked
        //         name: record.name,
        //     }),
        // };

        return (
            <div>
                <Table
                   // rowSelection={this.rowSelection}
                   columns={this.state.columns}
                   dataSource={this.state.list}
                   onClick={this.handelChangePage}
                />
            </div>
        );
    }

    handelChangePage=(pagination)=>{
        console.log(pagination)
    }

    handelUpdClick=(text)=>{
        this.props.handelMark()
    }


    handelDeleteClick=(text)=>{
        console.log(text)
    }
}


