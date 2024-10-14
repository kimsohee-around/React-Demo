import {FaCloudUploadAlt, FaTrash} from "react-icons/fa";
import {useEffect, useState} from "react";

export default function BookingForm ({booking, bookable, onSave, onDelete}) {
    const [state, setState] = useState(booking);

    useEffect(() => {
        if (booking) {
            setState(booking);
        }
    }, [booking]);

    function handleChange (e) {
        setState({
            ...state,
            [e.target.name]: e.target.value
        });
    }

    const isNew = booking?.id === undefined;

    return booking ? (
        <>
            <div className="booking-details-fields item-form">
                <label>Title</label>
                <p>
                    <input
                        type="text"
                        name="title"
                        value={state.title}
                        onChange={handleChange}
                    />
                </p>

                <label>Bookable</label>
                <p>{bookable.title}</p>

                <label>Booking Date</label>
                <p>{(new Date(booking.date)).toLocaleDateString()}</p>

                <label>Session</label>
                <p>{booking.session}</p>

                <label>Notes</label>
                <p>
          <textarea
              name="notes"
              rows={6}
              cols={30}
              value={state.notes}
              onChange={handleChange}
          />
                </p>
            </div>

            <p className="controls">
                {!isNew && (
                    <button
                        className="btn btn-delete"
                        onClick={() => onDelete(booking)}
                    >
                        <FaTrash/>
                        <span>Delete</span>
                    </button>
                )}
                <button
                    className="btn"
                    onClick={() => onSave(state)}
                >
                    <FaCloudUploadAlt/>
                    <span>{isNew ? "Add Booking" : "Update"}</span>
                </button>
            </p>
        </>
    ) : null;
}