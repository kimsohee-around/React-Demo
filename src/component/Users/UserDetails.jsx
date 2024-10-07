import {useContext} from "react";
import UserContext from "./UserContext.js";

export default function UserDetails () {

    // console.log("--UserDetails--",user)
    const {user} = useContext(UserContext)

    return user ? (
        <div className="item user">
            <div className="item-header">
                <h2>{user.name}</h2>
            </div>

            <div className="user-details">
                <h3>{user.title}</h3>
                <p>{user.notes}</p>
            </div>
        </div>
    ) : null;
}