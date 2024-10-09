import { useContext } from "react";
import { FaEdit } from "react-icons/fa";
import Booking from "./Booking";
import UserContext from "../Users/UserContext";

export default function BookingDetails({booking, bookable}){
    
    // 공유된 UserContext 가져오기. userContext 객체에서 user 프로퍼티만 가져오기
     const {user, setUser} = useContext(UserContext)

     //db.json 에서 user.id 는 문자열
      const isBooker = booking && (booking.bookerId === parseInt(user.id,10))

     // 상태 변수값 확인 : 현재의 user id 와 booking 의 bookerId
    //  console.log("--BookingDetails user--",user)
    //  console.log("--BookingDetails booking--",booking)
 
     return (
         <div className="booking-details">
             <h2>Booking Details
                 {isBooker && (<span className="controls">
                             <button className="btn"><FaEdit/></button>
                             </span>)}
             </h2>
             {booking ? (
                 <Booking booking={booking}
                          bookable={bookable}/>) : (
                 <div className="booking-details-fields">
                     <p>Select a booking or a booking slot.</p>
                 </div>
             )}
         </div>
     );
}