import {memo} from "react";

const Todos = ({ todos, addTodo }) => {
    console.log("child Todos render");
    console.log("1-",todos)
    return (
        <>
            <h2>My Todos</h2>
            {todos.map((todo, index) => {
                return <p key={index}>{todo}</p>;
            })}
            <button onClick={addTodo}>Add Todo</button>
        </>
    );
};
// export default Todos;
export default memo(Todos)