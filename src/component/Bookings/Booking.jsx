import {formatDate} from "../utils/date-utils.js";

export default function Booking ({booking, bookable}) {

    const {title, date, session, notes} = booking;

    return (
        <div className="booking-details-fields">
            <label>Title</label>
            <p>{title}</p>

            <label>예약자원</label>
            <p>{bookable.title}</p>  {/*bookerbleId 값만 booking 에 저장.*/}

            <label>예약 날짜</label>
            <p>{formatDate(new Date(booking.date))}</p>

            <label>Session</label>
            <p>{session}</p>

            {notes && (
                <>
                    <label>Notes</label>
                    <p>{notes}</p>
                </>
            )}
        </div>
    )
}