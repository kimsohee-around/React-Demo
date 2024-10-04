import {shortISO} from "./date-utils.js";

export default function loadData(url){
    return fetch(url)
        .then(resp =>{
            if(!resp.ok){
                throw new Error("There wa a problem fecthing data.")
            }
            return resp.json()
        })
}

export function getBookings(bookableId, startDate, endDate){
    const start = shortISO(startDate)
    const end = shortISO(endDate)
    const urlRoot = "http://localhost:3001/bookings";

    const query = `bookableId=${bookableId}&start=${start}&end=${end}`
    return loadData(`${urlRoot}?&${query}`)
}