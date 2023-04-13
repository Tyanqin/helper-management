import {LOGIN,LOGIN_INFO} from '../../redux/action_types'

export const login =(value)=>({type:LOGIN,data:value})
export const loginInfo =(value)=>({type:LOGIN_INFO,data:value})