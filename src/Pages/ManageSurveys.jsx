import { useQuery } from '@tanstack/react-query'
import React, { useState } from 'react'
import api from '../hooks/useAxios'
import { MdArrowDropDown } from 'react-icons/md';
import Swal from 'sweetalert2';

const ManageSurveys = () => {
  const { data, isLoading, isError, error,refetch } = useQuery({
    queryKey: ['surveys'],
    queryFn: async () => {
      const res = await api.get('/all_surveys')
      return res.data
    }
  })
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white">
        <thead>
          <tr className="text-left border-b">
            <th className="py-2 px-4">Survey Title</th>
            <th className="py-2 px-4">Description</th>
            <th className="py-2 px-4">Status</th>
            <th className="py-2 px-4">Surveyor Email</th>
            <th className="py-2 px-4">Action</th>
          </tr>
        </thead>
        <tbody>
          {data?.map((survey, index) => (
            <SurveyRow key={index} survey={survey} refetch={refetch} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

const SurveyRow = ({ survey, refetch }) => {
  const [selectedStatus, setSelectedStatus] = useState(survey.status);

  const handleStatusChange = (e) => {
    setSelectedStatus(e.target.value);
  };

  const handleSubmit = async () => {
    const formData = { id: survey._id, status: selectedStatus };
    const result = await api.post("/update_survey_status", formData);

    if (result.data.modifiedCount > 0) {
      Swal.fire({
        icon: "success",
        title: "Status Updated",
        text: "Successfully updated the survey status",
      });
      refetch();
    } else {
      Swal.fire({
        icon: "error",
        title: "Update Failed",
        text: "Failed to update the survey status",
      });
    }
  };

  return (
    <tr className="hover:bg-gray-100">
      <td className="py-2 px-4 border-b">{survey.title}</td>
      <td className="py-2 px-4 border-b">{survey.description}</td>
      <td className="py-2 px-4 border-b">
        <div className="relative">
          <select
            value={selectedStatus}
            onChange={handleStatusChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline pr-8"
          >
            <option disabled value=''>select one</option>
            <option value="publish">Publish</option>
            <option value="unpublish">Unpublish</option>
          </select>
          <MdArrowDropDown className="absolute top-2 right-2 pointer-events-none" />
        </div>
      </td>
      <td className="py-2 px-4 border-b">{survey.surveyorEmail}</td>
      <td className="py-2 px-4 border-b">
        <button
          onClick={handleSubmit}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Update
        </button>
      </td>
    </tr>
  );
};
export default ManageSurveys