import useFormState from "./useFormState.js";
import BookableForm from "./BookableForm.jsx";
import {useNavigate} from "react-router-dom";
import {createItem} from "../utils/api.js";

export default function BookableNew(){
    // const init = {days:[0,1,2,3,4,5,6], sessions:[0,1,2,3,4]}

    const navigate = useNavigate()

    function handleSubmit(){
        const bookable = createItem("http://localhost:3001/bookables",formState.state)
        navigate(`/bookables/${bookable.id}`)
    }

    const formState = useFormState()
    return (
        <>
            <BookableForm formState={formState} handleSubmit={handleSubmit}/>
        </>
    )
}