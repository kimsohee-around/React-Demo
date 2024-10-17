import {useEffect, useState} from "react";
import loadData from "./api.js";

export default function useFetch(url){
    const [data, setData] = useState()
    const [error, setError] = useState(null)
    const [status, setStatus] = useState("idle")

    let headers = new Headers({
/*
        "Content-Type": "application/json",
*/
    })

    const accessToken = localStorage.getItem("ACCESS_TOKEN")
    if(accessToken){
        headers.append("Authorization","Bearer " + accessToken);
    }

    let options ={
        headers: headers,
        method: "GET"
    };

    useEffect(() => {


        // 여러 컴포넌트와 공유하게 될 코드로 실행할 때마다 변수 reset
        let doUpdate = true
        setStatus("loading")
        setData(undefined)
        setError(null)

        fetch(url,options)
            .then(resp =>{
                if(!resp.ok){
                    throw new Error("There was a problem fecthing data.")
                }
                return resp.json()
            })
            .then(data =>{
                if(doUpdate){
                    setData(data)       //상태값 변경함수 실행
                    setStatus("success")
                }
            })
            .catch(error => {
                if(doUpdate){
                    setError(error)
                    setStatus("error")
                }
            })
        return () => doUpdate=false
    }, []);
    // 의존성 배열이 비어 있으면 url 전환하여 컴포넌트 처음 호출될 때만 실행.
    // -> 다른 state 변수값 변화로 재렌더링 될때 실행되지 않습니다.

    return {data,status,error}     //3개의 프로퍼티(값 포함)를 갖는 객체 리턴
}   //{data:data, status:status, error:error}
    // 프로퍼티이름과 변수명이 같을 때 한번만 작성.
/*
    비동기 작업(getBookings)이 완료되기 전에 컴포넌트가 언마운트될 경우, 더 이상 상태를 업데이트할 필요가 없습니다.
    그럼에도 불구하고 상태 업데이트를 시도하면 메모리 누수 경고가 발생.
    doUpdate 변수값으로 컴포넌트가 계속 마운트된 상태일 때만 상태 업데이트하도록 조건 설정.
    정리 함수 doUpdate = false. -> 언마운트 할때 실행.
    */