import { useQuery } from "@tanstack/react-query";
import React, { useState, useEffect } from "react";
import api from "../hooks/useAxios";
import Swal from "sweetalert2";
import { MdArrowDropDown } from "react-icons/md";



const ManageUsers = () => {
    const { data, isLoading, isError, error,refetch } = useQuery({
        queryKey: ["users"],
        queryFn: async () => {
            const res = await api.get("/get_user");
            return res.data;
        },
    });

    const [filteredData, setFilteredData] = useState(data || []);
    const [selectedFilter, setSelectedFilter] = useState("");

    useEffect(() => {
        if (data) {
            handleFilterChange(""); // Apply the initial filter on mount
        }
    }, [data]);

    const handleFilterChange = (filter) => {
        setSelectedFilter(filter);
        if (filter === "") {
            setFilteredData(data);
        } else {
            const filtered = data.filter((user) => user.role === filter);
            setFilteredData(filtered);
        }
    };

    if (isLoading) {
        return <div className='h-screen flex justify-center items-center'><span className="loading loading-dots loading-lg"></span></div>
    }

    return (
        <div>
            <div className="mb-4">
                <label htmlFor="filter" className="block text-gray-700 font-bold mb-2">
                    Filter by Role
                </label>
                <div className="relative w-auto inline-block">
                    <select
                        id="filter"
                        value={selectedFilter}
                        onChange={(e) => handleFilterChange(e.target.value)}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline pr-10"
                    >
                        <option value="">All Roles</option>
                        <option value="admin">Admin</option>
                        <option value="user">User</option>
                        <option value="surveyor">Surveyor</option>
                        <option value="pro_user">Pro User</option>
                    </select>
                    <MdArrowDropDown className="absolute top-2 right-2 text-gray-700 pointer-events-none" />
                </div>
            </div>
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white">
                    <thead>
                        <tr className="text-left">
                            <th className="py-2 px-4 border-b">Serial No.</th>
                            <th className="py-2 px-4 border-b">User Email</th>
                            <th className="py-2 px-4 border-b">Role</th>
                            <th className="py-2 px-4 border-b">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredData.map((user, index) => (
                            <UserRow key={user._id} fetch={refetch} user={user} index={index + 1} />
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

const UserRow = ({ user,fetch, index }) => {
    const [selectedRole, setSelectedRole] = useState(user.role);

    const handleSubmit = async () => {
        const formData = { id: user._id, role: selectedRole };
        const result = await api.post("/update_role", formData);
        console.log(result);
        if (result.data.modifiedCount > 0) {
            Swal.fire({
                icon: "success",
                title: "Successful",
                text: "Successfully changed the user role",
            });
            fetch()
        }
    };

    const handleChange = (e) => {
        setSelectedRole(e.target.value);
    };

    return (
        <tr className="hover:bg-gray-100">
            <td className="py-2 px-4 border-b">{index}</td>
            <td className="py-2 px-4 border-b">{user.email}</td>
            <td className="py-2 px-4 border-b">
                <div className="relative">
                    <select
                        value={selectedRole}
                        onChange={handleChange}
                        className="shadow flex gap-1 appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    >
                        <option disabled value="">
                            Select an option
                        </option>
                        <option value="admin">Admin</option>
                        <option value="user">User</option>
                        <option value="surveyor">Surveyor</option>
                        <option value="pro_user">pro_user</option>

                    </select>
                    <MdArrowDropDown className="absolute top-2 right-2 pointer-events-none" />
                </div>
            </td>
            <td className="py-2 px-4 border-b">
                <button
                    onClick={handleSubmit}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                    Save
                </button>
            </td>
        </tr>
    );
};

export default ManageUsers;