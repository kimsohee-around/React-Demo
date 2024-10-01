import {bookables} from "../../static.json"
import {useState} from "react";
import {FaArrowRight} from "react-icons/fa";

function BookList(){
    const [group, setGroup] = useState("Rooms")
    const bookableGroup = bookables.filter(b =>(b.group ===group))
    // 상태값 관리를 해야할 변수 bookableIndex
    // setBookableIndex 는 useState 가 리턴해주는 메소드.(값 변경 메소드)
    const [bookableIndex, setBookableIndex] = useState(0)
    const groups = ["Rooms","Kit"]

    console.log("bookableIndex:",bookableIndex)
    function nextBookableIndex(){
        setBookableIndex((i) => (i+1) % bookableGroup.length)
        //상태값 변경 메소드의 인자 i는 bookableIndex 값
    }

    return (
        <div>
            <select value={group}
                    onChange={(e)=>setGroup(e.target.value)}>
                {groups.map(g=><option key={g} value={g}>{g}</option>)}
            </select>
            <ul className="items-list-nav">
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
    )
}

export default BookList