import UsersList from "./UserList.jsx";
import {useContext, useState} from "react";
import UserDetails from "./UserDetails.jsx";


function UsersPage () {
    // const [user, setUser] = useState(null);
    //          ㄴ-> UserContext 사용하므로 필요없음.

    return (
        <main className="users-page">
            <UsersList />
            <UserDetails />
        </main>
    );
}
export default UsersPage