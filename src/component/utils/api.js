import {formatDate, shortISO} from "./date-utils.js";

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
    const start = formatDate(startDate)
    const end = formatDate(endDate)
    const urlRoot = "http://localhost:3001/bookings";

    const query = `bookableId=${bookableId}&start=${start}&end=${end}`
    return loadData(`${urlRoot}?&${query}`)
}

export function createItem (url, item) {
    return fetch(
        url,
        {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(item)
        }
    ).then(response => {
        if (!response.ok) {
            throw new Error("There was a problem creating the item!");
        }
        return response.json();
    });
}

export function editItem (url, item) {
    return fetch(
        url,
        {
            method: "PUT",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(item)
        }
    ).then(response => {
        if (!response.ok) {
            throw new Error("There was a problem creating the item!");
        }
        return response.json();
    });
}

export function deleteItem (url) {
    return fetch(
        url,
        {
            method: "DELETE",
            headers: {"Content-Type": "application/json"}
        }
    ).then(response => {
        if (!response.ok) {
            throw new Error("There was a problem creating the item!");
        }
        return response.json();
    });
}


export const isDate = date => !isNaN(Date.parse(date));