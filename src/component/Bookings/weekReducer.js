export default function reducer(state, action){
    switch (action.type){
        case "NEXT_WEEK":
            /*지정된 날짜 +7 */
            return;
        case "PREV_WEEK":
            /*지정된 날짜 -7*/
            return;
        case "TODAY":
            /*오늘 날짜*/
            return;
        case "SET_DATE":
            /*임의의 날짜*/
            return;
        default:
    }
}
// return 은 getWeek 메소드로 변경된 state.date 를 구합니다.
// state 는 오브젝트 : date(선택날짜)
//       ,start(date 날짜 해당 주 시작날짜) ,end(마지막날짜)
// getWeek 메소드는 다른 컴포넌트에서도 실행합니다.