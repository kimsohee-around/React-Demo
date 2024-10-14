import {useEffect, useMemo, useState} from "react";
import {getGrid, transformBookings} from "./grid-builder.js";
import {getBookings} from "../utils/api.js";
import Spinner from "../UI/Spinner.jsx";
import {formatDateDay} from "../utils/date-utils.js"
import {useBookings} from "./bookingHooks.js";

export default function BookingsGrid (
    {week, bookable, booking, setBooking}
) {
    // const [bookings, setBookings] = useState(null);
    const {bookings, status,error} = useBookings(
        bookable?.id, week.start,week.end
    )

    const {grid, sessions, dates} = useMemo(

        () => bookable ? getGrid(bookable, week.start) : {},

        [bookable, week.start]
    );
    // console.log("g-1",grid)

    function cell (session, date) {
        const cellData = bookings?.[session]?.[date]
            || grid[session][date];

        const isSelected = booking?.session === session
            && booking?.date === date;

        return (
            <td
                key={date}
                className={isSelected ? "selected" : null}
                onClick={status === "success" ? () => setBooking(cellData) : null}
            >
                {cellData.title}
            </td>
        );
    }

    if(!grid) {
        return <p>Waiting for bookable and details</p>
    }

    return (
        <>
            {status === "error" && (
                <p className="bookingsError">
                    {`There was a problem loading the bookings data (${error})`}
                </p>
            )}
            <table
                className={status === "success" ? "bookingsGrid active" : "bookingsGrid"}
            >
                <thead>
                <tr>
                    <th>
                        <span className="status">
                           {!dates && <Spinner/>}
                        </span>
                    </th>
                        {dates && dates.map(d => (
                            <th key={d}>
                                {/*{(new Date(d)).toDateString()}*/}
                                {formatDateDay(new Date(d))}
                            </th>
                        ))}
                </tr>
                </thead>

                <tbody>
                {sessions.map(session => (
                    <tr key={session}>
                        <th>{session}</th>
                        {dates.map(date => cell(session, date))}
                    </tr>
                ))}
                </tbody>
            </table>
        </>
    )
}
