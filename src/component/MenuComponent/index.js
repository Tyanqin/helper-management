import React, {Component} from 'react';
import {NavLink,Outlet} from 'react-router-dom'
import {Layout, Menu} from 'antd';
import { HomeOutlined,ToolOutlined, FileSearchOutlined, SettingOutlined,UserOutlined,ApartmentOutlined,MailOutlined,ReadOutlined} from '@ant-design/icons';
import './index.css'
const { SubMenu } = Menu;
const { Header, Content, Footer, Sider } = Layout;
export default class MenuComponent extends Component {
    state = {
        collapsed: false,
        openKeys: ['sub1'],
    };
    render() {
        return (
            <Layout style ={{height:770}}>
                <Sider
                    breakpoint="lg" collapsedWidth="0" onBreakpoint={broken => {console.log(broken);}} onCollapse={(collapsed, type) => {console.log(collapsed, type);}}>
                    <div className = "title_box">全过程监督助手</div>
                    <Menu style={{marginTop:30}} theme="dark"  mode="inline" openKeys={this.state.openKeys} onOpenChange={this.onOpenChange}>
                        <SubMenu key="sub1" title={<span><HomeOutlined/><span><NavLink  to = "/home">首页</NavLink></span></span>}>
                        </SubMenu>
                        <SubMenu key="sub2" title={<span><UserOutlined/><span><NavLink  to = "/home/user">用户管理</NavLink></span></span>}>
                            {/*<Menu.Item key="1">Option 1</Menu.Item>*/}
                            {/*<Menu.Item key="2">Option 2</Menu.Item>*/}
                            {/*<Menu.Item key="3">Option 3</Menu.Item>*/}
                            {/*<Menu.Item key="4">Option 4</Menu.Item>*/}
                        </SubMenu>
                        <SubMenu key="sub3" title={<span><ApartmentOutlined/><span><NavLink  to = "/home/major">专业管理</NavLink></span></span>}>
                            {/*<Menu.Item key="5">Option 5</Menu.Item>*/}
                            {/*<Menu.Item key="6">Option 6</Menu.Item>*/}
                            {/*<Menu.Item key="7">Option 7</Menu.Item>*/}
                            {/*<Menu.Item key="8">Option 8</Menu.Item>*/}
                        </SubMenu>
                        <SubMenu key="sub4" title={<span><UserOutlined/><span><NavLink  to = "/home/opinion">意见审批</NavLink></span></span>}>
                            {/*<Menu.Item key="1">Option 1</Menu.Item>*/}
                            {/*<Menu.Item key="2">Option 2</Menu.Item>*/}
                            {/*<Menu.Item key="3">Option 3</Menu.Item>*/}
                            {/*<Menu.Item key="4">Option 4</Menu.Item>*/}
                        </SubMenu>
                        <SubMenu key="sub5" title={<span><ToolOutlined/><span><NavLink  to = "/home/technology">标准工艺</NavLink></span></span>}>
                            {/*<Menu.Item key="9">Option 9</Menu.Item>*/}
                            {/*<Menu.Item key="10">Option 10</Menu.Item>*/}
                            {/*<Menu.Item key="11">Option 11</Menu.Item>*/}
                            {/*<Menu.Item key="12">Option 12</Menu.Item>*/}
                        </SubMenu>
                        <SubMenu key="sub6" title={<span><FileSearchOutlined/><span><NavLink  to = "/home/rule">监督细则</NavLink></span></span>}>
                            {/*<Menu.Item key="13">Option 13</Menu.Item>*/}
                            {/*<Menu.Item key="14">Option 14</Menu.Item>*/}
                            {/*<Menu.Item key="15">Option 15</Menu.Item>*/}
                            {/*<Menu.Item key="16">Option 16</Menu.Item>*/}
                        </SubMenu>
                        <SubMenu key="sub7" title={<span><ReadOutlined/><span><NavLink  to = "/home/regulation">规章制度</NavLink></span></span>}>
                            {/*<Menu.Item key="17">Option 17</Menu.Item>*/}
                            {/*<Menu.Item key="18">Option 18</Menu.Item>*/}
                            {/*<Menu.Item key="19">Option 19</Menu.Item>*/}
                            {/*<Menu.Item key="20">Option 20</Menu.Item>*/}
                        </SubMenu>
                        <SubMenu key="sub8" title={<span><MailOutlined/><span><NavLink  to = "/home/problem">问题汇总</NavLink></span></span>}>
                            {/*<Menu.Item key="21">Option 21</Menu.Item>*/}
                            {/*<Menu.Item key="22">Option 22</Menu.Item>*/}
                            {/*<Menu.Item key="23">Option 23</Menu.Item>*/}
                            {/*<Menu.Item key="24">Option 24</Menu.Item>*/}
                        </SubMenu>
                        <SubMenu key="sub9" title={<span><SettingOutlined/><span><NavLink  to = "/home/log">系统日志</NavLink></span></span>}>
                            {/*<Menu.Item key="25">Option 25</Menu.Item>*/}
                            {/*<Menu.Item key="26">Option 26</Menu.Item>*/}
                            {/*<Menu.Item key="27">Option 27</Menu.Item>*/}
                            {/*<Menu.Item key="28">Option 28</Menu.Item>*/}
                        </SubMenu>
                    </Menu>
                </Sider>
                <Layout>
                    <Header style={{ background: '#fff', padding: 0,marginBottom:10,height:60,borderBottom:'1px solid #F0F0F0'}} />
                    <Content style={{marginLeft:10,marginRight:10}}>
                        <div style={{ background: '#fff', minHeight: 700 }}>
                            <Outlet/>
                        </div>
                    </Content>
                </Layout>
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
}