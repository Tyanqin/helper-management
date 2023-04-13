import {USER,USER_INFO} from '../../redux/action_types'
let initState = {}
export default function LoginReducer(preSate = initState,action){
    let{type,data} = action

    console.log("type=====>    ",type)
    console.log("data=====>    ",data)
    let newState = {}
    switch (type) {
        case USER:
            newState = data
            return newState
        case USER_INFO:
            newState = data
            return newState
        default:
            return preSate
    }
}