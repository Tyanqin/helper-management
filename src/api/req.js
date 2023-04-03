import instance from './MyAxios'
import {ACCESS_ADDRESS} from '../conf/conf'
import qs from 'querystring'


//====================================监督细则=========================
export const distinctRuleName =(params)=>(instance.post(`${ACCESS_ADDRESS}/supervisionRules/distinctRuleName`))
export const page =(params)=>(instance.get(`${ACCESS_ADDRESS}/supervisionRules/pageHandel?${qs.stringify(params)}`))
export const proAll =(params)=>(instance.post(`${ACCESS_ADDRESS}/pro/all`))
export const updateSubmit =(params)=>(instance.post(`${ACCESS_ADDRESS}/supervisionRules/upd`,params))
export const reqRuleGetId=(params)=>(instance.get(`${ACCESS_ADDRESS}/supervisionRules/${params}`))
export const reqInsertRule =(params)=>(instance.post(`${ACCESS_ADDRESS}/supervisionRules/add`,params))
export const reqRuleDelId=(params)=>(instance.get(`${ACCESS_ADDRESS}/supervisionRules/delByDetailId?${qs.stringify(params)}`))




//==================================规章制度=======================
export const regPage =(params)=>(instance.get(`${ACCESS_ADDRESS}/reg/queryPage?${qs.stringify(params)}`))
export const distinctRegName =(params)=>(instance.post(`${ACCESS_ADDRESS}/reg/distinctRegName`))
export const regGetId=(params)=>(instance.get(`${ACCESS_ADDRESS}/reg/${params}`))
export const regUpdateSubmit =(params)=>(instance.post(`${ACCESS_ADDRESS}/reg/upd`,params))
export const regUploadSubmit =(params)=>(instance.post(`${ACCESS_ADDRESS}/reg/upload`,params))
export const regUpLoad = (params)=>(instance.post(`${ACCESS_ADDRESS}/reg/upload`,params))
export const regDeleteById=(params)=>(instance.get(`${ACCESS_ADDRESS}/reg/delByRuRegId?${qs.stringify(params)}`))
export const regDownload = (params,config)=>(instance.get(`${ACCESS_ADDRESS}/reg/download?${qs.stringify(params)}`,config))



//==================================login=======================================================================================
export const checkUserName =(params)=>(instance.post(`${ACCESS_ADDRESS}/user/selectOne`,params))
export const reqLogin =(params)=>(instance.post(`${ACCESS_ADDRESS}/user/login`,params))

//==================================menu========================================================================================
export const reqRootMenu =(params)=>(instance.get(`${ACCESS_ADDRESS}/menu/getRootMenu?${qs.stringify(params)}`))
export const reqMenu =(params)=>(instance.get(`${ACCESS_ADDRESS}/menu/getMenu?${qs.stringify(params)}`))

//==================================user========================================================================================
export const reqUserAll=()=>(instance.get(`${ACCESS_ADDRESS}/user/all`))


export const reqUserPage=(params)=>(instance.get(`${ACCESS_ADDRESS}/user/limit?${qs.stringify(params)}`))
export const reqUserDeleteById=(params)=>(instance.get(`${ACCESS_ADDRESS}/user/delete/?${qs.stringify(params)}`))
export const reqSelectUserDetails=(params)=>(instance.get(`${ACCESS_ADDRESS}/user/details/?${qs.stringify(params)}`))
export const reqUpdUser =(params)=>(instance.post(`${ACCESS_ADDRESS}/user/updUser`,params))
export const reqInsertUser =(params)=>(instance.post(`${ACCESS_ADDRESS}/user/insetUser`,params))

//==================================dept========================================================================================
export const reqDeptPage=(params)=>(instance.get(`${ACCESS_ADDRESS}/dept/limit?${qs.stringify(params)}`))
export const reqDeptGetId=(params)=>(instance.get(`${ACCESS_ADDRESS}/dept/${params}`))
export const reqUpdDept =(params)=>(instance.post(`${ACCESS_ADDRESS}/dept/upd`,params))
export const reqInsertDept =(params)=>(instance.post(`${ACCESS_ADDRESS}/dept`,params))
export const reqDeleteDept =(params)=>(instance.delete(`${ACCESS_ADDRESS}/dept/${params}`))
export const reqDeptGetAll=(params)=>(instance.get(`${ACCESS_ADDRESS}/dept/all`))

//==================================per========================================================================================
export const reqPerPage=(params)=>(instance.get(`${ACCESS_ADDRESS}/perm/limit?${qs.stringify(params)}`))  //分页
export const reqPerGetId=(params)=>(instance.get(`${ACCESS_ADDRESS}/perm/${params}`))                     //详情
export const reqUpdPer =(params)=>(instance.post(`${ACCESS_ADDRESS}/perm/upd`,params))                    //修改
export const reqInsertPer =(params)=>(instance.post(`${ACCESS_ADDRESS}/perm`,params))                     //添加
export const reqDeletePer =(params)=>(instance.delete(`${ACCESS_ADDRESS}/perm/${params}`))                //删除
export const reqPerGetAll=()=>(instance.get(`${ACCESS_ADDRESS}/perm/all`))

//==================================DS========================================================================================
export const reqDsPage=(params)=>(instance.get(`${ACCESS_ADDRESS}/mapper/limit?${qs.stringify(params)}`))    //分页
export const reqDsGetId=(params)=>(instance.get(`${ACCESS_ADDRESS}/mapper/getById/${params}`))                     //详情
export const reqDsById=(params)=>(instance.get(`${ACCESS_ADDRESS}/ds/getById/${params}`))                     //详情
export const reqMapperUpd =(params)=>(instance.post(`${ACCESS_ADDRESS}/mapper/updateByAuditStatus`,params))                    //修改
// export const reqInsertPer =(params)=>(instance.post(`${ACCESS_ADDRESS}/perm`,params))                     //添加
export const reqDelDataSource =(params)=>(instance.get(`${ACCESS_ADDRESS}/mapper/delete?${qs.stringify(params)}`))                //删除
export const reqCheckDataSource =(params)=>(instance.get(`${ACCESS_ADDRESS}/mapper/postCheck?${qs.stringify(params)}`))                //删除

//==================================fixedRole===================================================================================
// export const getUserSource=(params)=>(instance.get(`${ACCESS_ADDRESS}/metadata/page?${qs.stringify(params)}`))

