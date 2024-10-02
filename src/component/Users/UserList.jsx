import {useState} from "react";
import {users} from "../../static.json"


function UserList (){
    // const [users, setUsers] = useState(null)
    const [userIndex, setUserIndex] = useState(0)
    const user = users[userIndex]

    return(
        <>
            <ul className="users items-list-nav">
                {users.map((u,i)=>(
                    <li key={u.id}
                    className={i=== userIndex? "selected":null}>
                        <button className="btn btn-header"
                                onClick={()=>setUserIndex(i)}>
                            {u.name}
                        </button>
                    </li>
                ))}
            </ul>
            <div className="item user">
                <div className="item-header">
                    <h2>{user.name}</h2>
                </div>
                <div className="user-details">
                    <h3>{user.title}</h3>
                    <p>{user.notes}</p>
                </div>
            </div>
        </>
    )
}

export default UserList