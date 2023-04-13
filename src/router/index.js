import React from 'react'
import {Navigate} from 'react-router-dom'
import User from '../pages/User'
import Major from '../pages/Major'
import Login from '../pages/Login'
import Home from '../pages/Home'
import Rule from '../pages/Rule'
import Technology from '../pages/Technology'
import Regulation from '../pages/Regulation'
import Opinion from '../pages/Opinion'
// import {Routes,Route} from 'react-router-dom'
// const User = lazy(() => import('../pages/User'));
// const Major = lazy(() => import('../pages/Major'));
// const Rule = lazy(() => import('../pages/Rule'));
// const Technology = lazy(() => import('../pages/Technology'));
// const Regulation = lazy(() => import('../pages/Regulation'));
// const Opinion = lazy(() => import('../pages/Opinion'));
// import PdfComponent from '../pages/Regulation/component/PdfComponent'


export default [
    {
        path:'/login',
        element:<Login/>,
    },
    {
        path:'/',
        element:<Navigate to = {<Login/>}/>
    },
    {
        path:'/',
        element:<Home/>,
        children:[
            {
                path:'user',
                element:<User/>
            },{
                path:'major',
                element:<Major/>
            },{
                path:'opinion',
                element:<Opinion/>
            },{
                path:'tec',
                element:<Technology/>
            },{
                path:'rule',
                element:<Rule/>
            },{
                path:'reg',
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
// import User from '../pages/User'
// import Dept from '../pages/Dept'
// import Login from '../pages/Login'
// import Technology from '../pages/Technology'
//
//
//
// export default function Routers(){
//       return(
//           <Suspense fallback={<p> Loading...</p>}>
//               <Routes>
//                   <Route exact path='/login' element={<Login/>} />
//                   <Route exact path='/user' element={<User/>} />
//                   <Route exact path='/dept' element={<Dept/>} />
//                   <Route exact path='/tec' element={<Technology/>} />
//                   <Route exact path='/rule' element={<Technology/>} />
//                   <Route exact path='/reg' element={<Technology/>} />
//                   <Route exact path='/opinion' element={<Technology/>} />
//                   {/*<Route path="*" element={<Navigate to="/login" />} />*/}
//                   {/*<Route exact path='/' element={<Home/>} >*/}
//                       {/*/!* url为/home时主动触发二级路由 *!/*/}
//                       {/*/!*<Route exact index element={<Main />} />*!/*/}
//                       {/*/!*<Route exact path='/home/user/auth' element={<Auth />} />*!/*/}
//                   {/*</Route>*/}
//
//               </Routes>
//           </Suspense>
//       )
// }