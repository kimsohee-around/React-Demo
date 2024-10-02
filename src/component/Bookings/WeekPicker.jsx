import {useReducer} from "react";
import reducer from "./weekReducer.js";
import getWeek from "./date-util.js";
import {FaCalendarDay, FaChevronLeft, FaChevronRight} from "react-icons/fa";

function WeekPicker({date}){
    //date 값으로 getWeek 함수를 통해 state(week) 를 초기화
    const [week, dispatch] = useReducer(reducer,date,getWeek)
    return (
        <div>
            <p className="date-picker">
                <button
                    className="btn"
                    onClick={() => dispatch({type: "PREV_WEEK"})}>
                    <FaChevronLeft/>
                    <span>PREV</span>
                </button>
                <input type="date" defaultValue={formatDate(new Date())}
                       onChange={(e) => dispatch({
                           type: "SET_DATE",
                           payload: e.target.value
                       })}
                />
                {/* 입력값을 state(상태값)으로 관리하면....
                    이 예제에서는 날짜 타입으로 변환되는 문자열이 아니면
                    예상치 않은 결과로 보입니다.
                    입력값을 state 관리는 기능에 맞는 경우에만 사용합니다.
                */}
                <input type="text" placeholder="yyyy-mm-dd"
                       defaultValue={formatDate(new Date())}
                       onChange={(e) => dispatch({
                           type: "SET_DATE",
                           payload: e.target.value
                       })}
                />
                <button
                    className="btn"
                    onClick={() => dispatch({type: "TODAY"})}>
                    <FaCalendarDay/>
                    <span>Today</span>
                </button>
                <button
                    className="btn"
                    onClick={() => dispatch({type: "NEXT_WEEK"})}>
                    <span>NEXT</span>
                    <FaChevronRight/>
                </button>
            </p>
            <p>
                {/*{week.start.toLocaleString().substring(0,13)}
                ~ {week.end.toLocaleString().substring(0,13)}*/}
                {formatDate(week.start)} ~ {formatDate(week.end)}
            </p>
        </div>

    )

}

function formatDate(date) {
    const year = date.getFullYear()
    const month = String(date.getMonth()+1).padStart(2,'0')
    const day = String (date.getDate()).padStart(2,'0')

    return [year,month,day].join('-')
}


export default WeekPicker