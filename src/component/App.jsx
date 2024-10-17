import '../App.css'
import {BrowserRouter, Link, Route, Routes} from "react-router-dom";
import {FaCalendarAlt, FaDoorOpen, FaUserCog, FaUsers} from "react-icons/fa";
import UserPicker from "./Users/UserPicker.jsx";
import BookingsPage from "./Bookings/BookingsPage.jsx";
import BookablePage from "./Bookables/BookablePage.jsx";
import UsersPage from "./Users/UsersPage.jsx";
import {UserProvider} from "./Users/UserContext.jsx";
import {QueryClient, QueryClientProvider} from "react-query";
import UserSettingPage from "./Users/UserSettingPage.jsx";

function App() {
  const queryClient = new QueryClient()
  return (
    <QueryClientProvider client={queryClient} >
    <UserProvider>
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
                <nav>
                    <UserPicker/>
                    <Link to="/settings" className="btn">
                        <FaUserCog/>
                    </Link>
                </nav>
            </header>

        <Routes>
            <Route path="/bookings" element={<BookingsPage/>}/>
            {/* url 경로를 확장하기 위하여 path 수정 
                세부적인 처리는 BookablePage 에서 정의*/}
            <Route path="/bookables/*" element={<BookablePage/>}/>
            <Route path="/users" element={<UsersPage/>}/>
            <Route path="/settings" element={<UserSettingPage />} />
        </Routes>

        </div>
    </BrowserRouter>
    </UserProvider>
    </QueryClientProvider>
  )
}

export default App
