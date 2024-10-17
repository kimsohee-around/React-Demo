import Spinner from "./Spinner";
import loadingSpinner from "../../assets/fade-stagger-squares.svg"
export default function PageSpinner () {
    return (
        <p className="page-loading">
            {/*<Spinner/>*/}
            {loadingSpinner}
        </p>
    );
}