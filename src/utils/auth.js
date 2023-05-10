import Cache from "../api/cache";
import {getToken,test} from '../api/req'


export default function Auth(){
    let uId = Cache.localGet("uId");
    getToken(uId).then(res=>{
        if(res.status){
            if(res.data === null){
                // window.location.href = "/login"
            }
        }
    }).catch(err=>{
        console.log("result.data====>>>>  "+err)
    })

}

