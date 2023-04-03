import {Navigate} from 'react-router-dom'
import User from '../pages/User'
import Dept from '../pages/Dept'
import Login from '../pages/Login'
import Home from '../pages/Home'
import Rule from '../pages/Rule'
import Technology from '../pages/Technology'
import Regulation from '../pages/Regulation'
import PdfComponent from '../pages/Regulation/component/PdfComponent'

export default [
    {
        path:'/login',
        element:<Login/>,
    },
    {
        path:'/',
        element:<Navigate to = {<User/>}/>
    },
    {
        path:'/home',
        element:<Home/>,
        children:[
            {
                path:'user',
                element:<User/>
            },{
                path:'dept',
                element:<Dept/>
            },{
                path:'technology',
                element:<Technology/>
            },{
                path:'rule',
                element:<Rule/>
            },{
                path:'regulation',
                element:<Regulation/>,
                // children:[
                //     {
                //         path:'pdf/:id',
                //         element:<PdfComponent/>
                //     }
                // ]
            },

        ]
    },

]







// import React from 'react';
// import {Routes,Route,Navigate} from 'react-router-dom'
// import User from '../pages/User'
// import Dept from '../pages/Dept'
// import Login from '../pages/Login'
// import Technology from '../pages/Technology'
//
//
//
// export default function Routers(){
//       return(
//               <Routes>
//                   <Route exact path='/login' element={<Login/>} />
//                   <Route exact path='/home/user' element={<User/>} />
//                   <Route exact path='/home/dept' element={<Dept/>} />
//                   <Route exact path='/home/technology' element={<Technology/>} />
//                   {/*<Route path="*" element={<Navigate to="/login" />} />*/}
//                   {/*<Route exact path='/' element={<Home/>} >*/}
//
//                       {/*/!* url为/home时主动触发二级路由 *!/*/}
//                       {/*/!*<Route exact index element={<Main />} />*!/*/}
//
//                       {/*/!*<Route exact path='/home/user/auth' element={<Auth />} />*!/*/}
//                   {/*</Route>*/}
//
//               </Routes>
//       )
// }