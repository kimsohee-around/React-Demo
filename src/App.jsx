import './App.css'
import {BrowserRouter, Link, Route, Routes} from "react-router-dom";
import {FaCalendarAlt, FaDoorOpen, FaUsers} from "react-icons/fa";
import UserPicker from "./component/Users/UserPicker.jsx";
import BookingsPage from "./component/Bookings/BookingsPage.jsx";
import BookablePage from "./component/Bookables/BookablePage.jsx";
import UsersPage from "./component/Users/UsersPage.jsx";
import {useState} from "react";
import UserContext from "./component/Users/UserContext.js";

function App() {
  const [user, setUser] = useState()
  console.log('-App user -',user)

  return (
    <UserContext.Provider value={{user,setUser}}>
    <BrowserRouter>
        <div className="App">
            <header>
                <nav>
                    <ul>
                        <li>
                            <Link to="/bookings" className="btn btn-header">
                                <FaCalendarAlt/>
                                <span>예약</span>
                            </Link>
                        </li>
                        <li>
                            <Link to="/bookables" className="btn btn-header">
                                <FaDoorOpen/>
                                <span>예약자원</span>
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
                <UserPicker/>
            </header>

        <Routes>
            <Route path="/bookings" element={<BookingsPage/>}/>
            <Route path="/bookables" element={<BookablePage/>}/>
            <Route path="/users" element={<UsersPage/>}/>
        </Routes>

        </div>
    </BrowserRouter>
    </UserContext.Provider>
    /* 사용자 선택한 메뉴 항목에 따라 화면에 보이는 UI 를 결정합니다.*/

  )
}

export default App
