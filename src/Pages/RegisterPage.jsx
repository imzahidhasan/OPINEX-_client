import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import useAuth from '../Firebase/useAuth';
import Swal from 'sweetalert2';
import axios from 'axios';

const RegisterPage = () => {
  const { createUser, loginWithGoogle, setUser, UpdateProfile, user } = useAuth()
  const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleGoogleLogin = () => {
    loginWithGoogle()
      .then(res => {
        setUser(res)
        Swal.fire({
          title: 'Successful!',
          text: 'successfully logged in to your account',
          icon: 'success'
        })
        navigate('/')
      })
      .catch(err => {
        Swal.fire({
          title: 'Oh no!',
          text: 'there is a problem when logging with google',
          icon: 'error'
        })
      })
  }
  const onSubmit = async (data) => {
    const { email, password, name, image } = data;
    const formData = new FormData();
    formData.append('image', image[0]);

    try {
      // Upload image
      const res = await axios.post(`https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_imgbb_key}`, formData);
      const img_url = res.data.data.display_url;

      const userCredential = await createUser(email, password);
      console.log(userCredential);
      if (userCredential.insertedId) {
        await UpdateProfile(name, img_url);
      }

      Swal.fire({
        title: 'Successful',
        text: 'Your account created successfully',
        icon: 'success'
      });
      navigate('/');
    } catch (error) {
      // Handle errors
      Swal.fire({
        icon: 'error',
        title: 'Oh no!',
        text: 'Something went wrong! try again...'
      });
    }
  };


  return (
    <div>
      <div className='flex justify-center my-5'>
        <div className="w-full max-w-md p-4 rounded-md shadow sm:p-8 dark:bg-gray-50 dark:text-gray-800">
          <h2 className="mb-3 text-3xl font-semibold text-center">Register for your account</h2>
          <p className="text-sm text-center dark:text-gray-600">
            Already have an account?
            <Link to='/login' className="focus:underline hover:underline"> Login here</Link>
          </p>
          <div className="my-6 space-y-4">
            <button onClick={handleGoogleLogin} aria-label="Register with Google" type="button" className="flex items-center justify-center w-full p-4 space-x-4 border rounded-md focus:ring-2 focus:ring-offset-1 dark:border-gray-600 focus:dark:ring-violet-600">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" className="w-5 h-5 fill-current">
                <path d="M16.318 13.714v5.484h9.078c-0.37 2.354-2.745 6.901-9.078 6.901-5.458 0-9.917-4.521-9.917-10.099s4.458-10.099 9.917-10.099c3.109 0 5.193 1.318 6.38 2.464l4.339-4.182c-2.786-2.599-6.396-4.182-10.719-4.182-8.844 0-16 7.151-16 16s7.156 16 16 16c9.234 0 15.365-6.49 15.365-15.635 0-1.052-0.115-1.854-0.255-2.651z"></path>
              </svg>
              <p>Register with Google</p>
            </button>
          </div>
          <div className="flex items-center w-full my-4">
            <hr className="w-full dark:text-gray-600" />
            <p className="px-3 dark:text-gray-600">OR</p>
            <hr className="w-full dark:text-gray-600" />
          </div>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
            <div className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="name" className="block text-sm">Name</label>
                <input
                  {...register("name", { required: 'Name is required' })}
                  type="text"
                  id="name"
                  placeholder="Enter your name"
                  className="w-full px-3 py-2 border rounded-md dark:border-gray-300 dark:bg-gray-50 dark:text-gray-800 focus:dark:border-violet-600"
                />
                {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
              </div>
              <div className="space-y-2">
                <label htmlFor="email" className="block text-sm">Email address</label>
                <input
                  {...register("email", {
                    required: 'Email is required',
                    pattern: {
                      value: /^\S+@\S+$/i,
                      message: 'Invalid email address'
                    }
                  })}
                  type="email"
                  id="email"
                  placeholder="Enter your email"
                  className="w-full px-3 py-2 border rounded-md dark:border-gray-300 dark:bg-gray-50 dark:text-gray-800 focus:dark:border-violet-600"
                />
                {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
              </div>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <label htmlFor="password" className="text-sm">Password</label>
                </div>
                <input
                  {...register("password", { required: 'Password is required' })}
                  type="password"
                  id="password"
                  placeholder="Enter your password"
                  className="w-full px-3 py-2 border rounded-md dark:border-gray-300 dark:bg-gray-50 dark:text-gray-800 focus:dark:border-violet-600"
                />
                {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
              </div>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <label htmlFor="image" className="text-sm">Profile Picture</label>
                </div>
                <input
                  {...register("image", { required: 'image is required' })}
                  type="file"
                  id="image"
                  className="w-full px-3 py-2 border rounded-md dark:border-gray-300 dark:bg-gray-50 dark:text-gray-800 focus:dark:border-violet-600"
                />
                {errors.file && <p className="text-red-500 text-sm">{errors.file.message}</p>}
              </div>
            </div>
            <button type="submit" className="w-full px-8 py-3 font-semibold rounded-md dark:bg-violet-600 dark:text-gray-50">Register</button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default RegisterPage;
