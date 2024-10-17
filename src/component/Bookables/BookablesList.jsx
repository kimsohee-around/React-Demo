import {FaArrowRight} from "react-icons/fa";
import Spinner from "../UI/Spinner.jsx";
import { Link, useNavigate } from "react-router-dom";

// bookables 는 전체 목록, bookable 은 목록 중에 선택한 하나의 객체를 컴포넌트 프롭으로 받음.
export default function BookablesList ({bookable, bookables,getUrl}) {

    const group = bookable?.group;
    const bookablesInGroup = bookables.filter(b => b.group === group);
    const groups = [...new Set(bookables.map(b => b.group))];

    // url로 네비게이션을 할 수 있는 함수를 리턴한다.
    const navigate = useNavigate();

    function changeGroup (e) {
        const bookablesInSelectedGroup = bookables.filter(
            b => b.group === e.target.value
        );
        // setBookable(bookablesInSelectedGroup[0]);
        navigate(getUrl(bookablesInSelectedGroup[0].id));   //상위 컴포넌트에서 url 변경하도록 메소드 실행
        // navigate(`/bookables/${bookablesInSelectedGroup[0].id}`);  // 이렇게 하면 동작 오류
        // 단순히 상태값을 바꾸는 것이 아니고 새로운 url 로 요청을 보낸다.
    }

    function nextBookable () {
        const i = bookablesInGroup.indexOf(bookable);
        const nextIndex = (i + 1) % bookablesInGroup.length;
        const nextBookable = bookablesInGroup[nextIndex];
        // setBookable(nextBookable);
        navigate(getUrl(nextBookable.id));
    }

    return (
        <div>
            <select value={group} onChange={changeGroup}>
                {groups.map(g => <option value={g} key={g}>{g}</option>)}
            </select>

            <ul className="bookables items-list-nav">
                {bookablesInGroup.map(b => (
                    <li
                        key={b.id}
                        className={b.id === bookable.id ? "selected" : null}
                    >  {/* 순서2) 재렌더링 css 변경. bookalble 은 새로운 상태값*/}
                        <Link
                            to={getUrl(b.id)}
                            className="btn"
                            replace={true}
                        >   {/* 순서1) b.id 값을 경로 파라미터로 하여 새로운 요청 보내기 */}
                            {b.title}
                        </Link>
                    </li>
                ))}
            </ul>
            <p>
                <button
                    className="btn"
                    onClick={nextBookable}
                    autoFocus
                >
                    <FaArrowRight/>
                    <span>Next</span>
                </button>
            </p>
        </div>
    );
}