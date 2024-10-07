import {FaCalendarDay, FaChevronLeft, FaChevronRight,FaCalendarCheck} from "react-icons/fa";
import {formatDate} from "../utils/date-utils.js";
import {useRef} from "react";

function WeekPicker({week,dispatch}){
    //* go 버튼 추가 : useRef 새로이 사용한 훅
    const textboxRef = useRef();

    function goToDate () {
        dispatch({
            type: "SET_DATE",
            payload: textboxRef.current.value
        });
    }
    
    return (
        <div>
            <p className="date-picker">
                <button
                    className="btn"
                    onClick={() => dispatch({type: "PREV_WEEK"})}>
                    <FaChevronLeft/>
                    <span>PREV</span>
                </button>
                <span>
                  <input
                      type="text"
                      ref={textboxRef}
                      placeholder="YYYY-MM-DD"
                      defaultValue={formatDate(new Date())}
                  />
                <button
                    className="go btn"
                    onClick={goToDate}
                >
                  <FaCalendarCheck/>
                  <span>Go</span>
                </button>
              </span>
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