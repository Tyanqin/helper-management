import React, {Component} from 'react';
import {NavLink,Outlet} from 'react-router-dom'
import {Layout, Menu,Modal} from 'antd';
import {ToolOutlined,SnippetsOutlined, EllipsisOutlined,FileSearchOutlined,UserOutlined,ApartmentOutlined,ReadOutlined,ExclamationCircleOutlined,MenuUnfoldOutlined,MenuFoldOutlined,HomeOutlined} from '@ant-design/icons';
import './index.css'
import Cache from '../../api/cache'
import Auth from '../../utils/auth'
import HomeDrawComponent from './DrawComponent'
const { Header, Content, Sider } = Layout;


export default class MenuComponent extends Component {
    state = {
        openKeys: ['sub1'],
        display:"none",
        close:false,
        flag:"1",
        height:750,
        defaultSelectedKeys:['1']
    };
    componentDidMount() {
        Auth()
        let bodyHeight = document.body.clientHeight
        this.setState({height:bodyHeight})

    }

    componentWillMount() {
        let path = window.location.pathname
        if(path != undefined){
            this.matchPath(path)
        }
    }





     getItem(label, key, icon, children, type) {
        return {
            key,
            icon,
            children,
            label,
            type,
        };
    }
    items = [
        // this.getItem(<NavLink key = {1} activeclassname="active" to = "/sta">首页</NavLink>, '1', <HomeOutlined />),
        this.getItem(<NavLink key = {1} activeclassname="active" to = "/user">用户管理</NavLink>, '1', <UserOutlined />),
        this.getItem(<NavLink key = {2} activeclassname="active" to = "/major">专业管理</NavLink>, '2', <ApartmentOutlined />),
        this.getItem(<NavLink key = {3} activeclassname="active" to = "/opinion">意见审批</NavLink>, '3', <SnippetsOutlined />),
        this.getItem(<NavLink key = {4} activeclassname="active" to = "/tec">标准工艺</NavLink>, '4', <ToolOutlined />),
        this.getItem(<NavLink key = {5} activeclassname="active" to = "/rule">监督细则</NavLink>, '5', <FileSearchOutlined />),
        this.getItem(<NavLink key = {6} activeclassname="active" to = "/reg">规章制度</NavLink>, '6', <ReadOutlined />),
        this.getItem(<NavLink key = {7} activeclassname="active" to = "/problem">问题汇总</NavLink>, '7', <ReadOutlined />)

    ]





    render() {
        let userName = Cache.localGet("userName")
        let loginName = Cache.localGet("loginName")
        let userMark = Cache.localGet("userMark")
        return (
            <Layout style ={{height:this.state.height}}>
                <Sider
                    breakpoint="lg" collapsedWidth="0" onBreakpoint={broken => {console.log(broken);}} onCollapse={(collapsed, type) => {console.log(collapsed, type);}}>
                    <div className = "title_box">全过程监督助手</div>
                    <Menu
                        style={{marginTop:30}}
                        theme="dark"
                        mode="inline"
                        openKeys = {this.state.openKeys}
                        items={this.items}
                        defaultOpenKeys={this.state.openKeys}
                        defaultSelectedKeys={this.state.defaultSelectedKeys}

                    />
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
                            </div>
                            <ul style={{display:this.state.display}}>
                                <li><a onClick = {this.handelOpen}>修改密码</a></li>
                                <li><a onClick = {this.handelExit}>注销</a></li>
                            </ul>
                        </div>
                    </Header>
                    <Content style={{marginLeft:10,marginRight:10}}>
                        <div style={{ background: '#fff', minHeight: 750 }}>
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


    matchPath=(params)=>{
        switch (params) {
            case "/user":
                this.setState({defaultSelectedKeys:['1'],openKeys: ['sub1']})
                break;
            case "/major":
                this.setState({defaultSelectedKeys:['2'],openKeys: ['sub2']})
                break;
            case "/opinion":
                this.setState({defaultSelectedKeys:['3'],openKeys: ['sub3']})
                break;
            case "/tec":
                this.setState({defaultSelectedKeys:['4'],openKeys: ['sub4']})
                break;
            case "/rule":
                this.setState({defaultSelectedKeys:['5'],openKeys: ['sub5']})
                break;
            case "/reg":
                this.setState({defaultSelectedKeys:['6'],openKeys: ['sub6']})
                break;
            case "/problem":
                this.setState({defaultSelectedKeys:['7'],openKeys: ['sub7']})
                break;
            default:
                this.setState({defaultSelectedKeys:['1'],openKeys: ['sub1']})
        }
    }
}