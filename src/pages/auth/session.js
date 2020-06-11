import Cookies from 'js-cookie'
export const getSession = () => {
    const jwt = Cookies.get('__session')
    let session
    try {
        if (jwt) {
            const base64Url = jwt.split('.')[1]
            const base64 = base64Url.replace('-', '+').replace('_', '/')
            // what is window.atob ?
            // https://developer.mozilla.org/en-US/docs/Web/API/WindowOrWorkerGlobalScope/atob
            session = JSON.parse(window.atob(base64))
        }
    } catch (error) {
        console.log(error)
    }
    return session
}
export const logOut = () => {
    console.log("removing session")
    Cookies.remove('__session')
    window.localStorage.removeItem("token");
    window.localStorage.removeItem("user_id");
    window.localStorage.removeItem("name");
    window.location = 'http://localhost:3000/';
}