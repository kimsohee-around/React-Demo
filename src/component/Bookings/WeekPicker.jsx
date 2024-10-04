import {useReducer} from "react";
import reducer from "./weekReducer.js";
import getWeek from "./date-util.js";
import {FaCalendarDay, FaChevronLeft, FaChevronRight} from "react-icons/fa";
import {formatDate} from "../utils/date-utils.js";

function WeekPicker({week,dispatch}){
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




export default WeekPicker