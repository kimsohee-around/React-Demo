import { useEffect, useState} from "react";
import {FaArrowRight} from "react-icons/fa";
import Spinner from "../UI/Spinner.jsx";
import loadData from "../utils/api.js";
import useFetch from "../utils/useFetch.js";

// bookables 는 전체 목록, bookable 은 목록 중에 선택한 하나의 객체를 컴포넌트 프롭으로 받음.
//자식 컴포넌트에서 부모컴포넌트가 전달한 state 변수를 props 로 받음.
export default function BookablesList ({bookable, setBookable}) {

    //커스텀 훅
    // useFetch 결과 data 프로퍼티 값은 bookables 변수에 할당,
    // data 프로퍼티 없으면 빈 배열 []
    const {data:bookables=[], status, error} = useFetch(
        "http://localhost:3001/bookables"
    )

    const group = bookable?.group;
    const bookablesInGroup = bookables.filter(b => b.group === group);
    const groups = [...new Set(bookables.map(b => b.group))];

    //데이터를 fetch 후 bookables 가 저장되면 첫번째 것으로 bookable 설정
    useEffect(() => {
        setBookable(bookables[0])
    }, [bookables]);

    function changeGroup (e) {
        const bookablesInSelectedGroup = bookables.filter(
            b => b.group === e.target.value
        );
        setBookable(bookablesInSelectedGroup[0]);
    }

    function nextBookable () {
        const i = bookablesInGroup.indexOf(bookable);
        const nextIndex = (i + 1) % bookablesInGroup.length;
        const nextBookable = bookablesInGroup[nextIndex];
        setBookable(nextBookable);
    }

    if (status === "error") {
        return <p>{error.message}</p>
    }

    if (status === "loading") {
        return <p><Spinner/> Loading bookables...</p>
    }

    return (
        <div>
            <select value={group} onChange={changeGroup}>
                {groups.map(g => <option value={g} key={g}>{g}</option>)}
            </select>

            <ul className="bookables items-list-nav">
                {/* 기존 코드 (b,i) 인자를 받아서 i 인덱스 상태를 변경함*/}
                {bookablesInGroup.map(b => (
                    <li
                        key={b.id}
                        className={b.id === bookable.id ? "selected" : null}
                    >  {/* 순서2) 재렌더링 css 변경. bookalble 은 새로운 상태값*/}
                        <button
                            className="btn"
                            onClick={() => setBookable(b)}
                        >  {/* 순서 1) bookable 상태를 변경  */}
                            {b.title}
                        </button>
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