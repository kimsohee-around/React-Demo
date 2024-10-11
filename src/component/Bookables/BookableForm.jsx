import {days as daysArray, sessions as sessionsArray} from "../../static.json"

export default function BookableForm({formState={}}){
    //state 가 undefined 일때를 위한 초기값 필요
    const {state={},setState} = formState
    const {title="",group="",notes=""} = state
    const {days=[], sessions=[]} = state

    function handleChange(){
        //setState 로 값을 변경
    }

    function handleChecked(){
        //setState 로 값을 변경
    }
    console.log("BookableForm state---",state)

    return (
        <main className="bookables-form">
            <div className="item item-form">
                <div className="item-header">
                    <h2>{/*{handleDelete ? "Edit" : "New"}*/} Bookable</h2>
                </div>


                <label htmlFor="title" className="field">Title</label>
                <input
                    type="text"
                    name="title"
                    value={title}
                    onChange={handleChange}
                />

                <label htmlFor="group" className="field">Group</label>
                <input
                    type="text"
                    name="group"
                    value={group}
                    onChange={handleChange}
                />
                <div>
                    <label htmlFor="notes" className="field">Notes</label>
                    <textarea
                        name="notes"
                        value={notes}
                        onChange={handleChange}
                        rows="4"
                    />
                </div>
                <div className="bookable-availability">
                    <ul>
                        {daysArray.map((day, i) => (
                            <li key={day}><label>
                                <input
                                    checked={days.indexOf(i) !== -1}
                                    type="checkbox"
                                    name="days"
                                    value={i}
                                    onChange={handleChecked}
                                />
                                {day}
                            </label></li>
                        ))}
                    </ul>

                    <ul>
                        {sessionsArray.map((session, i) => (
                            <li key={session}><label>
                                <input
                                    checked={sessions.indexOf(i) !== -1}
                                    type="checkbox"
                                    name="sessions"
                                    value={i}
                                    onChange={handleChecked}
                                />
                                {session}
                            </label></li>
                        ))}
                    </ul>
                </div>
            </div>
        </main>
            )
            }