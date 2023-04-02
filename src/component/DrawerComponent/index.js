import React, {Component} from 'react';
import { Drawer, Form, Button, Col, Row, Input, Select, DatePicker } from 'antd';
import { AppstoreOutlined} from '@ant-design/icons';
import TechAddComponent from '../TechAddComponent'


const { Option } = Select;

export default class DrawerComponent extends Component {
    render() {
        console.log("this.props.mark===actionMark>"+this.props.actionMark)
        console.log("this.props.mark===pageMark>"+this.props.pageMark)
        console.log("this.props.mark===visible>"+this.props.visible)
        return (
            <div>
                <Drawer
                    title={this.props.actionMark===1?"新增":"修改"}
                    width={720}
                    onClose={this.onClose}
                    visible={this.props.visible}
                    bodyStyle={{ paddingBottom: 80 }}
                >
                    {
                        this.props.pageMark===1 && this.props.actionMark === 1?<TechAddComponent/>:<div>没有数据</div> ||
                        this.props.pageMark===1 && this.props.actionMark === 0?<TechAddComponent/>:<div>没有数据</div> ||
                        this.props.pageMark===2 && this.props.actionMark === 1?<TechAddComponent/>:<div>没有数据</div> ||
                        this.props.pageMark===2 && this.props.actionMark === 0?<TechAddComponent/>:<div>没有数据</div> ||
                        this.props.pageMark===3 && this.props.actionMark === 1?<TechAddComponent/>:<div>没有数据</div> ||
                        this.props.pageMark===3 && this.props.actionMark === 0?<TechAddComponent/>:<div>没有数据</div> ||
                        this.props.pageMark===4 && this.props.actionMark === 1?<TechAddComponent/>:<div>没有数据</div> ||
                        this.props.pageMark===4 && this.props.actionMark === 0?<TechAddComponent/>:<div>没有数据</div> ||
                        this.props.pageMark===5 && this.props.actionMark === 1?<TechAddComponent/>:<div>没有数据</div> ||
                        this.props.pageMark===5 && this.props.actionMark === 0?<TechAddComponent/>:<div>没有数据</div> ||
                        this.props.pageMark===6 && this.props.actionMark === 1?<TechAddComponent/>:<div>没有数据</div> ||
                        this.props.pageMark===6 && this.props.actionMark === 0?<TechAddComponent/>:<div>没有数据</div> ||
                        this.props.pageMark===7 && this.props.actionMark === 1?<TechAddComponent/>:<div>没有数据</div> ||
                        this.props.pageMark===7 && this.props.actionMark === 0?<TechAddComponent/>:<div>没有数据</div>
                    }

                    <div style={{position: 'absolute', right: 0, bottom: 0, width: '100%', borderTop: '1px solid #e9e9e9', padding: '10px 16px', background: '#fff', textAlign: 'right',}}>
                        <Button onClick={this.onClose} style={{ marginRight: 8 }}>退出</Button>
                        <Button onClick={this.onClose} type="primary">提交</Button>
                    </div>
                </Drawer>
            </div>
        );
    }

    onClose = () => {
        this.props.handelCloseDrawer()
    };
}

