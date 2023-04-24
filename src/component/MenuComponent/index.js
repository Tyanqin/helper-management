import React, {Component} from 'react';
import {NavLink,Outlet} from 'react-router-dom'
import {Divider, Layout, Menu, message, Modal} from 'antd';
import {HomeOutlined,ToolOutlined, FileSearchOutlined,UserOutlined,ApartmentOutlined,ReadOutlined,ExclamationCircleOutlined} from '@ant-design/icons';
import './index.css'
import Cache from '../../api/cache'
import Auth from '../../utils/auth'
import HomeDrawComponent from './DrawComponent'
import {userDeleteById} from "../../api/req";
const { SubMenu } = Menu;
const { Header, Content, Footer, Sider } = Layout;

export default class MenuComponent extends Component {
    state = {
        collapsed: false,
        openKeys: ['sub1'],
        display:"none",
        close:false,
        flag:"1"
    };


    componentDidMount() {
        Auth()
    }


    render() {
        let userName = Cache.localGet("userName")
        let loginName = Cache.localGet("loginName")
        let userMark = Cache.localGet("userMark")
        return (
            <Layout style ={{height:800}}>
                <Sider
                    breakpoint="lg" collapsedWidth="0" onBreakpoint={broken => {console.log(broken);}} onCollapse={(collapsed, type) => {console.log(collapsed, type);}}>
                    <div className = "title_box">全过程监督助手</div>
                    <Menu style={{marginTop:30}} theme="dark"  mode="inline" openKeys={this.state.openKeys} onOpenChange={this.onOpenChange}>
                        {/*<SubMenu key="sub1" title={<span><HomeOutlined/><span><NavLink key = {1} activeClassName="active" to = "/stat">首页</NavLink></span></span>}>*/}
                        {/*</SubMenu>*/}
                        <SubMenu key="sub2" title={<span><UserOutlined/><span><NavLink key = {2} activeClassName="active" to = "/user">用户管理</NavLink></span></span>}>
                            {/*<Menu.Item key="1">Option 1</Menu.Item>*/}
                            {/*<Menu.Item key="2">Option 2</Menu.Item>*/}
                            {/*<Menu.Item key="3">Option 3</Menu.Item>*/}
                            {/*<Menu.Item key="4">Option 4</Menu.Item>*/}
                        </SubMenu>
                        <SubMenu key="sub3" title={<span><ApartmentOutlined/><span><NavLink key = {3} activeClassName="active" to = "/major">专业管理</NavLink></span></span>}>
                            {/*<Menu.Item key="5">Option 5</Menu.Item>*/}
                            {/*<Menu.Item key="6">Option 6</Menu.Item>*/}
                            {/*<Menu.Item key="7">Option 7</Menu.Item>*/}
                            {/*<Menu.Item key="8">Option 8</Menu.Item>*/}
                        </SubMenu>
                        <SubMenu key="sub4" title={<span><UserOutlined/><span><NavLink key = {4} activeClassName="active" to = "/opinion">意见审批</NavLink></span></span>}>
                            {/*<Menu.Item key="1">Option 1</Menu.Item>*/}
                            {/*<Menu.Item key="2">Option 2</Menu.Item>*/}
                            {/*<Menu.Item key="3">Option 3</Menu.Item>*/}
                            {/*<Menu.Item key="4">Option 4</Menu.Item>*/}
                        </SubMenu>
                        <SubMenu key="sub5" title={<span><ToolOutlined/><span><NavLink key = {5} activeClassName="active" to = "/tec">标准工艺</NavLink></span></span>}>
                            {/*<Menu.Item key="9">Option 9</Menu.Item>*/}
                            {/*<Menu.Item key="10">Option 10</Menu.Item>*/}
                            {/*<Menu.Item key="11">Option 11</Menu.Item>*/}
                            {/*<Menu.Item key="12">Option 12</Menu.Item>*/}
                        </SubMenu>
                        <SubMenu key="sub6" title={<span><FileSearchOutlined/><span><NavLink key = {6} activeClassName="active" to = "/rule">监督细则</NavLink></span></span>}>
                            {/*<Menu.Item key="13">Option 13</Menu.Item>*/}
                            {/*<Menu.Item key="14">Option 14</Menu.Item>*/}
                            {/*<Menu.Item key="15">Option 15</Menu.Item>*/}
                            {/*<Menu.Item key="16">Option 16</Menu.Item>*/}
                        </SubMenu>
                        <SubMenu key="sub7" title={<span><ReadOutlined/><span><NavLink key = {7} activeClassName="active" to = "/reg">规章制度</NavLink></span></span>}>
                            {/*<Menu.Item key="17">Option 17</Menu.Item>*/}
                            {/*<Menu.Item key="18">Option 18</Menu.Item>*/}
                            {/*<Menu.Item key="19">Option 19</Menu.Item>*/}
                            {/*<Menu.Item key="20">Option 20</Menu.Item>*/}
                        </SubMenu>

                        <SubMenu key="sub8" title={<span><ReadOutlined/><span><NavLink key = {7} activeClassName="active" to = "/problem">问题汇总</NavLink></span></span>}>
                            {/*<Menu.Item key="17">Option 17</Menu.Item>*/}
                            {/*<Menu.Item key="18">Option 18</Menu.Item>*/}
                            {/*<Menu.Item key="19">Option 19</Menu.Item>*/}
                            {/*<Menu.Item key="20">Option 20</Menu.Item>*/}
                        </SubMenu>
                        {/*<SubMenu key="sub8" title={<span><MailOutlined/><span><NavLink key = {8} activeClassName="active" to = "/problem">问题汇总</NavLink></span></span>}>*/}
                            {/*/!*<Menu.Item key="21">Option 21</Menu.Item>*!/*/}
                            {/*/!*<Menu.Item key="22">Option 22</Menu.Item>*!/*/}
                            {/*/!*<Menu.Item key="23">Option 23</Menu.Item>*!/*/}
                            {/*/!*<Menu.Item key="24">Option 24</Menu.Item>*!/*/}
                        {/*</SubMenu>*/}
                        {/*<SubMenu key="sub9" title={<span><SettingOutlined/><span><NavLink key = {9} activeClassName="active" to = "/log">系统日志</NavLink></span></span>}>*/}
                            {/*/!*<Menu.Item key="25">Option 25</Menu.Item>*!/*/}
                            {/*/!*<Menu.Item key="26">Option 26</Menu.Item>*!/*/}
                            {/*/!*<Menu.Item key="27">Option 27</Menu.Item>*!/*/}
                            {/*/!*<Menu.Item key="28">Option 28</Menu.Item>*!/*/}
                        {/*</SubMenu>*/}
                    </Menu>
                </Sider>
                <Layout>
                    <Header style={{ background: '#fff', padding: 0,marginBottom:10,height:60,borderBottom:'1px solid #F0F0F0'}}>
                        <div
                            id = "individual_center"
                            onMouseOver={this.handelOnMouseOver}
                            onMouseOut={this.handelOnMouseOut}
                             style={{display:this.state.close?"none":"block"}}>
                            <div><UserOutlined style = {{fontSize:25,marginRight:10}} />
                            <a>个人中心</a>
                                {/*<Divider type="vertical" />*/}
                            </div>
                            <ul style={{display:this.state.display}}>
                                <li><a onClick = {this.handelOpen}>修改密码</a></li>
                                <li><a onClick = {this.handelExit}>注销</a></li>
                            </ul>
                        </div>
                    </Header>
                    <Content style={{marginLeft:10,marginRight:10}}>
                        <div style={{ background: '#fff', minHeight: 700 }}>
                            <Outlet/>
                        </div>
                    </Content>
                </Layout>
                <HomeDrawComponent
                    flag = {this.state.flag}
                    close = {this.state.close}
                    handelClose = {this.handelClose}
                />
            </Layout>
        );
    }

