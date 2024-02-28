import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import axios from "axios";
import { toast } from "react-toastify";
import { API } from "../../utils/apiUrl";

const list = () => {
    const [EmployeeList, setEmployeeList] = useState([])
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    const FetchEmployee = async () => {
        try {
            const { data } = await axios.get(`${API}/employee?page=${currentPage}`)
            setEmployeeList(data?.list)
            setTotalPages(data?.totalPages)
        } catch (error) {
            toast.error(error?.response?.data?.message)
        }
    }

    useEffect(() => {
        FetchEmployee()
    }, [currentPage])

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };


    const HandleDelete = async (id) => {
        try {
            const { data } = await axios.delete(`${API}/deleteemployee/${id}`)
            FetchEmployee()
            toast.success(data.message)
        } catch (error) {
            toast.error(error?.response?.data?.message)
        }
    }

    return (
        <>
            <Navbar />

            <div className="overflow-x-scroll h-screen  mt-10 p-4 ">
                <table className="table ">
                    <thead className="bg-error text-base-100">
                        <tr>
                            <th></th>
                            <th> Name </th>
                            <th> Salary </th>
                            <th> Currency </th>
                            <th> On Contract </th>
                            <th> Department </th>
                            <th> Sub Department </th>
                            <th>Action </th>
                        </tr>
                    </thead>
                    {
                        EmployeeList?.map((data, index) => (
                            <tr key={index}>
                                <th>{index + 1}</th>
                                <th>{data.name}</th>
                                <th>{data.salary}</th>
                                <th>{data.currency}</th>
                                <th>{data.on_contract ? "YES" : "NO"}</th>
                                <th>{data.department}</th>
                                <th>{data.sub_department}</th>
                                <th><button className='btn btn-error' onClick={() => HandleDelete(data._id)}>Delete</button></th>
                            </tr>

                        ))
                    }
                </table>
            </div>
            <div className=" flex justify-center w-full my-5  ">
                <div className="join bg-primary">
                    {Array.from({ length: totalPages }, (_, index) => (
                        <button className="join-item btn btn-neutral" key={index + 1} onClick={() => handlePageChange(index + 1)}>
                            {index + 1}
                        </button>
                    ))}
                </div>
            </div>
        </ >
    );
};

export default list;
