import {useContext, useEffect, useState} from "react";
import PageSpinner from "../UI/PageSpinner.jsx";
import UserContext from "./UserContext.js";
import useFetch from "../utils/useFetch.js";
import Spinner from "../UI/Spinner.jsx";

// 형제 컴포넌트 UserDetails 와 공유해야 합니다.
function UserList (){
    const {user, setUser} = useContext(UserContext)
    const {data:users=[],status, error} = useFetch("http://localhost:3001/users")

    useEffect(() => {
        setUser(users[0])
    }, [users,setUser]);
    //[] 의존값.없으면 컴포넌트 실행될 때 처음 1번만 useEffect 동작
    //[data] 의존값이 있으면 data 값이 변경될 때마다 useEffect 실행
    //useEffect 에서 다루는 변수와 함수를 포함시키도록 함.(

    //상태값 변수
    if (status === "error") {
        return <p>{error.message}</p>
    }

    if (status === "loading") {
        return <p><Spinner/> Loading bookables...</p>
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