import Link from "next/link";
import React, { useState } from "react";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import { API } from "../utils/apiUrl";
import axios from "axios";

const index = () => {
    const router = useRouter();
    const [Loading, setLoading] = useState(false);
    const [UserInfo, setUserInfo] = useState({
        username: "",
        password: "",
    });

     // form handling
    const HandleChange = (e) => {
        setUserInfo({ ...UserInfo, [e.target.name]: e.target.value });
    };

     // add employee api call
    const HandleSubmit = async () => {
        setLoading(true);
        try {
            const { data } = await axios.post(`${API}/auth/login`, UserInfo);
            console.log(data);
            Cookies.set("accessToken", data.token);
            router.push("/employee/list");
        } catch (error) {
            setLoading(false);
            toast.error(error?.response?.data?.message);
        }
    };
    return (
        <>
            <div className="flex w-full justify-center items-center h-screen">
                <div className="space-y-3">
                    <label className="input input-bordered flex items-center gap-2">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 16 16"
                            fill="currentColor"
                            className="w-4 h-4 opacity-70">
                            <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
                        </svg>
                        <input
                            type="text"
                            className="grow"
                            placeholder="Username"
                            name="username"
                            value={UserInfo.username}
                            onChange={HandleChange}
                        />
                    </label>
                    <label className="input input-bordered flex items-center gap-2">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 16 16"
                            fill="currentColor"
                            className="w-4 h-4 opacity-70">
                            <path
                                fillRule="evenodd"
                                d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                                clipRule="evenodd"
                            />
                        </svg>
                        <input
                            type="password"
                            className="grow"
                            name="password"
                            value={UserInfo.password}
                            onChange={HandleChange}
                        />
                    </label>
                    <label className="form-control w-full max-w-xs">
                        <div className="label">
                            <span className="label-text-alt">Don't Have an Account?</span>
                            <Link href="/register" className="link">Register</Link>
                        </div>
                    </label>
                    <button
                        className="btn btn-neutral w-full max-w-xl"
                        onClick={HandleSubmit}>
                        {Loading && <span className="loading loading-spinner"></span>}
                        Login
                    </button>
                </div>
            </div>
        </>
    );
};

export default index;
