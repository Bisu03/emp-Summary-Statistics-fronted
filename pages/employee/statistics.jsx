import React, { useState } from "react";
import { toast } from "react-toastify";
import Navbar from "../../components/Navbar";
import axios from "axios";
import { API } from "../../utils/apiUrl";
import { headersList } from "../../utils/header";

const statistics = () => {
    const [Loading, setLoading] = useState(false)
    const [Salary, setSalary] = useState(null)
    const [ChooseContract, setChooseContract] = useState(null);
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
        setSalary(null)
        setLoading(true)
        if (ChooseValue.query_key) {
            if (!ChooseValue.query_value) {
                setLoading(false)
                return toast.warn("Choose Value")
            }
        }

        try {
            let reqOptions = {
                url: `${API}/employee/employeesalary?on_contract=${ChooseContract}&${ChooseValue.query_key}=${ChooseValue.query_value}`,
                method: "GET",
                headers: headersList,
            }
            let { data } = await axios.request(reqOptions);
            if (data.length == 0) {
                toast.success(data.message);
                
            }
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
            <div className="flex w-full justify-evenly items-center h-screen">
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
                {Salary &&

                    <div className="w-full p-4 shadow-xl lg:max-w-lg">
                        <div className="space-y-2">
                            <h3 className="text-2xl font-semibold">
                                Results
                            </h3>
                            <p className="text-gray-600">
                                Number of Employee:- {Salary?.count ? Salary?.count : "0"}
                            </p>
                            <p className="text-gray-600">
                                Minimum Salary:- {Salary?.minSalary ? Salary?.minSalary : "0"}
                            </p>
                            <p className="text-gray-600">
                                Maximum Salary:- {Salary?.maxSalary ? Salary?.maxSalary : "0"}
                            </p>
                            <p className="text-gray-600">
                                Average Salary:- {Salary?.averageSalary ? Salary?.averageSalary : "0"}
                            </p>
                        </div>
                    </div>}



            </div>



        </ >
    );
};

export default statistics;
