import {useContext, useEffect, useState} from "react";
import Spinner from "../UI/Spinner.jsx";

export default function UserPicker(){
    const [users, setUsers] = useState(null)    //users 는 배열
    const [user, setUser] = useState(null)
    useEffect(() => {
        fetch("http://localhost:3001/users")
            .then(resp=> resp.json())
            .then(
                data => {
                    setUsers(data)
                    setUser(data[0])
                }
            )
    }, [setUser]);

    console.log('UserPicker users',users)

    function handleSelect(e){
        const selectedId = e.target.value
        const selectedUser = users.find(u=> u.id === selectedId)
        //선택된 객체를 users 에서 가져오기
        console.log('-Picker select-', selectedUser)
        // setUser(users[selectedId-1])
        setUser(selectedUser)
    }

    if (users === null){
        return <Spinner/>
    }

    return (
        <select
            className="user-picker"
            onChange={handleSelect} value={user?.id}>
            {users.map(u =>
                <option key={u.id} value={u.id}>{u.name}</option>
            )}
        </select>
    );
}