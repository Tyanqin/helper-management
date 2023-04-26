import React, {Component} from 'react';
import {Button, Divider, Drawer, Input, message, Select, Table, Tooltip, Upload,Form} from "antd";
import ProblemUpdForm from '../Form/ProblemUpdForm'
import { InboxOutlined } from '@ant-design/icons';
import {ACCESS_ADDRESS} from "../../../../conf/conf";
import UploadForm from '../../component/Form/UploadForm'
import RegAddForm from "../../../Regulation/component/RegDrawerComponent";

const { Dragger } = Upload;

const { TextArea } = Input;
const { Option } = Select;

export default class ProDrawerComponent extends Component {


    onFinish = (values) => {
        let params = {regName:values.regName,fileInfo:this.state.filesInfo}
        this.props.submit(params)
    };
    onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    state = {
        filesInfo:""

    };


    render() {
        let {isEdit,visible} = this.props
        return (
            <div>
                <Drawer
                    title={isEdit===1?"修改":""|| isEdit === 2?"导入":""}
                    width={720}
                    // onClose={()=>this.props.close()}
                    closable={false}
                    open={visible}
                    bodyStyle={{ paddingBottom: 80 }}
                >
                    {
                        isEdit===1?
                            <div key = "1">
                                <ProblemUpdForm
                                    updData = {this.props.updData}
                                    majorNames = {this.props.majorNames}
                                    close = {this.props.close}
                                    submit  = {this.props.submit}
                                />
                            </div>
                            :""|| isEdit === 2?
                            <div key = "2">
                                <UploadForm
                                    close = {this.props.close}
                                    handelPage = {this.props.handelPage}
                                />
                            </div>:""
                    }
                </Drawer>
            </div>
        );
    }



    handelChange=(info)=>{
        const { status } = info.file;
        console.log("this.values====>>>>",this.values)
        if (status !== 'uploading') {console.log(info.file, info.fileList);}
        if (status === 'done') {
            console.log("info.file.response.data====>>>>",info.file.response.data[0])
            this.values.push(...info.file.response.data)
        } else if (status === 'error') {
            message.error(`${info.file.name}上传失败`);
        }
        this.setState({filesInfo:[...this.values]},()=>{console.log("this.fileInfo---》》》",this.state.filesInfo)})
    }
    handelDrop=(e)=> {
        console.log('Dropped files', e.dataTransfer.files);
    }
}


