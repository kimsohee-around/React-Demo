import BookableDetails  from "./BookableDetails.jsx";
import BookablesList from "./BookablesList.jsx";
import {useState} from "react";

export default function BookablesView () {
    //부모 컴포넌트가 state 변수 선언하고 자식 컴포넌트에게 전달함.
    const [bookable, setBookable] = useState();
    return (
        <>
            <BookablesList bookable={bookable} setBookable={setBookable}/>
            <BookableDetails bookable={bookable}/>
        </>
    );
}