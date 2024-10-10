import useFormState from "./useFormState.js";
import BookableForm from "./BookableForm.jsx";
import {useNavigate} from "react-router-dom";
import {createItem} from "../utils/api.js";
import {useEffect, useState} from "react";
import PageSpinner from "../UI/PageSpinner.jsx";
import {useMutation, useQueryClient} from "react-query";

export default function BookableNew(){
    // const init = {days:[0,1,2,3,4,5,6], sessions:[0,1,2,3,4]}
    const navigate = useNavigate()
    const queryClient = useQueryClient()

    const {mutate:createBookable,status,error} = useMutation(
        item =>createItem("http://localhost:3001/bookables",item),
        {
            onSuccess: bookable =>{
                queryClient.setQueryData(
                    "bookables",
                    old=> [...(old || []),bookable]
                )
                navigate(`/bookables/${bookable.id}`)
            }
        }
    )
    // const formState = useFormState()
    const [state,setState] = useState()

    useEffect(() => {
        setState({})
    }, []);

   if(status === "error"){
        return <p>{error.message}</p>
    }

    if(status === "loading"){
        return <PageSpinner/>
    }


    function handleSubmit(){
        createBookable(state)
    }

    return (
        <>
            <BookableForm formState={{state,setState}} handleSubmit={handleSubmit}/>
        </>
    )
}