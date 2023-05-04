import React from 'react';
import {Button, Form, Input, Select} from 'antd';
import './index.css'
const {Option} = Select
export default class  RuleDetailForm  extends  React.Component{

    onFinish = (values) => {

    };

    onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    render(){
        let {detailData} = this.props
        return(
            <div className = "rule_detail_box">
                <div>细则名称</div>
                <div>{detailData.ruleName}</div>

                <div>阶段</div>
                <div>{detailData.staName}</div>

                <div>设备</div>
                <div>{detailData.ruleTitle}</div>

                <div>监督项目</div>
                <div>{detailData.ruleTheme}</div>

                <div>监督要点</div>
                <div>{detailData.keyPoint}</div>



            {/*<Form*/}
                {/*name="basic"*/}
                {/*labelCol={{ span: 8 }}*/}
                {/*wrapperCol={{ span: 16 }}*/}
                {/*initialValues={{ remember: true }}*/}
                {/*onFinish={this.onFinish}*/}
                {/*onFinishFailed={this.onFinishFailed}*/}
                {/*autoComplete="off"*/}
                {/*className = "form"*/}
            {/*>*/}
                {/*<Form.Item*/}
                    {/*style = {{marginRight:120,marginTop:130}}*/}
                    {/*label="细则名称"*/}
                    {/*name="ruleName"*/}
                    {/*rules={[{*/}
                        {/*// required: false,*/}
                        {/*// message: '请输入名称!'*/}
                    {/*}]}*/}
                {/*>*/}
                    {/*<Input*/}
                        {/*readOnly*/}
                        {/*key = {detailData.detailId}*/}
                        {/*defaultValue ={detailData.ruleName}*/}
                    {/*/>*/}
                {/*</Form.Item>*/}
                {/*<Form.Item*/}
                    {/*style = {{marginRight:120,marginTop:30}}*/}
                    {/*label="阶段"*/}
                    {/*name="staName"*/}
                {/*>*/}
                    {/*<Input*/}
                        {/*readOnly*/}
                        {/*key = {detailData.detailId}*/}
                        {/*defaultValue ={detailData.staName}*/}
                    {/*/>*/}
                {/*</Form.Item>*/}

                {/*<Form.Item*/}
                    {/*style = {{marginRight:120,marginTop:30}}*/}
                    {/*label="专业"*/}
                    {/*name="ruleTheme"*/}
                    {/*rules={[{*/}
                        {/*// required: false,*/}
                        {/*// message: '请输入名称!'*/}
                    {/*}]}*/}
                {/*>*/}
                    {/*<Input*/}
                        {/*readOnly*/}
                        {/*key = {detailData.detailId}*/}
                        {/*defaultValue ={detailData.ruleTheme}*/}
                    {/*/>*/}
                {/*</Form.Item>*/}
                {/*<Form.Item*/}
                    {/*style = {{marginRight:120,marginTop:30}}*/}
                    {/*label="设备"*/}
                    {/*name="ruleTitle"*/}
                    {/*rules={[{*/}
                        {/*// required: false,*/}
                        {/*// message: '请输入名称!'*/}
                    {/*}]}*/}
                {/*>*/}
                    {/*<Input*/}
                        {/*readOnly*/}
                        {/*key = {detailData.detailId}*/}
                        {/*defaultValue ={detailData.ruleTitle} />*/}
                {/*</Form.Item>*/}
                {/*<Form.Item*/}
                    {/*style = {{marginRight:120,marginTop:30}}*/}
                    {/*label="监督要点"*/}
                    {/*name="keyPoint"*/}
                {/*>*/}
                    {/*<Input.TextArea*/}
                        {/*readOnly*/}
                        {/*key={detailData.detailId}*/}
                        {/*defaultValue  = {detailData.keyPoint}*/}
                        {/*maxLength = {2500}*/}
                        {/*allowClear showCount*/}
                    {/*/>*/}
                {/*</Form.Item>*/}
                <div style={{position: 'absolute', right: 0, bottom: 0, width: '100%', borderTop: '1px solid #e9e9e9', padding: '10px 16px', background: '#fff', textAlign: 'right',}}>
                    <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                        <Button type="primary" onClick={()=>this.props.close()} style={{ marginRight: 8 }}>
                            退出
                        </Button>
                    </Form.Item>
                </div>
            </div>
        );
    }

    onClose=()=>{
        this.setState({visible: false,isEdit:true});
    }
}

