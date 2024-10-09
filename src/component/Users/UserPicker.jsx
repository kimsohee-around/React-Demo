import {useContext, useEffect, useState} from "react";
import Spinner from "../UI/Spinner.jsx";
import UserContext from "./UserContext.js";
import useFetch from "../utils/useFetch.js";

export default function UserPicker(){
    const {user, setUser} = useContext(UserContext)
    const {data:users=[], status, error} = useFetch("http://localhost:3001/users")

    console.log('UserPicker user',user)
    useEffect(() => {
        setUser(users[0])
    }, [users,setUser]);

    console.log('UserPicker users',users)

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
        <select
            className="user-picker"
            onChange={handleSelect} value={user?.id}>   
            {users.map(u =>
                <option key={u.id} value={u.id}>{u.name}</option>
            )}
        </select>
    );
}