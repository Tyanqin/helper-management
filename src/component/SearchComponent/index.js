import  './index.css'


/**
 * input输入
 * @param props
 * @returns {*}
 * @constructor
 */
export const InputComponent =(props)=>{
    let element =  document.getElementById(props.id);
    if(element !== null){
        element.onchange =(e)=> props.onChange(e)
    }
    return(
        <>
            <span class = "search_span">{props.title}</span>
            <input
                id = {props.id}
                type={props.type}
                placeholder = {props.placeholder}
                style = {props.style}
                class = "search"
                ref = {props.ref}
            />
        </>
    )
}

/**
 * select下拉
 * @param props
 * @returns {*}
 * @constructor
 */
export const SelectComponent =(props)=>{
    let element =  document.getElementById(props.id);
    if(element !== null){
        element.onchange =(e)=>props.onChange(e)
    }
    return(
        <>
            <span class = "search_span">{props.title}</span>
            <span style = {{display:"inline-block",height:5}}></span>
            <select class = "search" id = {props.id} style = {props.style} ref = {props.ref}>
                <option class = "option" style = {{ fontWeight:"bold",padding:10,display:"block"}} value="">全部</option>
                {
                    props.data==""||props.data==undefined?"":props.data.map((item)=>{
                        return (
                            <option class = "option" value={item[props.attr]}>{item[props.attr]}</option>
                        )
                    })
                }
            </select>
        </>
    )
}


export const SelectAttrComponent =(props)=>{
    let element =  document.getElementById(props.id);
    if(element !== null){
        element.onchange =(e)=>props.onChange(e)
    }
    return(
        <>
            <span class = "search_span">{props.title}</span>
            <span style = {{display:"inline-block",height:5}}></span>
            <select key = {props.key} class = "search" id ={props.id} style = {props.style}>
                <option class = "option" style = {{ fontWeight:"bold",padding:10,display:"block"}} value="">全部</option>
                {
                    props.data==""||props.data==undefined?"":props.data.map((item)=>{
                        return (
                            <option class = "option" value={item}>{item}</option>
                        )
                    })
                }
            </select>
        </>
    )
}


export const SelectConstantComponent =(props)=>{
    let element =  document.getElementById(props.id);
    if(element !== null){
        element.onchange =(e)=>props.onChange(e)
    }
    return(
        <>
            <span class = "search_span">{props.title}</span>
            <span style = {{display:"inline-block",height:5}}></span>
            <select key = {props.key} class = "search" id ={props.id} style = {props.style}>
                <option class = "option" style = {{ fontWeight:"bold",padding:10,display:"block"}} value="">全部</option>
                <option class="option" style={{ padding: 10, display: "block"}} value="1">完成</option>
                <option class="option" style={{ padding: 10, display: "block"}} value="0">未完成</option>
            </select>
        </>
    )
}


export const ReSet=()=>{
    let element =  document.getElementsByClassName("search");
    let length = element.length
    for (let i = 0; i < length; i++) {
        element[i].value = ""
    }
}
