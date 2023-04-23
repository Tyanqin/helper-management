import instance from './MyAxios'
import {ACCESS_ADDRESS} from '../conf/conf'
import qs from 'querystring'


/*
  login  reg
 */

export const userLogin =(params)=>(instance.post(`${ACCESS_ADDRESS}/user/login`,params))



//====================================监督细则=========================
export const distinctRuleName =(params)=>(instance.post(`${ACCESS_ADDRESS}/supervisionRules/distinctRuleName`))
export const page =(params)=>(instance.get(`${ACCESS_ADDRESS}/supervisionRules/pageHandel?${qs.stringify(params)}`))
export const proAll =()=>(instance.post(`${ACCESS_ADDRESS}/pro-sta/all`))
export const updateSubmit =(params)=>(instance.post(`${ACCESS_ADDRESS}/supervisionRules/upd`,params))
export const reqRuleGetId=(params)=>(instance.get(`${ACCESS_ADDRESS}/supervisionRules/${params}`))
export const reqInsertRule =(params)=>(instance.post(`${ACCESS_ADDRESS}/supervisionRules/add`,params))
export const reqRuleDelId=(params)=>(instance.get(`${ACCESS_ADDRESS}/supervisionRules/delByDetailId?${qs.stringify(params)}`))

export const ruleDownload =(params,config)=>(instance.get(`${ACCESS_ADDRESS}/supervisionRules/getDownloadTemplate?${qs.stringify(params)}`,config))
export const importRule =()=>(instance.get(`${ACCESS_ADDRESS}/supervisionRules/importRule`))




//==================================规章制度=======================
export const regPage =(params)=>(instance.get(`${ACCESS_ADDRESS}/reg/queryPage?${qs.stringify(params)}`))
export const distinctRegName =(params)=>(instance.post(`${ACCESS_ADDRESS}/rule-entry/distinctRegName`))
export const regGetId=(params)=>(instance.get(`${ACCESS_ADDRESS}/reg/${params}`))
export const regUpdateSubmit =(params)=>(instance.post(`${ACCESS_ADDRESS}/reg/updRuleReg`,params))
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
export const getContentById = (params)=>(instance.get(`${ACCESS_ADDRESS}/pro-content/findByContentId?${qs.stringify(params)}`))
export const getMenu = (params)=>(instance.get(`${ACCESS_ADDRESS}/pro-menu/getFirstMenu?${qs.stringify(params)}`))
export const getMenuByNameAndLevel = (params)=>(instance.get(`${ACCESS_ADDRESS}/pro-menu/getMenu?${qs.stringify(params)}`))
export const delImg = (params)=>(instance.get(`${ACCESS_ADDRESS}/pro-img/delImg?${qs.stringify(params)}`))
export const updImg =(params)=>(instance.post(`${ACCESS_ADDRESS}/pro-img/updImg`,params))
export const addImg =(params)=>(instance.post(`${ACCESS_ADDRESS}/pro-img/addImg`,params))
export const updImgDesc =(params)=>(instance.post(`${ACCESS_ADDRESS}/pro-img/upd`,params))


//==================================user========================================================================================
export const userGetPage =(params)=>(instance.get(`${ACCESS_ADDRESS}/user/queryPage?${qs.stringify(params)}`))
export const majorAll =()=>(instance.get(`${ACCESS_ADDRESS}/major/getDisName`))
export const userGetId =(params)=>(instance.get(`${ACCESS_ADDRESS}/user/getByUserId?${qs.stringify(params)}`))
export const userUpdateSubmit =(params)=>(instance.get(`${ACCESS_ADDRESS}/user/updateByUserId?${qs.stringify(params)}`))
export const userDeleteById =(params)=>(instance.get(`${ACCESS_ADDRESS}/user/delById?${qs.stringify(params)}`))
export const userInsert =(params)=>(instance.post(`${ACCESS_ADDRESS}/user/insertUser`,params))
export const updPassword =(params)=>(instance.get(`${ACCESS_ADDRESS}/user/updPassword?${qs.stringify(params)}`))


//==================================阶段========================================================================================
export const staGetName =()=>(instance.get(`${ACCESS_ADDRESS}/pro-sta/getStaName`))
//==================================电压========================================================================================
export const volGetName =()=>(instance.get(`${ACCESS_ADDRESS}/vol/getVolName`))

//==================================审批意见========================================================================================
export const opinionPage =(params)=>(instance.get(`${ACCESS_ADDRESS}/opinion/queryPage?${qs.stringify(params)}`))
export const opinionDel =(params)=>(instance.get(`${ACCESS_ADDRESS}/opinion/delByFormId?${qs.stringify(params)}`))
export const opinionDownload =(params,config)=>(instance.get(`${ACCESS_ADDRESS}/opinion/downloadFile?${qs.stringify(params)}`,config))


//==================================问题汇总========================================================================================
export const problemQueryPage =(params)=>(instance.get(`${ACCESS_ADDRESS}/problem/queryPage?${qs.stringify(params)}`))
export const problemFindById =(params)=>(instance.get(`${ACCESS_ADDRESS}/problem/findById?${qs.stringify(params)}`))
export const problemUpdById =(params)=>(instance.post(`${ACCESS_ADDRESS}/problem/updateById`,params))
export const problemDelById =(params)=>(instance.get(`${ACCESS_ADDRESS}/problem/updateByProblemId?${qs.stringify(params)}`))
export const problemUpdate =(params)=>(instance.post(`${ACCESS_ADDRESS}/problem/update`,params))
export const majorNames =()=>(instance.get(`${ACCESS_ADDRESS}/major/getDisName`))
export const proDownload =(params,config)=>(instance.get(`${ACCESS_ADDRESS}/problem/getDownloadTemplate?${qs.stringify(params)}`,config))
export const importProblem =()=>(instance.get(`${ACCESS_ADDRESS}/problem/importProblem`))
export const exportProblem =(params,config)=>(instance.get(`${ACCESS_ADDRESS}/problem/exportProblem?${qs.stringify(params)}`,config))


//==================================major========================================================================================
export const majorPage=(params)=>(instance.get(`${ACCESS_ADDRESS}/major/getPage?${qs.stringify(params)}`))
export const majorGetId=(params)=>(instance.get(`${ACCESS_ADDRESS}/major/${params}`))
export const majorUpd =(params)=>(instance.post(`${ACCESS_ADDRESS}/major/upd`,params))
export const majorInsert =(params)=>(instance.post(`${ACCESS_ADDRESS}/major/add`,params))
export const majorDel =(params)=>(instance.post(`${ACCESS_ADDRESS}/major/upd`,params))


//==================================oss========================================================================================
export const ossRemove=(params)=>(instance.get(`${ACCESS_ADDRESS}/oss/removeFile?${qs.stringify(params)}`))