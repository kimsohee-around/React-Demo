import UsersList from "./UserList.jsx";
import {useContext, useState} from "react";
import UserDetails from "./UserDetails.jsx";


function UsersPage () {
    const [user, setUser] = useState(null);


    return (
        <main className="users-page">
            <UsersList user={user} setUser={setUser}/>
            <UserDetails user={user}/>
        </main>
    );
}
export default UsersPage