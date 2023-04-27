import React,{Suspense,lazy} from 'react'
import {Route, Routes, Navigate} from "react-router-dom"
import {message} from 'antd'
// import User from '../pages/User'
// import Major from '../pages/Major'
// import Login from '../pages/Login'
// import Home from '../pages/Home'
// import Rule from '../pages/Rule'
// import Technology from '../pages/Technology'
// import Regulation from '../pages/Regulation'
// import Opinion from '../pages/Opinion'
// import Statistic from '../pages/Statistic'
// import Problem from '../pages/Problem'


const Problem = lazy(() => import('../pages/Problem'));
const Login = lazy(() => import('../pages/Login'));
const User = lazy(() => import('../pages/User'));
const Major = lazy(() => import('../pages/Major'));
const Home= lazy(()=>import('../pages/Home'))
const Rule = lazy(() => import('../pages/Rule'));
const Technology = lazy(() => import('../pages/Technology'));
const Regulation = lazy(() => import('../pages/Regulation'));
const Opinion = lazy(() => import('../pages/Opinion'));
const Statistic = lazy(()=>import('../pages/Statistic'))
// import PdfComponent from '../pages/Regulation/component/PdfComponent'



// export default [
//     {
//         path:'/login',
//         element:<Login/>,
//     },{
//         path:'/',
//         element:<Navigate to = {<Login/>}/>
//     },{
//         path:'',
//         element:<Navigate to = {<Login/>}/>
//     },{
//         path:'*',
//         element:<Navigate to = {<Login/>}/>
//     },
//     {
//         path:'/',
//         element:<Home/>,
//         children:[
//             {
//                 path:'user',
//                 element:<User/>
//             },
//             // {
            //     path:'stat',
            //     element:<Statistic/>
            // },{
            //     path:'major',
            //     element:<Major/>
            // },{
            //     path:'opinion',
            //     element:<Opinion/>
            // },{
            //     path:'tec',
            //     element:<Technology/>
            // },{
            //     path:'rule',
            //     element:<Rule/>
            // },{
            //     path:'reg',
            //     element:<Regulation/>,
            //     // children:[
            //     //     {
            //     //         path:'pdf/:id',
            //     //         element:<PdfComponent/>
            //     //     }
            //     // ]
            // },{
            //     path:'problem',
            //     element:<Problem/>
            // }

//         ]
//     },
//
// ]
// {message.loading("加载中...")}
export const Routers=()=>{
      return(
          <>
              <Suspense fallback = {<div>loading...</div>}>
                  <Routes>
                      <Route  path='/login' element={<Login/>} />
                      <Route  path='/' element={<Home/>} >
                          <Route  path='/user' element={<User/>} />
                          <Route  path='/major' element={<Major/>} />
                          <Route  path='/tec' element={<Technology/>} />
                          <Route  path='/rule' element={<Rule/>} />
                          <Route  path='/reg' element={<Regulation/>} />
                          <Route  path='/opinion' element={<Opinion/>} />
                          <Route  path='/Problem' element={<Problem/>} />
                          <Route  path='/sta' element={<Statistic/>} />
                          <Route path="*" element={<Navigate to="/login" />} />
                          <Route path="/" element={<Navigate to="/login" />} />
                      </Route>
                  </Routes>
              </Suspense>
           </>
      )
}

