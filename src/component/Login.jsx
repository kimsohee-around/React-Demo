import {Link} from "react-router-dom";
import {signin} from "./utils/api-auth.js";
import {useEffect, useRef, useState} from "react";

export default function Login () {
    const [error,setError] =useState("")
    const usernameRef = useRef()
    const passwordRef = useRef()

    const handleSubmit = () => {
        // const data = new FormData(e.target)
        //input 에 저장된 데이터를 가져오고 form data에 저장하기
        const username = usernameRef.current.value
        const password = passwordRef.current.value
        console.log(username,password)
        if(!username || !password) {
            setError("모두 입력해 주세요.!")
        }else{
            signin({username: username, password: password})
                .then(resp => resp.error && setError(resp.error) )
        }
        // 오브젝트 형식으로 바꿔줌.

    };

    return  (
        <div className="booking-details" style={{width: "300px", margin: "auto"}}>
            <div style={{textAlign: "center", marginTop: "10%"}}>
                <img src="/react.svg" alt="react logo" width="50"/>
                <span style={{fontSize: "2rem", color: "gray"}}>+</span>
                <img src="/vite.svg" alt="vite logo" width="50"/>
            </div>
            <h2 style={{backgroundColor: "burlywood",color:"brown"}}>Sign in </h2>
                <div className="booking-details-fields item-form"
                     style={{backgroundColor: "cornsilk", color: "dimgray"}}>
                    <p style={{color: "tomato"}}>
                        {error}
                    </p>
                    <label>Username or Email address</label>
                    <p>
                        <input
                            required
                            type="text"
                            name="username"
                            autoComplete="username"
                            ref={usernameRef}
                            // defaultValue=""
                        />
                    </p>
                    <label>Password</label>
                    <p>
                        <input
                            required
                            type="password"
                            name="password"
                            autoComplete="current-password"
                            ref={passwordRef}
                            // defaultValue=""
                        />
                    </p>
                </div>
            <p className="controls" style={{textAlign: "center"}}>
                <button
                    className="btn"
                    type="button"
                    onClick={handleSubmit}
                >
                    <span>Sign in</span>
                </button>
                <br/>
                <Link to="/signup">
                    <span>회원 등록</span>
                </Link>
                <span>이 필요하신가요?</span>
            </p>
</div>
)
}