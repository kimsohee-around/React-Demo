import BookablesList from "../Bookables/BookablesList.jsx";
import { useSearchParams} from "react-router-dom";
import PageSpinner from "../UI/PageSpinner.jsx";
import Bookings from "./Bookings.jsx";
import {useQuery} from "react-query";
import loadData from "../utils/api.js";

export default function BookingsPage () {

    // const [bookable, setBookable] = useState(null);

    const {data: bookables = [], status, error} = useQuery(
        "bookables",
        () => loadData("http://localhost:8080/bookables")
    );

    const [searchParam] = useSearchParams()
    const id = searchParam.get("bookableId")
    console.log('bookableId',id)
    console.log('bookables*',bookables)   // bookables 의 id는 문자열
    const bookable = bookables.find(b => b.id === parseInt(id,10)) || bookables[0];
    console.log('bookable*',bookable)


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