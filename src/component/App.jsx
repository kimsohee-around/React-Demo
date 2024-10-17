import '../App.css'
import {BrowserRouter, Link, Route, Routes} from "react-router-dom";
import {FaCalendarAlt, FaDoorOpen, FaRegIdCard, FaSign, FaUserCog, FaUsers} from "react-icons/fa";
import UserPicker from "./Users/UserPicker.jsx";
import BookingsPage from "./Bookings/BookingsPage.jsx";
import BookablePage from "./Bookables/BookablePage.jsx";
import UsersPage from "./Users/UsersPage.jsx";
import {UserProvider} from "./Users/UserContext.jsx";
import {QueryClient, QueryClientProvider} from "react-query";
import UserSettingPage from "./Users/UserSettingPage.jsx";
import useFetch from "./utils/useFetch.js";
import {useEffect, useState} from "react";

const queryClient = new QueryClient()
const AuthUser = function() { return (
    <>
        <UserProvider>
        <nav>
            <ul>
                <li>
                    <Link to="/bookings" className="btn btn-header">
                        <FaCalendarAlt/>
                        <span>예약</span>
                    </Link>
                </li>
                <li>
                    <Link to="/users" className="btn btn-header">
                        <FaUsers/>
                        <span>사용자</span>
                    </Link>
                </li>
            </ul>
        </nav>
        <nav>
            <UserPicker/>
            <Link to="/settings" className="btn">
                <FaUserCog/>
            </Link>
        </nav>
        </UserProvider>
    </>
)}

const HOME = function () { return (
    <>
        <nav>
            <ul>
                <li>
                    <Link to="" className="btn btn-header">
                        <FaSign/><span>로그인</span>
                    </Link>
                </li>
                <li>
                    <Link to="" className="btn header">
                        <FaRegIdCard/><span>회원 가입</span>
                    </Link>
                </li>
            </ul>
        </nav>
    </>
)}


function App() {
    const [auth , setAuth] = useState(false)
    const username = localStorage.getItem("USERNAME")

    useEffect(() => {
        if(username) {
            const {data,status,error} = useFetch(`http://localhost:8080/auth/${username}`)
            data===username ? setAuth(true) : localStorage.clear()
        }
    }, [username]);


 return (
     <QueryClientProvider client={queryClient}>
                <BrowserRouter>
                    <div className="App">
                        <header>
                            <nav>
                                <ul>
                                    <li>
                                        <Link to="/bookables" className="btn btn-header">
                                            <FaDoorOpen/>
                                            <span>예약자원</span>
                                        </Link>
                                    </li>
                                    <li>

                                    </li>
                                </ul>
                            </nav>
                            {auth ? <AuthUser/> : <HOME/>}
                        </header>

                        <Routes>
                            <Route path="/bookables/*" element={<BookablePage auth={auth}/>}/>
                            <Route path="/bookings" element={<BookingsPage/>}/>
                            <Route path="/users" element={<UsersPage/>}/>
                            <Route path="/settings" element={<UserSettingPage/>}/>
                        </Routes>

                    </div>
                </BrowserRouter>
     </QueryClientProvider>
    )
}

export default App
