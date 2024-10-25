import {API_BASE_URL} from "./api-config.js";

export function call(api, method, request){
    let headers = new Headers({
        "Content-Type": "application/json",
    })

    const accessToken = localStorage.getItem("ACCESS_TOKEN")
    if(accessToken){
        headers.append("Authorization","Bearer " + accessToken);
    }

    let options ={
        headers: headers,
        method: method,
    };

    if(request) {
        options.body = JSON.stringify(request);
    }
    const url = API_BASE_URL + api;
    return fetch(url, options).then((response) =>{
        if(response.status === 200){
            return response.json();
        }
        else if(response.status === 403){
            window.location.href="/signin";  //redirect
        }else {
            // Promise.reject(response).then(r => {return response;} )
            throw new Error(response)
        }
    }).catch(error =>{
        console.log('http error', error);
    })
}
export function signin(userDTO){
    //call 함수에서 fetch 실행합니다.
    return call('/signin','POST',userDTO)
        .then((response) => {
            // console.log("response:",response)
            // alert("로그인 토큰 : " + response.token)
            if(response && response.token){
                localStorage.setItem('ACCESS_TOKEN',response.token)
                localStorage.setItem('USERNAME',userDTO.username)
                window.location.href="/"
            }
            return response;
        }).catch((error) => {
            console.error("auth error :",error)
        })
}

export function signout(){
    alert("로그아웃 합니다.")
    localStorage.removeItem("ACCESS_TOKEN",null)
    localStorage.removeItem("USERNAME",null)
    window.location.href="/"
}

export function signup(userDTO){
    return call("/signup","POST",userDTO)
        .then((response)=>{
            window.location.href="/signin"
        });
}