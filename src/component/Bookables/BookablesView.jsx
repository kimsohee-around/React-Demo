import { Link, useParams } from "react-router-dom";
import useFetch from "../utils/useFetch.js";
import BookableDetails  from "./BookableDetails.jsx";
import BookablesList from "./BookablesList.jsx";
import { FaPlus } from "react-icons/fa";
import PageSpinner from "../UI/PageSpinner.jsx";

export default function BookablesView () {
    
    const {data: bookables = [], status, error} = useFetch(
        "http://localhost:3001/bookables"
    );

    // useParams : url 경로에서 모든 파라미터 값을 저장한 객체를 반환한다. 
    const {id} = useParams();
    console.log('- bookables id',typeof id)   // bookables 의 id는 문자열
    console.log('- BookablesView bookables-',bookables)

    // url 경로에서 가져온 id 값과 bookables 의 id가 같은 것을 bookable 에 저장
    const bookable = bookables.find(b => b.id === parseInt(id,10)) || bookables[0];

    if (status === "error") {
        return <p>{error.message}</p>
    }

    if (status === "loading") {
        return <PageSpinner/>
    }
    
    return (
        <main className="bookables-page">
        <div>
            <BookablesList
                bookable={bookable}
                bookables={bookables}
                getUrl={id => `/bookables/${id}`}
            />

            <p className="controls">
                <Link
                    to="/bookables/new"
                    replace={true}
                    className="btn">
                    <FaPlus/>
                    <span>New</span>
                </Link>
            </p>
        </div>

        <BookableDetails bookable={bookable}/>
    </main>
    );
    //bookable state 상태 변화는 자식 컴포넌트에서 발생하고
    //   변경된 상태를 부모에게로 전달. - BookablesList 형제 컴포넌트 BookableDetails
    //   BookableDetails 도 변경되 상태값으로 재렌더링
}