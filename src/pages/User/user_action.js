import {USER,USER_INFO} from '../../redux/action_types'

export const user =(value)=>({type:USER,data:value})
export const userInfo =(value)=>({type:USER_INFO,data:value})