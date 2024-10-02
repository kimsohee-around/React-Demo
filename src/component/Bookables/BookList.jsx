import {bookables,days,sessions} from "../../static.json"
import {useState} from "react";
import {FaArrowRight} from "react-icons/fa";

function BookList(){
    const [group, setGroup] = useState("Rooms")
    const bookableGroup = bookables.filter(b =>(b.group ===group))
    // 상태값 관리를 해야할 변수 bookableIndex
    // setBookableIndex 는 useState 가 리턴해주는 메소드.(값 변경 메소드)
    const [bookableIndex, setBookableIndex] = useState(0)
    const groups = [...new Set(bookables.map(b=>b.group))]    //현재 상황 ["Rooms","Kit"]
    // b.group 만 가져와서 컬렉션.중복값은 1개만 저장하기 위해 Set 자료구조
    // ... 은 Set 오브젝트를 배열로 변환
    console.log("bookableIndex:",bookableIndex)
    function nextBookableIndex(){
        setBookableIndex((i) => (i+1) % bookableGroup.length)
        //상태값 변경 메소드의 인자 i는 bookableIndex 값
    }

    function changeGroup(event){
        setGroup(event.target.value)
        setBookableIndex(0)
    }

    const bookable = bookableGroup[bookableIndex]
    const [hasDetails, setHasDetails] = useState(false)
    return (
        <>
        <div>
            <select value={group}
                    onChange={changeGroup}>
                {groups.map(g=><option key={g} value={g}>{g}</option>)}
            </select>
            <ul className="bookables items-list-nav">
                {bookableGroup.map((b,i) => (
                    <li key={b.id}
                       className={i=== bookableIndex? "selected":null}>
                        <button className="btn"
                                onClick={()=> setBookableIndex(i)}>
                            {b.title}
                        </button>

                    </li>
                ))}
            </ul>
            <p>
               <button className="btn" onClick={nextBookableIndex}>
                   <FaArrowRight/><span>Next</span>
               </button>
            </p>
        </div>

            {/* 새로운 UI 추가  : 상세 내용*/}
        <div className="book-details">
            <div className="item">
                <div className="item-header">
                    <h2>{bookable.title}</h2>
                    <span className="controls">
                        <label>
                            <input type="checkbox" checked={hasDetails}
                                    onChange={()=>setHasDetails(has=> !has)}
                            />
                        </label>
                    </span>
                </div>
                <p>{bookable.notes}</p>
                {hasDetails && (
                    <div className="item-details">
                        <h3>사용가능한 요일과 세션</h3>
                        <div className="bookable-availability">
                            <ul>
                                {bookable.days.sort().map(d => <li key={d}>{days[d]}</li>)}
                            </ul>
                            <ul>
                                {bookable.sessions.sort().map(s => <li key={s}>{sessions[s]}</li>)}
                            </ul>
                        </div>
                    </div>
                )}

            </div>


        </div>
        </>
    )
}

export default BookList