import {useNavigate} from "react-router-dom";
import {useState} from "react";
import BookableForm from "./BookableForm.jsx";
import {createItem} from "../utils/api.js";
import {useMutation, useQueryClient} from "react-query";

export default function BookableNew(){
    const navigate = useNavigate()
    const [state, setState] = useState()
    const queryClient = useQueryClient()

    //createBookable : 상태 변경함수를 리턴 받아서 할당.
    const {mutate:createBookable, status,error} = useMutation(
        /* createBookable 이 실행할 인자값과 실행할 비동기 함수*/
        item =>createItem("http://localhost:8080/bookables",item),
        {
            // 비동기 함수 처리가 성공하면 실행되는 함수를 정의
            onSuccess: bookable =>{         // bookable 은 방금 추가된 데이터
                queryClient.setQueryData(     //useQuery 가 관리하는 cache를 수정
                    "bookables",          //     ㄴ key 이름 bookables 수정
                    old=> [...(old || []),bookable]
                )
                navigate(`/bookables/${bookable.id}`)
            }
        }
    )

    function handleSubmit(){
        createBookable(state)
    }

    /*function handleSubmit(){
        const result
            =createItem(`http://localhost:3001/bookables`,state)
        console.log('handleSubmit result-',result)
        //navigate 를 방금 추가한 id 값으로 하고 싶어요.
        // POST 결과로 리턴된 Promise 객체에서 id값을 가져오기는 불편.
        // useMutation 훅으로 해결하기
    }
*/
    return (
        <BookableForm
            formState={{state,setState}}
            handleSubmit={handleSubmit}
        />
    )
}