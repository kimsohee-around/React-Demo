import {bookables} from "../../static.json"

function BookList(){
    console.log("bookables",bookables)
    const group ="Kit"
    let bookableIndex = 1
    const bookableGroup = bookables.filter(b =>(b.group ===group))

    function changeBookable(selectIndex){
        bookableIndex = selectIndex
    }

    return (
        <ul className="items-list-nav">
            {bookableGroup.map((b,i) => (
                <li key={b.id}
                   className={i=== bookableIndex? "selected":null}>
                    <button className="btn"
                            onClick={()=> changeBookable(i)}>
                        {b.title}
                    </button>

                </li>
            ))}
        </ul>
    )
}

export default BookList