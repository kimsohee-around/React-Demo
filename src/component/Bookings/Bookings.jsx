import {useEffect, useReducer, useState} from "react";
import {formatDate, getWeek} from "../utils/date-utils.js";
import WeekPicker from "./WeekPicker.jsx";
import weekReducer from "./weekReducer.js";
import BookingsGrid from "./BookingsGrid.jsx";
import BookingDetails from "./BookingDetails.jsx";
import {useBookings} from "./bookingHooks.js";

export default function Bookings ({bookable}) {

    const [week, dispatch] = useReducer(
        weekReducer, new Date(), getWeek
    );

    const [booking, setBooking] = useState(null);

    const weekStart = formatDate(week.start)
    const {bookings} = useBookings(bookable?.id,week.start,week.end);
    const selectedBooking = bookings?.[booking?.session]?.[booking.date]

    useEffect(() => {
        setBooking(null)

    }, [bookable,weekStart]);

    useEffect(()=>{
        if(booking?.id !== undefined && !selectedBooking){
            setBooking(null)
        }
    },[booking,selectedBooking])

    return (
        <div className="bookings">
            <div>
                <WeekPicker week={week} dispatch={dispatch}/>

                <BookingsGrid
                    week={week}
                    bookable={bookable}
                    booking={booking}
                    setBooking={setBooking}
                />
            </div>

            <BookingDetails
                week={week}
                booking={selectedBooking || booking}
                bookable={bookable}
            />
        </div>
    );
}