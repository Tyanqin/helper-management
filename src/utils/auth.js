import Cache from "../api/cache";

export default function Auth(){
    let token = Cache.localGet("token");
    if(token === null || token.toString()=== ''){
        window.location.href = "/login"
    }
}

