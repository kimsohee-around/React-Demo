import './App.css'
import {BrowserRouter, Link} from "react-router-dom";
import {FaCalendarAlt, FaDoorOpen, FaUsers} from "react-icons/fa";
import UserPicker from "./component/Users/UserPicker.jsx";

function App() {

  return (
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


        </div>
    </BrowserRouter>
  )
}

export default App
