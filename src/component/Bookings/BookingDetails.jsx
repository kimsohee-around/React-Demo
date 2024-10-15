import {useContext, useEffect, useState} from "react";
import {FaEdit, FaPlus} from "react-icons/fa"
import Booking from "./Booking.jsx";
import UserContext from "../Users/UserContext.js";
import {Link} from "react-router-dom";
import {useCreateBooking, useDeleteBooking, useUpdateBooking} from "./bookingHooks.js";
import BookingForm from "./BookingForm.jsx";
import {formatDate} from "../utils/date-utils.js";

export default function BookingDetails ({week,booking, bookable}) {
    // 공유된 UserContext 가져오기. userContext 객체에서 user 프로퍼티만 가져오기
    const {user, setUser} = useContext(UserContext)
    const [isEditing, setEditing] = useState(false)

    //db.json 에서 user.id 는 문자열
    const isBooker = booking && user && (booking.bookerId === user.id)

    const key = ["bookings", bookable.id,formatDate(week.start),formatDate(week.end)]
    const {createBooking, isCreating} = useCreateBooking(key)
    const {updateBooking, isUpdating} = useUpdateBooking(key)
    const {deleteBooking, isDeleting} = useDeleteBooking(key)

    useEffect(() => {
        setEditing(booking && booking.id === undefined)
    }, [booking]);

    function handleSave(item){
        setEditing(false)
        if(item.id===undefined){
            createBooking({...item, bookerId:user.id})
        }else{
            updateBooking(item)
        }
    }

    function handleDelete(item){
        if(window.confirm("예약을 취소하시겠습니까?")){
            setEditing(false)
            deleteBooking(item.id)
        }
    }
    return (
        <div className="booking-details">
            <h2>Booking Details
                {isBooker && (<span className="controls">
                            <button className="btn"
                            onClick={()=>setEditing(v=>!v)}
                            ><FaEdit/></button>
                            </span>)}
            </h2>
            {isCreating || isUpdating || isDeleting ? (
                <div className="booking-details-fields">
                    <p>Saving...</p>
                </div>
            ) : isEditing ? (
                <BookingForm
                    booking={booking}
                    bookable={bookable}
                    onSave={handleSave}
                    onDelete={handleDelete}
                />
            ) : booking ? (
                <Booking
                    booking={booking}
                    bookable={bookable}
                />
            ) : (
                <div className="booking-details-fields">
                    <p>Select a booking or a booking slot.</p>
                </div>
            )}
        </div>
    );
}