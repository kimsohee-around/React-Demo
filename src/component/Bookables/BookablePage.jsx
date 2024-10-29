import BookablesView from "./BookablesView.jsx"
import {Route, Routes} from "react-router-dom";
import BookableNew from "./BookableNew.jsx";
import BookableEdit from "./BookableEdit.jsx";

export default function BookablesPage ({auth}) {
    return (
        <Routes>
            {/* id 식별값을 경로에 포함시키기(rest api 방식)
              path 속성에는 /bookables url 뒤에 나오는 부분만 값을 작성하면 됩니다. */}
            <Route path="/:id" element={<BookablesView auth={auth}/>} />
            <Route path="/" element={<BookablesView auth={auth}/>}  />
            {auth && <Route path="/:id/edit" element={<BookableEdit/>}/> }
            {auth && <Route path="/new" element={<BookableNew/>}/> }
        </Routes>
    );
}
