import React, { useState } from 'react'
import { Controller, useFieldArray, useForm } from 'react-hook-form';
import api from '../hooks/useAxios';
import Swal from 'sweetalert2';
import useAuth from '../Firebase/useAuth';

const CreateSurveyPage = () => {
  const { user } = useAuth()
  console.log();
  const { register, handleSubmit, reset } = useForm({
    defaultValues: {
      category:'',
    }
  });


  const onSubmit = async (data) => {
    const survey = { ...data, surveyorEmail: user?.email }
  
    const result = await api.post('/create_survey', survey)
    console.log(result);
    if (result.data.insertedId) {
      Swal.fire({
        icon: 'success',
        title: 'Successful!',
        text:'Your survey created successfully'
      })
    }
    reset()

  };

  return (
    <div>
      <div className="max-w-lg mx-auto mt-10">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label htmlFor="title" className="block mb-2 font-medium text-gray-700">Survey Title</label>
            <input
              id="title"
              {...register('title', { required: true })}
              placeholder="Survey Title"
              className="block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
            />
          </div>
          <div>
            <label htmlFor="description" className="block mb-2 font-medium text-gray-700">Survey Description</label>
            <textarea
              id="description"
              {...register('description', { required: true })}
              placeholder="Survey Description"
              className="block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
            />
          </div>
          <div>
            <label htmlFor="category" className="block mb-2 font-medium text-gray-700">Category</label>
            <select
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
              id="questionTitle"
              {...register('questionTitle', { required: true })}
              placeholder="Question"
              className="block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
            />
          </div>
          <div>
            <label htmlFor="questionDescription" className="block mb-2 font-medium text-gray-700">Question Description</label>
            <textarea
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
    </div >
  )
}


export default CreateSurveyPage