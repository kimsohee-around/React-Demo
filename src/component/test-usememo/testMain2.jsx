// eslint-disable-next-line no-unused-vars
import React, {useMemo, useState} from "react";
import ReactDOM from "react-dom/client";
import Todos from "./Todos.jsx";

export default function App(){
    const [count, setCount] = useState(0)
    const [todos, setTodos] = useState([])
    // 재렌더링 할 때마다 실행되는 함수
    // const calculation = expensiveCalculation(count)
    // 메모화
    const calculation = useMemo( () => expensiveCalculation(count)
        , [count])
    //useEffect 훅과 동일하게 의존성 배열의 값이 설정됩니다.
    //count 값이 바뀔때만 함수가 실행됩니다.

    const increment =() => {
        setCount(c => c+1)
    }
    //상태변경 함수
    const addTodo =() => {
        setTodos(t => [...t, "New todo"])
    }   // 배열 todos 의 이전상태 t를 복사한 후 새로운 문자열 추가

    return (
        <>
            <Todos todos={todos} addTodo={addTodo}/>
            <hr/>
            <div>
                count:{count}
                <button onClick={increment}> + </button>
                {calculation}
            </div>
        </>
    )
}   // App 함수 끝
// 비용이 많이 드는 함수: 계산 시간이 오래걸리므로 재렌더링 시간에 영향을 미치는 함수
const expensiveCalculation = (num) => {
    for(let i=0;i<1000000000;i++){
        num +=2
    }
    return num;
}

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(<App/>)

