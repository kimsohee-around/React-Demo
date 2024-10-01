import BookList from "./BookList.jsx";

function BookablePage(){
    return(
        <main className="bookables-page">
            <h4>예약 가능 현황</h4>
            <BookList/>
        </main>
    )
}

export default BookablePage