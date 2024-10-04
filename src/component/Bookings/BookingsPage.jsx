import WeekPicker from "./WeekPicker.jsx";
import BookablesList from "../Bookables/BookablesList.jsx";
import {useState} from "react";
import Bookings from "./Bookings.jsx";

function BookingsPage(){
    const [bookable, setBookable] = useState(null)

    return(
        <main className="bookings-page">
          <BookablesList
              bookable={bookable}
              setBookable={setBookable}/>
   {/* BookablesList 선택한 bookable 객체는 부모, 형제 Bookings 와 공유*/}
          <Bookings bookable={bookable}/>
        </main>
    )
}

export default BookingsPage