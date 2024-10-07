import {useState, useMemo, useEffect} from "react";
import {getGrid, transformBookings} from "./grid-builder.js";
import {formatDateDay} from '../utils/date-utils.js'
import Spinner from "../UI/Spinner.jsx";
import {getBookings} from "../utils/api.js";

export default function BookingsGrid ({week, bookable, booking, setBooking}){

    const [bookings, setBookings] = useState(null)
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(true);

    // 비용(시간) 이 높은 함수 getGrid 를 useMemo 훅 사용하기
    //  네트워크 지연시 시간이 오래 걸릴 getGrid 함수를 메모화
    const {grid, sessions, dates}=  useMemo(
        () => bookable ? getGrid(bookable, week.start) : {},
        [bookalbe,week.start]
    )
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

            getBookings(bookable.id, week.start, week.end)
                .then(resp => {
                    if (doUpdate) {
                        setBookings(transformBookings(resp));
                    }
                    setLoading(false)
                    // console.log('g-2',bookings)
                })
                .catch(setError);

            return () => doUpdate = false;
        }
    }, [week, bookable, setBooking]);
    /*
    비동기 작업(getBookings)이 완료되기 전에 컴포넌트가 언마운트될 경우, 더 이상 상태를 업데이트할 필요가 없습니다.
    그럼에도 불구하고 상태 업데이트를 시도하면 메모리 누수 경고가 발생.
    doUpdate 변수값으로 컴포넌트가 계속 마운트된 상태일 때만 상태 업데이트하도록 조건 설정.
    정리 함수 doUpdate = false. -> 언마운트 할때 실행.
    */

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

    if (loading) {
        return <p><Spinner/> Loading...</p>
    }


    return (
        <>
            {error && (
                <p className="bookingsError">
                    {`There was a problem loading the bookings data (${error})`}
                </p>
            )}
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
        </>
    )
}