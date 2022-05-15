import apiUrl from "~/constants/api";

export default (context, inject) => {
    inject('api', apiUrl)
}