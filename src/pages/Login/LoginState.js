export default class LoginState{

    constructor(uId,userName,loginName,majorName,userMark,token) {
        this.uId = uId
        this.userName = userName
        this.loginName = loginName
        this.majorName = majorName
        this.userMark = userMark
        this.token = token
    }


    getUId() {
        return this.uId
    }

    setUId(value) {
        this.uId = value
        return this
    }

    getUserName() {
        return this.userName

    }

    setUserName(value) {
        this.userName = value
        return this
    }

    getLoginName() {
        return this.loginName
    }

    setLoginName(value) {
        this.loginName = value
        return this
    }

    getMajorName() {
        return this.majorName
    }

    setMajorName(value) {
        this.majorName = value
        return this
    }

    getUserMark() {
        return this.userMark
    }

    setUserMark(value) {
        this.userMark = value
        return this
    }

    getToken(){
        return this.token
    }

    setToken(value){
        this.token = value
        return this
    }

}