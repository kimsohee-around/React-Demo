import {useState} from "react";
import {getGrid} from "./grid-builder.js";
import {formatDateDay} from '../utils/date-utils.js'
import Spinner from "../UI/Spinner.jsx";
import {getBookings} from "../utils/api.js";

export default function BookingsGrid ({week, bookable, booking, setBooking}){

    const [bookings, setBookings] = useState(null)
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(true);

    const {grid, sessions, dates}=  bookable ? getGrid(bookable, week.start) : {}
    /* grid 객체는 예약 가능 자원 요소들을 저장한 객체.
    *
    * bookings 는 예약 정보가 저장된 객체. 해당 session과 date 에 예약 정보를 가져오기. 정보가 없다면
    * 위에서 getGrid 함수로 만들어진 grid 객체에서 가져오기. 차이점은 title 키 값 내용이 있느냐, 없는냐
    * */
    useEffect(() => {
        setLoading(true)
        if (bookable) {
            let doUpdate = true;

            setBookings(null);
            setError(false);
            setBooking(null);

    //booings는 api 에서 받아옵니다.
    const bookings = [
        {
            "session": "Lunch",
            "date": "2024-09-23",
            "bookableId": 3,
            "title": "Football Challenge",
            "bookerId": 3,
            "id": 2
        },
        {
            "session": "Breakfast",
            "date": "2024-09-26",
            "bookableId": 3,
            "title": "Tiddlywinks",
            "bookerId": 2,
            "id": 5
        }
    ]
    const {grid, sessions, dates}
             = bookable? getGrid(bookable,week.start):{}

    return (
        <table className={bookings? "bookingsGrid active":"bookingsGrid"}
        >
            <thead>
                <tr>
                    <th>
                        <span className="status">
                            <Spinner/>
                        </span>
                    </th>
                    {dates && dates.map(d => (
                        <th key={d}>
                            {formatDateDay(new Date(d))}
                        </th>
                    ))}
                </tr>
            </thead>
            <tbody>
            {sessions && sessions.map(session => (
                <tr key={session}>
                    <th>{session}</th>
                    {dates.map(date => "")}
                </tr>
            ))}
            </tbody>
        </table>
    )

}