    rootSubmenuKeys = ['sub1', 'sub2', 'sub3','sub4','sub5','sub6','sub7'];
    toggle = () => {
        this.setState({
            collapsed: !this.state.collapsed,
        });
    };
    onOpenChange = openKeys => {
        const latestOpenKey = openKeys.find(key => this.state.openKeys.indexOf(key) === -1);
        if (this.rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
            this.setState({ openKeys });
        } else {
            this.setState({
                openKeys: latestOpenKey ? [latestOpenKey] : [],
            });
        }
    };



    handelExit=()=>{
        Modal.confirm({
        title: '确认退出系统吗？',
        icon: <ExclamationCircleOutlined/>,
        content: '',
            okText: '是',
            okType: 'danger',
            cancelText: '否',
            onOk: () => {
                this.handleOk()
            }
,
        onCancel() {

        },
    });

   }
        //删除回调
        handleOk= ()=>{
            Cache.localRemove("userName")
            Cache.localRemove("loginName")
            Cache.localRemove("majorName")
            Cache.localRemove("userMark")
            Cache.localRemove("token")
            Cache.localRemove("uId")
            window.location.href = "/login"
        }




    handelOpen=()=>{
         this.setState({close:true})
    }
    handelClose=()=>{
        this.setState({close:false})
    }

    handelOnMouseOver=()=>{
        this.setState({display:"block"})
    }

    handelOnMouseOut=()=>{
        this.setState({display:"none"})
    }
}