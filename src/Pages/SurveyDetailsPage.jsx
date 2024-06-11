import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { useParams } from 'react-router-dom';
import api from '../hooks/useAxios';
import { useForm } from 'react-hook-form';
import useAuth from '../Firebase/useAuth';
import Swal from 'sweetalert2';

const SurveyDetailsPage = () => {
  const { id } = useParams();
  const { user ,userRole} = useAuth();
  const { data, isLoading, error, isError } = useQuery({
    queryKey: ['survey', id], // Include id in the query key for uniqueness
    queryFn: () => api.get(`/survey/${id}`).then(res => res.data),
  });

  const survey = data;
  const { handleSubmit, register, watch, setValue, formState: { errors } } = useForm();

  const vote = watch('vote');

  const handleCheckboxChange = (value) => {
    if (vote === value) {
      setValue('vote', '');
    } else {
      setValue('vote', value);
    }
  };

  const onSubmit = async (formData) => {
    console.log(formData);
    const voteInfo = {
      ...formData,
      userEmail: user?.email,
      userName: user?.displayName,
    }
    const result = await api.put(`/vote/${id}`, voteInfo)
    if (result.data.modifiedCount > 0) {
      Swal.fire({
        icon: 'success',
        title: 'Successful',
        text: 'your vote counted successfully'
      })
    }
  };

  const handleReport = () => {
    Swal.fire({
      title: "Sure?",
      text: "Do you really want to report this post?",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "YES"
    }).then(async (result) => {
      if (result.isConfirmed) {
        await api.put(`/report_survey/${id}`, { userEmail: user.email });
        Swal.fire({
          title: "Reported!",
          text: "Reported successfully,we will check this survey",
          icon: "success"
        });
      }
    });
  };

  if (isLoading) {
    return <div className='h-screen flex justify-center items-center'><span className="loading loading-dots loading-lg"></span></div>
  }

  if (isError) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div>
      <div className="max-w-4xl relative mx-auto mt-10 p-4">
        <div className='absolute right-8'>
          <button onClick={handleReport} className='p-2 text-white hover:bg-blue-500 rounded-lg bg-blue-600'>Report</button>
        </div>
        <h1 className="text-2xl font-bold mb-4">Survey Details</h1>
        <div className="bg-white shadow-md rounded-lg p-6 mb-4">
          <h2 className="text-xl font-semibold mb-2">{survey?.title}</h2>
          <p className="text-gray-700 mb-1"><strong>Category:</strong> {survey?.category}</p>
          <p className="text-gray-700 mb-1"><strong>Description:</strong> {survey?.description}</p>
          <p className="text-gray-700 mb-1"><strong>Deadline:</strong> {new Date(survey?.deadline).toLocaleDateString()}</p>
        </div>
        <div className="max-w-4xl shadow-xl mx-auto mt-10">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className='p-4'>
              <p className="block mb-2 font-medium text-gray-700">{survey?.questionTitle}</p>
              <p className='my-2 text-gray-700'>{survey?.questionDescription}</p>
              <div className="flex items-center mb-4">
                <input
                  id="yes"
                  type="checkbox"
                  checked={vote === 'yes'}
                  onChange={() => handleCheckboxChange('yes')}
                  className="form-checkbox h-5 w-5 text-blue-600 transition duration-150 ease-in-out"
                />
                <label htmlFor="yes" className="ml-2 block text-sm leading-5 text-gray-700">
                  Yes
                </label>
              </div>
              <div className="flex items-center">
                <input
                  id="no"
                  type="checkbox"
                  checked={vote === 'no'}
                  onChange={() => handleCheckboxChange('no')}
                  className="form-checkbox h-5 w-5 text-blue-600 transition duration-150 ease-in-out"
                />
                <label htmlFor="no" className="ml-2 block text-sm leading-5 text-gray-700">
                  No
                </label>
              </div>
              {errors.vote && <p className="text-red-600 text-sm mt-2">This field is required</p>}
            </div>
            {userRole==='pro_user'&& <div className='p-4'>
              <label htmlFor="comment"> Comments</label>
              <textarea id='comment' {...register('comment')} placeholder='enter your comment here...' className='border-2 w-full p-4' />
            </div>}
            <div className='p-4'>
              <button type="submit" className="block w-full p-2 bg-green-500 text-white rounded-md">
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default SurveyDetailsPage;
