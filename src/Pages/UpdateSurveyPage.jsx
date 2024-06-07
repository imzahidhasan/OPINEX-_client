import { useMutation, useQuery } from '@tanstack/react-query';
import React, { useEffect, useState } from 'react'
import { Controller, useFieldArray, useForm } from 'react-hook-form';
import api from '../hooks/useAxios';
import { useParams } from 'react-router-dom';
import useAuth from '../Firebase/useAuth';
import Swal from 'sweetalert2';




const UpdateSurveyPage = () => {
  const { user } = useAuth();
  const { id } = useParams();

  const { register, handleSubmit, reset } = useForm({

  });
  const { data, error, isLoading, isError, refetch } = useQuery({
    queryKey: ['updateSurvey'],
    queryFn: async () => {
      return api.get(`/survey/${id}`)
    }
  })
  if (isLoading) {
    return <h1>loading...</h1>
  }
  const { title, description, deadline, category, questionTitle, questionDescription } = data.data
  const onSubmit = async (data) => {
    const result = await api.put(`/updateDocument/${id}`, data)
    reset()
    if (result.data.modifiedCount > 0) {
      refetch()
      Swal.fire({
        icon: 'success',
        title: 'Successful!',
        text:'survey information updated successfully'
      })
    }
  };

  return (
    <div>
      <div className="max-w-lg mx-auto mt-10">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label htmlFor="title" className="block mb-2 font-medium text-gray-700">Survey Title</label>
            <input
              defaultValue={title}
              id="title"
              {...register('title', { required: true })}
              placeholder="Survey Title"
              className="block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
            />
          </div>
          <div>
            <label htmlFor="description" className="block mb-2 font-medium text-gray-700">Survey Description</label>
            <textarea
              defaultValue={description}
              id="description"
              {...register('description', { required: true })}
              placeholder="Survey Description"
              className="block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
            />
          </div>
          <div>
            <label htmlFor="category" className="block mb-2 font-medium text-gray-700">Category</label>
            <select
              defaultValue={category}
              id="category"
              {...register('category', { required: true })}
              className="block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
            >
              <option value="" disabled>Select Category</option>
              <option value="Technology">Technology</option>
              <option value="Health">Health</option>
              <option value="Education">Education</option>
              <option value="Entertainment">Entertainment</option>
              <option value="Other">Other</option>
            </select>
          </div>
          <div>
            <label htmlFor="deadline" className="block mb-2 font-medium text-gray-700">Deadline</label>
            <input
              defaultValue={deadline}
              id="deadline"
              {...register('deadline', { required: true })}
              type="date"
              min={new Date().toISOString().split('T')[0]}
              className="block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
            />
          </div>
          <div>
            <label htmlFor="questionTitle" className="block mb-2 font-medium text-gray-700">Question Title</label>
            <input
              defaultValue={questionTitle}
              id="questionTitle"
              {...register('questionTitle', { required: true })}
              placeholder="Question"
              className="block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
            />
          </div>
          <div>
            <label htmlFor="questionDescription" className="block mb-2 font-medium text-gray-700">Question Description</label>
            <textarea
              defaultValue={questionDescription}
              id="questionDescription"
              {...register('questionDescription', { required: true })}
              placeholder="Question Description"
              className="block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
            />
          </div>
          <button type="submit" className="block w-full p-2 bg-green-500 text-white rounded-md">
            Submit Survey
          </button>
        </form>

      </div >
    </div>
  )
}

export default UpdateSurveyPage