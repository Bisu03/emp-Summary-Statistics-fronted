import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { toast } from "react-toastify";
import { API } from "../utils/apiUrl";

const register = () => {
    const router = useRouter();
    const [Loading, setLoading] = useState(false);
    const [UserInfo, setUserInfo] = useState({
        email: "",
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
            const { data } = await axios.post(`${API}/auth/register`, UserInfo);
            toast.success(data.message);
            router.push("/");
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
                            <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
                            <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
                        </svg>
                        <input
                            type="text"
                            className="grow"
                            placeholder="Email"
                            name="email"
                            value={UserInfo.email}
                            onChange={HandleChange}
                        />
                    </label>
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
                            <span className="label-text-alt">Already Have an Account?</span>
                            <Link href="/" className="label-text-alt link">
                                Login
                            </Link>
                        </div>
                    </label>
                    <button
                        className="btn btn-neutral w-full max-w-xl"
                        onClick={HandleSubmit}>
                        {Loading && <span className="loading loading-spinner"></span>}
                        Register
                    </button>
                </div>
            </div>
        </>
    );
};

export default register;
