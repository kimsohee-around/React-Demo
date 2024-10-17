import {useContext, useEffect, useState} from "react";
import Spinner from "../UI/Spinner.jsx";
import UserContext from "./UserContext.jsx";
import useFetch from "../utils/useFetch.js";
import {useQuery} from "react-query";
import loadData from "../utils/api.js";

export default function UserPicker(){
    // const [user, setUser] = useState(null)
    //        ㄴ ->UserContext 를 통해서 관리하는 것으로 변경.
    // user 상태값을 가져오기 위해 useContext 훅을 사용해야 합니다.
    const {user, setUser} = useContext(UserContext)
   // "http://localhost:3001/users"  , setUser(data[0])   //순서1) 초기값 0번으로 설정

    const {data:users=[],status,error} = useQuery(
        "users",
        ()=> loadData("http://localhost:8080/users")
    )
    console.log('status',status)

    useEffect(() => {
        if(users)
            setUser(users[0])
    }, [users]);

    if(status === "loading"){
        return <Spinner/>
    }


    function handleSelect(e){
        //문자열
        const selectedId = e.target.value
        //u.id 는 정수
        const selectedUser = users.find(u=> u.id === parseInt(selectedId,10))
        //선택된 객체를 users 에서 가져오기
        console.log('-Picker select-', selectedUser)
        // setUser(users[selectedId-1])
        setUser(selectedUser)
    }

    if (users === null){
        return <Spinner/>
    }

    return (
        /*순서2) value 가 users 배열 0번 객체로 설정
        *    선택을 바꾸는 이벤트는 handleSelect 처리
        * */
       users && ( <select
            className="user-picker"
            onChange={handleSelect} value={user?.id}>
            {users.map(u =>
                <option key={u.id} value={u.id}>{u.name}</option>
            )}
        </select>)
    );
}