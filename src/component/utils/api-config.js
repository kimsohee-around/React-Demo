let backendHost;

const hostname = window && window.location && window.location.hostname;

if(hostname === 'localhost'){
    backendHost = "http://localhost:8083"
}else {
    backendHost =`http://${location.hostname}:8083`
}
// backendHost =`http://192.168.0.253:8080`
export const API_BASE_URL =`${backendHost}`