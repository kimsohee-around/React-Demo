import {useRef} from "react";
import {FaChevronLeft, FaCalendarDay, FaChevronRight, FaCalendarCheck} from "react-icons/fa";
import {formatDate, getWeek} from "../utils/date-utils.js";

export default function WeekPicker ({week,dispatch}) {
    const textboxRef = useRef();

    function goToDate () {
        dispatch({
            type: "SET_DATE",
            payload: textboxRef.current.value
        });
    }
// () => dispatch({type: "PREV_WEEK"})
    function previous(){
        dispatch({type: "PREV_WEEK"})
        textboxRef.current.value = formatDate(getWeek(new Date(textboxRef.current.value),-7).start)
    }

    function next(){
        dispatch({type: "NEXT_WEEK"})
        textboxRef.current.value = formatDate(getWeek(new Date(textboxRef.current.value),7).end)
    }
    return (
        <div>
            <p className="date-picker">
                <button
                    className="btn"
                    onClick={previous}
                >
                    <FaChevronLeft/>
                    <span>Prev</span>
                </button>

                <button
                    className="btn"
                    onClick={() => dispatch({type: "TODAY"})}
                >
                    <FaCalendarDay/>
                    <span>Today</span>
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
                    onClick={next}
                >
                    <span>Next</span>
                    <FaChevronRight/>
                </button>
            </p>
        </div>
    );
}
