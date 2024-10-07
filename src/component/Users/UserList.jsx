import {useContext, useEffect, useState} from "react";
import PageSpinner from "../UI/PageSpinner.jsx";
import UserContext from "./UserContext.js";

// 형제 컴포넌트 UserDetails 와 공유해야 합니다.
function UserList (){
    const [users, setUsers] = useState(null)    //순서4) fetch 결과 상태값 저장
    // fetch 중 오류 또는 로딩 중에 상태값
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(true)

    //user 상태값을 UserContext 에서 가져옵니다.
    const {user, setUser} = useContext(UserContext)
    //api 서비스 제공하는 서버로부터 데이터 가져오기
    useEffect(() => {
        setLoading(true)
        fetch("http://localhost:3001/users")  // 순서1)
            .then( response =>{
                return response.json()
            })
            .then(data => {                     // 순서2) users 배열이 data로 저장
                console.log("data",data)
                setUsers(data)                  // 순서3) 상태 users 변경
                setLoading(false)
            })
            .catch((error) => setError(error.message))
    }, []);
    //[] 의존값.없으면 컴포넌트 실행될 때 처음 1번만 useEffect 동작
    //[data] 의존값이 있으면 data 값이 변경될 때마다 useEffect 실행
    //상태값 변수
    if(error) {
        return <div>오류 : {error}</div>
    }

  if(loading) {
        return (
                <PageSpinner/>
        )
    }

  //순서 6) users, user 상태값으로 UI를 만듭니다.
    return(
        <>
            {users && (<ul className="users items-list-nav">
                {users.map((u) => (
                    <li key={u.id}
                        className={u.id === user?.id ? "selected" : null}>
                        <button className="btn btn-header"
                                onClick={() => setUser(u)}>
                            {u.name}
                        </button>
                    </li>
                ))}
            </ul>)}
            {/* UserDetails 로 컴포넌트 분리합니다.*/}
       {/*     {user && (<div className="item user">
                <div className="item-header">
                    <h2>{user.name}</h2>
                </div>
                <div className="user-details">
                    <h3>{user.title}</h3>
                    <p>{user.notes}</p>
                </div>
            </div>)}*/}
        </>
    )
}

export default UserList