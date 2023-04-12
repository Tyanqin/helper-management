import React, {Component} from 'react';
import {Button, Drawer, Input, Select} from "antd";
import { InboxOutlined,UploadOutlined} from '@ant-design/icons';
import {proMenuGetId,disProName} from '../../../../api/req'
import TecUpdForm from '../../component/Form/TecUpdForm'
import TecAddForm from '../../component/Form/TecAddForm'
import './index.css'
const { TextArea } = Input;
const { Option } = Select;

export default class TecDrawerComponent extends Component {


    state={
        updData:{},
        secData:[],
        firstTitle:"",
        secTitle:"",
        terTitle:"",
        processName:"",
        processStandard:"",
        constructionPoints:"",
        firstMenuCode:"",
        secMenuCode:"",
        terMenuCode:"",
        processCode:"",
        imgDesc:"",
        files:[]

    }

    render() {
        let {visible,isEdit,updData} = this.props
        return (
            <div>
                <Drawer
                    title={isEdit?"修改":"新增"}
                    width={720}
                    closable={false}
                    open={visible}
                    bodyStyle={{ paddingBottom: 80 }}
                >
                    {
                        isEdit===true?
                            <div key={1}>
                              <TecUpdForm
                                  updData = {this.props.updData}
                                  submit = {this.props.submit}
                                  close = {this.props.close}
                              />
                        </div>:
                            <div key={2}>
                                <TecAddForm
                                    terData = {this.props.terData}
                                    submit = {this.props.submit}
                                    close = {this.props.close}
                                />
                            </div>
                    }
                </Drawer>
            </div>
        );
    }
}
