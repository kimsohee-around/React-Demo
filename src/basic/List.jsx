/* 함수 컴포넌트 예제 */
export function Car(props){
    return <li>I am a {props.brand}</li>
}

function Garage(){
    const cars = ['Ford','BMW','Audi'];
    return (
        <>
            <h1>Who lives in my garage?</h1>
            <ul>
                {cars.map((car,i) =>
                        <Car key={i} brand={car}/>
                )}
            </ul>

        </>
    )
    /* map 메소드 cars 배열의 요소값을 Car 컴포넌트 프롭스에 전달
    *  여러개의 Car 컴포넌트 리턴
    *  */
}

export default Garage