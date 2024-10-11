import {useNavigate, useParams} from "react-router-dom";
import {useQuery, useQueryClient} from "react-query";
import loadData, {editItem} from "../utils/api.js";
import {useEffect, useState} from "react";
import BookableForm from "./BookableForm.jsx";
import PageSpinner from "../UI/PageSpinner.jsx";

// 수정(편집) 화면에는 현재 데이터 값(예약자원) 을 전달
export default function BookableEdit(){
    const {id} = useParams()
    const queryClient = useQueryClient()

    // 하나의 예약 자원을 fetch 합니다. -> key 값이 문자열,id 정수값 요소를 갖는 배열
    const {data, status,isLoading} = useQuery(
        ["bookable",id],
        () => loadData(`http://localhost:3001/bookables/${id}`),
        {
            initialData:
            queryClient.getQueriesData("bookables")?.find(
                b=> b.id === parseInt(id,10)
            )
        }  // initialData 는 설정 옵션: 캐시 만료, 데이터 읽기 지연(오류) 문제를 해결하는 초기값
           //  fetch 문제. "bookables" 이름의 캐쉬값을 가져와서 id 와 같은 것으로 data 에 저장
    )
    // 훅은 top 위치에서 선언하기 !!
    const navigate = useNavigate()
    const [state, setState] = useState()
    useEffect(() => {
        if(data) {
        setState(data)
        }
    }, [data]);

    if(isLoading){
        return <PageSpinner/>
    }

    console.log("--BookableEdit data",data)

    // url 변경하는 네비게이트 함수를 리턴받는다.
    function handleSubmit(){
        const result = editItem(`http://localhost:3001/bookables/${id}`,state)
        navigate(`/bookables/${id}`)
    }

    function handleDelete(){
        const result =deleteItem(`http://localhost:3001/bookables/${id}`)
        navigate(`/bookables`)
    }

    //state 는 화면에 보여질 값들을 저장.
    return (
       status==="success" &&
       <BookableForm
           formState={{state,setState}}
           handleSubmit={handleSubmit}
           handleDelete={handleDelete}
       />
    )
}