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
import Login from "./Login.jsx";
import Register from "./Register.jsx";
import {call, signout} from "./utils/api-auth.js";
import PageSpinner from "./UI/PageSpinner.jsx";

const queryClient = new QueryClient()
const AuthUser = function() {


    return (
    <>
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
                <UserPicker/>
                <Link to="/settings" className="btn">
                    <FaUserCog/>
                </Link>
            </ul>
        </nav>
        <nav>
                <li>
                    <Link to="/signout" >
                        <button onClick={handleLogout} className="btn btn-header">
                            <FaSign/><span>로그아웃</span>
                        </button>
                    </Link>
                 </li>
        </nav>
    </>
)}

const HOME = function () { return (
    <>
        <nav>
            <ul>
                <li>
                    <Link to="/signin" className="btn btn-header">
                        <FaSign/><span>로그인</span>
                    </Link>
                </li>
                <li>
                    <Link to="/signup" className="btn header">
                        <FaRegIdCard/><span>회원 가입</span>
                    </Link>
                </li>
            </ul>
        </nav>
    </>
)}

function handleLogout(){
    signout()
    setAuth(false)
}

function App() {
    const [auth , setAuth] = useState(false)
    const temp = localStorage.getItem("USERNAME")
    const [status,setStatus] = useState("success")
    const [username,setUsername] = useState(temp)

    useEffect(() => {
        if(username) {
            setStatus("loading")
            call(`/auth`, "GET", null)
                .then(data => {
                    setAuth(data)
                    console.log('auth', auth)
                    setStatus("success")
                })
        }
    }, [username]);

    if(status === "loading"){
        return <PageSpinner/>
    }

 return (
     <QueryClientProvider client={queryClient}>
         <UserProvider>
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


                        {auth ? (
                        <Routes>
                            <Route path="/bookables/*" element={<BookablePage auth={auth}/>}/>
                            <Route path="/" element={<BookablePage auth={auth}/>}/>
                            <Route path="/bookings" element={<BookingsPage/>}/>
                            <Route path="/users" element={<UsersPage/>}/>
                            <Route path="/settings" element={<UserSettingPage/>}/>
                        </Routes>):
                            (
                            <Routes>
                            <Route path="/bookables/*" element={<BookablePage auth={auth}/>}/>
                             <Route path="/signin" element={<Login />}/>
                             <Route path="/" element={<Login />}/>
                             <Route path="/signup" element={<Register />}/>
                            </Routes>
                            )}

                    </div>
                </BrowserRouter>
         </UserProvider>
     </QueryClientProvider>
    )
}

export default App
