import {Divider, Tooltip} from "antd";
import React from "react";

const columns = [
    {title: '细则名称', dataIndex: 'ruleName', key: 'ruleName',
        onCell: () => {
            return {
                style: {
                    maxWidth: 200,
                    overflow: 'hidden',
                    whiteSpace: 'nowrap',
                    textOverflow: 'ellipsis',
                    cursor: 'pointer'
                }
            }
        },
        render: ruleName => (
            <Tooltip placement="topLeft" title={ruleName}>
                {ruleName}
            </Tooltip>
        )
    },
    {title: '项目阶段', dataIndex: 'staName', key: 'staName'},
    {title: '细则标题', dataIndex: 'ruleTitle', key: 'ruleTitle'},
    {title: '细则主题', dataIndex: 'ruleTheme', key: 'ruleTheme'},
    {title: '监督要点', dataIndex: 'keyPoint', key: 'keyPoint',
        onCell: () => {
            return {
                style: {
                    maxWidth: 350,
                    overflow: 'hidden',
                    whiteSpace: 'nowrap',
                    textOverflow: 'ellipsis',
                    cursor: 'pointer'
                }
            }
        },
        render: keyPoint => (
            <Tooltip placement="topLeft"
                     title={keyPoint}
                     overlayClassName = {'newTooltip'}
            >
                {keyPoint}
            </Tooltip>
        )
    },
    {title: '操作', key: 'action', render: (text, record) => (<span>
                    <a onClick={(text, record)=>{this.setState({visible:true})}}>修改</a>
                    <Divider type="vertical" />
                    <a onClick={this.handelDeleteClick.bind(text, record)}>删除</a>
                    <Divider type="vertical" />
                    <a onClick={this.handelDeleteClick.bind(text, record)}>详情</a></span>),
    },
],