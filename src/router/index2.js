import {Navigate,useRoutes} from 'react-router-dom'
import User from '../pages/User'
import Major from '../pages/Major'
import Login from '../pages/Login'
import Home from '../pages/Home'
import Technology from '../pages/Technology'


export default useRoutes([
    {
        path:'/login',
        element:<Login/>,
    },
    {
        path:'/home',
        element:<Home/>,
        children:[
            {
                path:'user',
                element:<User/>
            },
            {
                path:'major',
                element:<Major/>
            },
            {
                path:'technology',
                element:<Technology/>
            },
            {
                path:'/',
                element:<Navigate to={<Home/>}/>
            }
        ]
    },
])


// export const routes = [
//     {
//         path: '/',
//         element: <Layout />,
//         children: [
//             {
//                 path: 'home',
//                 meta: {
//                     title: '首页',
//                     icon: <DashboardOutlined />,
//                 },
//                 children: [
//                     {
//                         path: 'application',
//                         element: <Application />,
//                         meta: {
//                             title: '应用',
//                         }
//                     }
//                 ]
//             },
//             {
//                 path: 'setting',
//                 element: <Setting />,
//                 meta: {
//                     title: '设置',
//                     icon: <UserOutlined />,   //图表名称
//                 }
//             }
//         ]
//     },
//     {
//         path: '/login',
//         element: <Login />,
//         meta: {
//             title: '登录',
//             noLogin: true,
//             hideMenu: true
//         }
//     },
//     {
//         path: '*',
//         element: <Page404 />,
//         meta: {
//             title: '404',
//             noLogin: true,
//             hideMenu: true
//         }
//     },
// ];
// const Routes = () => (
//     useRoutes(routes)
// )

//
// const onRouteBefore = ({ pathname, meta }) => {
//     // 动态修改页面title
//     if (meta.title !== undefined) {
//         document.title = meta.title
//     }
//     // 判断未登录跳转登录页
//     if (!meta.noLogin) {
//         if (!isLogin) {
//             return '/login'
//         }
//     }
// }
