import React, {Component} from 'react';
import {Drawer} from 'antd';
import UserAddForm from '../Form/UserAddForm'
import UserUpdForm from '../Form/UserUpdForm'
import './index.css'



export default class UserDrawerComponent extends Component {



    render() {
        let {visible,isEdit,close} = this.props
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
                            <div className="form_wrap">
                                <UserUpdForm
                                    majorData = {this.props.majorData}
                                    updData = {this.props.updData}
                                    close = {this.props.close}
                                    submit = {this.props.submit}
                                />
                            </div>:
                            <div className="form_wrap">
                                 <UserAddForm
                                    majorData = {this.props.majorData}
                                    close = {this.props.close}
                                    submit = {this.props.submit}
                                    disabled = {this.props.disabled}
                                    handelDisabled = {this.props.handelDisabled}
                                 />
                            </div>
                    }
                </Drawer>
            </div>
        );
    }

}
