import {useContext} from "react";
import UserContext from "./UserContext.js";
import {useQueryClient} from "react-query";
import {useSearchParams} from "react-router-dom";

export default function UserDetails () {

    // console.log("--UserDetails--",user)
    const {user,setUser} = useContext(UserContext)


    return user ? (
        <div className="item user">
            <div className="item-header">
                <h2>{user.name}</h2>
            </div>
            <div className="user-avatar">
             {/*   <img src={`http://localhost:5173/img/${user.img}`}
                     alt={user.name}/> */}
                <img src={`http://localhost:8080/upload/${user.img}`}
                     alt={user.name}/>
            </div>
            <div className="user-details">
                <h3>{user.title}</h3>
                <p>{user.notes}</p>
            </div>
        </div>
    ) : null;
}