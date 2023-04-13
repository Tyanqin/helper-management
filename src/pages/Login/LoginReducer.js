import {LOGIN,LOGIN_INFO} from '../../redux/action_types'
let initState = {}
export default function LoginReducer(preSate = initState,action){
    let{type,data} = action

    console.log("type=====>    ",type)
    console.log("data=====>    ",data)
    let newState = {}
    switch (type) {
        case LOGIN:
            newState = data
            return newState
        case LOGIN_INFO:
            newState = data
            return newState
        default:
            return preSate
    }
}