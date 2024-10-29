import {signup} from "./utils/api-auth.js";
import {useEffect, useRef, useState} from "react";
import {API_BASE_URL} from "./utils/api-config.js";

export default function Register () {
    const [check,setCheck] =useState("")
    const [username, setUsername] = useState("")
    const passwordRef = useRef()
    const [roleReq,setRoleReq] = useState(false)
    const [mColor, setMColor] = useState()
    const [exec, setExec] = useState()
    useEffect(() => {

        if(exec) {
            fetch(`${API_BASE_URL}/checkout/${username}`)
                .then((response) => {
                    return response.json()
                })
                .then(data => {
                    if(data) {
                        setMColor("green")
                        setCheck("사용할 수 있는 username 입니다.")
                    }else  {
                        setMColor("red")
                        setCheck("존재하는 username 입니다.")
                    }
                })
                .catch((error) => {
                    console.log("register error",error)
                })

        }

    }, [exec]);

   /* if(isValid) {
        mColor = "green"
        setCheck("사용할 수 있는 username 입니다.")
    }else  {
        mColor="red"
        setCheck("존재하는 username 입니다.")
    }*/

    const handleSubmit = (e) => {
        const password = passwordRef.current.value

        console.log(username,password.roleReq)
        if(!username || !password) {
            alert("모두 입력해 주세요.!")
        }else if(mColor === "green") {
            signup({username:username,password:password})   //,roleReq:roleReq
        }else {
            alert("username 값을 다시 확인 해주세요.")
        }

    };

    const handleChange = (e) => {
        const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
        setUsername(e.target.value)
        if (!regex.test(e.target.value)) {
            setMColor("red")
            setCheck("이메일 형식이 아닙니다.")

        } else setExec(username)
    }

    return (
        <div className="booking-details" style={{width: "600px", margin: "auto"}}>
            <h2 style={{backgroundColor: "burlywood",color:"brown",marginTop: "20%"}}>Register </h2>
                <div className="booking-details-fields item-form"
                     style={{backgroundColor: "cornsilk", color: "dimgray"}}>
                    <label>사용하실 Username 또는 Email 을 입력하세요.</label>
                    <p>
                        <input
                            required
                            type="text"
                            name="username"
                            value={username}
                            autoComplete="off"
                            onChange={handleChange}
                            // defaultValue=""
                        />
                        <br/>
                        <span style={{color: mColor}}>{check}</span>
                    </p>
                    <label>비밀번호를 입력하세요.</label>
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
                    <p style={{marginTop: "16px"}}>
                        <input
                            type="checkbox"
                            id="roleRequest"
                            onChange={()=> setRoleReq(c => !c)}
                        /><span>업무 권한 요청하기</span>
                        <br/>
                        <span>업무 권한 요청은 1시간 이내에 처리됩니다.</span>
                    </p>
                </div>
            <p className="controls" style={{textAlign: "center"}}>
                <button
                    className="btn"
                    type="button"
                    onClick={handleSubmit}
                >
                    <span>Register</span>
                </button>
                <br/>
            </p>
</div>
)
}