import LoginReducer from '../../pages/Login/LoginReducer'
import UserReducer from '../../pages/User/UserReducer'

import {combineReducers} from 'redux'

export default combineReducers({
    login:LoginReducer,      //登录
    user:UserReducer,        //用户
})