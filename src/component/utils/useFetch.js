import {useEffect, useState} from "react";
import loadData from "./api.js";

export default function useFetch(url){
    const [data, setData] = useState()
    const [error, setError] = useState(null)
    const [status, setStatus] = useState("idle")

    useEffect(() => {
        // 여러 컴포넌트와 공유하게 될 코드로 실행할 때마다 변수 reset
        let doUpdate = true
        setStatus("loading")
        setData(undefined)
        setError(null)

        fetch(url)
            .then(resp =>{
                if(!resp.ok){
                    throw new Error("There wa a problem fecthing data.")
                }
                return resp.json()
            })
            .then(data =>{
                if(doUpdate){
                    setData(data)
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

    return {data,status,error}
}