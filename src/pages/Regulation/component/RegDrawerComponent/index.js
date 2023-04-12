import React, {Component} from 'react';
import {Button, Drawer, Input} from "antd";
import RegAddForm from '../../component/Form/RegAddForm'
import RegUpdForm from '../../component/Form/RegUpdForm'
import './index.css'
import { InboxOutlined,UploadOutlined} from '@ant-design/icons';




export default class RegDrawerComponent extends Component {


    state = {
        updData: {},
        regName: "",
        resName: "",
        files: []

    }

    render() {
        let {visible, isEdit} = this.props
        return (
            <div>
                <Drawer
                    title={isEdit ? "修改" : "新增"}
                    width={720}
                    closable={false}
                    onClose={() => this.props.close()}
                    open={visible}
                    bodyStyle={{paddingBottom: 80}}
                >
                    {
                        isEdit === true ?
                            <div  className="form_wrap">
                                <RegUpdForm
                                    updData = {this.props.updData}
                                    submit = {this.props.submit}
                                    close = {this.props.close}
                                />
                            </div> :
                            <div  className="form_wrap">
                                <RegAddForm
                                    updData = {this.props.updData}
                                    submit = {this.props.submit}
                                    close = {this.props.close}
                                />

                            </div>
                    }
                </Drawer>
            </div>
        );
    }

    // submit = (e) => {
    //     let params = {}
    //     if (this.props.isEdit) {
    //         params = {
    //             ruRegId: this.props.updData.ruRegId,
    //             regName: this.state.regName ? this.state.regName : this.props.updData.regName,
    //             resName: this.state.resName ? this.state.resName : this.props.updData.resName
    //         }
    //     } else {
    //         params = {
    //             regName: this.state.regName,
    //             files: this.state.files
    //         }
    //     }
    //     this.props.submit(params)
    //
    // }
}