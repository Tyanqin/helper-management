import React, {Component} from 'react';
import { Button, Checkbox, Form,Cascader,Select,Input} from 'antd';
const {Option} = Select
class ProblemAddForm extends Component {


    onFinish = (values) => {
        console.log('Success:', values);
        let params = {
            staName: values.staName,
            problemName: values.problemName
        }
        this.props.submit(params)
    };

    onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    state={
        staName:"",
        problemName:"",
    }

    render() {
        let {updData,staNames} = this.props

        console.log("this.props.staNames====>>>>",this.props.staNames)
        return (
            <div>
                <Form
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
                        label="阶段名称"
                        name="staName"
                        rules={[{ required: true, message: '请输入阶段名称...' }]}
                    >
                        <Select
                            style={{marginTop:0,width:400,textAlign:"left"}}
                        >
                            {
                                this.props.staNames.map((item,index)=>{
                                    return (
                                        <Option value={item} key = {index}>{item}</Option>
                                    )
                                })
                            }
                        </Select>
                    </Form.Item>
                    <Form.Item
                        style = {{marginRight:120,marginTop:30}}
                        label="问题描述"
                        name="problemName"
                        rules={[{
                            required: true,
                            message: '请输入问题描述'
                        }]}
                    >
                        <Input
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

export default ProblemAddForm;