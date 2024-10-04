import {useState} from "react";
import {days, sessions} from "../../static.json";

// (bookables 는 전체 목록) bookable 은  목록 중에 선택한 하나의 객체를 컴포넌트 프롭으로 받음.
//자식 컴포넌트에서 부모컴포넌트가 전달한 state 변수를 props 로 받음.
export default function BookableDetails ({bookable}) {
    const [hasDetails, setHasDetails] = useState(true);

    function toggleDetails () {
        setHasDetails(has => !has);
    }

    // bookable? :  끝까지 보시면 삼항연산입니다.
    return bookable ? (
        <div className="bookable-details item">
            <div className="item-header">
                <h2>{bookable.title}</h2>
                <span className="controls">
          <label>
            <input
                type="checkbox"
                onChange={toggleDetails}
                checked={hasDetails}
            />
            Show Details
          </label>
        </span>
            </div>

            <p>{bookable.notes}</p>

            {hasDetails && (
                <div className="item-details">
                    <h3>Availability</h3>
                    <div className="bookable-availability">
                        <ul>
                            {bookable.days
                                .sort()
                                .map(d => <li key={d}>{days[d]}</li>)
                            }
                        </ul>
                        <ul>
                            {bookable.sessions
                                .map(s => <li key={s}>{sessions[s]}</li>)
                            }
                        </ul>
                    </div>
                </div>
            )}
        </div>
    ) : null;
}