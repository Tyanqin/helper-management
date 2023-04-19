/**
 * 添加一个元素
 * @constructor
 */
export const AddInput=(fun)=>{

    let div = document.createElement("div")
    div.className = "div_flag"

    let input = document.createElement("input")
    input.className = "input_flag"
    input.placeholder = "请输入图片描述信息"
    input.style.marginTop = "3px"

    let span = document.createElement("span")
    span.className = "input_flag_span"
    span.innerHTML = "描述:"

    let e = document.getElementById("imageDesc");
    div.appendChild(span)
    div.appendChild(input)
    e.appendChild(div)

    let elements = document.getElementsByClassName("input_flag")
    let length = elements.length
    for (let i = 0; i < length; i++) {
        elements[i].onchange =(e)=>fun(e)
    }
}

/**
 * 删除一个元素
 * @constructor
 */
export const RemoveInput=()=>{
    let e = document.getElementById("imageDesc");
    let elements = document.getElementsByClassName("div_flag")
    e.removeChild(elements[elements.length-1])
}

/**
 * 删除全部元素
 * @constructor
 */
export const RemoveAll=()=>{
    let e = document.getElementById("imageDesc");
    if(GetChildLength > 0){
        e.innerHTML = ""
    }

}

/**
 * 获取元素数量
 * @returns {number}
 * @constructor
 */
export const GetChildLength=()=>{
    let elements = document.getElementsByClassName("div_flag")
    return elements.length
}


/**
 * 判断元素是值是否为null
 * @returns {boolean}
 * @constructor
 */
export const IsHaveValue=()=>{
    let elements = document.getElementsByClassName("input_flag")
    let length = elements.length
    for (let i = 0; i < length; i++) {
        let value = elements[i].value
       if(value ==null || value == "" || value == undefined){
           return true
       }else{
           return false
       }
    }
}





















































