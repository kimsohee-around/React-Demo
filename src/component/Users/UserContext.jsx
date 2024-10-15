import {createContext, useState} from "react";

//컨텍스트 생성하기 . 이름은 UserContext
const UserContext = createContext()
export default UserContext

// context 로 관리하는 값 user 를 안정적으로 변경하기 위하여 커스텀 프로바이더 정의
export function UserProvider({children}){
    const [user,setUser] = useState(null)

    return (
        <UserContext.Provider value={{user,setUser}}>
            {children}
        </UserContext.Provider>
    )
}