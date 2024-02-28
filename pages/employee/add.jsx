import React, { useState } from "react";
import { useRouter } from "next/router";

// importing components
import Navbar from "../../components/Navbar";
import { toast } from "react-toastify";
import axios from "axios";
import { API } from "../../utils/apiUrl";
import { headersList } from "../../utils/header";

const add = () => {
    const router = useRouter()
    const InitialState = {
        name: "",
        salary: "",
        currency: "",
        department: "",
        on_contract: "",
        sub_department: "",
    };
    const [EmployeeInfo, setEmployeeInfo] = useState(InitialState);
    const [Loading, setLoading] = useState(false);

    // form handling
    const HandleChange = (e) => {
        setEmployeeInfo({ ...EmployeeInfo, [e.target.name]: e.target.value });
    };

    // add employee api call
    const HandleSubmit = async () => {
        if (!EmployeeInfo.name) {
            return toast.warn("Enter Name")
        }
        if (!EmployeeInfo.salary) {
            return toast.warn("Enter Salary")
        }
        if (!EmployeeInfo.department) {
            return toast.warn("Select Department")
        }
        if (!EmployeeInfo.on_contract) {
            return toast.warn("Select Contract")
        }
        if (!EmployeeInfo.sub_department) {
            return toast.warn("Select Sub Department")
        }
        setLoading(true);
        try {
            let reqOptions = {
                url: `${API}/employee/addemployee`,
                method: "POST",
                headers: headersList,
                data: EmployeeInfo,
            }
            let { data } = await axios.request(reqOptions);
            toast.success(data.message);
            router.push("/employee/list")
        } catch (error) {
            setLoading(false);
            toast.error(error?.response?.data?.message);
        }
    };

    return (
        <>
            <Navbar />
            <div className="flex w-full justify-center mt-10">
                <div className="space-y-3">
                    <label className="input input-bordered input-black w-full max-w-xl flex items-center gap-2">
                        Name
                        <input
                            type="text"
                            name="name"
                            value={EmployeeInfo.name}
                            onChange={HandleChange}
                            required
                            className="grow "
                            placeholder="john doe"
                        />
                    </label>

                    <label className="input input-bordered input-black w-full max-w-xl flex items-center gap-2">
                        Salary
                        <input
                            type="text"
                            name="salary"
                            value={EmployeeInfo.salary}
                            onChange={HandleChange}
                            required
                            className="grow "
                            placeholder="9999999"
                        />
                    </label>

                    <label className="input input-bordered input-black w-full max-w-xl flex items-center gap-2">
                        Salary
                        <select
                            className="grow "
                            name="currency"
                            value={EmployeeInfo.currency}
                            onChange={HandleChange}
                            required>
                            <option defaultValue>
                                Select
                            </option>
                            <option value="USD">USD</option>
                            <option value="EUR">EUR</option>
                            <option value="INR">INR</option>
                            <option value="GBP">GBP</option>
                        </select>
                    </label>

                    <label className="input input-bordered input-black w-full max-w-xl flex items-center gap-2">
                        Department
                        <select
                            className="grow "
                            name="department"
                            value={EmployeeInfo.department}
                            onChange={HandleChange}
                            required>
                            <option defaultValue>
                                Select
                            </option>
                            <option value="Engineering">Engineering</option>
                            <option value="Banking">Banking</option>
                            <option value="Operations">Operations</option>
                            <option value="Administration">Administration</option>
                        </select>
                    </label>

                    <label className="input input-bordered input-black w-full max-w-xl flex items-center gap-2">
                        On Contract
                        <select
                            className="grow "
                            name="on_contract"
                            value={EmployeeInfo.on_contract}
                            onChange={HandleChange}>
                            <option defaultValue>
                                {" "}
                                Select{" "}
                            </option>
                            <option value="true">Yes</option>
                            <option value="false">No</option>
                        </select>
                    </label>

                    <label
                        className="input input-bordered input-black w-full max-w-xl flex items-center gap-2"
                        required>
                        Sub Department
                        <select
                            className="grow"
                            name="sub_department"
                            value={EmployeeInfo.sub_department}
                            onChange={HandleChange}>
                            <option defaultValue>
                                Select{" "}
                            </option>
                            <option value="Platform">Platform</option>
                            <option value="Loan">Loan</option>
                            <option value="Agriculture">Agriculture</option>
                            <option value="Customer Onboarding">Customer Onboarding</option>
                        </select>
                    </label>

                    <button
                        className="btn btn-neutral w-full max-w-xl"
                        onClick={HandleSubmit}>
                        {Loading && <span className="loading loading-spinner"></span>}
                        Submit
                    </button>
                </div>
            </div>
        </>
    );
};

export default add;
