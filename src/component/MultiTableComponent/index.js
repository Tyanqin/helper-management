import React, {Component} from 'react';
import {Divider, Table} from 'antd';

export default class MultiTableComponent extends Component {


    state = {
        pageData: [],
        currentPage: "",
        pageSize: ""
    }


    // static getDerivedStateFromProps(props,state){
    //     console.log("props===》》》》",props);
    //     console.log("state===》》》》",state);
    //     if(props.pageData === state.pageData){
    //         return false
    //     }else{
    //         return true
    //     }
    // }

    // static getSnapshotBeforeUpdate(prevProps, prevState) {
    //     console.log("prevProps===》》》》",prevProps);
    //     console.log("prevState===》》》》",prevState);
    // }


    render() {
        return (
            <div>
                {this.dataSource(this.props.pageData)}
            </div>
        );
    }


    handelOnClick = (a, b) => {
        //展开时
        console.log(a, b)
    }

    handelUpdClick = (a, b) => {
        this.props.handelMark()
    }

    handelDeleteClick = (a, b) => {
        console.log(a, b)
    }
    handelOnExpandedRowsChange = (a, b) => {
        console.log(a, b)
    }
    onOpenChange = openKeys => {
        const latestOpenKey = openKeys.find(key => this.state.openKeys.indexOf(key) === -1);
        if (this.rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
            this.setState({openKeys});
        } else {
            this.setState({
                openKeys: latestOpenKey ? [latestOpenKey] : [],
            });
        }
    };



    dataSource = (dataSource) => {
        const columns=[
            {
                title: '序号',
                align: 'center',
                width: 100,
                render:(text,record,index)=> {
                    return(
                        `${(this.props.currentPage-1)*(this.props.pageSize)+(index+1)}`//当前页数减1乘以每一页页数再加当前页序号+1
                    )
                }
            },
            {
                title: '目录编码',
                dataIndex: 'menuCode',
                key: 'menuCode',
            },
            {
                title: '目录名称',
                dataIndex: 'proName',
                key: 'proName',
            },
        ]
        let data = []
        dataSource.forEach((item,index)=>{
           if(item.levelMenu===1){
               data.push({
                   key: index, menuCode:item.menuCode, proName:item.proName
               })
           }

       })

        // const data = [
        //     {key: 1, menuCode:'0101010000', menuName: '123'}
        // ]
         return  <Table
              columns={columns}
              dataSource={data}
              scroll={{x: 'calc(600px + 50%)', y: 520}}
              columnWidth="40px"
              size="middle"
            />
     }





}


// children: [
//     {
//         key: 11,
//         name: 'John Brown',
//         age: 42,
//         address: 'New York No. 2 Lake Park',
//     },
//     {
//         key: 12,
//         name: 'John Brown jr.',
//         age: 30,
//         address: 'New York No. 3 Lake Park',
//         children: [
//             {
//                 key: 121,
//                 name: 'Jimmy Brown',
//                 age: 16,
//                 address: 'New York No. 3 Lake Park',
//             },
//         ],
//     },
//     {
//         key: 13,
//         name: 'Jim Green sr.',
//         age: 72,
//         address: 'London No. 1 Lake Park',
//         children: [
//             {
//                 key: 131,
//                 name: 'Jim Green',
//                 age: 42,
//                 address: 'London No. 2 Lake Park',
//                 children: [
//                     {
//                         key: 1311,
//                         name: 'Jim Green jr.',
//                         age: 25,
//                         address: 'London No. 3 Lake Park',
//                     },
//                     {
//                         key: 1312,
//                         name: 'Jimmy Green sr.',
//                         age: 18,
//                         address: 'London No. 4 Lake Park',
//                     },
//                 ],
//             },
//         ],
//     },
// ],



// {/*<Table*/}
// {/*columns={this.state.columns}*/}
// {/*dataSource={this.state.data}*/}
// {/*columnWidth="40px"*/}
// {/*onExpand = {this.handelOnClick}*/}
// {/*onExpandedRowsChange={this.handelOnExpandedRowsChange}*/}
// {/*size="middle"*/}
// {/*scroll={{ x: 'calc(600px + 50%)', y: 520 }}*/}
//
// {/*/>*/}