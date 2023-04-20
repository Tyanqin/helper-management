/**
 * 添加一个元素
 * @constructor
 */
export const AddInput=(fun)=>{

    let div = document.createElement("div")
    div.className = "div_flag"
    div.style.marginBottom = "50px"

    let input = document.createElement("input")
    input.className = "input_flag"
    input.placeholder = "请输入图片描述信息"

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




















/**
 * 添加一个元素
 * @constructor
 */
export const AddInputImg=(fun)=>{

    let div = document.createElement("div")
    div.className = "img_div_flag"

    let input = document.createElement("input")
    input.className = "img_input_flag"
    input.placeholder = "请输入图片描述信息"
    input.style.marginTop = "3px"

    let span = document.createElement("span")
    span.className = "input_flag_span"
    span.innerHTML = "描述:"

    let e = document.getElementById("img_add_desc");
    div.appendChild(span)
    div.appendChild(input)
    e.appendChild(div)

    let elements = document.getElementsByClassName("img_input_flag")
    let length = elements.length
    for (let i = 0; i < length; i++) {
        elements[i].onchange =(e)=>fun(e)
    }
}

/**
 * 删除一个元素
 * @constructor
 */
export const RemoveInputImg=()=>{
    let e = document.getElementById("img_add_desc");
    let elements = document.getElementsByClassName("img_div_flag")
    e.removeChild(elements[elements.length-1])
}

/**
 * 删除全部元素
 * @constructor
 */
export const RemoveAllImg=()=>{
    let e = document.getElementById("img_add_desc");
    if(GetChildLength > 0){
        e.innerHTML = ""
    }

}

/**
 * 获取元素数量
 * @returns {number}
 * @constructor
 */
export const GetChildLengthImg=()=>{
    let elements = document.getElementsByClassName("img_div_flag")
    return elements.length
}


/**
 * 判断元素是值是否为null
 * @returns {boolean}
 * @constructor
 */
export const IsHaveValueImg=()=>{
    let elements = document.getElementsByClassName("img_input_flag")
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