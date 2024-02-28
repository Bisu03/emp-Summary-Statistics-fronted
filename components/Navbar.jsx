import Cookies from 'js-cookie';
import Link from 'next/link'
import React from 'react'

const Navbar = () => {
    const HandleLogout = () => {
        Cookies.remove("accessToken");
        location.reload()
    }
    return (
        <>
            <div className="navbar bg-neutral text-base-100 ">
                <div className="flex-1">
                    <a className="btn btn-ghost text-xl">E.S.S.S</a>
                </div>
                <div className="flex-none">
                    <ul className="menu menu-horizontal px-1 z-10 ">

                        <li>
                            <details>
                                <summary>
                                    Employee
                                </summary>
                                <ul className="p-2 bg-base-100 rounded-t-none text-xs text-neutral w-40">
                                    <li>
                                        <Link href="/employee/add" >
                                            Add Employee
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href="/employee/list" >
                                            Employee List
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href="/employee/statistics" >
                                            Employee Statistics
                                        </Link>
                                    </li>
                                </ul>
                            </details>
                        </li>

                        <button className="btn" onClick={HandleLogout} >Logout</button>

                    </ul>
                </div>
            </div>
        </>
    )
}

export default Navbar