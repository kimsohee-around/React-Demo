import {useEffect, useState} from "react";
import PageSpinner from "../UI/PageSpinner.jsx";

function UserList (){
    const [users, setUsers] = useState(null)
    // fetch 중 오류 또는 로딩 중에 상태값
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(true)
    const [userIndex, setUserIndex] = useState(0)
    const user = users?.[userIndex]  //자바의 Optional 역할 연산자 ?.
    //users 가 null 이 아닐 때만 실행합니다.

    //api 서비스 제공하는 서버로부터 데이터 가져오기
    useEffect(() => {
        setLoading(true)
        fetch("http://localhost:3001/users")
            .then( response =>{
                return response.json()
            })
            .then(data => {
                console.log("data",data)
                setUsers(data)
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

    return(
        <>
            {users && (<ul className="users items-list-nav">
                {users.map((u, i) => (
                    <li key={u.id}
                        className={i === userIndex ? "selected" : null}>
                        <button className="btn btn-header"
                                onClick={() => setUserIndex(i)}>
                            {u.name}
                        </button>
                    </li>
                ))}
            </ul>)}
            {user && (<div className="item user">
                <div className="item-header">
                    <h2>{user.name}</h2>
                </div>
                <div className="user-details">
                    <h3>{user.title}</h3>
                    <p>{user.notes}</p>
                </div>
            </div>)}
        </>
    )
}

export default UserList