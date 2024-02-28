import React, { useState } from "react";
import { toast } from "react-toastify";
import Navbar from "../../components/Navbar";
import axios from "axios";
import { API } from "../../utils/apiUrl";
import { headersList } from "../../utils/header";

const statistics = () => {
    const [Loading, setLoading] = useState(false)
    const [Salary, setSalary] = useState(null)
    const [ChooseContract, setChooseContract] = useState(false);
    const [ChooseValue, setChooseValue] = useState({
        query_key: "",
        query_value: "",
    });

    // form handling
    const HandleChange = (e) => {
        setChooseValue({ ...ChooseValue, [e.target.name]: e.target.value });
    };

     // add employee api call
    const HandleFetchData = async () => {
        setLoading(true)
        if (ChooseValue.query_key) {
            if (!ChooseValue.query_value) {
                setLoading(false)
                toast.warn("Choose Value")
            }
        }

        try {
            let reqOptions = {
                url: `${API}/employee/employeesalary?on_contract=${ChooseContract}&${ChooseValue.query_key}=${ChooseValue.query_value}`,
                method: "GET",
                headers: headersList,
            }
            let { data } = await axios.request(reqOptions);
            console.log(data);
            setSalary(data)
            setLoading(false)
        } catch (error) {
            setLoading(false)
            console.log(error);
            toast.error(error?.response?.data?.message)
        }

    }
    return (
        <>
            <Navbar />
            <div className="flex w-full justify-evenly mt-10">
                <div className="space-y-3">
                    <label className="input input-bordered input-black w-full max-w-xl flex items-center gap-2">
                        Contract
                        <select
                            className="grow "
                            value={ChooseContract}
                            onChange={(e) => setChooseContract(e.target.value)}
                            required>
                            <option defaultValue>Select</option>
                            <option value="true">Yes</option>
                            <option value="false">No</option>
                        </select>
                    </label>
                    <label className="input input-bordered input-black w-full max-w-xl flex items-center gap-2">
                        Choose Key
                        <select
                            className="grow "
                            name="query_key"
                            value={ChooseValue.query_key}
                            onChange={HandleChange}
                            required>
                            <option defaultValue>Select</option>
                            <option value="sub_department">Sub Department</option>
                            <option value="department">Department</option>
                        </select>
                    </label>
                    <label className="input input-bordered input-black w-full max-w-xl flex items-center gap-2">
                        Choose Value
                        <select
                            className="grow "
                            name="query_value"
                            value={ChooseValue.query_value}
                            onChange={HandleChange}
                            required>
                            <option defaultValue>Select</option>
                            {ChooseValue.query_key == "sub_department" ? (
                                <>
                                    <option value="Platform">Platform</option>
                                    <option value="Loan">Loan</option>
                                    <option value="Agriculture">Agriculture</option>
                                    <option value="Customer Onboarding">
                                        Customer Onboarding
                                    </option>
                                </>
                            ) : (
                                <>
                                    <option value="Engineering">Engineering</option>
                                    <option value="Banking">Banking</option>
                                    <option value="Operations">Operations</option>
                                    <option value="Administration">Administration</option>
                                </>
                            )}
                        </select>
                    </label>



                    <button
                        className="btn btn-neutral w-full max-w-xl"
                        onClick={HandleFetchData}>
                        {Loading && <span className="loading loading-spinner"></span>}
                        Fetch Date
                    </button>


                </div>
                {Salary && <div className="text-left  space-y-4">
                    <div className="flex justify-center w-full">
                        <div className="card w-96 bg-base-100 shadow-xl">
                            <div className="card-body">
                                <h1 className="text-center font-bold text-xl">Results</h1>
                                <p className="font-semibold">
                                    Number of Employee:- {Salary?.count ? Salary?.count : "0"}
                                </p>
                                <p className="font-semibold">
                                    Minimum Salary:- {Salary?.minSalary ? Salary?.minSalary : "0"}
                                </p>
                                <p className="font-semibold">
                                    Maximum Salary:- {Salary?.maxSalary ? Salary?.maxSalary : "0"}
                                </p>
                                <p className="font-semibold">
                                    Average Salary:- {Salary?.averageSalary ? Salary?.averageSalary : "0"}
                                </p>

                            </div>
                        </div>
                    </div>

                </div >}

            </div>
            <div className=" flex flex-wrap w-full justify-center space-x-5 mt-5">
                <p className="font-semibold">Contract:- {ChooseContract ? "Yes" : "No"}</p>
                {ChooseValue.query_key && <p className="font-semibold">Query Key:- {ChooseValue.query_key == "sub_department" ? "Sub Department" : "Department"}  </p>}
                {ChooseValue.query_value && <p className="font-semibold">Query Value:- {ChooseValue.query_value}  </p>}
            </div>



        </ >
    );
};

export default statistics;
