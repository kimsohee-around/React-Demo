import { Route, Routes } from "react-router-dom";
import BookablesView from "./BookablesView.jsx"
import BookableNew from "./BookableNew.jsx";
import BookableEdit from "./BookableEdit.jsx";

export default function BookablesPage () {
    return (
        <Routes>
            {/* id 식별값을 경로에 포함시키기(rest api 방식) */}
            <Route path="/:id" element={<BookablesView/>} />
            <Route path="/" element={<BookablesView/>}  />
            <Route path="/:id/edit" element={<BookableEdit />} />
            <Route path="/new" element={<BookableNew/>} /> 
        </Routes>
    );
}
