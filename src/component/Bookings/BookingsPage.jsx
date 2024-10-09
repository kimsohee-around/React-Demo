import WeekPicker from "./WeekPicker.jsx";
import BookablesList from "../Bookables/BookablesList.jsx";
import Bookings from "./Bookings.jsx";
import useFetch from "../utils/useFetch.js";
import { useSearchParams } from "react-router-dom";
import PageSpinner from "../UI/PageSpinner.jsx";
import { useQuery } from "react-query";
import loadData from "../utils/api.js";

function BookingsPage(){
    // const [bookable, setBookable] = useState(null);

    const {data: bookables = [], status, error} = useQuery(
        "bookables",
        () => loadData("http://localhost:3001/bookables")
    );

    // useSearchParams() : 검색파라미터에 접근하기 위한 객체와 검색파라미터 설정함수를 저장한 배열을 리턴해 준다.
    const [searchParam,setSearchParam] = useSearchParams()
    // 리턴받은 객체는 get 메소드를 제공한다.
    const id = searchParam.get("bookableId")

    console.log('bookableId',id)
    console.log('bookables*',bookables)   // bookables 의 id 데이터 타입 확인
    const bookable = bookables.find(b => b.id === parseInt(id,10)) || bookables[0];
    console.log('bookable*',bookable)

    if (status === "error") {
        return <p>{error.message}</p>
    }

    if (status === "loading") {
        return <PageSpinner/>
    }

    function getUrl(id){
        return `/bookings?bookableId=${id}`
    }
    return (
        <main className="bookings-page">
            <BookablesList
                bookable={bookable}
                bookables={bookables}
                getUrl={getUrl}
            />

            <Bookings
                bookable={bookable}
            />
        </main>
    );
}

export default BookingsPage