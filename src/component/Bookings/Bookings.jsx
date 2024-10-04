import {useReducer,useState} from "react";
import getWeek from "../utils/date-utils.js";
import weekReducer from './weekReducer.js'
import WeekPicker from "./WeekPicker.jsx";
import BookingDetails from "./BookingDetails.jsx";
import BookingsGrid from "./BookingsGrid.jsx";

export default function Bookings({bookable}){
    const [week, dispatch] = useReducer(
        weekReducer,new Date(), getWeek
    )
    // 예약 정보 저장
    const [booking, setBooking] = useState(null)

    return (
        <div className="bookings">
            <div>
                <WeekPicker
                    week = {week}
                    dispatch = {dispatch}/>
                <BookingsGrid
                    week={week}
                    bookable={bookable}
                    booking={booking}
                    setBooking={setBooking}/>
                <BookingDetails
                    booking={booking}
                    bookable={bookable}/>
            </div>
        </div>
    )
}