import Cookies from "js-cookie";

export const headersList = {
    "Accept": "*/*",
    Authorization: "Bearer " + Cookies.get("accessToken"),
    "Content-Type": "application/json"
}