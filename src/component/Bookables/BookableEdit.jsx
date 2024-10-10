import {useNavigate, useParams} from "react-router-dom";
import {useQueryClient, useQuery, useMutation} from "react-query";

import PageSpinner from "../UI/PageSpinner";
import loadData, { deleteItem, editItem} from "../utils/api.js";
import BookableForm from "./BookableForm.jsx";
import {useEffect, useState} from "react";
import useFormState from "./useFormState.js";

export default function BookableEdit () {
    const {id} = useParams();
    const queryClient = useQueryClient();

    // 캐시를 이용하여 bookable을 읽어온다.
    const {data, isLoading,isError,error} = useQuery(
        ["bookable", id],
        () => loadData(`http://localhost:3001/bookables/${id}`),
        {
            initialData:
                queryClient.getQueryData("bookables")
                    ?.find(b => b.id === parseInt(id, 10))
        }
    );
    // 세번째 인자는 설정 객체: 초기 설정 및 캐시만료 , 데이터 읽기 오류시 실행할 재시도 정책 등
    //                캐시에 저장된 데이터를 직접 가져온다. queryClient.getQueryData("bookables")

    console.log('BookableEdit data',data)
    // const formState = useFormState(data);
    const [state, setState] = useState()

    useEffect(()=>{
        if(data){
            setState(data)
        }
    },[data])

    function handleChange (e) {
        setState({
            ...state,
            [e.target.name]: e.target.value
        });
    }

    function handleChecked (e) {
        const {name, value, checked} = e.target;
        const values = new Set(state[name]);
        const intValue = parseInt(value, 10);

        values.delete(intValue);
        if (checked) values.add(intValue);

        setState({
            ...state,
            [name]: [...values]
        });
    }

  const navigate = useNavigate()
     function handleDelete() {
        const bookable =  deleteItem(`http://localhost:3001/bookables/${state.id}`)
        // alert(`${bookable.title} 삭제되었습니다.`)
        console.log('handleDelete',bookable)
        navigate(`/bookables`)
    }

     function handleSubmit() {
        const bookable =  editItem(`http://localhost:3001/bookables/${state.id}`, state)
        console.log('handleSubmit',bookable)
        navigate(`/bookables/${bookable.id}`)
    }

    if (isError) {
        return <p>{error?.message || error.message}</p>
    }

    if (isLoading ) {
        return <PageSpinner/>
    }

    return (
        <BookableForm
            formState = {{state,handleChange,handleChecked}}
            handleSubmit={handleSubmit}
            handleDelete={handleDelete}
        />
    );
}

function useUpdateBookable(state){
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const mutation = useMutation(
        item =>editItem(`http://localhost:3001/bookables/${item.id}`,item),
        {
            onSuccess: bookable =>{
                queryClient.setQueryData(
                    "bookables",
                    old=> [...(old || []),bookable]
                )

                // updateBookablesCache(bookable, queryClient);
                // queryClient.setQueryData(["bookable", String(bookable.id)], bookable);

                navigate(`/bookables/${bookable.id}`)
            }
        }
    )

    return {
        updateBookable: mutation.mutate,
        isUpdating: mutation.isLoading,
        isUpdateError: mutation.isError,
        updateError: mutation.error
    };
}

function updateBookablesCache (bookable, queryClient) {
    // get all the bookables from the cache
    const bookables = queryClient.getQueryData("bookables") || [];

    // find the index in the cache of the bookable that's been edited
    const bookableIndex = bookables.findIndex(b => b.id === bookable.id);

    // if found, replace the pre-edited version with the edited one
    if (bookableIndex !== -1) {
        bookables[bookableIndex] = bookable;
        queryClient.setQueryData("bookables", bookables);
    }
}

function useDeleteBookable () {
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const mutation = useMutation(
        bookable => deleteItem(`http://localhost:3001/bookables/${bookable.id}`),
        {
            /* on success receives the original item as a second argument */
            onSuccess: (response, bookable) => {
                // get all the bookables from the cache
                const bookables = queryClient.getQueryData("bookables") || [];

                // set the bookables cache without the deleted one
                queryClient.setQueryData(
                    "bookables",
                    bookables.filter(b => b.id !== bookable.id)
                );

                // If there are other bookables in the same group as the deleted one,
                // navigate to the first
                navigate(`/bookables/${getIdForFirstInGroup(bookables, bookable) || ""}`);
            }
        }
    );

    return {
        deleteBookable: mutation.mutate,
        isDeleting: mutation.isLoading,
        isDeleteError: mutation.isError,
        deleteError: mutation.error
    };
}

function getIdForFirstInGroup (bookables, excludedBookable) {
    // get the id and group of the deleted bookable
    const {id, group} = excludedBookable;

    // find the first other bookable in the same group as the deleted one
    const bookableInGroup = bookables.find(b => b.group === group && b.id !== id);

    // return its id or undefined
    return bookableInGroup?.id;
}
/*
* Uncaught Error: Invalid hook call. Hooks can only be called inside of the body of a function component. This could happen for one of the following reasons:
1. You might have mismatching versions of React and the renderer (such as React DOM)
2. You might be breaking the Rules of Hooks
3. You might have more than one copy of React in the same app
See https://reactjs.org/link/invalid-hook-call for tips about how to debug and fix this problem.
*
* */