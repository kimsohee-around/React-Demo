import {useContext} from "react";
import UserContext from "../Users/UserContext.js";
import {FaEdit} from "react-icons/fa";
import {formatDate} from "../utils/date-utils.js";

export default function BookingDetails({booking, bookable}){
    // 현재 picker 선택한 사용자 가져오기
    const {user, setUser} = useContext(UserContext)
    // 현재 picker 선택한 사용자와 예약자가 같은지 판단
    const isBooker = booking && user &&
        (booking.bookerId === parseInt(user.id,10))
    //booking 객체 구조 분해하여 변수 설정. Grid 에서 칸 한개를 클릭해야
    // booking 객체가 만들어집니다. -> undefined 값은 구조 분해 오류
    // const {title="", date="", session="", notes=""} = booking
    return (
        <div className="booking-details">
            <h2>예약 상세보기
                {isBooker && (<span className="constrols">
                        <button className="btn">
                            <FaEdit/>
                        </button>
                </span> )}
            </h2>
            {booking ? (
                <div className="booking-details-fields">
                  <label>Title</label>
                  <p>{booking.title}</p>
                  <label>예약자원</label>
                  <p>{bookable.title}</p>  {/*bookerbleId 값만 booking 에 저장.*/}
                  <label>예약 날짜</label>
                  <p>{formatDate(new Date(booking.date))}</p>
                  <label>Session</label>
                  <p>{booking.session}</p>
                    {booking.notes && (
                        <>
                        <label>Notes</label>
                        <p>{booking.notes}</p>
                        </>
                    )}
                </div>
            ):
                (<div className="booking-details-fields">
                        Select a booking or a booking slot.
                </div>)}
            </div>
        )
    }