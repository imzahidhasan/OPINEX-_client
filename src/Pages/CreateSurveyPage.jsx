import React, { useState } from 'react'
import { useFieldArray, useForm } from 'react-hook-form';
import api from '../hooks/useAxios';
import Swal from 'sweetalert2';

const CreateSurveyPage = () => {
  const { register, handleSubmit, control, reset } = useForm({
    defaultValues: {
      title: '',
      category: '',
      description:'',
      questions: [{ question: '' }],
    },
  });

  const { fields, append } = useFieldArray({
    control,
    name: 'questions',
  });

  const onSubmit = async (data) => {
    console.log(data);
    const result = await api.post('/surveys', data)
    if (result.data.insertedId) {
      reset({ title: '', description: '',category:'', questions: [{ question: '' }] });
      Swal.fire({
        icon: 'success',
        title: 'SUCCESSFUL',
        text: 'your survey submitted successfully!'
      })
    }
  };
  return (
    <div>
      <div className="max-w-lg mx-auto mt-10">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <input
            {...register('title', { required: true })}
            placeholder="Survey Title"
            className="block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
          />
          <textarea
            {...register(`description`, { required: true })}
            placeholder="Description"
            className="block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
          />
          <select
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
          {fields.map((item, index) => (
            <div key={item.id} className="space-y-2">
              <input
                {...register(`questions.${index}.question`, { required: true })}
                placeholder="Question"
                className="block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
              />
            </div>
          ))}

          <button type="button" onClick={() => append({ question: '', })} className="block w-full p-2 bg-blue-500 text-white rounded-md">
            Add Another Question
          </button>
          <button type="submit" className="block w-full p-2 bg-green-500 text-white rounded-md">
            Submit Survey
          </button>
        </form>
      </div>
    </div>
  )
}


export default CreateSurveyPage