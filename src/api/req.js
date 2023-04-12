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
export const regAdd=(params)=>(instance.post(`${ACCESS_ADDRESS}/reg/regAdd`,params))
export const regDeleteById=(params)=>(instance.get(`${ACCESS_ADDRESS}/reg/delByRuRegId?${qs.stringify(params)}`))
export const regDownload = (params,config)=>(instance.get(`${ACCESS_ADDRESS}/reg/download?${qs.stringify(params)}`,config))

//=================================标准工艺======================technologyPage
export const technologyPage =(params)=>(instance.get(`${ACCESS_ADDRESS}/pro-menu/getTitle?${qs.stringify(params)}`))
export const proGetId=(params)=>(instance.get(`${ACCESS_ADDRESS}/pro-content/${params}`))
export const proMenuGetId=(params)=>(instance.get(`${ACCESS_ADDRESS}/pro-menu/${params}`))
export const disProName =(params)=>(instance.get(`${ACCESS_ADDRESS}/pro-menu/disProName?${qs.stringify(params)}`))
export const proUpdateSubmit =(params)=>(instance.post(`${ACCESS_ADDRESS}/pro-menu/updByProContentId`,params))
export const proAdd = (params)=>(instance.post(`${ACCESS_ADDRESS}/pro-menu/addPro`,params))
export const proDeleteById = (params)=>(instance.get(`${ACCESS_ADDRESS}/pro-menu/delById?${qs.stringify(params)}`))
export const proGetMaxCode= (params)=>(instance.get(`${ACCESS_ADDRESS}/pro-menu/getMaxCode?${qs.stringify(params)}`))

//==================================user========================================================================================
export const userGetPage =(params)=>(instance.get(`${ACCESS_ADDRESS}/user/queryPage?${qs.stringify(params)}`))
export const majorAll =()=>(instance.post(`${ACCESS_ADDRESS}/major/all`))
export const userGetId =(params)=>(instance.get(`${ACCESS_ADDRESS}/user/getByUserId?${qs.stringify(params)}`))
export const userUpdateSubmit =(params)=>(instance.get(`${ACCESS_ADDRESS}/user/updateByUserId?${qs.stringify(params)}`))
export const userDeleteById =(params)=>(instance.get(`${ACCESS_ADDRESS}/user/delById?${qs.stringify(params)}`))
export const userInsert =(params)=>(instance.post(`${ACCESS_ADDRESS}/user/insertUser`,params))


//==================================major========================================================================================
export const majorPage=(params)=>(instance.get(`${ACCESS_ADDRESS}/major/getPage?${qs.stringify(params)}`))
export const majorGetId=(params)=>(instance.get(`${ACCESS_ADDRESS}/major/${params}`))
export const majorUpd =(params)=>(instance.post(`${ACCESS_ADDRESS}/major/upd`,params))
export const majorInsert =(params)=>(instance.post(`${ACCESS_ADDRESS}/major/add`,params))
export const majorDel =(params)=>(instance.post(`${ACCESS_ADDRESS}/major/upd`,params))







//==================================per========================================================================================
export const reqPerPage=(params)=>(instance.get(`${ACCESS_ADDRESS}/perm/limit?${qs.stringify(params)}`))  //分页
export const reqPerGetId=(params)=>(instance.get(`${ACCESS_ADDRESS}/perm/${params}`))                     //详情
export const reqUpdPer =(params)=>(instance.post(`${ACCESS_ADDRESS}/perm/upd`,params))                    //修改
export const reqInsertPer =(params)=>(instance.post(`${ACCESS_ADDRESS}/perm`,params))                     //添加
export const reqDeletePer =(params)=>(instance.delete(`${ACCESS_ADDRESS}/perm/${params}`))                //删除
export const reqPerGetAll=()=>(instance.get(`${ACCESS_ADDRESS}/perm/all`))

//==================================DS========================================================================================
// export const reqDsPage=(params)=>(instance.get(`${ACCESS_ADDRESS}/mapper/limit?${qs.stringify(params)}`))    //分页
// export const reqDsGetId=(params)=>(instance.get(`${ACCESS_ADDRESS}/mapper/getById/${params}`))                     //详情
// export const reqDsById=(params)=>(instance.get(`${ACCESS_ADDRESS}/ds/getById/${params}`))                     //详情
// export const reqMapperUpd =(params)=>(instance.post(`${ACCESS_ADDRESS}/mapper/updateByAuditStatus`,params))                    //修改
// // export const reqInsertPer =(params)=>(instance.post(`${ACCESS_ADDRESS}/perm`,params))                     //添加
// export const reqDelDataSource =(params)=>(instance.get(`${ACCESS_ADDRESS}/mapper/delete?${qs.stringify(params)}`))                //删除
// export const reqCheckDataSource =(params)=>(instance.get(`${ACCESS_ADDRESS}/mapper/postCheck?${qs.stringify(params)}`))
//==================================fixedRole===================================================================================
// export const getUserSource=(params)=>(instance.get(`${ACCESS_ADDRESS}/metadata/page?${qs.stringify(params)}`))                                                                                                                                                                                                                                                                                                                                                                                               