import {useEffect, useReducer, useState} from "react";
import getWeek, {formatDate} from "../utils/date-utils.js";
import weekReducer from './weekReducer.js'
import WeekPicker from "./WeekPicker.jsx";
import BookingDetails from "./BookingDetails.jsx";
import BookingsGrid from "./BookingsGrid.jsx";
import {useBookings} from "./bookingHooks.js";

export default function Bookings({bookable}){
    const [week, dispatch] = useReducer(
        weekReducer,new Date(), getWeek
    )
    // 예약 정보 저장. BookingsGrid UI 에서 한칸(cell) 선택하면 booking 변경
    const [booking, setBooking] = useState(null)
    // bookins 를 fetch 하고 cache 저장하기
    const {bookings} = useBookings(bookable?.id,week.start,week.end)
    // state 상태값 booking을 selectBooking으로 할당
    const selectBooking = bookings?.[booking?.session]?.[booking.date]
    const weekStart = formatDate(week.start)

    useEffect(() => {           //bookable,week.start 변경되면 booking 재렌더링
        setBooking(null)
    }, [bookable,weekStart]);

    useEffect(()=> {            //새로운 예약
        if(booking?.id !== undefined && !selectBooking){
            setBooking(null)
        }
    },[booking,selectBooking])

    console.log("Bookings booking",booking)
    console.log("Bookings selectBooking",selectBooking)
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
            </div>
                <BookingDetails
                    week={week}
                    booking={selectBooking || booking}
                    bookable={bookable}/>

        </div>
    )
}