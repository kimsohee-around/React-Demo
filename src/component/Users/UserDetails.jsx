import {useContext, useEffect} from "react";
import UserContext from "./UserContext.jsx";
import {useQueryClient} from "react-query";
import {API_BASE_URL} from "../utils/api-config.js";

export default function UserDetails () {

    // console.log("--UserDetails--",user)
    const {user,setUser} = useContext(UserContext)

    //queryClient cache 값을 가져오기
    const queryClient = useQueryClient()
    const users = queryClient.getQueryData("users")
    // users 목록 중에 현재 user.id 와 같은 것으로 user state 변경.

    useEffect(() => {
        if(users)
        setUser(users.find(u => u.id === user.id))

    }, [users]);

    return user ? (
        <div className="item user">
            <div className="item-header">
                <h2>{user.name}</h2>
            </div>
            <div className="user-avatar">
             {/*   <img src={`http://localhost:5173/img/${user.img}`}
                     alt={user.name}/> */}
                <img src={`${API_BASE_URL}/upload/${user.img}`}
                     alt={user.name}/>
            </div>
            <div className="user-details">
                <h3>{user.title}</h3>
                <p>{user.notes}</p>
            </div>
        </div>
    ) : null;
}