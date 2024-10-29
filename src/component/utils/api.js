import {formatDate} from "./date-utils.js";
import {API_BASE_URL} from "./api-config.js";

let headers = new Headers({
    "Content-Type": "application/json",
})

const accessToken = localStorage.getItem("ACCESS_TOKEN")
if(accessToken){
    headers.append("Authorization","Bearer " + accessToken);
}
//  const url = API_BASE_URL + api;
export default function loadData(url){
    let options ={
        headers: headers,
        method: "GET",
    };
    return fetch(url,options)   //method: GET
        .then(resp =>{
            if(!resp.ok){
                throw new Error("There wa a problem fecthing data.")
            }
            return resp.json()
        })
        .catch((error) => console.error(error.message))
}

export function getBookings(bookableId, startDate, endDate){
    const start = formatDate(startDate)
    const end = formatDate(endDate)
    const urlRoot = API_BASE_URL + "/bookings";
    // const urlRoot = "http://localhost:8080/bookings";

    const query = `bookableId=${bookableId}&start=${start}&end=${end}`
    return loadData(`${urlRoot}?&${query}`)
}

export function createItem (url, item) {
    return fetch(
        url,
        {
            method: "POST",
            headers: {"Content-Type": "application/json","Authorization":"Bearer " + accessToken},
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
            headers: {"Content-Type": "application/json","Authorization":"Bearer " + accessToken},
            body: JSON.stringify(item)
        }
    ).then(response => {
        if (!response.ok) {
            throw new Error("There was a problem modifing the item!");
        }
        return response.json();
    });
}

export function deleteItem (url) {
    return fetch(
        url,
        {
            method: "DELETE",
            headers: {"Content-Type": "application/json","Authorization":"Bearer " + accessToken}
        }
    ).then(response => {
        if (!response.ok) {
            throw new Error("There was a problem deleting the item!");
        }
        return response.json();
    });
}