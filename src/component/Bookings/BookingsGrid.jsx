import {useState, useMemo, useEffect} from "react";
import {getGrid, transformBookings} from "./grid-builder.js";
import {formatDateDay} from '../utils/date-utils.js'
import Spinner from "../UI/Spinner.jsx";
export default function BookingsGrid ({week, bookable, booking, setBooking}){
    const [bookings, setBookings] = useState(null)

    //booings는 api 에서 받아옵니다.
    /*
    bookable.id는 3, week.start는 2024-09-22, week.end는 2024-09-28 3개의 값을 조건으로
    예약 현황을 조회하여 수신된 bookins 배열이 아래와 같다면,
    */

    useEffect(() => {
        //아직 fecth 통신을 하지는 않지만 useEffect에 넣지 않으면 다른 state 변수값의
        //변화로 재렌더링이 일어날때마다 실행되어 재렌더링 횟수 초과로 오류가 발생한다.
        const bookingsExam = [
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
        /* 조건에 따라 조회된 bookingsExam 결과(test-of-transformBookings.js 참고)를 Grid 에 출력하기
     위한 객체로 변환 */
        setBookings(transformBookings(bookingsExam))
    }, []);


    const {grid, sessions, dates}=  bookable ? getGrid(bookable, week.start) : {}
    /* grid 객체는 예약 가능 자원 요소들을 저장한 객체.
    *
    * bookings 는 예약 정보가 저장된 객체. 해당 session과 date 에 예약 정보를 가져오기. 정보가 없다면
    * 위에서 getGrid 함수로 만들어진 grid 객체에서 가져오기. 차이점은 title 키 값 내용이 있느냐, 없는냐
    * */
    function cell (session, date) {
        const cellData = bookings?.[session]?.[date]   /* 결과가 false 이면*/
            || grid[session][date];        /* or 연산 뒤의 수식을 수행하는 단축평가연산*/

        //순서2) booking 의 session과 date 속성값이 현재 셀 위치의 session, date 와 같으면
        // isSelected 를 참으로 하여 css 를 적용하기
        const isSelected = booking?.session === session
            && booking?.date === date;

        return (
            <td
                key={date}
                className={isSelected ? "selected" : null}
                onClick={bookings ? () => setBooking(cellData) : null}
            >  {/*순서1) 그리드의 각 셀을 클릭했을 때 해당 cellData 정보가 booking 에 저장*/}
                {cellData.title}
            </td>
        );
    }

    return (
        <table className={bookings? "bookingsGrid active":"bookingsGrid"}
        >
            <thead>
                <tr>
                    <th>
                        <span className="status">
                         {!(dates && sessions && grid) && <Spinner/>}
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
                    {dates.map(date => cell(session, date))}
                    {/* 위의 cell 함수 실행으로 반환된 td 요소 출력*/}
                </tr>  
            ))}
            </tbody>
        </table>


    )

}