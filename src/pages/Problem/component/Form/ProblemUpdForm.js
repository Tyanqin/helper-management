import React, {Component} from 'react';
import { Button, Checkbox, Form,Cascader,Select,Input} from 'antd';
const {Option} = Select
class ProblemUpdForm extends Component {


    onFinish = (values) => {
        console.log('Success:', values);
        let params = {
            problemId: this.props.updData.problemId,
            majorName: values.majorName?values.majorName:this.props.updData.majorName,
            problemName: values.problemName?values.problemName:this.props.updData.problemName
        }
        this.props.submit(params)
    };

    onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    state={
        majorName:"",
        problemName:"",
    }

    render() {
        let {updData,staNameData} = this.props

        console.log("this.props.majorNames====>>>>",this.props.majorNames)
        return (
            <div>
                <Form
                    key = {updData.problemId}
                    name="basic"
                    labelCol={{ span: 8 }}
                    wrapperCol={{ span: 16 }}
                    initialValues={{ remember: true }}
                    onFinish={this.onFinish}
                    onFinishFailed={this.onFinishFailed}
                    autoComplete="off"
                    className = "form"
                >
                    <Form.Item
                        style = {{marginRight:120,marginTop:130}}
                        label="专业名称"
                        name="majorName"
                    >
                        <Select defaultValue ={updData.majorName} style={{width:400,textAlign:"Left"}}>
                            {
                                this.props.majorNames.map((item,index)=>{
                                    return (
                                        <Option key={item.majorId} value={item.majorName}>{item.majorName}</Option>
                                    )
                                })
                            }
                        </Select>
                    </Form.Item>
                    <Form.Item
                        style = {{marginRight:120,marginTop:30}}
                        label="问题描述"
                        name="problemName"
                        // rules={[
                        //     {
                        //         required: true,
                        //         message: '输入问题描述!',
                        //     },
                        // ]}
                    >
                        <Input.TextArea
                            key={this.props.updData.problemId}
                            defaultValue = {this.props.updData.problemName}
                            maxLength = {5000}
                            autoSize = "true"
                            allowClear showCount
                        />
                    </Form.Item>
                    <div style={{position: 'absolute', right: 0, bottom: 0, width: '100%', borderTop: '1px solid #e9e9e9', padding: '10px 16px', background: '#fff', textAlign: 'right',}}>
                        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                            <Button onClick={()=>this.props.close()} style={{ marginRight: 8 }}>
                                退出
                            </Button>
                            <Button type="primary" htmlType="submit">
                                提交
                            </Button>
                        </Form.Item>
                    </div>
                </Form>
            </div>
        );
    }
}

export default ProblemUpdForm;